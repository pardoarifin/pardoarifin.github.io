let currentX = 0;
let currentY = 0;
let scorePlayer = 0;
let scoreCom = 0;
let playersTurn = 1;
let intervalId;

const pion = document.querySelectorAll(".pion");
const redPawn = pion[0];
const greenPawn = pion[1];
const mouth = document.getElementsByClassName("mouth");
const diceButton = document.querySelector(".diceButton");
const computer = document.querySelector(".computer");
const player = document.querySelector(".player");
const alertContainer = document.querySelector(".alertContainer");
const winAlert = document.querySelector(".winnerAlert");

const rollDice = () => {
    const cube = document.getElementById('cube');
    animateCubeRoll(cube);
    diceButton.style.display ="none";

    setTimeout(() => {
        ({currentX, currentY} = getRandomRotations());
        updateCubeTransform(cube);
    }, 800);

    setTimeout(() => {
        const result = getResultFromDice()+97;
        handlePlayerTurn(result);
        expression();
        
    }, 2000);
}

const animateCubeRoll = cube => {
    cube.style.transform = 'rotateX(900deg) rotateY(900deg)';
}

const getRandomRotations = () => ({
    currentX: Math.floor(Math.random() * 3) * 90,
    currentY: Math.floor(Math.random() * 3) * 90
});

const updateCubeTransform = cube => {
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
}

const getFrontFace = (x, y) => {
    x = normalizeRotation(x);
    y = normalizeRotation(y);

    if (x === 0) {
        switch (y) {
            case 0: return 1;
            case 90: return 4;
            case 180: return 3;
            case 270: return 2;
        }
    } else if (x === 90) {
        return 6;
    } else if (x === 180) {
        switch (y) {
            case 0: return 3;
            case 90: return 2;
            case 180: return 1;
            case 270: return 4;
        }
    } else if (x === 270) {
        return 5;
    }
}

const normalizeRotation = deg => (deg % 360 + 360) % 360;

const getResultFromDice = () => getFrontFace(currentX, currentY);

const setElementStyle = (selector, styles) => {
    Object.assign(selector.style, styles);
}

const grayBg = selector => {
    setElementStyle(selector, {
        background: '#777',
        border: 'none'
    });
}

const rainbowBg = selector => {
  setElementStyle(selector, {
    border: '4px solid #A12CCC',
    background: 'linear-gradient(45deg, #C71B64, #17B8CE, #4ACE17, #FFCA00)'
  });
}

const switchToComputerTurn = () => {
  grayBg(player);
  rainbowBg(computer);
  playersTurn = 2;
}

const switchToPlayerTurn = () => {
  grayBg(computer);
  rainbowBg(player);
  playersTurn = 1;
}

const setMouthStyle = (index, borderTop, borderBottom, top) => {
  mouth[index].style.borderTop = borderTop;
  mouth[index].style.borderBottom = borderBottom;
  mouth[index].style.top = top;
};

const expression = () => {
  if (scorePlayer < scoreCom) {
    setMouthStyle(0, '2px solid #000', 'none', '65%');
    setMouthStyle(1, 'none', '2px solid #000', '50%');
  } else {
    const commonBottomBorder = '2px solid #000';
    const commonTop = '50%';
    
    setMouthStyle(0, 'none', commonBottomBorder, commonTop);
    setMouthStyle(1, scorePlayer === scoreCom ? 'none' : '2px solid #000', scorePlayer === scoreCom ? commonBottomBorder : 'none', scorePlayer === scoreCom ? commonTop : '65%');
  }
};

let distance = (pawn, endStep) => {
  class Distance {
    static getValue(key, property) {
      return key.getBoundingClientRect()[property];
    }
  }
  const activeCell = (endStep) => document.getElementById(`cell-${endStep}`);
  
  const { left: pawnLeft } = pawn.getBoundingClientRect();
  const { left: cellLeft } = activeCell(endStep).getBoundingClientRect();
  
  const rowNumber = Math.ceil(endStep / 10);
  const countY = rowNumber === 1 ? 0 : -50 * (rowNumber - 1);
  const countXFinal = cellLeft - pawnLeft + pawnLeft - 6;
  
  pawn.style.transform = `translateX(${countXFinal}px) translateY(${countY}px)`;
}


const movement = (result, pawn, score) => {
  let endStep = score - result;
  
  if (endStep < score) {
    const interval = setInterval(() => {
      endStep += 1;
      distance(pawn, endStep);
      pawn.style.height = `50px`;
      pawn.style.width = `45px`;
      
      setTimeout(() => {
        pawn.style.height = `40px`;
        pawn.style.width = `37px`;
      }, 200);

      if (endStep >= score) {
        clearInterval(interval);
        
        let value = score;
        condition(pawn, value);
        
        if (score === 100) {
          winAlert.style.display = `block`;
          alertContainer.style.display = `block`;
          alert("ok")
          return; // Prevent further actions
        }
        
        if (pawn === redPawn && result === 6) {
          handleComputerTurn();
        }
      
      }
    }, 500);
  }
};

const handlePlayerTurn = result => {
    if (playersTurn === 1) {
        scorePlayer += result;
        movement(result, greenPawn, scorePlayer);
        scorePlayer = getValueBasedOnCondition(scorePlayer);
        
        
        if (result !== 6) {
            switchToComputerTurn();
            startComputerTurn();
        } else {
          diceButton.style.display ="block";
        }
    } else {
        scoreCom += result;
        movement(result, redPawn, scoreCom);
        scoreCom = getValueBasedOnCondition(scoreCom);
        if (result !== 6) {
            switchToPlayerTurn();
            diceButton.style.display ="block";
        }
    }
}

const handleComputerTurn = () => {
    if (playersTurn === 2) {
        rollDice();
    }
}

const startComputerTurn = () => {
    setTimeout(() => {
        handleComputerTurn();
    }, 2000);
}

