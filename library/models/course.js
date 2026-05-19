module.exports =(sequelize , Sequelize) => {
    var course = sequelize.define('course', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false},
        degreeId: {type: Sequelize.INTEGER, allowNull: false, references: {model: 'degrees', key: 'id'}},
    });
    return course;
}