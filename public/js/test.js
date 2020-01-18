let sun;
function Sun(x, y) {
    this.x = x;
    this.y = y;
    this.ran = random(-1.5, 1.5);

    this.stripes1 = [];
    this.stripes2 = [];

    this.createStripes = function () {

        
        for (let i = 0; i < 16; i++) {
            if (i % 2 != 0) {
                let firststripe = {
                    xi: -120 * cos(PI / 8 * i) - 70 * sin(PI / 8 * i),
                    yi: +120 * sin(PI / 8 * i) - 70 * cos(PI / 8 * i),
                    xf: -120 * cos(PI / 8 * i) - 70 * sin(PI / 8 * i),
                    yf: +120 * sin(PI / 8 * i) - 70 * cos(PI / 8 * i)
                }
                this.stripes1.push(firststripe);
            }
        }
        for (let i = 0; i < 8; i++) {

            let secondstripe = {
                xi: -(160) * cos(PI / 4 * i) - (90) * sin(PI / 4 * i),
                yi: +(160) * sin(PI / 4 * i) - (90) * cos(PI / 4 * i),
                xf: -(160) * cos(PI / 4 * i) - (90) * sin(PI / 4 * i),
                yf: +(160) * sin(PI / 4 * i) - (90) * cos(PI / 4 * i)
            }
            this.stripes2.push(secondstripe);

        }



    }
    this.animate = function () {
        for (let s of this.stripes1) {
            s.xf = s.xi;
            s.yf = s.yi;
            s.xf *= random(-1.5, 1.5);
            s.yf *= random(-1.5, 1.5);
        }
        for (let s of this.stripes2) {
            s.xf = s.xi;
            s.yf = s.yi;
            s.xf *= random(-1.5, 1.5);
            s.yf *= random(-1.5, 1.5);
        }
    }
    this.draw = function () {
        for (let s of this.stripes1) {
            line(0, 0, s.xf, s.yf);
        }
        for (let s of this.stripes2) {
            line(0, 0, s.xf, s.yf);
        }
    }



}
function setup() {
    sun = new Sun(200, 300);
    sun.createStripes();
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    sun.createStripes();
    sun.animate();
    //var k= document.getElementById("defaultCanvas0");
    var k = document.getElementById("defaultCanvas0");
    noFill();
    stroke(137, 183, 189);

    let xsun = 200;
    let ysun = 200;

    //mp=false;
    clear(k);

    push();
    push()
    fill(255, 140, 0);
    stroke(255, 140, 0);
    strokeWeight(5);
    translate(200, 300);
    sun.draw();
    ellipse(0, 0, 150, 150);
    fill(255, 255, 51);
    ellipse(0, 0, 100, 100);
    pop()



    pop();
}