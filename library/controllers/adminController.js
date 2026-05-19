const jwt = require('jsonwebtoken');
const { Sequelize, where } = require("sequelize");
const nodemailer = require('nodemailer');
// const { logger } = require("sequelize/lib/utils/logger");

const db = require('../db.config');
var AdminModel = db.admin;
var AddCategory = db.addcategory;
var librarian = db.librarian;
var UserModal = db.user;
var degree = db.degree;
var course = db.course;
var branch = db.branch;

var jwt_secret = 'abcd#123';


var adminController = {};

adminController.createNewlibrarian = async (req, res) => {
    try {
        await librarian.create(req.body);
        res.json({ error: false, message: "Data Added Successfully" });

    } catch (e) {
        res.json({ error: true, message: e.message }); l̥
    }
}

adminController.rendersignupPage = (req, res) => {
    res.render('admin/signupAdmin');
}

adminController.createNewAdmin2 = async (req, res) => {
    try {
        await AdminModel.create(req.body);
        //res.redirect('/admin/dashboard');
        res.json({ error: false, message: "Data Added Successfully" });

    } catch (e) {
        res.json({ error: true, message: e.message });

    }
}

adminController.renderSigninPage = (req, res) => {
    res.render('admin/signinAdmin');
}

adminController.rendercreate = (req, res) => {
    res.render('admin/create');
}

adminController.logindata = async (req, res) => {
    try {
        var { email, password } = req.body;
        var records = await AdminModel.findAll({ where: { email: email, password: password } });
        // console.log(records);
        // console.log(records.length);
        if (records.length > 0) {
            var payload = {
                id: records[0].id,
                name: records[0].name,
                email: records[0].email
            };
            var token = jwt.sign(payload, jwt_secret, { expiresIn: '2h' });
            res.cookie('adminToken', token);
            res.json({ message: 'Data Fetched ', error: false });
        } else {
            res.json({ error: true, message: 'Data Not Matched' });
        }

    } catch (e) {
        res.json({ message: e.message, error: true });

    }
}


adminController.createUser = async (req, res) => {

    try {

        console.log(req.body);

        await UserModal.create(req.body);

        res.json({
            error: false,
            message: "Account Created Successfully"
        });

    } catch (e) {

        console.log(e);

        res.json({
            error: true,
            message: e.message
        });

    }

}

// adminController.createUser = async (req, res) => {

//     try {

//         await db.user.create({

//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             gender: req.body.gender,
//             address: req.body.address,
//             mobile: req.body.mobile,
//             city: req.body.city,
//             state: req.body.state,
//             zip: req.body.zip,
//             degree: req.body.degree,
//             course: req.body.course,
//             branch: req.body.branch

//         });

//         res.json({

//             error: false,
//             message: "Account Created Successfully"

//         });

//     } catch (e) {

//         res.json({

//             error: true,
//             message: e.message

//         });

//     }

// }

adminController.renderprofilePage = (req, res) => {
    // var name = req.admin.name;
    res.render('admin/profile', { name: req.admin.name });
}

adminController.renderaddcategoryPage = (req, res) => {
    res.render('admin/addcategory', { name: req.admin.name });
}

adminController.addbookcategory = async (req, res) => {
    try {
        var name = req.body.name;
        var record = await AddCategory.findAll({ where: { name: name } });
        if (record.length > 0) {
            res.json({ error: true, message: "Data already exists" });
        } else {
            await AddCategory.create(req.body);
            res.json({ error: false, message: "Data Added Successfully" });
        }


    } catch (e) {
        res.json({ error: true, message: e.message });

    }
}
adminController.viewcategory = async (req, res) => {
    try {
        var records = await AddCategory.findAll({
            order: [['id', 'DESC']]
        });

        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.deletecategory = async (req, res) => {
    try {
        var { id } = req.params;
        await AddCategory.destroy({ where: { id: id } });
        res.json({ message: 'Record Deleted ' });
    } catch (e) {
        res.json({ message: e.message });

    }
}

adminController.renderaddbookPage = (req, res) => {
    res.render('admin/addbook');
}

adminController.rendermanagelibrarianPage = (req, res) => {
    res.render('admin/managelibrarian', { name: req.admin.name });
}

adminController.viewlibrariandata = async (req, res) => {
    try {
        // var records = await librarian.findAll();
        const records = await librarian.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'status',
                'gender',
                [
                    Sequelize.fn(
                        'DATE_FORMAT',
                        Sequelize.col('date'),
                        '%d-%m-%Y'
                    ),
                    'date'
                ]
            ],
            order: [['id', 'DESC']]
        });

        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });
    }
}

adminController.deactivate = async (req, res) => {
    try {
        var { id } = req.params;
        await librarian.update(req.body, { where: { id: id } });
        res.json({ message: 'record updated' });

    } catch (e) {
        res.json({ message: e.message });

    }

}


adminController.activate = async (req, res) => {
    try {
        var { id } = req.params;
        await librarian.update(req.body, { where: { id: id } });
        res.json({ message: 'record updated' });

    } catch (e) {
        res.json({ message: e.message });

    }

}


// adminController.renderuserviewPage = (req, res) => {
//     res.render('admin/viewuser');
// }

