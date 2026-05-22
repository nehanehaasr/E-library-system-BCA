module.exports = (sequelize, Sequelize) => {
    return sequelize.define('transaction', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER },
        bookId: { type: Sequelize.INTEGER },
        amount: { type: Sequelize.INTEGER }
    });
};