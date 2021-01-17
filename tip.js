const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Tip =
        sequelize.define('tip', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            naziv: { type: Sequelize.STRING }
        })
    return Tip;
};