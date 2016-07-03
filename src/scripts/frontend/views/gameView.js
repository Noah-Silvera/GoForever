
//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view'],function(View){


    class GameView extends View{

        constructor(){
            super(arguments)
            //simply a reference definition for the possible states that 
            // should be passed to the view
            this.states = ['firstState','secondState','thirdState']

        }
        
        render(){
            switch(this.viewState){
                case this.states[0]:

                    break;
                case this.states[1]:

                    break;
                case this.states[2]:

                    break;
                default:
                    throw 'invalid state'
                    break;
            }
        }
        
        //state requires size board n*n with moves 0, 1, 2 for this to function correctly
        drawBoard(state){
            var canvas = $("#canvas"); 
            
            var W = 600, H = 600; 
            canvas.css("height", H); 
            canvas.css("width", W); 

            var svg = $(makeSVG(W, H));
            
            for(var i = H/(state.size); i < H; i += H/(state.size)){
                svg.append(makeLine(0, i, W, i));
            }
            for(var i = W/(state.size ); i < W; i += W/(state.size)){
                svg.append(makeLine(i, 0, i, H));
            }
            
            svg.append(makeRectangle(0, 0, W, H/(2*(state.size )), "Peru"));
            svg.append(makeRectangle(0, H - H/(2*(state.size )), W, H/(2*(state.size )), "Peru"));
            svg.append(makeRectangle(0, 0, W/(2*(state.size )), H, "Peru"));
            svg.append(makeRectangle(W - W/(2*(state.size )), 0, W/(2*(state.size )), H, "Peru"));
            
            for(var i = 1; i < (state.board.length); i++){
            var distance = H/(state.size );
            for(var j = 1; j < (state.size ); j++){
                switch (state.board[i][j]){
                    case 1:
                        svg.append(makeCircle(i*distance, j*distance, distance/2, "black", "Peru", 2));
                    break;
                    case 2:
                        svg.append(makeCircle(i*distance, j*distance, distance/2, "lightGray", "Peru", 2));
                    break;
                    default:
                }
            }
        }
        
        canvas.append(svg);
        }
        
    }

    // this is part of a tricky workaround with circular dependencies
    // see the controllers return for details
    var gameView = new GameView(null,null,null)

    return gameView
})