
module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = require('sequelize');
    const Bookmark = sequelize.define("bookmark", {
        user_id: {
            type: Sequelize.INTEGER
        },
        book_id: {
            type: Sequelize.INTEGER
        },
        page_number: DataTypes.INTEGER
    }, {
        timestamps: false   // ✅ IMPORTANT
    });


return Bookmark;
};