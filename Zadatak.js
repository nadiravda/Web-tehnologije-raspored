const express = require('express');
const aplikacija = express();
const fs = require('fs');
const port = 3000;

const bodyParser = require('body-parser');

 aplikacija.use(bodyParser.json());
 aplikacija.use(bodyParser.urlencoded({ extended: true }));



// Get aktivnosti

aplikacija.get('/aktivnosti', function (req, res) {

    fs.readFile('aktivnosti.txt', (error, data) => {

        let fajl = data.toString().split("\n");
        let aktivnosti = new Array();
        let duzina =fajl.length;
        let i = 0;
        while(duzina>0){
            let a = fajl[i].split(",");
            if(a.length<2){
                break;
            }
            let aktivnost = { naziv : a[0], tip : a[1], pocetak : a[2], kraj : a[3], dan : a[4].replace(/\n|\r/g, '') };
            aktivnosti.push(aktivnost);
            duzina--;
            i++;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(aktivnosti));
    });

})

// GET predmeti

aplikacija.get('/predmeti', function (req, res) {

    fs.readFile('predmeti.txt', (error, data) => {

        let fajl = data.toString().split("\n");
        let aktivnosti = new Array();
        let duzina =fajl.length;
        let i = 0;
        while(duzina>0){
            let a = fajl[i]
            if(a === ""){
                break;
            }
            let aktivnost = { naziv : a.replace(/\n|\r/g, '') };
            aktivnosti.push(aktivnost);
            duzina--;
            i++;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(aktivnosti));
    });
})


// GET predmet odredjen
aplikacija.get('/predmet/:naziv/aktivnost/', function (req, res) {

    fs.readFile('aktivnosti.txt', (error, data) => {

        let fajl = data.toString().split("\n");
        let aktivnosti = new Array();
        let naziviAktivnosti = new Array();
        let duzina =fajl.length;
        let i = 0;
        while(duzina>0){
            let a = fajl[i].split(",");
            if(a.length<2){
                break;
            }
            let naziv =  a[0];
            let aktivnost = { naziv : a[0], tip : a[1], pocetak : a[2], kraj : a[3], dan : a[4].replace(/\n|\r/g, '') };
            aktivnosti.push(aktivnost);
            naziviAktivnosti.push(naziv);
            duzina--;
            i++;
        }

        let poslaniNaziv = req.params.naziv;
        if(!naziviAktivnosti.includes(poslaniNaziv)){
            res.json({message: "Naziv predmeta ne postoji!"})
        }
        else {

            let noviNiz = aktivnosti.filter((obj) => {
                return obj.naziv === poslaniNaziv
            })

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(noviNiz));
        }
    });

})



    aplikacija.post('/predmet',function(req,res){

        let pred = req.body;
        let fajl = fs.readFileSync('predmeti.txt').toString().split("\n");
        let noviRed = pred['naziv'] + "\n";
        if(!fajl.includes(pred['naziv'])){

            fs.appendFile('predmeti.txt', noviRed ,function(err){
                if(err) throw err;
                res.json({message:"Uspješno dodan predmet!"});
            });
        }
        else {
            res.json({message: "Naziv predmeta postoji!"})
        }
    });

        //POST aktivnosti



    aplikacija.post('/aktivnost',function(req,res){

        let fajl = fs.readFileSync('aktivnosti.txt').toString().split("\n");
        let pred = req.body;
        let proslo = true;

        if(Number.parseInt(pred['pocetak']) < 8 || Number.parseInt(pred['kraj']) > 24 || Number.parseInt(pred['pocetak'])>Number.parseInt(pred['kraj']) ){
            proslo = false;
        }

        for(i = 0; i<fajl.length; i++){
            let nizina = fajl[i].split(',');
            if(nizina[4] === pred['dan'] && !((Number.parseInt(pred['pocetak'])<=Number.parseInt(nizina[2])  && Number.parseInt(pred['kraj'])<=Number.parseInt(nizina[2])) || (Number.parseInt(pred['pocetak'])>=Number.parseInt(nizina[3])  && Number.parseInt(pred['kraj'])>=Number.parseInt(nizina[3]))) ) {
                proslo = false;
            }
        }



        if(proslo === true) {
            let noviRed = pred['naziv'] + "," + pred['tip'] + "," + pred['pocetak'] + "," + pred['kraj'] + "," + pred['dan'] + "\n";
            fs.appendFile('aktivnosti.txt', noviRed, function (err) {
                if (err) throw err;
                res.json({message: "Uspješno dodan predmet!"});
            });
        }
        else
            res.json({message:"Aktivnost nije validna!"});

});


        //DELETE  /aktivnost/:naziv

    aplikacija.delete('/aktivnost/:naziv', function (req, res) {

        let pred = req.params.naziv;

        let niz = fs.readFileSync('aktivnosti.txt').toString().split("\n");

            let niz1 = niz.filter((linija)=>{
                if(linija === '') return true;
                let dataArray = linija.split(',')
                return !(pred === dataArray[0])
            })

        fs.writeFileSync('aktivnosti.txt', "");

            let datoteka = "";
            for(i=0; i<niz1.length; i++){
           datoteka = datoteka + niz1[i].toString() + '\n';
           console.log(datoteka);
        }

        fs.writeFileSync('aktivnosti.txt', datoteka);

            if(niz.length === niz1.length){
                res.send('Greška - aktivnost nije obrisana!')
            }
            else{
                res.send('Uspješno obrisana aktivnost!')
            }

});

//DELETE  /predmet/:naziv

aplikacija.delete('/predmet/:naziv', function (req, res) {

    let pred = req.params.naziv;
    let niz = fs.readFileSync('predmeti.txt').toString().split("\n");

    let niz1 = niz.filter((linija)=>{
        if(linija === '') return true;
        return !(pred === linija)
    })

    fs.writeFileSync('predmeti.txt', "");

    let datoteka = "";
    for(i=0; i<niz1.length; i++){
        datoteka = datoteka + niz1[i].toString() + '\n';
        console.log(datoteka);
    }

    fs.writeFileSync('predmeti.txt', datoteka);

    if(niz.length === niz1.length){
        res.send('Greška - predmet nije obrisan!')
    }
    else{
        res.send('Uspješno obrisan predmet!')
    }

});

//DELETE  /all

aplikacija.delete('/all', function (req, res) {

    fs.writeFile('predmeti.txt', '', function(err) {
        if(err) {
            res.status(400).json({message: 'Greška - sadržaj datoteka nije moguće obrisati!'})
            throw err;
        }
        else {
            fs.writeFile('aktivnosti.txt', '', function(err) {
                if(err) {
                    res.status(400).json({message: 'Greška - sadržaj datoteka nije moguće obrisati!'})
                    throw err;
                }
                else
                    {
                        res.status(200).json({message: 'Uspješno obrisan sadržaj datoteka!'})
                }

            });
        }
    });
});


aplikacija.use(express.static(__dirname));
aplikacija.listen(port);