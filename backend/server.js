// const http = require('http');


// const server = http.createServer((req, res) => {
//     res .end('Hello, World!');
// });

// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });



// // FILE SYSTEM MODULE

// const fs = require("fs");

// fs.writeFile("text.txt","Hello Students",(err)=>{

//     if(err){

//         console.log(err);

//         return;

//     }

//     console.log("file created successfully")

// })

// fs.appendFile("text.txt", "\n New line added", (err)=>{

//     if(err){

//         console.log(err);

//         return;

//     }

//     console.log("content Added successfully")

// })


const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/users') {
        // Yahan file read karo
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        // 404 Error handling
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});




