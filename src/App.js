import './App.css';
import React, { useState } from 'react';
import SpeedIcon from '@mui/icons-material/Speed';

function App() {
var size = 9;

function index_to_row_col(index){
  return {row: Math.floor(index/size), col: index % size};
}
  
function row_col_to_index(row, col){
  return row * size + col;
}

function actions(board, index) {
  let actions = [];
  for (let value = 1; value <= 9; ++value) {
      if (conflict(board, index, value)) {
        actions.push(value);
      }
  }
  return actions;
}
function conflict(board, index, value) {
  let { row, col } = index_to_row_col(index);

  // check if already in col
  for (let r = 0; r < 9; ++r)
      if (board[row_col_to_index(r, col)] == value) return false;

  // check if already in row
  for (let c = 0; c < 9; ++c)
      if (board[row_col_to_index(row, c)] == value) return false;

  // Check if in 3x3 grid
  let r1 = Math.floor(row / 3) * 3;
  let c1 = Math.floor(col / 3) * 3;
  for (let r = r1; r < r1 + 3; ++r) {
      for (let c = c1; c < c1 + 3; ++c) {
          if (board[row_col_to_index(r, c)] == value) return false;
      }
  }

  
  return true;
}

function min_actions(board) {
  let index, moves, bestLen = 10;
  for (let i = 0; i < size*size; ++i) {
      if(!board[i]){
        if(board2 != null){
          var m = actions(board, i);
        if(m.length < bestLen){
          bestLen = m.length
          moves = m;
          index = i;
          if(bestLen == 0) break;
        }
        }
      }
  }
  return { index, moves };
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var count = 0;
async function solve_min() {
  var test = speed;
  count ++;
  let { index, moves } = min_actions(board);    
  if (index == null) return true;          
  for (let m of moves) {
          
            board[index] = m;
            console.log(test);
            await sleep(test);
            document.getElementById(index).value = m;
            if (await solve_min(speed)) return true;
                      
  }
  board[index] = 0;                         
  return false; 
}
var board = [];

var board2 = [
];

const grid = []
const [grid_val, setGrid] = useState(new Array(size*size));

for(var row = 0; row < size; row++){
  for(var col = 0; col < size; col++){
    var index = row*9 + col;
    let r1 = Math.floor(row / 3) * 3;
    let c1 = Math.floor(col / 3) * 3;
    if(c1 % 2 == 0 && r1 % 2 == 0 || c1 == r1){
      grid.push(<input id={index} class="text-center border-[1px] border-neutral-800	 bg-blue-200	 w-10 h-10"  key={[row, col]} type="number" row={row} col={col} maxLength="1" onChange={(e) => {if(e.target.value.length > 1){e.target.value = e.target.value.slice(0, 1)}; updatearray(e.target.getAttribute("col"), e.target.getAttribute("row"), e.target.value)}}/>);
    }else{
      grid.push(<input id={index} class="text-center border-[1px] border-neutral-800	 bg-white	 w-10 h-10"  key={[row, col]} type="number" row={row} col={col} maxLength="1" onChange={(e) => {if(e.target.value.length > 1){e.target.value = e.target.value.slice(0, 1)}; updatearray(e.target.getAttribute("col"), e.target.getAttribute("row"), e.target.value)}}/>);
    }
    
  }
}
const [speed, setSpeed] = useState(100);
const updatearray = function(row, col, value){
  var temp = [];
  var index = parseInt(row) + (parseInt(col)*9);
  console.log(index)
  temp = grid_val;
  temp[index] = parseInt(value);
  setGrid(temp);
  console.log(grid_val);
}

function check_board(board, index, value) {
  let { row, col } = index_to_row_col(index);

  // check if in col
  for (let r = 0; r < 9; ++r)
      if (r != row && board[row_col_to_index(r, col)] == value){
        
        return false;
      } 

  // check if in row
  for (let c = 0; c < 9; ++c)
      if (c != col && board[row_col_to_index(row, c)] == value){

        return false;
      }
  // check if in 3x3 grid
  let r1 = Math.floor(row / 3) * 3;
  let c1 = Math.floor(col / 3) * 3;
  for (let r = r1; r < r1 + 3; ++r) {
      for (let c = c1; c < c1 + 3; ++c) {
          if (r != row && c != col && board[row_col_to_index(r, c)] == value){
            return false;
          }
      }
  }

  
  return true;
}

function check_input(){
  for(var i = 0; i < size*size; i++){
    if(board2[i] != null && check_board(board2, i, board2[i])==false){
      return false;
    }
  }
  return true;
}
const [on, setOn] = useState(0);
async function button_push(){

  if(on == 0){
    setOn(1);
    board = grid_val;
    board2 = [...board];
    setSpeed(document.getElementById('tstep').value)
    if(check_input()){
      var sov = await solve_min()
      setOn(0);
    }
  }else{

  }
 
}

function clear(){
  if(on == 0){
    board = new Array(size*size);
    board2 = new Array(size*size);
    setGrid(Array(size*size));
    for(var i = 0; i < size*size; i++){
      document.getElementById(i).value = "";
    }
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <div class="text-center">
        <h1 class="font-medium leading-tight text-5xl mt-10 mb-10 text-blue-600">Sudoku Solver JS</h1>
        </div>
        <div class="flex flex-col h-screen my-auto items-center">
          <div class="w-[365px] h-[360px]">
            {grid}
            <button class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={() => button_push()}>Solve</button>
            <button class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={() => clear()}>Clear</button>
  <label for="range" class="font-bold text-gray-600"></label>
  <div class="inline-flex">
  <label for="volume"><SpeedIcon/></label> <input id="tstep" onChange={() => {setSpeed(document.getElementById('tstep').value)}} type="range" name="range" class="w-full h-2 bg-blue-100 m-auto" min="1" max="250"/>
  </div>

          </div>
      </div>

        
      </header>
    </div>
  );
}

export default App;

