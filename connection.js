const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'node_library_management'
};

const connection = mysql.createConnection(config);

connection.connect((error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("databade connected");
    }
});

module.exports = connection;