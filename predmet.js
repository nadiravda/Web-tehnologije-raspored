const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Predmet =
        sequelize.define('predmet', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            naziv: { type: Sequelize.STRING }
        })
    return Predmet;
};