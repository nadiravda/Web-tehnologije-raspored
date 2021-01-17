const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('wt2017676', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const predmetModel = require('./predmet.js');
const aktivnostModel = require('./aktivnost.js');
const grupaModel = require('./grupa.js');
const studentModel = require('./student.js');
const danModel= require('./dan.js');
const tipModel= require('./tip.js');



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.predmet = predmetModel(sequelize,DataTypes);
db.aktivnost = aktivnostModel(sequelize,DataTypes);
db.grupa = grupaModel(sequelize,DataTypes);
db.student = studentModel(sequelize,DataTypes);
db.dan = danModel(sequelize,DataTypes);
db.tip = tipModel(sequelize,DataTypes);

//Predmet 1-N Grupa
db.predmet.hasMany(db.grupa, {foreignKey:{allowNull:false}});
db.grupa.belongsTo(db.predmet,{foreignKey:{allowNull:false}})

//Aktivnost N-1 Predmet
db.predmet.hasMany(db.aktivnost, {
    foreignKey: { allowNull: false}
})
db.aktivnost.belongsTo(db.predmet,{foreignKey:{allowNull:false}})


//Aktivnost N-0 Grupa
db.aktivnost.belongsTo(db.grupa);
db.grupa.hasMany(db.aktivnost);

//Aktivnost N-1 Dan
db.dan.hasMany(db.aktivnost, {
    foreignKey: {allowNull: false}
})
db.aktivnost.belongsTo(db.dan, {foreignKey:{allowNull:false}})


//Aktivnost N-1 Tip
db.tip.hasMany(db.aktivnost, {
    foreignKey: {allowNull: false}
})
db.aktivnost.belongsTo(db.tip, {foreignKey:{allowNull:false}})


//Student N-M Grupa
db.student.belongsToMany(db.grupa, { through: 'student_grupa'});
db.grupa.belongsToMany(db.student, { through: 'student_grupa'});
sequelize.sync({force:true}).then( async () => {
    const predmet1 = await db.predmet.create({naziv: 'WT'})


    const tip1 = await db.tip.create({naziv: 'Pred'})


    const dan1 = await db.dan.create({naziv: 'Ponedeljak'})


    const grupa1 = await db.grupa.create({naziv: 'Grupa', predmetId: predmet1.id})


    const student1 = await db.student.create({ime: 'Nadir Avdagic', index: '17676'})
    student1.addGrupa(grupa1)


    const aktivnost1 = await db.aktivnost.create({
        naziv: 'Aktivnost',
        pocetak: 11.20,
        kraj: 14.40,
        tipId: tip1.id,
        danId: dan1.id,
        predmetId: predmet1.id,
        grupaId: grupa1.id})


    console.log('Pokrenuto')
}).catch((err) => {
    console.error('Baza se ne moze pokrenuti', err)
})

module.exports = db;

