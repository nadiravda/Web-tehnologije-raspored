
let dajGrupe =  () => {

    let ajax = new XMLHttpRequest()

    ajax.onreadystatechange = () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log("uslo");
            let grupe = JSON.parse(ajax.responseText)
            let lista = document.getElementById('grupa');
            for( i = 0; i < grupe.length;i++){
                let a = document.createElement('option');
                a.innerHTML = grupe[i].naziv.toString();
                a.value = grupe[i].id;
                lista.appendChild(a);
            }

        }
        else if (ajax.readyState === 4 && ajax.status !== 200){
            console.log("Doslo je do greske!")
        }

    }
    ajax.open("GET", "http://localhost:3000/v2/grupa", true)
    ajax.send()

}

 let klik = ()=>{

     let ajax = new XMLHttpRequest()

     ajax.onreadystatechange = () => {
         if (ajax.readyState === 4 && ajax.status === 200) {

             let odgovor = JSON.parse(ajax.responseText)
             let napisi = document.getElementById('area');
             napisi.value = odgovor.message

             console.log(ajax.responseText)


         }
         else if (ajax.readyState === 4 && ajax.status !== 200){
             console.log("Doslo je do greske!")
         }

     }
     ajax.open("POST", "http://localhost:3000/upisStudenta", true);
     ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

     let polje = document.getElementById('area');
     let listaStudenti = polje.value;
     let grupe = document.getElementById('grupa');
     let odabranaGrupa = grupe.options[grupe.selectedIndex].value;
     ajax.send('sve=' + encodeURIComponent(listaStudenti) +
         '&grupaId=' + encodeURIComponent(odabranaGrupa));


}


dajGrupe();