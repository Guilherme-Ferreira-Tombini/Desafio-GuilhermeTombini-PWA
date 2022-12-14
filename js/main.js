window.onload = () => {
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};

let resultado = document.getElementById("result");
let jogador1 = "Jogador1";
let jogador2 = "Jogador2";
let playTime = jogador1;
let gameOver = false;

atualiza_mostrador();
inicializar_espaços();

function atualiza_mostrador(){
    let vez = document.getElementById("vez")
    if(gameOver){return;}
    if(playTime == jogador1){
        let jogador = document.querySelectorAll("div#mostrar img")[0]
        jogador.setAttribute("src", "images/imagem.jpg")
    } else {
        let jogador = document.querySelectorAll("div#mostrar img")[0]
        jogador.setAttribute("src", "images/imagem2.png")
    }

}

function inicializar_espaços(){
    let espacos = document.getElementsByClassName("espaco");
    for (let i = 0; i < espacos.length; i++) {
        espacos[i].addEventListener("click", 
        function(){
            if(gameOver){return};
            if(this.getElementsByTagName("img").length == 0){
                if(playTime == jogador1){
                  this.innerHTML = "<img src='./images/imagem.jpg' height='80'>";
                  this.setAttribute("jogada", jogador1);
                  playTime = jogador2;
                } else{
                    this.innerHTML = "<img src='./images/imagem2.png' height='80'>";
                    this.setAttribute("jogada", jogador2);
                    playTime = jogador1;
                }
                atualiza_mostrador();
                verificaVencedor();
            }
        });
    }
}

function verificaVencedor(){
    let a1 = document.getElementById("a1").getAttribute("jogada");
    let a2 = document.getElementById("a2").getAttribute("jogada");
    let a3 = document.getElementById("a3").getAttribute("jogada");
    
    let b1 = document.getElementById("b1").getAttribute("jogada");
    let b2 = document.getElementById("b2").getAttribute("jogada");
    let b3 = document.getElementById("b3").getAttribute("jogada");

    let c1 = document.getElementById("c1").getAttribute("jogada");
    let c2 = document.getElementById("c2").getAttribute("jogada");
    let c3 = document.getElementById("c3").getAttribute("jogada");
    let vencedor = "";
    
   if(((a1 == b1 && a1 == c1) || (a1 == a2 && a1 == a3) || (a1 == b2 && a1 == c3)) && a1 != ""){
      vencedor = a1;
   }else if (((b2 == b1 && b2 == b3) || (b2 == a2 && b2 == c2) || (b2 == a3 && b2 == c1)) && b2 != ""){
      vencedor = b2;
   } else if(((c3 == c2 && c3 == c1) || (c3 == a3 && c3 == b3)) && c3 != ""){
     vencedor = c3;
   }if((a1 != "" && a2 != "" && a3 != "" && b1 !="" && b2 !="" && b3 != "" && c1 != "" && c2 !="" && c3 !="" && vencedor == "")) {
    resultado.innerHTML= "Empate";
}

   if(vencedor != ""){
       gameOver = true;
       resultado.innerHTML= "Ganhador: " + vencedor;
   }
}