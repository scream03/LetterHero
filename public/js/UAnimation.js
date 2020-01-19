console.log('UAnimation script called');


function Glass(x_pos, y_pos, v_x, v_y) {
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

}

Glass.prototype.scale = function () {
    scale(this.scaleFactor, this.scaleFactor);
};

Glass.prototype.drawLetter = function () {
    push();
    translate(this.x, this.y);
    //rotate(-PI/4);
    // strokeWeight(5);
    // stroke(this.wingColorR, this.wingColorG, this.wingColorB);
    fill(this.wingColorR, this.wingColorG, this.wingColorB);
    this.scale();
    //left wing
    textSize(100);
    text('U', -30, 50);
    pop();
};

Glass.prototype.move = function () {

    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 100 || this.x > width ){
        this.vx *= -1;

    }
    if(this.y < 100 || this.y > height ){
        this.vy *= -1;

    }

};
Glass.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x;
    this.vy = v_y;
};

Glass.prototype.draw = function () {
    push();
    translate(this.x, this.y);
    this.drawLetter();
    pop();
};