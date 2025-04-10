let gameSeq = [];
let userSeq = [];

let arr = ["bt1","bt2","bt3","bt4"];


let started = false;
let level = 0;

let heading = document.querySelector('h2');

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;
        levelup();
    }
});

function levelup(){
    userSeq=[];
level++;
heading.innerText=`Level ${level}`;
let rand = Math.floor(Math.random()*4);
let randbut = arr[rand];
let variable = document.querySelector(`.${randbut}`);
flasher(variable);
gameSeq.push(randbut);
}

function flasher(but){
    but.classList.add("flash");
    setTimeout(function(){
        but.classList.remove("flash");
    }, 300);
}

function userflasher(but){
    but.classList.add("userflash");
    setTimeout(function(){
        but.classList.remove("userflash");
    }, 300);
}
function btnpress(){
let butt = this;
userflasher(butt);
randbut = butt.getAttribute("id");
userSeq.push(randbut);
check(userSeq.length-1);
}

let btn = document.querySelectorAll(".btn");
for(bts of btn){
    bts.addEventListener("click",btnpress);

}
function check(idx){
if(userSeq[idx]==gameSeq[idx]){
if(userSeq.length==gameSeq.length){
    setTimeout(levelup,1000);
}
}
else{
    heading.innerText = `GAME OVER !! Your Score was ${level} !! PRESS ANY KEY TO RESTART `;
    let a = document.querySelector('body');
    a.style.backgroundColor="red";
    setTimeout(() => {
        a.style.backgroundColor="white";
    }, 1000);
    restart();
}
}
function restart(){
    userSeq=[];
    gameSeq=[];
    started = false;
    level=0;
}
