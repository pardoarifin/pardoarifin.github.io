 const snakeContainer = document.getElementById("snakes");
 for (var i = 1; i < 11; i++) {
   let div = document.createElement("div");
    div.className ="snake0"+i;
    div.style.backgroundImage = `url(/images/ular0${i}.png)`;
    div.style.backgroundSize = `100%`;
    //div.innerText = i;
    //div.style.textAlign = `center`;
    //div.style.color = `black`;
    //div.style.fontSize="40pt";
    
    
   snakeContainer.appendChild(div);
 }
 