module.exports = (sequelize, Sequelize) => {
    var librarian = sequelize.define('librarian', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        gender: { type: Sequelize.STRING },
        date: { type: Sequelize.DATE },
        status: { type: Sequelize.STRING, defaultValue: 'Active' }

    });
    return librarian;
}