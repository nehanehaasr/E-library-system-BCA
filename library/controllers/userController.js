const jwt = require('jsonwebtoken');

const db = require('../db.config');

const nodemailer = require('nodemailer');


const book = db.book;
const UserModal = db.user;
const addcategory = db.addcategory;
const transaction = db.transaction;
const purchases = db.purchases;
const issueBook = db.issueBook;
const bookmark = db.bookmark;

console.log("Transaction Model:", transaction);

const Sequelize = db.Sequelize;

const jwt_secret1 = 'abcd#1234';


// ===========================================

const userController = {};

userController.renderloginPage = (req, res) => {
    res.render('user/usersignin');
}

userController.loginUser = async (req, res) => {
    try {
        var { email, password } = req.body;
        var result = await UserModal.findAll({ where: { email: email, password: password } });
        if (result.length > 0) {
            //var result=await UserModal.findAll({where:{email:email ,password:password}});
            var status = result[0].status;
            if (status == 'Active') {
                var payload = {
                    id: result[0].id,
                    name: result[0].firstname,
                    email: result[0].email
                };
                var token = jwt.sign(payload, jwt_secret1, { expiresIn: '7D' });
                res.cookie('userToken', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false
                });

                res.json({ error: false, message: "login successful" });

            } else {
                res.json({ error: true, message: "User Blocked" });
            }
        }
        else {
            res.json({ error: true, message: "Invalid Credentials" });
        }
    }
    catch (e) {
        res.json({ error: true, message: e.message });
    }
}

userController.renderdashboardPage = (req, res) => {
    res.render('user/dashboard');
}

userController.userDashboardCounts = async (req, res) => {
    try {

        const { id } = req.user;

        const counts = await issueBook.findAll({
            attributes: [
                [
                    Sequelize.fn(
                        "SUM",
                        Sequelize.literal("CASE WHEN status = 'Issued' THEN 1 ELSE 0 END")
                    ),
                    "issuedBooks"
                ],
                [
                    Sequelize.fn(
                        "SUM",
                        Sequelize.literal("CASE WHEN status = 'Overdue' THEN 1 ELSE 0 END")
                    ),
                    "overdueBooks"
                ],
                [
                    Sequelize.fn(
                        "SUM",
                        Sequelize.literal("CASE WHEN status = 'Returned' THEN 1 ELSE 0 END")
                    ),
                    "returnedBooks"
                ]
            ],
            where: {
                userId: id
            },
            raw: true
        });

        return res.json({
            error: false,
            message: "Dashboard counts fetched successfully",
            data: counts[0]
        });

    } catch (e) {

        return res.json({
            error: true,
            message: e.message || "Internal Server Error",
            data: {}
        });

    }
};

userController.renderuserbooks = (req, res) => {
    res.render('user/userbooks');
}


userController.userbookdata = async (req, res) => {
    try {
        var id = req.user.id;
        var records = await transaction.findAll(
            {
                where: { userId: id },
                include: [
                    {
                        model: book,
                        attributes: ['title']

                    },
                    {
                        model: UserModal,
                        attributes: ['name']

                    }
                ]
            }
        );

        res.json({ message: 'Data Fetched ', records: records });
        // console.log(records);
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

userController.downloadpdf = async (req, res) => {
    try {

        const { id } = req.params;

        const bookData = await book.findByPk(id);

        if (!bookData) {
            return res.send("Book not found");
        }

        // 🔐 PAID CHECK
        if (bookData.paid == 1) {
            return res.send("This is a paid book, please buy first");
        }

        // 📁 correct file path
        const filePath = `./public/bookspdf/${bookData.pdf}`;

        return res.download(filePath);

    } catch (e) {
        res.status(500).send(e.message);
    }
};



userController.userbook = async (req, res) => {
    try {
        const { id } = req.user;

        const records = await issueBook.findAll({
            where: {
                userId: id,
                status: ['Issued', 'Overdue']   // student ko overdue books bhi dikhe
            },
            attributes: [
                'id',
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('issuedAt'), '%d-%m-%Y'), 'issuedAt'],
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('dueDate'), '%d-%m-%Y'), 'dueDate'],
                'fineAmount',
                'status'
            ],
            include: [
                {
                    model: book,
                    attributes: ['id', 'title']
                },
            ],
            order: [['issuedAt', 'DESC']]
        });

        return res.json({
            error: false,
            message: "Issued books fetched successfully",
            records: records
        });

    } catch (e) {

        return res.json({
            error: true,
            message: e.message || "Internal Server Error",
            records: []
        });

    }
}


