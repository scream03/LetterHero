
var button = document.getElementById("recognize");
var b2 = document.getElementById("delete");
var img = new Image();
var b5 = document.getElementById("help");
var b6 = document.getElementById("story");
var b7 = document.getElementById("home");
var body = document.getElementById("body");
var  storyBox = document.getElementById("storyBox");
// DYNAMIC CANVAS PARAMENTERS
let butterfly;
let butterfly2;
let glass;
let cloud;
let rain;


function dataObjectUpdated() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function startGame(){
    if (gameData.currentLevel ==0){
        gameData.currentLevel++;
    }
    dataObjectUpdated();
}
function loadlevel(level){

    //make the user replay the level
    gameData.levels[level -1].won = false;
    
    $('.boxes').hide();
    $('#storyText').html(gameData.levels[level -1].story);
    $('#levelLetter').html(gameData.levels[level -1].letter);

    //set level wallpaper
    let wallpaperPathString =   "url('imgs/" + gameData.levels[level -1].wallpaper + "')";
    $(body).css("background-image",  wallpaperPathString);

    //set score
    $('#playerScore').html(gameData.playerScore);
    
    dataObjectUpdated();
}

function setRecognizeCanvasPosition(p_x, p_y){
    //set recognize canvas position
    $('.recognizeCanvas').css("left", p_x);
    $('.recognizeCanvas').css("top", p_y);
}
function unlockNextLevel(levelToUnlock){
    let b = document.getElementsByClassName('levelCard');
    
    //let levelButtons = document.getElementsByClassName('playLevelButton');

    //console.log(levelToUnlock);
    //console.log(levelButtons);
    //levelButtons[levelToUnlock].disabled = false;
}
function levelWon(){
    can1.erase();
    gameData.levels[gameData.currentLevel -1].won = true;

    if(!gameData.levels[gameData.currentLevel -1].completed){
        gameData.playerScore += 50;
        gameData.levels[gameData.currentLevel -1].completed = true;
        console.log(gameData.currentLevel);
        gameData.completedLevels++;
        //unlock next level

        unlockNextLevel(gameData.completedLevels);


    }
    $('#winBox').fadeIn();

    dataObjectUpdated();
}


//DEBUG - CONSOLE  FUNCTIONS

function clearscore(){
    gameData.playerScore = 0;

}
function setLevelsUncompleted(){
    for (l of gameData.levels){
        console.log('Set level uncompleted');
        console.log(l);

        l.completed = false;
        l.won = false;
    }
    gameData.completedLevels = 0;
    
}
function initialCurrentLevel(){
    gameData.currentLevel = 0;
}

function restartGameDebug(){
    clearscore()
    setLevelsUncompleted();
    initialCurrentLevel();

    dataObjectUpdated();

    loadlevel(1);
    
}
//// EVENT LISTENERS





button.addEventListener("click", function () {
    //recognize captured trace

    can1.recognize();

    //Clear canvas, captured trace, and stored steps
    can1.erase();
});

b2.addEventListener("click", function () {
    //erase captured trace
    can1.erase();
});


$('#audio').click(function() {
    console.log('play audio');
    sound = document.getElementById('levelSound');
    sound.play();
    return false;
  });
$('#nextLevel').click(function(){
    console.log('Go to next level');
    gameData.currentLevel++;
    loadlevel(gameData.currentLevel);
    dataObjectUpdated();
    return false;
});
/*
img.src = "B.jpg";
img.onload = () => {
    context.drawImage(img, 0, 0, img.width,    img.height,
        0, 0, canvas.width, canvas.height);
};

*/

b5.addEventListener("click", function () {
    var x = document.getElementById("helpBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
});

b6.addEventListener("click", function () {
    var x = document.getElementById("storyBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
});


b7.addEventListener("click", function () {
    window.location = "levels.html";
});





var recognizeCanvas = document.createElement('canvas');
$(recognizeCanvas).addClass('recognizeCanvas');
recognizeCanvas.width = "150";
recognizeCanvas.height = "200";

var can1 = new handwriting.Canvas(recognizeCanvas);

//Set callback function
can1.setCallBack(function(data, err) {
    if(err) throw err;
    else
    //Level won, go to next level                             
    //window.alert(data[0]=="B");
    levelWon();
    
});


//Set line width shown on the canvas element (default: 3)
can1.setLineWidth(5);

//turn on both functionalities
can1.set_Undo_Redo(true, true);

//Set options
can1.setOptions(
    {
        width : 500,         //int, width of the writing area, default: undefined
        height : 500,        //int, height of the writing area, default: undefined
        language : "en",  //string, language of input trace, default: "zh_TW"
        numOfWords : 1,      //int, number of words of input trace, default: undefined
        numOfReturn : 1,     //int, number of maximum returned results, default: undefined
    }

);

$('#canvasContainer').append(recognizeCanvas);

//MAIN
dataObjectUpdated(); //Update local storage
//startGame();
//restartGameDebug();
loadlevel(gameData.currentLevel);

//FILL CANVAS

//RUN CANVAS

function setup() {
    
    createCanvas(windowWidth, windowHeight).parent("canvasContainer");
    
    //LV1
    butterfly = new Butterfly(windowWidth/4, windowHeight/4, 0, 0);

    //LV2

    butterfly2 = new Butterfly(windowWidth/8, windowHeight/8, 0, 0);
    butterfly2.setAnimation(butterfly2.x, butterfly2.y, 800, 500);
    
    glass = new Glass(windowWidth/4, windowHeight/4 +30, 0, 0);
    
    cloud = new Cloud(windowWidth/7 -40, windowHeight/10 - 50, 0, 0);
    rain = new Rain(cloud.x + 35, cloud.y +20, 0, 1, 5, glass.y);

    

}
function draw() {

    var canvas= document.getElementById("defaultCalvas0");
    clear(canvas); // clear canvas view each tim draw is called;
    switch(gameData.currentLevel) {
        case 1:
            setRecognizeCanvasPosition(butterfly.x*2, butterfly.y*2 - 90);
            butterfly.draw();
          break;
        case 2:
          //GENERATE LEVEL 2 ELEMENTS
            
            setRecognizeCanvasPosition(glass.x*2 -60, glass.y*2 - 65);

            glass.move();
            glass.draw();

            cloud.draw();

            //if level2 won stop rain earlier
            let limit;
            if(gameData.levels[1].won == true){
                limit = glass.y - 150;
                butterfly2.triggerAnimationLv2();
            }else{
                limit = glass.y;
            }
            rain.setLimit(limit);
            rain.move();
            rain.draw();

            butterfly2.draw()


          break;
        default:
          // code block
      }
    
    
}
