function unlockCompletedLevels(){

    console.log('unlock complete level function called!');
    let playLevelButtons = document.getElementsByClassName('playLevelButton');
    console.log(gameData.completedLevels);
    console.log(playLevelButtons);
    let levelToUnlock=0;
    while (levelToUnlock < gameData.completedLevels +1) {
        console.log(levelToUnlock);
        let buttonToUnlock = playLevelButtons[levelToUnlock];
        console.log(buttonToUnlock);
        unlockLevelButton(buttonToUnlock);
        levelToUnlock++;
      }
    
    
    
    
}

function unlockLevelButton(button){
    //button.disabled = false;
    //$(button).removeClass("lockedButton");
    //console.log(button.firstChild());
    //$(button).first().text("Play");
    let play = "Play";
    $(button).text(play);
    $(button).removeClass("lockedButton");
    //console.log(button.firstChild);
    //button.firstChild.nodeValue = '';
    //button.firstChild.nodeValue = play;
    
}
function startLevel(){
    

    
}
$('.playLevelbutton').click(
    function(){
        let playLevelButtons = Array.prototype.slice.call( document.getElementsByClassName('playLevelButton'));
        console.log(playLevelButtons);
        idx = playLevelButtons.indexOf(this);
        gameData.currentLevel = idx +1 ;
        dataObjectUpdated();
        //LOAD GAME PAGE
        window.open('game.html');
    }
    
);  
unlockCompletedLevels();

gameData.currentLevel = 0; //in Levels window the current level is always 0
