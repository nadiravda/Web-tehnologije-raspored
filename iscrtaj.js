

function iscrtajRaspored(div,dani,satPocetak,satKraj){
   
   if(satPocetak < 0 || satKraj < 0 || satPocetak>=satKraj || satPocetak>24 || satKraj>24 || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)){
      div.innerHTML = "greska";
      return;
   }


      let tabela = document.createElement("table");
      tabela.classList.add("glavna");

      let satiRed = document.createElement("tr");
      satiRed.classList.add("times");
      let prazna = document.createElement("td");
      satiRed.id = satPocetak;
      satiRed.appendChild(prazna);

      // Za sate red
      let poc = satPocetak;

      for (let k = 0; k < (satKraj - satPocetak) * 2; k++) {

         let satiKolona = document.createElement("td");

         if (poc < 14 && poc % 2 === 0) {
            if (poc < 10)
               satiKolona.innerHTML = "0" + poc + ":00";
            else
               satiKolona.innerHTML = poc + ":00";
         }

         if (poc > 14 && poc % 2 === 1)
            satiKolona.innerHTML = poc + ":00";

         satiRed.appendChild(satiKolona);

         poc += 0.5;

      }
      tabela.appendChild(satiRed);

      //


      for (let i = 0; i < dani.length; i++) {
         let row = document.createElement("tr");

         for (let j = 0; j < (satKraj - satPocetak) * 2 + 1; j++) {

            if (j === 0) {

               let kolonaDani = document.createElement("td");
               kolonaDani.classList.add("dani");
               kolonaDani.innerHTML = dani[i];
               row.appendChild(kolonaDani);
            }

            else {

               let column = document.createElement("td");

               row.appendChild(column);
            }

         }
         tabela.appendChild(row);
      }
      div.appendChild(tabela);


}

// Dodaj Aktivnost  //


function dodajAktivnost(okvir,naziv,tip,vrijemePocetak,vrijemeKraj,dan){

   if(okvir === null || okvir.innerHTML === "greska"){
      alert("Greska - raspored nije kreiran");
      return;
   }

   let tabela = okvir.querySelector(".glavna");

   let brojKolona = parseInt(tabela.rows[0].cells.length);

   let satPocetak = okvir.querySelector(".times").id;

   let satKraj = parseInt(satPocetak)+(brojKolona-1)/2;

   if(vrijemePocetak>vrijemeKraj || vrijemePocetak <0 || vrijemeKraj <0 || vrijemePocetak >24 || vrijemeKraj>24 || vrijemePocetak<satPocetak || vrijemeKraj>satKraj){
      alert("Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin");
      return;
   }
   let p = vrijemePocetak*2;
   let k = vrijemeKraj*2;

       if(!Number.isInteger(p) || !Number.isInteger(k)){
       alert("Greska - ne postoji dan ili vrijeme u kojem pokusavate dodati termin");
       return;
    }

   let broj = Number(satPocetak);

   let sirinaPredavanja = Math.floor(Number((vrijemeKraj-vrijemePocetak)));
   if(sirinaPredavanja === 0){
      sirinaPredavanja = 0.5;
   }

   let sirina = 1;


   if(!ProvjeraPredavanja(tabela,vrijemePocetak,vrijemeKraj,dan)){

      alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
      return;
   }

   for(let i = 0;i<tabela.rows.length;i++){

      if(dan === tabela.rows[i].cells[0].innerHTML ){

         for(let j =1; j<brojKolona;j++){

            if(broj === vrijemePocetak){

               while(broj !== vrijemeKraj) {

                 tabela.rows[i].cells[j].style.backgroundColor = "lightblue";

                 if(broj !== vrijemeKraj-0.5) {
                    tabela.rows[i].cells[j].style.borderRightColor = "lightblue";
                 }

                 if(sirina === sirinaPredavanja || sirinaPredavanja === 0.5){

                    let Predmet = document.createElement("h1");
                    Predmet.innerHTML = naziv;
                    let kojiTip = document.createElement("p");
                    kojiTip.innerHTML = tip;
                    tabela.rows[i].cells[j].appendChild(Predmet);
                    tabela.rows[i].cells[j].appendChild(kojiTip);

                 }
                 broj += 0.5;
                 j++;
                 sirina += 1;

                 if(broj === vrijemeKraj-0.5){
                    tabela.rows[i].cells[j].style.backgroundColor = "lightblue"
                    break;
                 }
              }
            }

            broj = broj + 0.5;

         }

      }

   }

}

function ProvjeraPredavanja(tabela, vrijemePocetak, vrijemeKraj, dan) {

   const satPocetak = tabela.querySelector(".times").id;
   let broj = Number(satPocetak);
   const brojKolona = parseInt(tabela.rows[0].cells.length);

   for(let i = 0;i<tabela.rows.length;i++) {

      if (dan === tabela.rows[i].cells[0].innerHTML) {

         for (let j = 1; j < brojKolona; j++) {

            if (broj === vrijemePocetak) {

               while (broj !== vrijemeKraj) {

                  if( tabela.rows[i].cells[j].style.backgroundColor === "lightblue"){
                     return false;
                  }

                  broj += 0.5;
                  j++;

               }
            }

            broj = broj + 0.5;

         }
      }
   }

   return true;
}