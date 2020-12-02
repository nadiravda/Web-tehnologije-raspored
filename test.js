
let assert = chai.assert;
describe('Ispisi', function() {
    describe('iscrtajRaspored', function() {
        it('tacan broj redova', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            let tabela = div1.querySelector(".glavna");
            let redovi = tabela.rows;

            assert.equal(redovi.length, 3,"Broj redova treba biti 3");
        });

        it('tacan broj kolona', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            let tabela = div1.querySelector(".glavna");
            let redovi = tabela.rows[0].cells;

            assert.equal(redovi.length, 11,"Broj kolona treba biti 11");
        });

        it('Pogresno uneseno satPocetak', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8.5,13);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","SatPocetak greska");
        });

        it('Pogresno uneseno satKraj', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13.5);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","satKraj greska");
        });

        it('greska satPocetak manji od 0', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],-5,13.5);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","satPocetak manji od nule");
        });

        it('greska satKraj manji od 0', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],5,-13.5);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","satKraj manji od nule");
        });

        it('satPocetak veci od satKraj', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],17,15);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","satPocetak veci od satKraj");
        });

        it('satPocetak veci od 24', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],117,15);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","satPocetak veci od 24");
        });

        it('Greska satKraj veci od 24', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],15,154);
            let greska = div1.innerHTML;

            assert.equal(greska, "greska","satKraj veci od 24");
        });

        it('Pocetak od 8 h prva kolona', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,17);
            let tabela = div1.querySelector(".glavna");
            let prvo = tabela.rows[0].cells[1].innerHTML;
            console.log(prvo);

            assert.equal(prvo, "08:00","Pocetak od 8 h prva kolona");
        });

        });

    describe('dodajAktivnost', function() {
        it('Predavanje bi trebalo zavrsiti u 11', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let tabela = div1.querySelector(".glavna");
            let brojKolona = tabela.rows[0].cells.length;
            let satPocetak = div1.querySelector(".times").id;

            let satKraj = parseInt(satPocetak)+(brojKolona-1)/2;
            console.log(satKraj)
            assert.equal(satKraj, 13,"Predavanje bi trebalo zavrsiti u 11");
        });

        it('Greska null raspored', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(null,"WT","vjezbe",9,11);

            let greska = "Greska - raspored nije kreiran";



            assert.equal(greska, Ispisi.dodajAktivnost(null,"WT","vjezbe",9,11),"greska null raspored");
        });

        it('Vrijeme pocetak > 24 Greska !', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let greska = "Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin";

            assert.equal(greska, Ispisi.dodajAktivnost(div1,"WT","vjezbe",27,11),"Vrijeme pocetak > 24 Greska !");
        });

        it('Vrijeme kraj > 24 Greska !', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let greska = "Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin";

            assert.equal(greska, Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,28),"Vrijeme kraj > 24 Greska !");
        });

        it('Vrijeme pocetak < 0 Greska !', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let greska = "Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin";

            assert.equal(greska, Ispisi.dodajAktivnost(div1,"WT","vjezbe",-8,28),"Vrijeme pocetak < 0 Greska !");
        });

        it('Vrijeme kraj < 0 Greska !', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let greska = "Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin";

            assert.equal(greska, Ispisi.dodajAktivnost(div1,"WT","vjezbe",8,-28),"Vrijeme kraj < 0 Greska !");
        });

        it('Vrijeme pocetak je vece od vrijeme kraj', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let greska = "Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin";

            assert.equal(greska, Ispisi.dodajAktivnost(div1,"WT","vjezbe",20,18),"Vrijeme pocetak je vece od vrijeme kraj");
        });

        it('Vrijeme pocetak ili vrijeme kraj nisu pravilnog formata', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11);

            let greska = "Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin";

            assert.equal(greska, Ispisi.dodajAktivnost(div1,"WT","vjezbe",17.8,18),"Vrijeme pocetak ili vrijeme kraj nisu pravilnog formata");
        });

        it('Termini se preklapaju', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11,"Ponedjeljak");
            let a = Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11,"Ponedjeljak");
            let greska = "Greška - već postoji termin u rasporedu u zadanom vremenu";
            console.log(Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11))
            assert.equal(greska, a,"Vrijeme pocetak > 24 Greska !");
        });

        it('Termini se preklapaju', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11,"Ponedjeljak");
            let a = Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11,"Ponedjeljak");
            let greska = "Greška - već postoji termin u rasporedu u zadanom vremenu";
            console.log(Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11))
            assert.equal(greska, a,"Vrijeme pocetak > 24 Greska !");
        });

        it('Dan u koji se dodaje aktivnost treba da bude ponedjeljak', function() {
            let div1 = document.createElement("div");

            Ispisi.iscrtajRaspored(div1,['Ponedjeljak','Utorak'],8,13);
            Ispisi.dodajAktivnost(div1,"WT","vjezbe",9,11,"Ponedjeljak");

            let tabela = div1.querySelector(".glavna");
            let pon = tabela.rows[1].cells[0].innerHTML;


            assert.equal(pon, "Ponedjeljak","Vrijeme pocetak > 24 Greska !");
        });



    });

});