userController.renderavailable = (req, res) => {
    res.render('user/available');
}




userController.viewallbooks = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const userId = req.user ? req.user.id : null;

        const records = await book.findAll({
            where: {
                status: 'Available',
                categoryId: categoryId
            },
            include: [
                {
                    model: addcategory,
                    attributes: ['name', 'id']
                }
            ]
        });

        const updatedRecords = await Promise.all(records.map(async (item) => {

            let data = item.toJSON();

            const purchaseRecord = await purchases.findOne({
                
                where: {
                    user_id: req.user.id,
                    book_id: data.id,   // ✅ correct now
                    payment_status: "success"
                }
            });
            console.log("USER:", req.user);

            data.isPurchased = purchaseRecord ? true : false;

            if (data.pdf) {
                        data.pdf = data.pdf.replace('public/bookspdf/', '');
                        }

            return data;
        }));

        res.json({ message: 'Data Fetched', records: updatedRecords });

    } catch (e) {
        console.log("ERROR:", e);   // 👈 IMPORTANT
        res.json({ message: e.message, records: [] });
    }
};



userController.viewbooks = async (req, res) => {
    try {
        
        var records = await book.findAll(

        );
        res.json({ message: 'Data Fetched ', records: records });

    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}


userController.paymentPage = (req, res) => {
    res.render('user/payment');
}

userController.renderchangepasswordPage = (req, res) => {
    res.render('user/changepassword');
}


userController.updatepassword = async (req, res) => {
    try {

        var { email, password, newpassword } = req.body;
        var record = await UserModal.findAll({ where: { email: email, password: password } });
        if (record.length > 0) {

            await UserModal.update({ password: newpassword }, { where: { email: email } });
            res.json({ error: false, message: 'Password Changed Successfully' });

        }
        else {
            res.json({ error: true, message: 'Password or Email do not match' });
        }
    }
    catch (e) {
        res.json({ error: true, message: e.message });
    }
}

userController.logout = (req, res) => {
    //console.log("hello ")
    res.clearCookie('userToken');
    //  res.json({error: false, message: "login successful"});
    res.redirect('/');
}


userController.sendEmail = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const email = req.user.email;
        const name = req.user.name;
        const password = req.user.password;



        const { bookId, title, price } = req.body;


        console.log("Sending bookId:", bookId);
        console.log("Sending title:", title);
        console.log("Sending price:", price);
        // 👇 YAHAN TRANSACTION SAVE KARO (IMPORTANT)
        try {
            const txn = await transaction.create({
                userId: req.user.id,
                bookId: bookId,
                amount: price
            });
            console.log("Transaction Saved", txn);

            const purchaseData = await purchases.create({
                user_id: req.user.id,
                book_id: bookId,
                payment_status: "success",
                access_type: "lifetime",
                transaction_id: txn.id
            });

            console.log("PURCHASE:", purchaseData);
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
            // return res.json({ error: true, message: err.message });
        }


        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'dummymail2003s@gmail.com', 
                pass: 'uevludqlpergxtje', 
            },
        });

        // Email options
        const mailOptions = {
            from: 'Support',
            to: email, // Receiver's email
            subject: 'Subject: Payment Successful - Book Access Granted',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Library Account Created</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding:30px 0;">

            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                    <td style="background:#2c3e50; padding:20px; text-align:center; color:#ffffff;">
                        <h2 style="margin:0;">📚  E Library System</h2>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:30px; color:#333333;">

                        <p style="font-size:16px;">Dear <strong>${name}</strong>,</p>

                        <p style="font-size:15px; line-height:1.6;">
                            We are pleased to inform you that your account has been successfully created
                            in our <strong>Library Management System</strong>.
                        </p>

                        <p style="font-size:15px; margin-top:20px;">
                            <strong>Your login credentials are:</strong>
                        </p>

                        <table cellpadding="8" cellspacing="0" style="width:100%; background:#f8f9fa; border-radius:6px;">
                            <tr>
                                <td style="font-weight:bold;">Email</td>
                                <td>${email}</td>
                            </tr>
                            <tr>
                                <td style="font-weight:bold;">Password</td>
                                <td>${password}</td>
                            </tr>
                        </table>

                        <p style="font-size:14px; color:#555; margin-top:20px;">
                            For security reasons, please change your password after your first login.
                        </p>

                        <p>
  Read your book here:
  <a href="http://localhost:3000/user/read/${bookId}">
    Read Book
  </a>
</p>

                        <p style="font-size:14px; margin-top:25px;">
                            If you have any questions or face any issues, feel free to contact the library administrator.
                        </p>

                        <p style="font-size:14px;">
                            Best regards,<br>
                            <strong>Library Administration Team</strong>
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
                        © ${new Date().getFullYear()} Library Management System. All rights reserved.
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
                res.json({ error: true, message: error.message });
            } else {
                console.log('Email sent:', info.response);
                res.json({ error: false, message: 'Email Sent Successfully' });
            }
        });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}




