
const space = document.getElementById("space");
const ctx = space.getContext("2d");

const blockSize = 25;
space.width = 30 *blockSize;
space.height = 25 *blockSize;
let batX = blockSize*12;
let batY =blockSize*22;//bat locations
let bulletX , bulletY ;
let shoothingInterval;
let enemyX = 3*blockSize;
let enemyY = blockSize;
let minEnemyX = space.width;
let maxEnemyX = 0;
let yDangerTerritory = blockSize;

//batman Spaceship image source
const batImg = new Image();
batImg.src = 'images/batmanLogo.png'; // Set source path
batImg.onload = function(){
    ctx.drawImage(batImg,batX,batY);
}; 

//enemies iamge source
const enemyImg = new Image();
enemyImg.src = "images/skull.png";
enemyImg.onload =function(){ printEnemy(10)};

//enemy location arry 
const enemyLocations = [];  

function printEnemy(numberOfEnemy){
    let oct = 1;
    for(let i = 0;i<numberOfEnemy;i++){
        ctx.drawImage(enemyImg,oct*enemyX,enemyY);
        enemyLocations.push([oct*enemyX,enemyY]);
        oct++;
        if(oct>8){
            oct = 1;
            enemyY +=4*blockSize;
        }
    }
    enemyX+=5;
    yDangerTerritory = enemyY + 4*blockSize;
}
function moveEnemy(){
    ctx.clearRect(0,0,space.width,yDangerTerritory);
    printEnemyWithArray(enemyLocations);
}
let right = true;
function printEnemyWithArray(arr){
    for (const coord of arr) {
        if(right){
            ctx.drawImage(enemyImg,coord[0]+=4,coord[1]);
            if(coord[0]>space.width-3*blockSize){right = false; return}
        }
        else{
            if(coord[0]<0){right = true;return}
            ctx.drawImage(enemyImg,coord[0]-=4,coord[1]);
        }   
    }
}
let movingEnemyInterval = setInterval(moveEnemy,100);
// //grid the canvas
// for (let i = 0; i < space.height/blockSize; i++) {
//     ctx.beginPath();
//     ctx.moveTo(0,blockSize*i);
//     ctx.lineTo(space.width,blockSize*i);
//     ctx.stroke();
// }
// for (let i = 0; i < space.width/blockSize; i++) {
//     ctx.beginPath();
//     ctx.moveTo(blockSize*i,0);
//     ctx.lineTo(blockSize*i,space.height);
//     ctx.stroke();
// }
// //end the grid 

addEventListener("keydown",batMove);
function batMove(e){
    switch (e.key) {
        case "ArrowRight":
            if(batX<space.width-160){
                ctx.clearRect(batX,batY,blockSize*7,blockSize*3);
                ctx.drawImage(batImg,batX+=10,batY)
            }
            break;
        case "ArrowLeft":
            if(batX>0){
                ctx.clearRect(batX,batY,blockSize*7,blockSize*3);
                ctx.drawImage(batImg,batX-=10,batY)
            }
            break;
        case "ArrowUp":
            if(shoothingInterval==undefined){
                bulletY = batY;
                bulletX = batX+batImg.width/2;
                shoothingInterval = setInterval(function(){shooting()},10);
            }
            break;
        default:
    }
}
 
function shooting(){
    ctx.clearRect(bulletX-8,bulletY-blockSize,15,30);
    if(bulletY<0){
        clearInterval(shoothingInterval);
        shoothingInterval = undefined;
        bulletY = batY;
        bulletX = batX+batImg.width/2;
        return;
    }
    ctx.beginPath();
    ctx.arc(bulletX,bulletY-=10,5,0,2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    if(bulletY<yDangerTerritory){
        for (let i = 0;i<enemyLocations.length;i++) {
            if (bulletX>=enemyLocations[i][0]
                 && bulletX<enemyLocations[i][0] + 3*blockSize 
                 && bulletY < enemyLocations[i][1]+3*blockSize) {
                //clear the enemy 
                ctx.clearRect(enemyLocations[i][0],enemyLocations[i][1]  
                    ,3*blockSize,4*blockSize);
                enemyLocations.splice(i,1);
                if(enemyLocations.length==0){
                    console.log("you win");
                    clearInterval(movingEnemyInterval);
                }
                clearInterval(shoothingInterval);      

                shoothingInterval = undefined;
            }
        }
    }
}
