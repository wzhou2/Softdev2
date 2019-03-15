// DOM Variables
var pic = document.getElementById("vimage");
var button = document.getElementById("but_clear");
var move_button = document.getElementById("move");

// Coordinates
var x = null;
var y = null;

// Animation Variables
var xspeed = 1;
var yspeed = 1;
var state;

// Functions
var circle = function(canvas, x, y, r, fill, stroke) {
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute( "cx", x);
    c.setAttribute( "cy", y);
    c.setAttribute( "r", r);
    c.setAttribute( "fill", fill);
    c.setAttribute( "stroke", stroke);

    c.addEventListener('click', function(e) {
        // console.log(e)
        circleAction(canvas, e.target);
    });

    canvas.appendChild(c);
}

var line = function(canvas, x1, y1, x2, y2, stroke) {
    var c = canvas.lastChild
    var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute( "x1", x1);
    l.setAttribute( "y1", y1);
    l.setAttribute( "x2", x2);
    l.setAttribute( "y2", y2);
    l.setAttribute( "stroke", stroke);

    canvas.appendChild(l);
    canvas.appendChild(c);
}

var circleAction = function(canvas, target) {
    if (target.getAttribute("fill") == "purple") {
        target.setAttribute( "fill", "green");
    } else {
        canvas.removeChild(target);
        circle(canvas, Math.random()*500, Math.random()*500, "10", "purple", "black");
    }
}

var clear = function() {
    pic.innerHTML = '';
    x = null;
    y = null;
}

// Get circles
var get_circles = function(canvas){
    return canvas.children;
}


// Animate
var animate = function() {
    // Cancel existing animation
    window.cancelAnimationFrame(state);

    children = get_circles(pic)
    console.log(children);
    for (x = 0; x < children.length; x++) {
        console.log(children.length);
        child = children[x]
        x = child.getAttribute("cx");
        y = child.getAttribute("cy");
        r = child.getAttribute("r");
        color = child.getAttribute("fill");
        stroke = child.getAttribute("stroke");

        // Touches the horizontal edge
        if (x + r<= 0 || x - r >= 500) {
            xspeed = -1*xspeed;
        }

        // Touches the vertical edge
        if (y + r <= 0 || y - r >= 500) {
            yspeed = -1*yspeed;
        }

        // Apply translations
        x += xspeed;
        y += yspeed;
        pic.removeChild(child);
        circle(x, y, r, color, stroke);
    }
    state = window.requestAnimationFrame(animate);
}

// Event Listeners
pic.addEventListener('click', function(e) {
    // Svg object
    e.preventDefault()
    if (e.target == pic) {
        // console.log(e)
        // if (x != null) {
        //     line(pic, x, y, e.offsetX, e.offsetY, "black");
        // }
        x = e.offsetX;
        y = e.offsetY;
        circle(pic, x, y, "10", "purple", "black");
    }
});

// Clear
button.addEventListener('click', clear);
// Move
move_button.addEventListener('click', animate);