userController.read = async (req, res) => {

    try {
        const { id } = req.params;

        const bookData = await book.findByPk(id);

        if (!bookData) {
            return res.send("Book not found");
        }

        // 🔐 PURCHASE CHECK (IMPORTANT FIX)
        const record = await purchases.findOne({
            where: {
                user_id: req.user.id,
                book_id: bookData.id,
                payment_status: "success"
            }
        });

        if (bookData.paid == 1 && !record) {
            return res.send("❌ Please buy this book first");
        }

        return res.render('user/read', { book: bookData });

    } catch (e) {
        console.log(e);
        res.send("Server Error");
    }
};

userController.saveBookmark = async (req, res) => {
    try {
        const { bookId, page } = req.body;

        console.log("Saving:", bookId, page);

        const data = await db.bookmark.create({
            user_id: req.user.id,
            book_id: bookId,
            page_number: page
        });

        console.log("Saved:", data);

        res.json({ success: true });

    } catch (e) {
        console.log("ERROR:", e);
        res.json({ success: false, message: e.message });
    }
};




userController.getBookmark = async (req, res) => {
    try {
        const { bookId } = req.params;

        const data = await db.bookmark.findOne({
            where: {
                user_id: req.user.id,
                book_id: bookId
            },
            order: [['createdAt', 'DESC']]
        });

        res.json({ error: false, data });

    } catch (e) {
        res.json({ error: true, message: e.message });
    }
};


userController.renderreadpage = (req, res) => {
    res.render('user/read');
}





userController.renderPurchasedPage = (req, res) => {
    res.render('user/purchase');
}


userController.getPurchasedBooks = async (req, res) => {
    try {
        const userId = req.user.id;

        const records = await purchases.findAll({
            where: {
                user_id: userId,
                payment_status: "success"
            },
            include: [
                {
                    model: book,
                    attributes: ['id', 'title', 'author', 'photo']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        console.log("PURCHASED:", JSON.stringify(records, null, 2));

        res.json({
            error: false,
            records: records
        });

    } catch (e) {
        console.log("ERROR:", e);
        res.json({
            error: true,
            message: e.message
        });
    }
};

userController.buyBook = async (req, res) => {
    try {
        const userId = req.indexroute?.id; // JWT se login user
        const bookId = req.params.bookId;

        // check login
        if (!userId) {
            return res.redirect("/login");
        }

        // check book
        const bookRecord = await book.findByPk(bookId);

        if (!bookRecord) {
            return res.json({ error: true, message: "Book not found" });
        }

        // already purchased check
        const already = await purchases.findOne({
            where: {
                userId,
                bookId
            }
        });

        if (already) {
            return res.json({
                error: true,
                message: "Already purchased this book"
            });
        }

        // create purchase
        await purchases.create({
            userId,
            bookId
        });

        return res.json({
            error: false,
            message: "Book purchased successfully"
        });

    } catch (e) {
        return res.json({
            error: true,
            message: e.message
        });
    }
};

userController.downloadBook = async (req, res) => {
    try {

        const userId = req.indexroute?.id; // login user
        const bookId = req.params.bookId;

        const bookRecord = await book.findByPk(bookId);

        if (!bookRecord) {
            return res.send("Book not found");
        }

        // FREE BOOK
        if (Number(bookRecord.price) === 0) {

            const filePath = `public/bookspdf/${bookRecord.pdf}`;

            return res.download(filePath);
        }

        // PAID BOOK → check purchase
        const purchased = await purchases.findOne({
            where: { userId, bookId }
        });

        if (!purchased) {
            return res.json({
                error: true,
                message: "Please buy book first"
            });
        }

        const filePath = `public/bookspdf/${bookRecord.pdf}`;

        return res.download(filePath);

    } catch (e) {
        return res.json({ error: true, message: e.message });
    }
};


userController.rendercreate = (req, res) => {
    res.render('user/create');
}



module.exports = userController;