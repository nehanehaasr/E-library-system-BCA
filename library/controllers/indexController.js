const jwt = require("jsonwebtoken");

// ==========================

var db = require('../db.config');

const { Op } = require('sequelize'); 

const sequelize = db.sequelize;
const Sequelize = db.Sequelize;


var book = db.book;
var UserModal = db.user;
var librarian = db.librarian;
var category = db.category;
var issueBook = db.issueBook;
var addcategory = db.addcategory;
var transaction = db.transaction;

var jwt_secret = 'abcd#123';

// const jwt_secret1 = 'abcd#1234';


// ==========================

var indexController = {};

indexController.renderIndexPage = async (req, res) => {
    try {
        const books = await book.findAll({
            order: [['id', 'DESC']], // 🔥 latest first
            limit: 8                // optional: sirf 8 books
        });

        res.render('index', { books });

    } catch (err) {
        console.log(err);
        res.render('index', { books: [] });
    }
};

//librarian signup
// indexController.renderlibsignupPage =(req , res)=>{
//    res.render('librarian/signup');
// }

indexController.createNewlibrarian = async (req, res) => {
   try {
      await librarian.create(req.body);
      res.json({ error: false, message: "Data Added Successfully" });

   } catch (e) {
      res.json({ error: true, message: e.message }); l̥
   }
}

indexController.renderlibloginPage = (req, res) => {
   res.render('librarian/signin');
}

indexController.logindata = async (req, res) => {
   try {
      var { email, password } = req.body;
      var records = await librarian.findAll({ where: { email: email, password: password } });
      // console.log(records);
      // console.log(records.length);
      if (records.length > 0) {
         var payload = {
            id: records[0].id,
            name: records[0].name,
            email: records[0].email
         };
         var token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
         res.cookie('librarianToken', token);
         res.json({ message: 'Data Fetched ', error: false });
      }
      else {
         res.json({ error: true, message: 'Data Not Matched' });
      }

   } catch (e) {
      res.json({ message: e.message, error: true });

   }
}
indexController.renderlibrariandashboardPage = (req, res) => {
   res.render('librarian/librariandashboard');
}

indexController.renderaddbookPage = (req, res) => {
   res.render('librarian/addbook');
}

indexController.fetchcategories = async (req, res) => {
   try {
      var records = await addcategory.findAll();
      res.json({ message: 'Data Fetched ', records: records });
   } catch (e) {
      res.json({ message: e.message, records: [] });

   }
}

indexController.addbookdata = async (req, res) => {
   const { photo ,pdf} = req.files;

   const db_path = `/booksphoto/${photo.name}`;
   
   const server_path = `public${db_path}`;

   const pdf_db_path = `/bookspdf/${pdf.name}`;
   const pdf_server_path = `public${pdf_db_path}`;

   
   photo.mv(server_path, async (error) => {
                if (error) {
                    return res.json({ error: true, message: error.message });
                }
                 pdf.mv(pdf_server_path, async (error) => {
                if (error) {
                    return res.json({ error: true, message: error.message });
                }
                try {
      const payload = {
         title: req.body.title,
         author: req.body.author,
         isbn: req.body.isbn,
         publisherName: req.body.publisher,
         publishYear: req.body.year,
         photo: db_path,
         pdf: pdf_server_path,
         price:req.body.price,
         categoryId: req.body.categoryId,
      }
      
      await book.create(payload);
      res.json({ message: 'Added Successfully' });

   } catch (e) {
      res.json({ error: true, message: e.message });
   }
 });
});
}

indexController.viewsubcategory = async (req, res) => {
   try {
      var records = await book.findAll(
         {
            include: [
               {
                  model: addcategory,
                  attributes: ['name', 'id']

               }
            ],
            order: [['id', 'DESC']]
         }
      );
      res.json({ message: 'Data Fetched ', records: records });

   } catch (e) {
      res.json({ message: e.message, records: [] });

   }
}

indexController.deletesubcategory = async (req, res) => {
   try {
      const { bookId } = req.params;

      // check book
      const bookRecord = await book.findByPk(bookId);

      if (!bookRecord) {
         return res.json({
            error: true,
            message: "Book not found"
         });
      }

      // check if book is issued
      if (bookRecord.status === 'Issued') {
         return res.json({
            error: true,
            message: "Book cannot be deleted because it is currently issued"
         });
      }

      // delete book
      await book.destroy({
         where: { id: bookId }
      });

      res.json({
         error: false,
         message: "Book deleted successfully"
      });

   } catch (e) {
      res.json({
         error: true,
         message: e.message
      });
   }
}

indexController.renderissuebooksPage = (req, res) => {
   res.render('librarian/issuebooks');
}

indexController.fetchstudent = async (req, res) => {
   try {
      const { branchId } = req.params;
      const records = await UserModal.findAll({ where: { branchId: branchId } });
      res.json({ message: 'Data Fetched ', records: records });
   } catch (e) {
      res.json({ message: e.message, records: [] });

   }
}

