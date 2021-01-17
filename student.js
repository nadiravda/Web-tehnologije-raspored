const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        ime: Sequelize.STRING,
        index: {type: Sequelize.STRING,
            unique: true}
    })
    return Student;
};