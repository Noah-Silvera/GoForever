define(['./controller'], function(Controller){

    class GameController extends Controller{
        
        
        getRandomMove(){
            var postData = {
            "size": size,
            "board": board,
            "last": lastMove
        }
        
        var options = {
            hostname: 'roberts.seng.uvic.ca',
            path: '/ai/random',
            port: '30000',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(postData))
            } 
        };
        
        var result;
        
        var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                // should test for chunk
            result = JSON.parse(chunk);
            });
            res.on('end', () => {
                // do something with result, call function etc
            })
        });
        
        req.on('error', (e) => {
            console.log('problem with request: ${e.message}');
        });
        
        req.write(JSON.stringify(postData));
        req.end();

        }
    }
    var gameController = new GameController()
    
    return gameController
})

