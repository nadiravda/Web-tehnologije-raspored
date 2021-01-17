const express = require('express');
const aplikacija = express();
const port = 3000;

const bodyParser = require('body-parser');
aplikacija.use(bodyParser.json());
aplikacija.use(bodyParser.urlencoded({extended: true}));
aplikacija.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


const sequelize = require('sequelize');
const db = require('./baza.js');


// db.aktivnost.sync();
// db.student.sync();
// db.predmet.sync();
// db.grupa.sync();
// db.aktivnost.sync();
// db.dan.sync();
// db.tip.sync();


// post predmet
aplikacija.post('/v2/predmet', function (req, res) {

    const sarma =  db.predmet.create({ naziv:req.body['naziv']}).then
    (function(zapis){res.send(zapis);}).catch
    (function(err){ res.send("greska") });
    console.log(sarma)

});

// get svi predmeti
aplikacija.get("/v2/predmet",function(req,res){
    db.predmet.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});

// get odredjen predmet
aplikacija.get("/v2/predmet/:naziv",function(req,res){
    db.predmet.findOne({ where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });
});

// post tip
aplikacija.post('/v2/tip', function (req, res) {

    const sarma =  db.tip.create({ naziv:req.body['naziv']}).then
    (function(zapis){res.send(zapis);}).catch
    (function(err){ res.send("greska") });
    console.log(sarma)

});

// get svi tipovi
aplikacija.get("/v2/tip",function(req,res){
    db.tip.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});

// get odredjen tip
aplikacija.get("/v2/tip/:naziv",function(req,res){
    db.tip.findOne({ where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });
});

// post dan
aplikacija.post('/v2/dan', function (req, res) {

    const sarma =  db.dan.create({ naziv:req.body['naziv']}).then
    (function(zapis){res.send(zapis);}).catch
    (function(err){ res.send("greska") });
    console.log(sarma)

});

// get svi dani
aplikacija.get("/v2/dan",function(req,res){
    db.dan.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});

// get odredjen dan
aplikacija.get("/v2/dan/:naziv",function(req,res){
    db.dan.findOne({ where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });
});


// post grupa
aplikacija.post('/v2/grupa', function (req, res) {

    const sarma =  db.grupa.create({ naziv:req.body['naziv'],predmetId:req.body['predmetId']}).then
    (function(zapis){res.send(zapis);}).catch
    (function(err){ res.send("greska") });
    console.log(sarma)

});

// get svi grupe
aplikacija.get("/v2/grupa",function(req,res){
    db.grupa.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});

// get odredjenu grupu
aplikacija.get("/v2/grupa/:naziv",function(req,res){
    db.grupa.findOne({ where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });
});

// post student
aplikacija.post('/v2/student', function (req, res) {

    const sarma =  db.student.create({
        naziv: req.body['naziv'],
        index: req.body['index']}).then
    (function(zapis){res.send(zapis);}).catch
    (function(err){ res.send("greska") });
    console.log(sarma)

});

// get svi studenti
aplikacija.get("/v2/student",function(req,res){
    db.student.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});

// get odredjen student
aplikacija.get("/v2/student/:id",function(req,res){
    db.student.findOne({ where: {id: req.params.id} }).then(function(rezultat){
        res.send(rezultat);
    });
});

// post aktivnost
aplikacija.post('/v2/aktivnost', function (req, res) {

    const sarma =  db.aktivnost.create({
        naziv: req.body['naziv'],
        pocetak: req.body['pocetak'],
        kraj: req.body['kraj'],
        predmetId: req.body['predmetId'],
        tipId: req.body['tipId'],
        danId: req.body['danId'],
        grupaId: req.body['grupaId']
    }).then
    (function(zapis){res.send(zapis);}).catch
    (function(err){ res.send("greska") });
    console.log(sarma)

});

// get sve aktivnosti
aplikacija.get("/v2/aktivnost",function(req,res){
    db.aktivnost.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});

// get odredjen aktivnost
aplikacija.get("/v2/aktivnost/:id",function(req,res){
    db.aktivnost.findOne({ where: {id: req.params.id} }).then(function(rezultat){
        res.send(rezultat);
    });
});

// put predmet

aplikacija.put('/v2/predmet/:naziv', function (req, res) {

    db.predmet.update(
        {naziv: req.body.naziv},
        {where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });

});

// put tip
aplikacija.put('/v2/tip/:naziv', function (req, res) {

    db.tip.update(
        {naziv: req.body.naziv},
        {where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });

});

// put dan
aplikacija.put('/v2/dan/:naziv', function (req, res) {

    db.dan.update(
        {naziv: req.body.naziv},
        {where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });

});

// put grupa
aplikacija.put('/v2/grupa/:naziv', function (req, res) {

    db.grupa.update(
        {naziv: req.body.naziv,
         predmetId: req.body.predmetId},
        {where: {naziv: req.params.naziv} }).then(function(rezultat){
        res.send(rezultat);
    });

});

// put student
aplikacija.put('/v2/tip/:id', function (req, res) {

    db.tip.update(
        {naziv: req.body.naziv,
         index: req.body.index },
        {where: {id: req.params.id} }).then(function(rezultat){
        res.send(rezultat);
    });

});

