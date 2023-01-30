const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'rgb(0, 0, 0)';
const ERASE_COLOR = '#fff'

const rootElement = document.querySelector(':root');
const board = document.querySelector('.etch-a-sketch-board');
const colorPicker = document.querySelector('#color-picker')
const resetButton = document.querySelector('#button-reset');
const eraseButton = document.querySelector('#button-erase');
const colorButton = document.querySelector('#button-color');
const size16 = document.querySelector('#size16')
const size32 = document.querySelector('#size32')
const size64 = document.querySelector('#size64')
const gridDivs = document.querySelectorAll('.board-cell');
const boardSizeOutput = document.querySelector('.board-size');
const background = document.querySelector('.background-board');

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let mouseDown = false;
colorPicker.oninput = (e) => setColor(e.target.value);
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
resetButton.addEventListener('click', resetBoard);
eraseButton.addEventListener('click', function(){setColor(ERASE_COLOR)});
colorButton.addEventListener('click', function(){setColor(colorPicker.value)});
size16.addEventListener('click', buildNewBoard);
size32.addEventListener('click', buildNewBoard);
size64.addEventListener('click', buildNewBoard);

function clearBoard(){
  board.innerHTML = '';
}

function buildNewBoard(e){
  currentSize = e.target.dataset.size;
  clearBoard();
  fillBoardWithDivs(e.target.dataset.size);
  setSizeOutput();
}

function setSizeOutput(){
    boardSizeOutput.textContent = `${currentSize} x ${currentSize}`;
}

function fillBoardWithDivs(size){
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`
  for(let i = 0; i<size*size; i++){
    const div = document.createElement('div');
    div.classList.add('board-cell');
    div.setAttribute('draggable', 'false');
    div.addEventListener('mouseover', colorCell);
    div.addEventListener('mousedown', colorCell);
    board.appendChild(div);
  }
  return
}

function fillBackgroundWithDivs(){
  let screenWidth = Math.floor(window.innerWidth/30);
  let screenHeight = Math.floor(window.innerHeight/30);
  background.style.gridTemplateColumns = `repeat(${screenWidth}, 1fr)`;
  background.style.gridTemplateRows = `repeat(${screenHeight}, 1fr)`;
  console.log(screenWidth)
  console.log(screenHeight)
  for(let i = 0; i<screenWidth*screenHeight; i++){
    const div = document.createElement('div');
    background.appendChild(div);
  }
}

function colorCell(e){
  if(e.type === 'mouseover' && !mouseDown) return;
  e.target.style.backgroundColor = currentColor;
}

function setColor(color){
  currentColor = color;
}

function resetBoard(){
  gridDivs.forEach( boardCell => boardCell.style.background = '#fff')
  clearBoard();
  fillBoardWithDivs(DEFAULT_SIZE);
  setSizeOutput();
}

window.onload = () => {
  fillBackgroundWithDivs();
  fillBoardWithDivs(DEFAULT_SIZE);
  boardSizeOutput.textContent = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
  colorPicker.value = currentColor;
}
