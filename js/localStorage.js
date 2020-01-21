var gameData = (localStorage.getItem('gameData')) ? JSON.parse(localStorage.getItem('gameData')) : {
    completedLevels: 0,
    playerScore:0,
    currentLevel: 0,
    levels : [
        {
            letter: 'B',
            wallpaper: 'wall_level1.jpg',
            won: false,
            completed: false



        },
        {
            letter: 'U',
            wallpaper: 'wall_level1.jpg',
            won: false,
            completed: false


        }
     ]
     

    
}