// put aktivnost
aplikacija.put('/v2/aktivnost/:id', function (req, res) {

    db.aktivnost.update(
        {naziv: req.body.naziv,
         pocetak: req.body.pocetak,
         kraj: req.body.kraj,
            predmetId: req.body.predmetId,
            tipId: req.body.tipId,
            danId: req.body.danId,
            grupaId: req.body.grupaId},
        {where: {id: req.params.id} }).then(function(rezultat){
        res.send(db.aktivnost.findAll({where:{id: req.params.id}}));
    });
});

// delete predmet

aplikacija.delete("/v2/predmet/:id",function(req,res){
    db.predmet.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.status(200).json({poruka:"uspjesno obrisano"})
        }
    }, function(err){
        console.log(err);
    });

});

// grupa delete
aplikacija.delete("/v2/grupa/:id",function(req,res){
    db.grupa.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.status(200).json({poruka:"uspjesno obrisano"})
        }
    }, function(err){
        console.log(err);
    });
});

// dan delete
aplikacija.delete("/v2/dan/:id",function(req,res){
    db.dan.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.status(200).json({poruka:"uspjesno obrisano"})
        }
    }, function(err){
        console.log(err);
    });
});

// tip delete
aplikacija.delete("/v2/tip/:id",function(req,res){
    db.tip.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.status(200).json({poruka:"uspjesno obrisano"})
        }
    }, function(err){
        console.log(err);
    });
});

// grupa student
aplikacija.delete("/v2/student/:id",function(req,res){
    db.student.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.status(200).json({poruka:"uspjesno obrisano"})
        }
    }, function(err){
        console.log(err);
    });
});

// aktivnost delete
aplikacija.delete("/v2/aktivnost/:id",function(req,res){
    db.aktivnost.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.status(200).json({poruka:"uspjesno obrisano"})
        }
    }, function(err){
        console.log(err);
    });
});


// ruta za drugi zadatak VEDO ZAKOMENTARISAO AVDINU FUNKCIJU


aplikacija.post('/upisStudenta', function (req, res) {

    let student = req.body.sve;
    let fajl = student.toString().split("\n");
    var fajl1 = fajl.filter(el => el.trim());

    let studentiSvi = new Array();
    let duzina = fajl1.length;
    let i = 0;
    while(duzina>0){
        let a = fajl1[i].split(",");
        let student = { ime : a[0], index : a[1] };
        studentiSvi.push(student);
        duzina--;
        i++;
    }
    console.log(studentiSvi)
    let poruka = [];
    let grupaId = Number.parseInt(req.body.grupaId);
    db.student.findAll({include:[db.grupa]}).then((modelStudenti) =>{

        db.grupa.findAll().then((sveGrupe) => {
            let grupa = sveGrupe.find(gr =>gr.id === grupaId);
            let sviStudentiPostoje = studentiSvi.filter((student) => {
                let ima = false
                modelStudenti.forEach((a) => {
                    if(a.ime === student.ime && a.index === student.index){
                        ima = true
                    }
                })
                return ima
            })
            let studentiIndex = studentiSvi.filter((student) => {
                let ima = false
                modelStudenti.forEach((a) => {
                    if(a.ime !== student.ime && a.index === student.index){
                        ima = true
                    }
                })
                return ima
            })
            const nemaStudenta = studentiSvi.filter((student) => {
                let ima = false
                modelStudenti.forEach((a) => {
                    if(a.ime !== student.ime && a.index !== student.index){
                        ima = true
                    }
                })
                return ima
            })

            if(sviStudentiPostoje.length === studentiSvi.length){
                poruka = "Svi studenti postoje" // ako je izmjenjena grupa provjeri i to
                res.status(200).json({message: poruka});

            }
            else if(nemaStudenta.length === studentiSvi.length && studentiIndex.length === 0){
                dajStudente(nemaStudenta, grupa).then(() => {
                    res.status(200).json({message: poruka})
                })

            }
            else{
                sviStudentiPostoje.forEach((student) => {
                    poruka.push('Student ' + student.ime + 'nije kreiran jer student vec postoji')
                    console.log("AAAAAAA")
                })
                studentiIndex.forEach((student) => {
                    poruka.push('Student ' + student.ime + ' sa indexom ' + student.index + ' postoji,' +
                        'nije upisan.')
                })
                const upisani = sviStudentiPostoje.filter( (student) => {
                    return studentiIndex.indexOf(student) === -1
                })
                dajStudente(upisani, grupa).then(() => {
                    res.status(200).json({message: poruka})
                })

            }

        })

    })

});

let dajStudente = async (upisaniStudenti, grupa) => {
    upisaniStudenti.forEach((student) => {
        db.student.create({
            ime: student.ime,
            index: student.index
        }).then((s) => {
            s.addGrupa(grupa)
        }).catch((err) => {
            console.log('Greska !.')
            console.log(err)
        })
    })
}




aplikacija.use(express.static(__dirname));
aplikacija.listen(port);