adminController.viewuserdata = async (req, res) => {
    try {
        var records = await UserModal.findAll(
            {
                include: [
                    {
                        model: branch,
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
//
// adminController.deactivateuser = async (req, res) => {
//     try {
//         var {id} = req.params;
//         await UserModal.update(req.body, {where: {id: id}});
//         res.json({message: 'record updated'});
//
//     } catch (e) {
//         res.json({message: e.message});
//
//     }
//
// }
//
//
// adminController.activateuser = async (req, res) => {
//     try {
//         var {id} = req.params;
//         await UserModal.update(req.body, {where: {id: id}});
//         res.json({message: 'record updated'});
//
//     } catch (e) {
//         res.json({message: e.message});
//
//     }
//
// }

adminController.renderdegreePage = (req, res) => {
    res.render('admin/degreetype', { name: req.admin.name });
}
adminController.adddegree = async (req, res) => {
    try {
        var name = req.body.name;
        var record = await degree.findAll({ where: { name: name } });
        if (record.length > 0) {
            res.json({ error: true, message: "Data already exists" });
        } else {
            await degree.create(req.body);
            res.json({ error: false, message: "Data Added Successfully" });
        }


    } catch (e) {
        res.json({ error: true, message: e.message });

    }
}
adminController.viewdegree = async (req, res) => {
    try {
        var records = await degree.findAll({
            order: [['id', 'DESC']]
        });

        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.deletedegree = async (req, res) => {
    try {
        var { id } = req.params;
        await degree.destroy({ where: { id: id } });
        res.json({ message: 'Record Deleted ' });
    } catch (e) {
        res.json({ message: e.message });

    }
}

adminController.rendercoursesPage = (req, res) => {
    res.render('admin/courses', { name: req.admin.name });
}

adminController.fetchdegree = async (req, res) => {
    try {
        var records = await degree.findAll();
        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.addcourse = async (req, res) => {
    try {
        var degreeId = req.body.degreeId;
        var name = req.body.name;
        var record = await course.findAll({ where: { name: name, degreeId: degreeId } });
        if (record.length > 0) {
            res.json({ error: true, message: "Data already exists" });
        } else {
            await course.create(req.body);
            res.json({ error: false, message: "Data Added Successfully" });
        }

    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}

adminController.viewcourse = async (req, res) => {
    try {
        var records = await course.findAll(
            {
                include: [
                    {
                        model: degree,
                        attributes: ['name']

                    }
                ],
                order: [['id', 'DESC']]
            }
        );

        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e?.message, records: [] });
    }
}

adminController.deletecourse = async (req, res) => {
    try {
        var { id } = req.params;
        await course.destroy({ where: { id: id } });
        res.json({ message: 'Record Deleted ' });
    } catch (e) {
        res.json({ message: e.message });

    }
}

adminController.renderbranchesPage = (req, res) => {
    res.render('admin/branches', { name: req.admin.name });
}

adminController.fetchcourse = async (req, res) => {
    try {
        var records = await course.findAll();
        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.addbranch = async (req, res) => {
    try {
        var courseId = req.body.courseId;
        var name = req.body.name;
        var record = await branch.findAll({ where: { name: name, courseId: courseId } });
        if (record.length > 0) {
            res.json({ error: true, message: "Data already exists" });
        } else {
            await branch.create(req.body);
            res.json({ error: false, message: "Data Added Successfully" });
        }

    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}

adminController.viewbranch = async (req, res) => {
    try {
        var records = await branch.findAll(
            {
                include: [
                    {
                        model: course,
                        attributes: ['name']

                    }
                ],
                order: [['id', 'DESC']]
            }
        );

        res.json({ message: 'Data Fetched ', records: records });
        // console.log(records);
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.delete = async (req, res) => {
    try {
        var { id } = req.params;
        await branch.destroy({ where: { id: id } });
        res.json({ message: 'Record Deleted ' });
    } catch (e) {
        res.json({ message: e.message });

    }
}

adminController.renderaddstudentPage = (req, res) => {
    res.render('admin/addstudent', { name: req.admin.name });
}


adminController.fetchcoursebyid = async (req, res) => {
    try {
        var { id } = req.params;
        var records = await course.findAll({ where: { degreeId: id } });
        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.fetchbranchbyid = async (req, res) => {
    try {
        var { id } = req.params;
        var records = await branch.findAll({ where: { courseId: id } });
        res.json({ message: 'Data Fetched ', records: records });
    } catch (e) {
        res.json({ message: e.message, records: [] });

    }
}

adminController.signupuser = async (req, res) => {
    try {
        console.log(req.files)
        var { name, email, password, mobile, gender, address, city, state, branchId } = req.body;
        var { photo } = req.files;
        var server_path = `public/user/${photo.name}`;
        var db_path = `/user/${photo.name}`;
        console.log(req.body);

        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({ error: true, message: error.message });
            } else {
                try {
                    req.body.photo = db_path;
                    await UserModal.create(req.body);
                    res.json({ message: 'Added Successfully' });
                } catch (e) {
                    res.json({ error: true, message: e.message });
                }
            }

        });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}

// email
adminController.sendEmail = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: 'dummymail2003s@gmail.com', // Your email address
                pass: 'uevludqlpergxtje', // uevludqlpergxtje
            },
        });

        // Email options
        const mailOptions = {
            from: 'Support',
            to: email, // Receiver's email
            subject: 'Subject: Your Account Has Been Created',
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

adminController.logoutadmin = (req, res) => {
    //console.log("hello ")
    res.clearCookie('adminToken');
    //  res.json({error: false, message: "login successful"});
    res.redirect('/');
}

adminController.renderpasswordPage = (req, res) => {
    res.render('admin/password');
}

adminController.updatepassword = async (req, res) => {
    try {

        var { email, password, newpassword } = req.body;
        var record = await AdminModel.findAll({ where: { email: email, password: password } });
        if (record.length > 0) {

            await AdminModel.update({ password: newpassword }, { where: { email: email } });
            res.json({ error: false, message: 'Password Changed Successfully' });

        } else {
            res.json({ error: true, message: 'Password or Email do not match' });
        }
    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}

module.exports = adminController;