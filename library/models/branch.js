module.exports =(sequelize , Sequelize) => {
    var branch = sequelize.define('branch', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false},
        courseId: {type: Sequelize.INTEGER, allowNull: false, references: {model: 'courses', key: 'id'}},
    });
    return branch;
}