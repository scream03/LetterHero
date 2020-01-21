function unlockCompletedLevels(){

    let playLevelButtons = document.getElementsByClassName('playLevelButton');
    let levelToUnlock=0;
    while (levelToUnlock < gameData.completedLevels +1) {
        let buttonToUnlock = playLevelButtons[levelToUnlock];
        unlockLevelButton(buttonToUnlock);
        levelToUnlock++;
      }
    
    
    
    
}

function unlockLevelButton(button){
    $(button).removeClass("lockedButton");    
}

$('.playLevelButton').click(
    function(){
        console.log('PLay button clicked');
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