indexController.fetchbook = async (req, res) => {
   try {
      const { categoryId } = req.params;
      const records = await book.findAll({ where: { categoryId: categoryId, status: 'Available' } });
      res.json({ message: 'Data Fetched ', records: records });
   } catch (e) {
      res.json({ message: e?.message, records: [] });
   }
}

indexController.submitFinePayment = async (req, res) => {

    const t = await sequelize.transaction();

    try {

        const { issueId, paymentMode, transactionId } = req.body;

        /* -----------------------------
           1. Validate input
        ----------------------------- */

        if (!issueId || !paymentMode) {
            await t.rollback();
            return res.json({
                error: true,
                message: "Issue ID and payment mode are required"
            });
        }

        /* -----------------------------
           2. Find issue record
        ----------------------------- */

        const issueRecord = await issueBook.findByPk(issueId, {
            transaction: t,
            lock: true
        });

        if (!issueRecord) {
            await t.rollback();
            return res.json({
                error: true,
                message: "Issue record not found"
            });
        }

        if (issueRecord.status !== 'Overdue') {
            await t.rollback();
            return res.json({
                error: true,
                message: "Fine payment is not required for this record"
            });
        }

        if (issueRecord.finePaid === true) {
            await t.rollback();
            return res.json({
                error: true,
                message: "Fine already paid"
            });
        }

        /* -----------------------------
           3. Update issue record
        ----------------------------- */

        await issueBook.update(
            {
                finePaid: true,
                paymentMode: paymentMode,
                transactionId: transactionId || null,
                paidAt: new Date(),
                returnedAt: new Date(),
                status: 'Returned'
            },
            {
                where: { id: issueId },
                transaction: t
            }
        );

        /* -----------------------------
           4. Update book status
        ----------------------------- */

        await book.update(
            { status: 'Available' },
            {
                where: { id: issueRecord.bookId },
                transaction: t
            }
        );

        /* -----------------------------
           5. Commit transaction
        ----------------------------- */

        await t.commit();

        return res.json({
            error: false,
            message: "Fine payment completed and book returned successfully"
        });

    } catch (e) {

        await t.rollback();

        return res.json({
            error: true,
            message: e.message || "Internal Server Error"
        });
    }
};

indexController.returnBookHandler = async (req, res) => {

   const t = await sequelize.transaction();

   try {

      const { issueId } = req.body;

      /* -----------------------------
         1. Validate input
      ----------------------------- */

      if (!issueId) {
         await t.rollback();
         return res.json({
            error: true,
            message: "Issue ID is required"
         });
      }

      /* -----------------------------
         2. Find issue record
      ----------------------------- */

      const issueRecord = await issueBook.findByPk(issueId, {
         transaction: t,
         lock: true
      });

      if (!issueRecord) {
         await t.rollback();
         return res.json({
            error: true,
            message: "Issue record not found"
         });
      }

      if (issueRecord.status === 'Returned') {
         await t.rollback();
         return res.json({
            error: true,
            message: "Book already returned"
         });
      }

      /* -----------------------------
         3. Check overdue
      ----------------------------- */

      const today = new Date();
      const dueDate = new Date(issueRecord.dueDate);

      let fineAmount = 0;

      if (today > dueDate) {

         const diffTime = today - dueDate;
         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

         const finePerDay = 10; // ₹10 per day

         fineAmount = diffDays * finePerDay;

         /* -----------------------------
            4. Update issue record as Overdue
         ----------------------------- */

         await issueBook.update(
            {
               status: 'Overdue',
               fineAmount: fineAmount
            },
            {
               where: { id: issueId },
               transaction: t
            }
         );

         await t.commit();

         return res.json({
            error: false,
            message: "Book is overdue. Collect fine before completing return.",
            fineAmount: fineAmount
         });
      }

      /* -----------------------------
         5. No fine → complete return
      ----------------------------- */

      await issueBook.update(
         {
            returnedAt: today,
            status: 'Returned'
         },
         {
            where: { id: issueId },
            transaction: t
         }
      );

      /* -----------------------------
         6. Update book status
      ----------------------------- */

      await book.update(
         { status: 'Available' },
         {
            where: { id: issueRecord.bookId },
            transaction: t
         }
      );

      /* -----------------------------
         7. Commit transaction
      ----------------------------- */

      await t.commit();

      return res.json({
         error: false,
         message: "Book returned successfully",
         fineAmount: 0
      });

   } catch (e) {

      await t.rollback();

      return res.json({
         error: true,
         message: e.message || "Internal Server Error"
      });
   }
};

