module.exports = (sequelize, Sequelize) => {
    return sequelize.define('purchases', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: Sequelize.INTEGER,
        book_id: Sequelize.INTEGER,
        payment_status: Sequelize.STRING,
        access_type: Sequelize.STRING,
        transaction_id: Sequelize.INTEGER
    }, {
        tableName: 'purchases',
        timestamps: false   // 🔥 IMPORTANT FIX
    });
};