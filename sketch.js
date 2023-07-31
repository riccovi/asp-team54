new p5(p => {
    
    const numStars = 15;
    const stars = [];
    const lineThickness = 2;      
    const starSizeMultiplier = 3; 
    const pulsatingSpeed = 30;    
    
    p.setup = function() {
        p.createCanvas(720  , 500);
        p.colorMode(p.HSB);
        for (let i = 0; i < numStars; i++) {
            stars.push({
                pos: p.createVector(p.random(p.width), p.random(p.height)),
                vel: p.createVector(p.random(-1, 2), p.random(-1, 2)),
                col: p.color(p.random(360), 255, 255),
                size: p.random(1, 4)
            });
        }
    }

    p.draw = function() {
        p.background(0, 25);
        for (let star of stars) {
            updateStar(star);
            p.stroke(star.col);
            p.fill(star.col);
            const size = starSizeMultiplier * ((p.sin(p.frameCount / pulsatingSpeed) * 0.5 + 0.5) * star.size);
            p.ellipse(star.pos.x, star.pos.y, size, size);
        }

        for (let i = 0; i < numStars; i++) {
            for (let j = i + 1; j < numStars; j++) {
                for (let k = j + 1; k < numStars; k++) {
                    if (isEquilateralTriangle(stars[i].pos, stars[j].pos, stars[k].pos)) {
                        drawConnectingLines(stars[i], stars[j], stars[k]);
                    }
                }
            }
        }
    }

    function updateStar(star) {
        star.pos.add(star.vel);
        if (star.pos.x < 0 || star.pos.x > p.width) {
            star.vel.x *= -1;
        }
        if (star.pos.y < 0 || star.pos.y > p.height) {
            star.vel.y *= -1;
        }
    }

    function isEquilateralTriangle(p1, p2, p3) {
        const d12 = p1.dist(p2);
        const d23 = p2.dist(p3);
        const d31 = p3.dist(p1);
        const tolerance = 5;
        return Math.abs(d12 - d23) < tolerance && Math.abs(d23 - d31) < tolerance && Math.abs(d31 - d12) < tolerance;
    }

    function drawConnectingLines(star1, star2, star3) {
        p.strokeWeight(lineThickness);
        const gradient = 0.5;
        p.stroke(p.lerpColor(star1.col, star2.col, gradient));
        p.line(star1.pos.x, star1.pos.y, star2.pos.x, star2.pos.y);
        p.stroke(p.lerpColor(star2.col, star3.col, gradient));
        p.line(star2.pos.x, star2.pos.y, star3.pos.x, star3.pos.y);
        p.stroke(p.lerpColor(star3.col, star1.col, gradient));
        p.line(star3.pos.x, star3.pos.y, star1.pos.x, star1.pos.y);
    }
});