indexController.issueBookHandler = async (req, res) => {
   const t = await sequelize.transaction();

   try {

      const { userId, bookId, issuedate, returndate } = req.body;

      /* -----------------------------
         1. Validate input
      ----------------------------- */

      if (!userId || !bookId || !issuedate || !returndate) {
         await t.rollback();
         return res.json({
            error: true,
            message: "All fields are required"
         });
      }

      if (new Date(returndate) <= new Date(issuedate)) {
         await t.rollback();
         return res.json({
            error: true,
            message: "Return date must be after issue date"
         });
      }


      /* -----------------------------
         2. Check student
      ----------------------------- */

      const student = await UserModal.findByPk(userId, { transaction: t });

      if (!student) {
         await t.rollback();
         return res.json({
            error: true,
            message: "Student not found"
         });
      }


      /* -----------------------------
         3. Check student issue limit
      ----------------------------- */

      const issuedCount = await issueBook.count({
         where: {
            userId,
            status: 'Issued'
         },
         transaction: t
      });

      if (issuedCount >= 3) {
         await t.rollback();
         return res.json({
            error: true,
            message: "Student already has maximum allowed issued books"
         });
      }


      /* -----------------------------
         4. Check book with lock
      ----------------------------- */

      const bookRecord = await book.findByPk(bookId, {
         transaction: t,
         lock: true
      });

      if (!bookRecord) {
         await t.rollback();
         return res.json({
            error: true,
            message: "Book not found"
         });
      }

      if (bookRecord.status !== 'Available') {
         await t.rollback();
         return res.json({
            error: true,
            message: "Book is not available"
         });
      }


      /* -----------------------------
         5. Prevent duplicate issue
      ----------------------------- */

      const alreadyIssued = await issueBook.findOne({
         where: {
            userId,
            bookId,
            status: 'Issued'
         },
         transaction: t
      });

      if (alreadyIssued) {
         await t.rollback();
         return res.json({
            error: true,
            message: "This book is already issued to this student"
         });
      }


      /* -----------------------------
         6. Create issue record
      ----------------------------- */

      await issueBook.create({
         userId,
         bookId,
         issuedAt: issuedate,
         dueDate: returndate,
         status: 'Issued'
      }, { transaction: t });


      /* -----------------------------
         7. Update book status
      ----------------------------- */

      await book.update(
         { status: 'Issued' },
         {
            where: { id: bookId },
            transaction: t
         }
      );


      /* -----------------------------
         8. Commit transaction
      ----------------------------- */

      await t.commit();

      return res.json({
         error: false,
         message: "Book Issued Successfully"
      });

   } catch (e) {

      await t.rollback();

      return res.json({
         error: true,
         message: e.message || "Internal Server Error"
      });
   }
};

indexController.issuedata = async (req, res) => {
   try {
      const records = await issueBook.findAll({
         // where: {
         //    status: {
         //       [Sequelize.Op.in]: ['Issued', 'Overdue']
         //    }
         // },
         include: [
            {
               model: book,
               attributes: ['id', 'title']
            },
            {
               model: UserModal,
               attributes: ['id', 'name']
            }
         ],
         order: [['id', 'DESC']]
      });

      res.json({ message: 'Issued Books Fetched', records });
   } catch (e) {
      console.log('----> Error: ', e?.message)
      res.json({ error: true, message: e.message, records: [] });
   }
}

indexController.return = async (req, res) => {
   try {
      var { id } = req.params;
      await transaction.update(req.body, { where: { id: id } });
      res.json({ message: 'record updated' });

   } catch (e) {
      res.json({ message: e.message });

   }

}

indexController.changestatus = async (req, res) => {
   try {
      var { id } = req.params;
      await book.update(req.body, { where: { id: id } });
      res.json({ message: 'record updated' });

   } catch (e) {
      res.json({ message: e.message });

   }

}


indexController.changestatus2 = async (req, res) => {
   try {
      var { bookId } = req.params;
      console.log(bookId)
      await book.update(req.body, { where: { id: bookId } });
      res.json({ message: 'record updated' });

   } catch (e) {
      res.json({ message: e.message });

   }

}




indexController.renderchangepassPage = (req, res) => {
   res.render('librarian/changepass');
}


indexController.updatepass = async (req, res) => {
   try {

      var { email, password, newpassword } = req.body;
      var record = await librarian.findAll({ where: { email: email, password: password } });
      if (record.length > 0) {

         await librarian.update({ password: newpassword }, { where: { email: email } });
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

indexController.selectrole =(req, res) => {
    res.render('select-role');
};

indexController.searchBooks = async (req, res) => {
    const query = req.query.query;

    const books = await book.findAll({
        where: {
            title: {
                [Op.like]: `%${query}%`
            }
        }
    });

    res.render("search", { books, query });
};


indexController.rendersearch = (req, res) => {
   res.render('search');
}

indexController.logoutlib = (req, res) => {
   //console.log("hello ")
   res.clearCookie('librarianToken');
   //  res.json({error: false, message: "login successful"});
   res.redirect('/');
}


indexController.renderAllBooks = async (req, res) => {
    try {

        const categories = await addcategory.findAll({
            include: [{
                model: book
            }]
        });

        res.render('allbooks', { categories });

    } catch (e) {
        console.log(e);
        res.render('allbooks', { categories: [] });
    }
};

indexController.sendEmail = async (req, res) => {
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




module.exports = indexController;