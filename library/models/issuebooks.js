module.exports = (sequelize, Sequelize) => {

    const IssueBook = sequelize.define('issue_books', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        /* -----------------------------
           Student Reference
        ----------------------------- */

        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        /* -----------------------------
           Book Reference
        ----------------------------- */

        bookId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },

        /* -----------------------------
           Issue & Return Dates
        ----------------------------- */

        issuedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },

        dueDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        returnedAt: {
            type: Sequelize.DATE,
            allowNull: true
        },

        /* -----------------------------
           Status Control
        ----------------------------- */

        status: {
            type: Sequelize.ENUM(
                'Issued',
                'Returned',
                'Overdue',
                'Lost'
            ),
            defaultValue: 'Issued'
        },

        /* -----------------------------
           Fine Details
        ----------------------------- */

        fineAmount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.00
        },

        finePaid: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        /* -----------------------------
           Payment Details
        ----------------------------- */

        paymentMode: {
            type: Sequelize.ENUM(
                'Cash',
                'UPI',
                'Card',
                'Online'
            ),
            allowNull: true
        },

        transactionId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        paidAt: {
            type: Sequelize.DATE,
            allowNull: true
        }

    }, {

        tableName: 'issue_books',
        timestamps: true,

        indexes: [
            { fields: ['userId'] },
            { fields: ['bookId'] },
            { fields: ['status'] },
            { fields: ['dueDate'] }
        ]
    });

    return IssueBook;
};