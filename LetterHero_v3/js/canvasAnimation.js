

//BUTTERFLY

function Butterfly(x_pos, y_pos, v_x, v_y) {
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.bodyColor = (0, 0, 0);
    this.wingColorR = 235;
    this.wingColorG = 87;
    this.wingColorB = 87;
    this.bodyColorR = 255;
    this.bodyColorG = 255;
    this.bodyColorB = 255;
    this.scaleFactor = 2.5;

    //ANIMATION PARAMETERS
    this.beginAnimX = 0;
    this.beginAnimY = 0;
    this.endAnimX = 0;
    this.endAnimY = 0;

    
    this.distX = 0;
    this.distY = 0; // Y-axis distance to move
    this.exponent = 2; // Determines the curve
    this.step = 0.001; // Size of each step along the path
    this.pct = 0.0; // Percentage traveled (0.0 to 1.0)


}

Butterfly.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
}
Butterfly.prototype.drawBody = function () {
    push();
        
        strokeWeight(2);
        stroke(this.wingColorR, this.wingColorG, this.wingColorB);
        fill(this.bodyColorR, this.bodyColorG, this.bodyColorB);
        ellipse(this.x, this.y, 26, 154);
        ellipse(this.x, this.y - 154 / 2 - 15, 30, 30);

    pop();
}
Butterfly.prototype.drawWings = function () {
    push();

        translate(this.x, this.y);
        strokeWeight(2);
        stroke(255, 255, 255);
        fill(this.wingColorR, this.wingColorG, this.wingColorB);
        this.scale(); //scale butterfly according to her scale factor
        // draw left wing
        bezier(0, 0, 1, -60, 70, -5, 0, 0);
        bezier(0, 0, 70, -10, 25, 45, 0, 20);
        // draw right wing
        bezier(0, 0, -1, -60, -70, -5, 0, 0);
        bezier(0, 0, -70, -10, -25, 45, 0, 20);

    pop();



}

Butterfly.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
}
Butterfly.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
}
Butterfly.prototype.setAnimation= function (begin_x , begin_y, end_x, end_y, _exponent ,_step) {

    this.beginAnimX = begin_x;
    this.beginAnimY = begin_y;
    this.endAnimX = end_x;
    this.endAnimY = end_y;

    this.distX = end_x - begin_x;
    this.distY = end_y - begin_y;
    this.step = _step;
}

Butterfly.prototype.triggerAnimationLv1= function () {
    this.pct += this.step;
    if (this.pct < 1.0) {
        //Update object position until it reaches the end point
        this.x = this.beginAnimX + this.pct * this.distX;
        this.y = this.beginAnimY + pow(this.pct,this.exponent) * this.distY;
    }
}
Butterfly.prototype.triggerAnimationLv2= function () {
    this.pct += this.step; 
    if (this.pct < 1.0) {
        this.x = this.beginAnimX + this.pct * this.distX;
        this.y = this.beginAnimY + pow(this.pct, 0.5) * this.distY/1.5 ;
    }
    
}
Butterfly.prototype.draw = function () {
    push();
    translate(this.x, this.y);

    this.drawWings();
    this.drawBody();

    pop();
}




//CLOUD
function Cloud(x_pos, y_pos, v_x, v_y) {
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.color = 210;
    this.scaleFactor = 4;

}

Cloud.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Cloud.prototype.drawCloud = function () {
    push();
        this.scale();
        stroke(this.color);
        fill(this.color);
        ellipse(this.x, this.y, 24, 24);
        ellipse(this.x + 10, this.y + 10, 24, 24);
        ellipse(this.x + 30, this.y + 10, 24, 24);
        ellipse(this.x + 30, this.y - 10, 24, 24);
        ellipse(this.x + 20, this.y - 10, 24, 24);
        ellipse(this.x + 40, this.y, 24, 24);
    pop();
};




Cloud.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
};
Cloud.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
};

Cloud.prototype.draw = function () {
    push();
        this.drawCloud();
    pop();
};

//GLASS


function Glass(x_pos, y_pos, v_x, v_y) {
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.colorR = 235;
    this.colorG = 87;
    this.colorB = 87;
    this.scaleFactor = 2.5;
    this.font = loadFont('https://scream03.github.io/LetterHero/LetterHero_v3/fonts/gochiHand.tff');

}



Glass.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Glass.prototype.drawLetter = function () {
    push();
        translate(this.x*2, this.y *2);
        fill(this.colorR, this.colorG, this.colorB);
        this.scale();
        textFont(this.font);
        textSize(100);
        text('U', -30, 50);
    pop();
};




Glass.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
};
Glass.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
};

Glass.prototype.draw = function () {
   
    this.drawLetter();
    
};

//RAIN

function Rain(x_pos, y_pos, v_x, v_y, dropsNumber, limit) {
    this.initX = x_pos;
    this.initY = y_pos;
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.scaleFactor = 2.5;
    this.dropsNumber = dropsNumber;
    this.dropsSize = 10;
    this.rainLimit = limit;    
    this.dropsy = randomDataSet(15, 0, 40);

}



Rain.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Rain.prototype.drawDrops = function () {
    push();
        noStroke();
        fill(255);
        if(this.y > this.rainLimit){
            this.y = this.initY;
        }
        for(let i = 0; i < this.dropsNumber ; i++){
            ellipse(this.x + i*5, this.y + this.dropsy[i], 5, 18);
        }
        //move rain over y
        this.y = this.y + this.vy; 
    pop();
};


Rain.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
};


Rain.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
};
Rain.prototype.setLimit = function (newLimit) {
    this.rainLimit = newLimit;
};

Rain.prototype.draw = function () {
    this.drawDrops();
};


function randomDataSet(dataSetSize, minValue, maxValue) {
    //Create rain drops in random position
    return new Array(dataSetSize).fill(0).map(function(n) {
      return Math.random() * (maxValue - minValue) + minValue;
    });
}
