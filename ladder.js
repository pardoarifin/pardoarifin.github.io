const ladderContainer = document.getElementById("ladder-container");

 function ladderColor() {
   function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
 
   const r = getRandomInt(0, 250);
   const g = getRandomInt(0, 150);
   const b = getRandomInt(0, 250);
 
   return `rgb(${r}, ${g}, ${b})`;
 }
 
 
for (var i = 0; i < 8; i++) {

  const ladder = document.createElement("div");
  ladder.className = "ladder"+i;
  //ladder.innerText = i;
  //ladder.style.fontSize = "30px";
  
  let getSameColour = ladderColor();
  let styles = {
      background: `linear-gradient(to bottom,transparent 40%, ${getSameColour} 40%, ${getSameColour}  60%, transparent 60%)`,
      backgroundSize: '100% 20px',
      borderLeft: `4px solid ${getSameColour}`,
      borderRight: `4px solid ${getSameColour}`
  };

      for (let isi in styles) {
        ladder.style[isi] = styles[isi];
      }
      
    ladderContainer.appendChild(ladder)
}