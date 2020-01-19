console.log('script called');


//BUTTERFLY

function Butterfly(x_pos, y_pos, v_x, v_y) {
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.bodyColor = (0, 0, 0);
    this.wingColorR = 20;
    this.wingColorG = 106;
    this.wingColorB = 230;
    this.bodyColorR = 0;
    this.bodyColorG = 0;
    this.bodyColorB = 0;
    this.scaleFactor = 2.5;

    //ANIMATION PARAMETERS
    this.beginAnimX = 0;
    this.beginAnimY = 0;
    this.endAnimX = 0;
    this.endAnimY = 0;

    
    this.distX = 0;
    this.distY = 0; // Y-axis distance to move
    this.exponent = 2; // Determines the curve
    this.step = 0.01; // Size of each step along the path
    this.pct = 0.0; // Percentage traveled (0.0 to 1.0)

}

Butterfly.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
}
Butterfly.prototype.drawBody = function () {
    push();

    //translate(windowWidth, windowHeight);
    //rotate(PI);
    fill(this.bodyColorR, this.bodyColorG, this.bodyColorB);
    ellipse(this.x, this.y, 26, 154);
    ellipse(this.x, this.y - 154 / 2 - 15, 30, 30);
    pop();


    //bezier();
}
Butterfly.prototype.drawWings = function () {
    push();
    translate(this.x, this.y);
    //rotate(-PI/4);
    strokeWeight(5);
    stroke(this.wingColorR, this.wingColorG, this.wingColorB);
    fill(this.wingColorR, this.wingColorG, this.wingColorB);
    this.scale();
    //left wing
    bezier(0, 0, 1, -60, 70, -5, 0, 0);
    bezier(0, 0, 70, -10, 25, 45, 0, 20);
    //right wing
    bezier(0, 0, -1, -60, -70, -5, 0, 0);
    bezier(0, 0, -70, -10, -25, 45, 0, 20);

    pop();



}

Butterfly.prototype.move = function () {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 100 || this.x > width) {
        this.vx *= -1;

    }
    if (this.y < 100 || this.y > height) {
        this.vy *= -1;

    }

}
Butterfly.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
}

Butterfly.prototype.setAnimation= function (begin_x , begin_y, end_x, end_y) {
    this.beginAnimX = begin_x;
    this.beginAnimY = begin_y;
    this.endAnimX = end_x;
    this.endAnimY = end_y;

    this.distX = end_x - begin_x;
    this.distY = end_y - begin_y;
}
Butterfly.prototype.triggerAnimationLv2= function () {
    this.pct += this.step;
    if (this.pct < 1.0) {
        this.x = this.beginAnimX + this.pct * this.distX;
        if(this.pct < 0.5){
            this.y = this.beginAnimY + (-1)*pow(this.pct, this.exponent) * this.distY ;
        }
        
        
    }
    
    
}
Butterfly.prototype.draw = function () {
    push();
    translate(this.x, this.y);

    this.drawWings();
    this.drawBody();

    pop();
}


console.log('UAnimation script called');


//CLOUD
function Cloud(x_pos, y_pos, v_x, v_y) {
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.colorR = 20;
    this.colorG = 106;
    this.colorB = 230;
    this.strokeColorR = 0;
    this.strokeColorG = 0;
    this.strokeColorB = 0;
    this.scaleFactor = 4;

}



Cloud.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Cloud.prototype.drawCloud = function () {
    push();
        this.scale();
        stroke(210);
        strokeWeight(1);
        fill(210);
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

    /*if(this.x < 100 || this.x > width ){
        this.vx *= -1;

    }
    if(this.y < 100 || this.y > height ){
        this.vy *= -1;

    }*/

};
Cloud.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
};

Cloud.prototype.draw = function () {
    push();
    //translate(this.x, this.y);
    this.drawCloud();
    pop();
};

//GLASS


function Glass(x_pos, y_pos, v_x, v_y) {
    this.x = x_pos;
    this.y = y_pos;
    this.vx = v_x;
    this.vy = v_y;
    this.colorR = 20;
    this.colorG = 106;
    this.colorB = 230;
    this.scaleFactor = 2.5;

}



Glass.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Glass.prototype.drawLetter = function () {
    push();
    translate(this.x*2, this.y *2);
    //rotate(-PI/4);
    // strokeWeight(5);
    // stroke(this.wingColorR, this.wingColorG, this.wingColorB);
    fill(this.colorR, this.colorG, this.colorB);
    this.scale();
    //left wing
    textSize(100);
    text('U', -30, 50);
    pop();
};




Glass.prototype.move = function () {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 100 || this.x > width) {
        this.vx *= -1;

    }
    if (this.y < 100 || this.y > height) {
        this.vy *= -1;

    }

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
    this.colorR = 0;
    this.colorG = 210;
    this.colorB = 210;
    this.scaleFactor = 2.5;
    this.dropsNumber = dropsNumber;
    this.dropsSize = 10;
    this.rainLimit = limit;
    this.drops
    //this.drops =[]

}



Rain.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Rain.prototype.drawDrops = function () {
    push();
        translate(this.x, this.y);
        this.scale();
        let i = 0;
        while(i < this.dropsNumber){
            stroke(this.colorR);
            strokeWeight(1);
            line(this.x + i*6 , this.y + 12 , this.x + i*6, this.y + 10 + this.dropsSize);

            i++;
        }
    
    pop();
};




Rain.prototype.move = function () {

    this.x += this.vx;
    this.y += this.vy;
    /*
    if (this.x < 100 || this.x > width) {
        this.vx *= -1;

    }
    if (this.y < 100 || this.y > height) {
        this.vy *= -1;

    }
    */
   if (this.y > this.rainLimit) {
        this.y = this.initY;
   }

};


Rain.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
};
Rain.prototype.setLimit = function (newLimit) {
    this.rainLimit = newLimit;
    
};

Rain.prototype.draw = function () {
    push();
        //translate(this.x, this.y);
        this.drawDrops();
    pop();
};



