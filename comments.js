// create web sever

// 1. load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// 2. create web server object
var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource = ' + resource);

    // 3. process request
    if(resource == '/'){
        fs.readFile('comment.html', 'utf-8', function(error, data){
            if(error){
                response.writeHead(500, {'Content-Type':'text/html'});
                response.end('500 Internal Server ' + error);
            }else{
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(resource == '/create'){
        if(request.method == 'POST'){
            request.on('data', function(data){
                var parsedStr = qs.parse(data.toString());
                var title = parsedStr.title;
                var description = parsedStr.description;
                console.log(title, description);
            });
            response.writeHead(302, {'Location':'/'});
            response.end();
        }else{
            fs.readFile('create.html', 'utf-8', function(error, data){
                if(error){
                    response.writeHead(500, {'Content-Type':'text/html'});
                    response.end('500 Internal Server ' + error);
                }else{
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(data);
                }
            });
        }
    }else{
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end('404 Page Not Found');
    }
});

// 4. start web server
server.listen(80, function(){
    console.log('Server is running...');
});



