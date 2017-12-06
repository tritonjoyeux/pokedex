'use strict';
window.onload=function(){
    var sonpoke=document.getElementById('sonpoke');
    var myForm=document.forms['myForm'];
    var xmlhttp = new XMLHttpRequest();
    var url = "pokemons.json";
    var nombre=0;
    var nom='';
    var attack='';
    var defense='';
    var id='';
    var type='';
    var ecran=document.getElementById('ecran');     //photo
    var ecran2=document.getElementById('ecran2');   //stats
    var ecran3=document.getElementById('ecran3');   //type
    document.getElementById('nombre').onkeyup=function(){
      if(document.getElementById('nombre').value=='nidoran'){           //si nidoran est ecrit
          document.getElementById('sexe').style.visibility='visible';   //affichage d'un select pour male ou femelle
      }else{
          document.getElementById('sexe').style.visibility='hidden';
      }
    };
    myForm.elements['number'].focus();                  //selection auto
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myForm.onsubmit=function() {                    //onsubmit dans le requete xml pour eviter
                nombre=this.elements['number'].value;       //le renvoi du formulaire a chaques fois
                if(!nombre){                                //1.rien n'est entré
                    return false;
                }
                if(nombre<1 || nombre>151) {                //2.le nombre est trop petit ou trop grand
                    ecran2.innerHTML='404 : Pokemon number '+nombre+' not found';
                    ecran.innerHTML ='';
                    ecran3.innerHTML ='';
                }else{                                      //3.appel de la fonction
                    if(nombre=='nidoran'){                  //condition pour nidoran si male ou femelle
                        if(this.elements['sexe'].value=='Male'){
                            nombre+='-m';
                        }else{
                            nombre+='-f';
                        }
                    }
                    myPokemon(myArr, nombre);               //fonction d'affichage
                }
                return false;
            };
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function myPokemon(poke,nombre) { //fonction d'affichage du pokemon si il existe en fonction de son id ou de son nom
        if(!isNaN(nombre)) {                        //c'est un nombre
            id=nombre;
            attack=poke[nombre].attack;
            defense=poke[nombre].defense;
            nom=poke[nombre].name;
            type=poke[nombre].type;
            ecran2.innerHTML ='Id : '+nombre+'<br>nom : '+nom+'<br>Attack : ' + attack+'<br>Defense : '+defense;
            ecran3.innerHTML='Type : '+type;
            ecran.innerHTML='<img src="http://img.pokemondb.net/artwork/'+nom.toLowerCase()+'.jpg">';
            sonpoke.innerHTML='<audio src="http://veekun.com/dex/media/pokemon/cries/'+nombre+'.ogg" autoplay></audio>';
        }else{                                          //ce n'est pas un nombre
            nombre = nombre.substring(0,1).toUpperCase() + nombre.substring(1).toLowerCase();
            if(nombre=='Mr.mime' || nombre=='Mr mime'){ //condition pour mr mime (depends de l'ecriture '-' || '.')
                nombre='Mr-mime';
            }
            var number=0;
            var i=0;
            var pokemontemp=nombre;
            for(i in poke){                             //check dans le json si le pokemon rentré existe
                if(poke[i].name==nombre){               //oui
                   number=i;                            //break
                }
            }
            nombre=number;
            if(number==0){                              //si !break
                ecran2.innerHTML='404 : '+pokemontemp+' not found';
                ecran.innerHTML ='';
                ecran3.innerHTML='';
            }else {                                     //le pokemon à été trouvé
                id=nombre;
                attack=poke[nombre].attack;
                defense=poke[nombre].defense;
                nom=poke[nombre].name;
                type=poke[nombre].type;
                ecran2.innerHTML = 'Id : '+nombre+'<br>nom : '+nom+'<br>Attack : ' + attack+'<br>Defense : '+defense;
                ecran3.innerHTML='Type : '+type;
                ecran.innerHTML='<img src="http://img.pokemondb.net/artwork/'+nom.toLowerCase()+'.jpg">';
                sonpoke.innerHTML='<audio src="http://veekun.com/dex/media/pokemon/cries/'+nombre+'.ogg" autoplay></audio>';
            }
        }
    }
};