var gameData = (localStorage.getItem('gameData')) ? JSON.parse(localStorage.getItem('gameData')) : {
    completedLevels: 0,
    playerScore:0,
    currentLevel: 0,
    levels : [
        {
            letter: 'B',
            wallpaper: 'wall_level1.jpg',
            story: 'Story level 1',
            audio: 'B.mp3',
            help: '',
            won: false,
            completed: false



        },
        {
            letter: 'U',
            wallpaper: 'wall_level1.jpg',
            story: 'Story level 2',
            audio: 'U.mp3',
            help: '',
            won: false,
            completed: false


        }
     ]
     

    
}
