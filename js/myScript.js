
var button = document.getElementById("recognize");
var b2 = document.getElementById("delete");
var img = new Image();
var b5 = document.getElementById("help");
var b6 = document.getElementById("story");
var b7 = document.getElementById("home");
var body = document.getElementById("body");
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
    can1.erase();
    $(recognizeCanvas).show();
    
    $('.boxes').hide();
    $('#storyText').html(gameData.levels[level -1].story);
    $('#levelLetter').html(gameData.levels[level -1].letter);

    //set level wallpaper
    let wallpaperPathString =   "url('imgs/" + gameData.levels[level -1].wallpaper + "')";
    $(body).css("background-image",  wallpaperPathString);
    // set letter sound
    
    document.getElementById("levelSoundSource").src = "sounds/"+gameData.levels[level-1].letter+".mp3";
    var audio = document.getElementById('levelSound');
    audio.load();


    // set story sound
    
    document.getElementById("storySoundSource").src = "sounds/story"+gameData.levels[level-1].letter+".mp3";
    var audio = document.getElementById('storySound');
    audio.load();

    //set score
    $('#playerScore').html(gameData.playerScore);
    
    dataObjectUpdated();
}

function setRecognizeCanvasPosition(p_x, p_y){
    //set recognize canvas position
    $('.recognizeCanvas').css("left", p_x);
    $('.recognizeCanvas').css("top", p_y);
}

function levelWon(){
    //can1.erase();
    gameData.levels[gameData.currentLevel -1].won = true;
    let s = document.getElementById('winSound');
    s.play()
    if(!gameData.levels[gameData.currentLevel -1].completed){
        gameData.playerScore += 50;
        gameData.levels[gameData.currentLevel -1].completed = true;
        gameData.completedLevels++;

    }
    $('#winBox').fadeIn();
    dataObjectUpdated();
}

function levelLost(){
    let s = document.getElementById('lostSound');
    s.play();
    can1.erase();
    $('#looseBox').fadeIn();
}


//DEBUG - CONSOLE  FUNCTIONS

function clearscore(){
    gameData.playerScore = 0;

}
function setLevelsUncompleted(){
    for (l of gameData.levels){
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
});

b2.addEventListener("click", function () {
    //erase captured trace
    can1.erase();
});


$('#audio').click(function() {
    sound = document.getElementById('levelSound');
    sound.play();
    return false;
  });
$('#nextLevel').click(function(){
    let s = document.getElementById('winSound');
    s.pause();
    s.currentTime = 0;
    gameData.currentLevel++;
    loadlevel(gameData.currentLevel);
    dataObjectUpdated();
    return false;
});

$('#tryAgainButton').click(function(){
    $('.boxes').hide();
    let s = document.getElementById('lostSound');
    s.pause();
    s.currentTime = 0 ;
    return false;
});
$('#closeStoryButton').click(function(){
    $('.boxes').hide();
    
    return false;
});
$('#closeHelpButton').click(function(){
    $('.boxes').hide();
    return false;
});

b5.addEventListener("click", function () {
    let s = document.getElementById('helpSound');
    s.play();
});

b6.addEventListener("click", function () {
    let s = document.getElementById('storySound');
    s.play();
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
        if (data[0]===gameData.levels[gameData.currentLevel-1].letter)
        {
            levelWon();}
        else{
           
            levelLost();}
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
loadlevel(gameData.currentLevel);

//RUN CANVAS

function setup() {
    
    createCanvas(windowWidth, windowHeight).parent("canvasContainer");
    
    //LV1

    butterfly = new Butterfly(windowWidth/4, windowHeight/4, 0, 0);

    //SET WINNING ANIMATION PARAMETERS
    butterfly.setAnimation(butterfly.x, butterfly.y, windowWidth, 1000, 4,  0.01);

    //LV2

    butterfly2 = new Butterfly(windowWidth/8, windowHeight/8, 0, 0);
    butterfly2.setAnimation(butterfly2.x, butterfly2.y, 1200, 1000, 0.5,  0.005);
    
    glass = new Glass(windowWidth/4, windowHeight/4 +30, 0, 0);
    
    cloud = new Cloud(windowWidth/7 -40, 20, 0, 0);

    rain = new Rain( windowWidth/2 - windowWidth/100 , cloud.y, 0, 6, 15, windowHeight);
    

    

}

//DRAW CANVAS
function draw() {
    //automatically called every 3 ms
    var canvas= document.getElementById("defaultCalvas0");
    clear(canvas); // clear canvas view each tim draw is called;
    switch(gameData.currentLevel) {
        case 1:
            if(butterfly.x < windowWidth/2.2){
                setRecognizeCanvasPosition(butterfly.x*2, butterfly.y*2 - 90);

            }
            else{
                can1.erase();
                $(recognizeCanvas).hide();
            }
            if(gameData.levels[0].won == true){
                butterfly.triggerAnimationLv1();
            }
            butterfly.draw();
          break;
        case 2:
          //GENERATE LEVEL 2 ELEMENTS
            
            setRecognizeCanvasPosition(glass.x*2 -60, glass.y*2 - 65);
            glass.draw();

            //if level2 won stop rain earlier
            let limit;
            if(gameData.levels[1].won == true){
                limit = glass.y + 200;
                butterfly2.triggerAnimationLv2();
            }else{
                limit = windowHeight;
            }

            rain.setLimit(limit);
            rain.draw();
        
            cloud.draw(); //DRAW CLOUD OVER RAIN

            butterfly2.draw()


          break;
        default:
      }
    
    
}
