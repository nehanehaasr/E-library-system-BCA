module.exports =(sequelize , Sequelize) => {
    var degree = sequelize.define('degree', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false},
    });
    return degree;
}