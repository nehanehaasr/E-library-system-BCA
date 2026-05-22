const express = require('express');
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

require("./cron/overdueCron");

const db = require("./db.config");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const indexRouter = require("./routes/indexroute");

const app = express();

app.set('view engine', 'ejs');


// app.use('/booksphoto', express.static('public/booksphoto'));

app.use(fileupload());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

db.sequelize.sync(); // this line will connect u with mysql database and will chk if the table we trying to make is already made othervise it will make it
// db.sequelize.sync({alter: true}); // this line will connect u with mysql database and will chk if the table we trying to make is already made othervise it will make it

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Server started on port " + port);
    }
});