
//The view ALSO DEPENDS ON gameController.js
// this cannot be modeled because of circular dependencies and requirejs
// see gameController.js
define(['./view','jquery','utils/svgFactory'],function(View,$,svgFactory){


    class GameView extends View{

        constructor(){
            super(arguments)
            //simply a reference definition for the possible states that 
            // should be passed to the view

        }
        
        render(){
            switch(this.viewState){
                case 'gameActive':
                    
                    var boardElem = $("#board").find('svg')[0]; 

                    this.drawBoard(boardElem,
                        {"size":11,"board":[[0,1,1,2,2,1,2,2,2,2,1],[2,2,2,2,0,2,1,0,0,1,1],[0,1,2,2,2,2,0,2,0,0,2],[2,1,0,2,1,0,2,0,2,1,0],[1,0,1,0,2,1,0,1,0,1,2],[0,0,0,0,0,2,2,0,1,1,1],[0,2,1,2,0,0,1,1,0,2,0],[1,1,1,0,0,1,2,2,1,2,2],[2,0,2,0,1,0,0,1,0,2,2],[2,2,1,0,2,1,1,1,1,0,2],[2,2,2,1,2,2,2,1,1,1,1]]}
                        )

                    break;
                case 'replay':

                    break;
                case 'endGame':

                    break;
                default:
                    throw 'invalid state'
                    break;
            }
        }
        
        //state requires size board n*n with moves 0, 1, 2 for this to function correctly
        drawBoard(svgElem, state){
            svgElem = $(svgElem)
            
            var H = svgElem.parent().height()
            var W = svgElem.parent().width()

            svgElem.attr('width',W)
            svgElem.attr('height',H)
            svgElem.attr('xmlns','http://www.w3.org/2000/svg')
            svgElem.attr('xmlns:xlink','http://www.w3.org/1999/xlink')

            
            for(var i = H/(state.size); i < H; i += H/(state.size)){
                svgElem.append(svgFactory.makeLine(0, i, W, i));
            }
            for(var i = W/(state.size ); i < W; i += W/(state.size)){
                svgElem.append(svgFactory.makeLine(i, 0, i, H));
            }
            
            svgElem.append(svgFactory.makeRectangle(0, 0, W, H/(2*(state.size )), "Peru"));
            svgElem.append(svgFactory.makeRectangle(0, H - H/(2*(state.size )), W, H/(2*(state.size )), "Peru"));
            svgElem.append(svgFactory.makeRectangle(0, 0, W/(2*(state.size )), H, "Peru"));
            svgElem.append(svgFactory.makeRectangle(W - W/(2*(state.size )), 0, W/(2*(state.size )), H, "Peru"));
            
            for(var i = 1; i < (state.board.length); i++){
            var distance = H/(state.size );
            for(var j = 1; j < (state.size ); j++){
                switch (state.board[i][j]){
                    case 1:
                        svgElem.append(svgFactory.makeCircle(i*distance, j*distance, distance/2, "black", "Peru", 2));
                        break;
                    case 2:
                        svgElem.append(svgFactory.makeCircle(i*distance, j*distance, distance/2, "lightGray", "Peru", 2));
                        break;
                    case 0:
                        svgElem.append(svgFactory.makeRectangle(i*distance, j*distance, distance/2, distance/2,'black',true ))
                        break;
                    default:
                        
                }
            }
        }
        
        svgElem;
        }
        
    }

    // this is part of a tricky workaround with circular dependencies
    // see the controllers return for details
    var gameView = new GameView(null,null,null)

    return gameView
})