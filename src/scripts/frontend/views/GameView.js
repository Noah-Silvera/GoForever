class GameView {
    
    
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