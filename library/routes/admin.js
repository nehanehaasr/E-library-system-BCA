var express = require('express');
var jwt = require('jsonwebtoken');

var jwt_secret = 'abcd#123';
var adminController = require('../controllers/adminController');
const userController = require("../controllers/userController");
const indexController = require("../controllers/indexController");

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function Authorize_admin(req, res, next) {
    const token = req.cookies.adminToken;

    if (!token) {
        return res.redirect('/admin/login');
    }

    try {
        req.admin = jwt.verify(token, jwt_secret);
        next();
    } catch (e) {
        res.redirect('/admin/login');
    }
}

function Authorize_admin_HTTP(req, res, next) {
    const token = req.cookies.adminToken;

    if (!token) {
        return res.json({ error: true, message: "ERROR" });
    }

    try {
        req.admin = jwt.verify(token, jwt_secret);
        next();
    } catch (e) {
        res.json({ error: true, message: "ERROR" });
    }
}



// ==== Create New Librarian ====
router.post('/librarian', adminController.createNewlibrarian);

// ==== Create New Admin ====
// router.get('/adminsignup', Authorize_admin, adminController.rendersignupPage);
// router.post('/signup', adminController.createNewAdmin2);

// ==== Login ====
router.get('/login', adminController.renderSigninPage);
router.post('/login', adminController.logindata);

router.get('/create', adminController.rendercreate);
router.post('/create', adminController.createUser);

// ==== Admin Dashboard ====
router.get('/profile', Authorize_admin, adminController.renderprofilePage);

// ==== Manage Category ====
router.get('/addcategory', Authorize_admin, adminController.renderaddcategoryPage);
router.post('/addbookcategory', adminController.addbookcategory);
router.get('/viewcategory', adminController.viewcategory);
router.delete("/deletecategory/:id", adminController.deletecategory);

router.get('/addbook', adminController.renderaddbookPage);

// router.get('/viewuser', adminController.renderuserviewPage);
// router.get('/viewuserdata', adminController.viewuserdata);
// router.put("/deactivateuser/:id",adminController.deactivateuser);
// router.put("/activateuser/:id",adminController.activateuser);

// ==== Manage Degree Type ====
router.get('/degreetype', Authorize_admin, adminController.renderdegreePage);
router.post('/adddegree', adminController.adddegree);
router.get('/viewdegree', adminController.viewdegree);
router.delete("/deletedegree/:id", adminController.deletedegree);

// ==== Manage Course ====
router.get('/courses', Authorize_admin, adminController.rendercoursesPage);
router.get('/fetchdegree', adminController.fetchdegree);
router.post('/addcourse', adminController.addcourse);
router.get('/viewcourse', adminController.viewcourse);
router.delete("/deletecourse/:id", adminController.deletecourse);

// ==== Manage Branch ====
router.get('/branches', Authorize_admin, adminController.renderbranchesPage);
router.get('/fetchcourse', adminController.fetchcourse);
router.post('/addbranch', adminController.addbranch);
router.get('/viewbranch', adminController.viewbranch);
router.delete("/delete/:id", adminController.delete);

// ==== Manage Librarian ====
router.get('/managelibrarian', Authorize_admin, adminController.rendermanagelibrarianPage);
router.get('/viewlibrariandata', adminController.viewlibrariandata);
router.put("/deactivate/:id", adminController.deactivate);
router.put("/activate/:id", adminController.activate);

// ==== Manage Student ====
router.get('/addstudent', Authorize_admin, adminController.renderaddstudentPage);
router.get('/fetchcoursebyid/:id', adminController.fetchcoursebyid);
router.get('/fetchbranchbyid/:id', adminController.fetchbranchbyid);

router.post('/signupuser', adminController.signupuser);
router.get('/viewuserdata', adminController.viewuserdata);
router.post("/sendEmail", adminController.sendEmail);

router.get('/password', adminController.renderpasswordPage);
router.put('/updatepassword', adminController.updatepassword);

router.get('/logoutadmin', Authorize_admin, adminController.logoutadmin)

module.exports = router;