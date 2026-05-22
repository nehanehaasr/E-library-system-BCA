module.exports = (sequelize, Sequelize) => {
    var admin = sequelize.define('admin', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING, defaultValue: 'Active' },
    });
    return admin;
}