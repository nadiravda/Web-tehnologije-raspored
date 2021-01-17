const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Dan =
        sequelize.define('dan', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            naziv: { type: Sequelize.STRING }
        })
    return Dan;
};