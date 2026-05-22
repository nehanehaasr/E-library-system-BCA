var Sequelize = require("sequelize");

var dbName = 'node_library_management';
var dbUser = 'root';
var dbPassword = 'system';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
   host: 'localhost',
   port: 3306,
   dialect: 'mysql',
   pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
   }
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* =======================
   MODELS
======================= */

db.admin = require('./models/Admin')(sequelize, Sequelize);
db.user = require('./models/userpg')(sequelize, Sequelize);
db.librarian = require('./models/librarianpg')(sequelize, Sequelize);
db.addcategory = require('./models/addcategory')(sequelize, Sequelize);
db.transaction = require('./models/transaction')(sequelize, Sequelize);
db.book = require('./models/book')(sequelize, Sequelize);
db.bookmark = require('./models/bookmark')(sequelize, Sequelize);
db.purchases = require('./models/purchases')(sequelize, Sequelize);

db.degree = require('./models/degreetype')(sequelize, Sequelize);
db.course = require('./models/course')(sequelize, Sequelize);
db.branch = require('./models/branch')(sequelize, Sequelize);

db.issueBook = require('./models/issuebooks')(sequelize, Sequelize);

/* =======================
   RELATIONSHIPS
======================= */

// ✅ Purchases रिलेशन (CLEAN VERSION)

// User → Purchases
db.user.hasMany(db.purchases, { foreignKey: 'user_id' });
db.purchases.belongsTo(db.user, { foreignKey: 'user_id' });

// Book → Purchases
db.book.hasMany(db.purchases, { foreignKey: 'book_id' });
db.purchases.belongsTo(db.book, { foreignKey: 'book_id' });

// Transaction → Purchases
db.transaction.hasMany(db.purchases, { foreignKey: 'transaction_id' });
db.purchases.belongsTo(db.transaction, { foreignKey: 'transaction_id' });

// purchases.belongsTo(db.book, { foreignKey: 'book_id' });
// book.hasMany(db.purchases, { foreignKey: 'book_id' });

db.user.hasMany(db.bookmark, { foreignKey: 'user_id' });
db.bookmark.belongsTo(db.user, { foreignKey: 'user_id' });

db.book.hasMany(db.bookmark, { foreignKey: 'book_id' });
db.bookmark.belongsTo(db.book, { foreignKey: 'book_id' });

db.user.hasMany(db.purchases, { foreignKey: 'user_id' });
db.purchases.belongsTo(db.user, { foreignKey: 'user_id' });

db.book.hasMany(db.purchases, { foreignKey: 'book_id' });
db.purchases.belongsTo(db.book, { foreignKey: 'book_id' });

db.transaction.hasMany(db.purchases, { foreignKey: 'transaction_id' });
db.purchases.belongsTo(db.transaction, { foreignKey: 'transaction_id' });

/* Category → Books */
db.addcategory.hasMany(db.book, { foreignKey: 'categoryId' });
db.book.belongsTo(db.addcategory, { foreignKey: 'categoryId' });

/* Degree → Course */
db.degree.hasMany(db.course, { foreignKey: 'degreeId' });
db.course.belongsTo(db.degree, { foreignKey: 'degreeId' });

/* Course → Branch */
db.course.hasMany(db.branch, { foreignKey: 'courseId' });
db.branch.belongsTo(db.course, { foreignKey: 'courseId' });

// User → Transaction
db.user.hasMany(db.transaction, { foreignKey: 'userId' });
db.transaction.belongsTo(db.user, { foreignKey: 'userId' });

// Book → Transaction
db.book.hasMany(db.transaction, { foreignKey: 'bookId' });
db.transaction.belongsTo(db.book, { foreignKey: 'bookId' });

/* Branch → Users (Students) */
db.branch.hasMany(db.user, { foreignKey: 'branchId' });
db.user.belongsTo(db.branch, { foreignKey: 'branchId' });

/* =======================
   ISSUE BOOK RELATIONS
======================= */

/* User → IssueBooks */
db.user.hasMany(db.issueBook, { foreignKey: 'userId' });
db.issueBook.belongsTo(db.user, { foreignKey: 'userId' });

/* Book → IssueBooks */
db.book.hasMany(db.issueBook, { foreignKey: 'bookId' });
db.issueBook.belongsTo(db.book, { foreignKey: 'bookId' });

/* Admin → IssueBooks (Audit) */
// db.admin.hasMany(db.issueBook, { foreignKey: 'issuedBy', as: 'IssuedBooks' });
// db.issueBook.belongsTo(db.admin, { foreignKey: 'issuedBy', as: 'IssuedByAdmin' });

// db.admin.hasMany(db.issueBook, { foreignKey: 'returnedBy', as: 'ReturnedBooks' });
// db.issueBook.belongsTo(db.admin, { foreignKey: 'returnedBy', as: 'ReturnedByAdmin' });

module.exports = db;
