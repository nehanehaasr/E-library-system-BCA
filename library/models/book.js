module.exports = (sequelize, Sequelize) => {
    var book = sequelize.define('book', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING, allowNull: false },
        author: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, defaultValue: 'Available' },
        isbn: { type: Sequelize.STRING, allowNull: false },
        publisherName: { type: Sequelize.STRING, allowNull: false },
        publishYear: { type: Sequelize.STRING, allowNull: false },
        photo: { type: Sequelize.STRING },
        pdf: { type: Sequelize.STRING },
         paid: { type: Sequelize.INTEGER },
         price: { type: Sequelize.INTEGER },
        categoryId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'categories', key: 'id' } },
    });
    return book;
}