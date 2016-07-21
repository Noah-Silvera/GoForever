var http = require("http");
var request = require("request");

function getRandomMove(size, board, lastMove, cb){
    var postData = {
        "size": size,
        "board": board,
        "last": lastMove
    }
    
    var options = {
        hostname: 'localhost',
        path: '/ai/maxLibs',
        port: '3001',
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
           try {
                result = JSON.parse(chunk);
            } catch (error) {
                
            }
        });
        res.on('end', () => {
            cb(result);
        })
    });
    
    
    
    req.on('error', (e) => {
        console.log(`problem with request: ${e}`);
    });
    
    req.write(JSON.stringify(postData));
    req.end();


}

function getArmies(size, board, lastMove, cb){
    var postData = {
        "size" : size,
        "board": board,
        "last": lastMove  }
    
    var options = {
        hostname: 'localhost',
        path: '/util/findArmies',
        port: '3001',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData))
        } 
    };
    
    var result = "";
    
    var req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            if(chunk !== "undefined"){
                result += chunk;
            }
        });
        res.on('end', () => {
            try {
                cb(JSON.parse(result));
            } catch (error) {
                
            }
            
        })
    });
    
    
    
    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    
    req.write(JSON.stringify(postData));
    req.end();

}



module.exports = {
    getRandomMove : getRandomMove,
    getArmies : getArmies
}