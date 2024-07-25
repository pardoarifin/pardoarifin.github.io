function getValueBasedOnCondition(value) {
  switch (value) {
    case 6: return 26;
    case 19: return 24;
    case 37: return 45;
    case 43: return 88;
    case 50: return 73;
    case 60: return 61;
    case 71: return 90;
    case 85: return 95;
    case 18: return 4;
    case 27: return 10;
    case 39: return 23;
    case 49: return 30;
    case 64: return 38;
    case 69: return 24;
    case 76: return 48;
    case 84: return 79;
    case 94: return 72;
    case 99: return 83;
    default: return value;
  }
}


function applyMovement(pawn, value) {
  setTimeout(() => {
    distance(pawn, value);
    pawn.style.transition = `all 2s linear`;
  }, 300);

  setTimeout(() => {
    pawn.style.transition = `none`;
  }, 2500);
}


function condition(pawn, value) {
  const newValue = getValueBasedOnCondition(value);
  applyMovement(pawn, newValue);
}
