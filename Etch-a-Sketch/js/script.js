// number of rows / columns in grid
let gridSize = 24;

const container = document.querySelector('.grid-container');

let bgColor = '#ffffff';
container.style.backgroundColor = bgColor;

//create new grid items to fill the grid
function createGrid() {
  // having the grid with each item at 1fr would leave left over space at the end of the grid
  //  when there were lots of items, doing it this way seemed to fill in that extra space.
  // however the grid broke when there were 3 or less items, so the if statment fixes that
  let gridWidth = container.offsetWidth / gridSize;
  container.style.gridTemplateColumns = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
  container.style.gridTemplateRows = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
  if (gridSize < 4) {
    container.style.gridTemplateColumns = `repeat(${gridSize},1fr`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
  }

    for (let i = 0; i < gridSize ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item');
    square.setAttribute('draggable', 'false');
    square.style.backgroundColor = 'transperent';
    container.appendChild(square);

    //to avoid double borders, top and left borders are applied to every cell,
    //then the remaining borderless cells are determined and given a border.
    // i originally used grid gap and had the container background
    //color as the borders. However when i changed the background color by changing each
    // cell individually, it got quite slow with large grids. I changed un-colored
    // grid items to be transperent, so i could use the container background as the
    //background color. now when i change the background color i am only changing the
    // one container and it is much faster.
    //set border top and left to every grid item
    square.classList.add('border-top-left');
  }
  //add a right border the the right most items
  const rightItems = document.querySelectorAll(`.grid-item:nth-child(${gridSize}n)`);
  for (let i = 0; i < rightItems.length; i++) {
    rightItems[i].setAttribute('data-right', 'true');
    rightItems[i].classList.toggle('border-right');
    }
    
     // add a bottom border to the bottom most items
  let gridItems = document.querySelectorAll('.grid-item');
  const lastItems = Array.from(gridItems).slice(-`${gridSize}`);
  for (let i = 0; i < lastItems.length; i++) {
    lastItems[i].setAttribute('data-bottom', 'true');
    lastItems[i].classList.toggle('border-bottom');
  }
}

createGrid();

gridItems = document.querySelectorAll('.grid-item');

// set default colour to black
let ink = '#000000';

//pen color picker
const colorPicker = document.querySelector('#color-select');
colorPicker.addEventListener('input', (e) => {
  ink = e.target.value;
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
  // fill = false;
  // colorFillButton.classList.remove('btn-on');
});

