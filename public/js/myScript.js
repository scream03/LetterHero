var gameData = (localStorage.getItem('gameData')) ? JSON.parse(localStorage.getItem('gameData')) : {
    playerScore:0,
    currentLevel: 0,
    levels : [
        {
            letter: 'B',
            wallpaper: 'wall_level1.jpg',
            story: 'Story level 1',
            audio: 'B.mp3',
            help: ''


        },
        {
            letter: 'U',
            wallpaper: 'wall_level1.jpg',
            story: 'Story level 2',
            audio: 'B.mp3',
            help: ''


        }
     ]
     

    
}

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


function dataObjectUpdated() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function startGame(){
    gameData.currentLevel = 0;
    dataObjectUpdated();
}
function loadlevel(level){
    gameData.currentLevel++;
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

function levelWon(){
    can1.erase();
    gameData.playerScore += 50;
    $('#winBox').fadeIn();

    dataObjectUpdated();
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
    loadlevel(gameData.currentLevel +1);
    return false;
})
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
startGame();
loadlevel(1);

//FILL CANVAS

//RUN CANVAS

function setup() {
    
    createCanvas(windowWidth, windowHeight).parent("canvasContainer");
    butterfly = new Butterfly(windowWidth/4, windowHeight/4, 0, 0);
    //butterfly.setSpeed(3,3);

    /*
    switch(gameData.currentLevel) {
        case 1:
          // code block
          setRecognizeCanvasPosition(butterfly.x*2, butterfly.y*2 - 90);
          break;
        case 2:
          // code block
          setRecognizeCanvasPosition(200, 200);
          break;
        default:
          // code block
      }
    */

}
function draw() {

    var canvas= document.getElementById("defaultCalvas0");
    clear(canvas); // clear canvas view each tim draw is called;
    if(gameData.currentLevel == 1){
        setRecognizeCanvasPosition(butterfly.x*2, butterfly.y*2 - 90);
        butterfly.move(butterfly.vx, butterfly.vy);
        butterfly.draw();
    }
    if(gameData.currentLevel == 2){
        //GENERATE LEVEL 2 ELEMENTS 
    }
    
}
