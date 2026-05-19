const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/userController');

var router = express.Router();
const jwt_secret1 = 'abcd#1234';

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

// function Authorize_user_HTTP(req, res, next) {
//     const token = req.cookies.userToken;

//     if (!token) {
//         return res.json({ error: true, message: "ERROR" });
//     }

//     try {
//         req.user = jwt.verify(token, jwt_secret);
//         next();
//     } catch (e) {
//         res.json({ error: true, message: "ERROR" });
//     }
// }

function Authorize_user_HTTP(req, res, next) {
    console.log("COOKIES:", req.cookies);

    const token = req.cookies.userToken;

    if (!token) {
        console.log("NO TOKEN FOUND");
        return res.json({ error: true, message: "ERROR" });
    }

    try {
        req.user = jwt.verify(token, jwt_secret1);
        console.log("USER VERIFIED:", req.user);
        next();
    } catch (e) {
        console.log("JWT ERROR:", e.message);
        res.json({ error: true, message: "ERROR" });
    }
}

// ===========================================
// ===========================================

// router.get('/usersignup', userController.renderusersignupPage);
// router.post('/signupuser', userController.signupuser);

// ==== Student Login ====
router.get('/login', userController.renderloginPage);
router.post('/login', userController.loginUser);

// ==== Student Dashboard ====
router.get('/dashboard', Authorize_user, userController.renderdashboardPage);
router.get('/dashboard-counts', Authorize_user, userController.userDashboardCounts);

// ==== Fetch Issued Books ====
router.get('/userbook', Authorize_user_HTTP, userController.userbook);

router.get('/userbooks', userController.renderuserbooks);
router.get('/userbookdata', Authorize_user, userController.userbookdata);

router.get('/available', userController.renderavailable);
router.get('/viewallbooks/:categoryId', Authorize_user, userController.viewallbooks);
// router.get('/viewallbooks/:categoryId', userController.viewallbooks);
router.get('/viewbooks', userController.viewbooks);

router.get('/payment/:id', userController.paymentPage);

// router.post("/email", userController.buybook);

router.post("/send-email", Authorize_user_HTTP, userController.sendEmail);


router.get('/download/:id', userController.downloadpdf);

router.get('/user/read',userController.renderreadpage)
router.get('/read/:id', Authorize_user, userController.read);

router.get('/changepassword', userController.renderchangepasswordPage);
router.put('/updatepassword', userController.updatepassword);


router.post("/bookmark", Authorize_user_HTTP, userController.saveBookmark);
router.get("/bookmark/:bookId", Authorize_user_HTTP, userController.getBookmark);

router.get('/logout', Authorize_user, userController.logout)

router.get('/test', (req, res) => {
    res.send("User route working");
});

// 📄 Purchase Page render
router.get('/purchase', Authorize_user ,userController.renderPurchasedPage);

// 📊 Purchased Books Data API
router.get('/purchased-data',Authorize_user, userController.getPurchasedBooks);

router.get('/create', Authorize_user, userController.rendercreate);


module.exports = router;
