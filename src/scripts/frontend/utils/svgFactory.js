define(function(){

    var SVGNameSpace = "http://www.w3.org/2000/svg";
    
    return {
            
        'makeLine': function makeLine(x1, y1, x2, y2, color, stroke) {

            var e = document.createElementNS(SVGNameSpace, "line");
            e.setAttribute("x1", x1);
            e.setAttribute("y1", y1);
            e.setAttribute("x2", x2);
            e.setAttribute("y2", y2);

            e.style.stroke      = color || "#000000";
            e.style.strokeWidth = stroke || 2;

            return e;

        },

        'makeRectangle': function makeRectangle(x, y, w, h, c,transparent){
            var rect = document.createElementNS(SVGNameSpace, "rect"); 
            
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", w);
            rect.setAttribute("height", h);
            rect.setAttribute("fill", c);

            if( transparent ){
                rect.setAttribute("fill-opacity", 0.0);
            }

            return rect; 
        },


        'makeCircle':function makeCircle(x, y, r, c, stroke, strokeWidth){

            var circ = document.createElementNS(SVGNameSpace, "circle"); 
            
            circ.setAttribute("cx", x);
            circ.setAttribute("cy", y);
            circ.setAttribute("r", r);
            circ.setAttribute("fill", c);
            circ.setAttribute("stroke", stroke);
            circ.setAttribute("stroke-width", strokeWidth);


            return circ;

        },

        'makeTransparentCircle':function makeCircle(x, y, r, c,transparent){

            var circ = document.createElementNS(SVGNameSpace, "circle"); 
            
            circ.setAttribute("cx", x);
            circ.setAttribute("cy", y);
            circ.setAttribute("r", r);
            circ.setAttribute("fill", c);


            if( transparent ){
                circ.setAttribute("fill-opacity", 0.0);
            }

            return circ;

        }
    }


})