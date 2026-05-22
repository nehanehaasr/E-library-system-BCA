const express = require('express');
const jwt = require('jsonwebtoken');

var db = require('../db.config');

var book = db.book;  

const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const jwt_secret = 'abcd#123';
const router = express.Router();

// const jwt_secret1 = 'abcd#1234';

// ===========================================
// ===========================================

function Authorize_user(req, res, next) {
    const token = req.cookies.userToken;
    console.log("COOKIE:", req.cookies);

    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        req.user = jwt.verify(token, jwt_secret1);
        next();
    } catch (e) {
        res.redirect('/user/login');
    }
}

function Authorize_user_HTTP(req, res, next) {
    console.log("COOKIES:", req.cookies);

    const token = req.cookies.userToken;

    if (!token) {
        console.log("NO TOKEN FOUND");
        return res.json({ error: true, message: "ERROR" });
    }

    try {
        req.user = jwt.verify(token, jwt_secret);
        console.log("USER VERIFIED:", req.user);
        next();
    } catch (e) {
        console.log("JWT ERROR:", e.message);
        res.json({ error: true, message: "ERROR" });
    }
}


function Authorize_librarian(req, res, next) {
    const token = req.cookies.librarianToken;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        req.indexroute = jwt.verify(token, jwt_secret);
        next();

    } catch (e) {
        res.redirect('/login');
    }
}

function Authorize_librarian_HTTP(req, res, next) {
    var token = req.cookies.librarianToken;
    if (!token) {
        res.json({ error: true, message: "ERROR" });
    } else {
        try {
            req.indexroute = jwt.verify(token, jwt_secret);
            next();

        } catch (e) {
            res.json({ error: true, message: "ERROR" });
        }
    }
}

// ===========================================
// ===========================================

// ==== Login Pages - Admin / Librarian / Student ====
router.get('/', indexController.renderIndexPage);

router.get('/select-role',indexController.selectrole);


// ==== Librarian Login ====
router.get('/login', indexController.renderlibloginPage);
router.post('/login', indexController.logindata);

// ==== Librarian Dashboard ====
router.get('/librariandashboard', Authorize_librarian, indexController.renderlibrariandashboardPage);

// ==== Manage Books ====
router.get('/addbook', Authorize_librarian, indexController.renderaddbookPage);
router.get('/fetchcategory', indexController.fetchcategories);
router.post('/addbookdata', indexController.addbookdata);
router.get('/viewsubcategory', indexController.viewsubcategory);
router.delete("/deletesubcategory/:bookId", indexController.deletesubcategory);

// ==== Issue Books ====
router.get('/issuebooks', Authorize_librarian, indexController.renderissuebooksPage);
router.post('/issuebooks', indexController.issueBookHandler);

// ==== Return Book ====
router.post('/returnbook', indexController.returnBookHandler);

// ==== Fine Payment ====
router.post('/submitFinePayment', indexController.submitFinePayment);

// ==== Fetch Issued Books ====
router.get('/issuedata', indexController.issuedata);

// ==== Fetch Book by Category of Book ====
router.get('/fetchbook/:categoryId', indexController.fetchbook);

// ==== Fetch Student by Branch Id ====
router.get('/fetchstudent/:branchId', indexController.fetchstudent);

router.put("/return/:id", indexController.return);
router.put("/changestatus/:id", indexController.changestatus);
router.put("/changestatus2/:bookId", indexController.changestatus2);

router.get('/changepass', indexController.renderchangepassPage);
router.put('/updatepass', indexController.updatepass);

router.get('/logoutlib', Authorize_librarian, indexController.logoutlib)



router.get("/search", indexController.searchBooks);

router.get('/fetchcategory', indexController.fetchcategories);

router.get('/category/:id', async (req, res) => {
    const id = req.params.id;

    const books = await book.findAll({
        where: { categoryId: id }
    });

    res.render('categorybooks', { books });
});

router.get('/categorybooks/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const books = await book.findAll({
            where: { categoryId: categoryId }
        });

        res.render('categorybook', { books });

    } catch (e) {
        console.log(e.message);
        res.render('categorybook', { books: [] });
    }
});


router.get('/books', indexController.renderAllBooks);

router.post("/send-email", Authorize_user_HTTP, indexController.sendEmail);

router.get("/buy/:bookId", Authorize_user, userController.buyBook);
router.get("/download/:bookId", Authorize_user, userController.downloadBook);



module.exports = router;