console.log('script called');


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
        ellipse(this.x, this.y - 154/2 -15, 30, 30);
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
        bezier(0,0,1,-60, 70, -5,0,0 ); 
        bezier(0,0, 70,-10, 25, 45, 0,20);
        //right wing
        bezier(0,0,-1, -60 , -70,-5, 0, 0);
        bezier(0,0,-70, -10 , -25,45, 0, 20);
        
    pop();


    
}

Butterfly.prototype.move = function () {
    
    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 100 || this.x > width ){
        this.vx *= -1;
        
    }
    if(this.y < 100 || this.y > height ){
        this.vy *= -1;
        
    }

}
Butterfly.prototype.setSpeed = function (v_x, v_y) {
    this.vx = v_x; 
    this.vy = v_y;
}
Butterfly.prototype.draw = function () {
    push();
    translate(this.x, this.y);
   
    this.drawWings();
    this.drawBody();

    pop();
}





