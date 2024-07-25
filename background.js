const board = document.querySelector('.board');


const colors = ['#F93EB3', '#3EA6F9', '#39BE45', '#C8CC2C', 'orange'];
const grid = Array.from({ length: 10 }, () => Array(10).fill(null));

let rowStart = 100;
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    // Determine number to display
    const num = (row % 2 === 0) ? rowStart - col : rowStart - 9 + col;
    cell.textContent = num;
    cell.id = "cell-" + num;
    

    // Get available colors for current cell
    const availableColors = new Set(colors);
    if (row > 0) availableColors.delete(grid[row - 1][col]);
    if (col > 0) availableColors.delete(grid[row][col - 1]);
    if (col < 9 && grid[row][col + 1]) availableColors.delete(grid[row][col + 1]);
    if (row < 9 && grid[row + 1][col]) availableColors.delete(grid[row + 1][col]);

    // Choose a random color from available colors
    const colorArray = Array.from(availableColors);
    const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    cell.style.backgroundColor = randomColor;
    grid[row][col] = randomColor;

    board.appendChild(cell);
  }
  rowStart -= 10;
}