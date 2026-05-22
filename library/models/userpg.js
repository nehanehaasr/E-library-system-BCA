module.exports = (sequelize, Sequelize) => {
    var user = sequelize.define('user', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        gender: { type: Sequelize.STRING },
        mobile: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        city: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        zip: { type: Sequelize.INTEGER },
        photo: { type: Sequelize.STRING },
        branchId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'branches', key: 'id' } },
        status: { type: Sequelize.STRING, defaultValue: 'Active' },
    });
    return user;
}