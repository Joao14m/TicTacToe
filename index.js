// For Logic purpose, we will think we have choosen X

/* 1) Make the game turn based, for example, 
   After X gets placed, you have some player flag switches to place O next
   2) You need a way to check if a win condition is met
   3) Don't make the restart and X/O available until you finish the current round
*/

// Set the players, if a button was not choosen, we set that to player 2

// After we set, we start the game
// Make player 1 choose a point in the grid, and then make player 2 do the same

// X goes first, deal with the multiplayer later
// When player choose the location, change to 'O'

let grid = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']]; 

let currentPlayer = 'X';
let round = 0;
let game = true;
const solX = ['X', 'X', 'X'];
const solO = ['O', 'O', 'O'];

// const items = document.querySelectorAll('.grid-item');
// console.log(items[0]);



document.querySelectorAll('.grid-item').forEach(evt);

function evt (square){
   square.addEventListener('click', function(){
      // I would have to find the solution while clicking it here!        
      
      // if two people are connected
      
      if(game === true && this.dataset.locked === "true"){
         // Making the grid changes 
         this.textContent = currentPlayer;
         this.dataset.locked = "false";
         this.dataset.value = currentPlayer;
         grid[this.dataset.row][this.dataset.column] = currentPlayer;

         // Making the player changes
         if(currentPlayer === 'X'){
            currentPlayer = 'O';
         } else if(currentPlayer === 'O'){
            currentPlayer = 'X';
         }
         round++;

         let end  = false;
         for(let i = 0; i < grid.length; i++){ // Game Check
            // For checking the column
            let temp = [];
            for(let j = 0; j < grid.length; j++){
               temp.push(grid[j][i]);
            }  
   
            // For checking the diagonals 
            let leftDia = [grid[0][0], grid[1][1], grid[2][2]];
            let rightDia = [grid[0][2], grid[1][1], grid[2][0]];
   
            // Checking if there is a winner or a tie
            if(solveRow(grid[i], solX) === true || solveRow(grid[i], solO) === true){ // Row Matches
               console.log(this.dataset.value + " WON!"); 
               game = false; 
               end = true;
            } else if(solveCol(temp, solX) === true || solveCol(temp, solO) === true){ // Column Matches
               console.log(this.dataset.value + " WON!");
               game = false; 
               end = true;
            } else if(solveLeftDiagonal(leftDia, solX) === true || 
                      solveRightDiagonal(rightDia, solX) === true || 
                      solveLeftDiagonal(leftDia, solO) === true || 
                      solveRightDiagonal(rightDia, solO) === true){
               console.log(this.dataset.value + " WON!");
               game = false; 
               end = true;
            } // Diagonals Matches
            else if(round === 9){ // No winner
               console.log("Tie!");
               game = false; 
               end = true;
            }
         }
         if(end){
            restartAvailable();
         }
      }
   });
}

// Soltuions for TicTacToe
function solveRow(row, sol){
   for(let i = 0; i < row.length; i++){
      if(row[i] !== sol[i]) return false;
   }
   return true;
}

function solveCol(temp, sol){
   for(let i = 0; i < temp.length; i++){
      if(temp[i] !== sol[i]) return false;
   }
   return true;
}

function solveLeftDiagonal(left, sol){
   for(let i = 0; i < left.length; i++){
      if(left[i] !== sol[i]) return false;
   }
   return true;
}

function solveRightDiagonal(right, sol){
   for(let i = 0; i < right.length; i++){
      if(right[i] !== sol[i]) return false;
   }
   return true;
}

// Reset button
function restartAvailable(){
   let rest = document.getElementById("restart")
   rest.addEventListener('click', function(){
      document.querySelectorAll('.grid-item').forEach(function(square){
         square.textContent = '';
         square.dataset.locked = "true"; // resetting lock state
      });
      // Reset everything
      grid = [ 
         [' ', ' ', ' '],
         [' ', ' ', ' '],
         [' ', ' ', ' ']]; 
      currentPlayer = 'X';
      round = 0; 
      game = true;
   });
}
