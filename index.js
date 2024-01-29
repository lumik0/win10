const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');

const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {log: false, logLevel: 1});

String.prototype.replaceAll = function replaceAll(search, replace) { return this.split(search).join(replace); }

app.use("/ins", express.static(__dirname + "/install"));
app.use("/lib", express.static(__dirname + "/lib"));
app.use("/res", express.static(__dirname + "/res"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/install/index.html');
});
app.get('/install', (req, res) => {
    res.sendFile(__dirname + '/install/install.html');
});
app.get('/windows', (req, res) => {
    res.sendFile(__dirname + '/res/index.html');
});
app.get('/getfiles', (req, res) => {
    let array = [];
    req.query.path = req.query.path.replaceAll('-','/').toString();
    fs.readdirSync(__dirname + '/' + req.query.path).forEach(file => {
        array.push(file);
    });

    res.send(JSON.stringify(array));
});

function downloadFile(url, p) {
    const filename = path.basename(url);

    https.get(url, (res) => {
        const fileStream = fs.createWriteStream(p+filename);
        res.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close();
            console.log('Download finished');
        });
    })
}

function update() {
    downloadFile('https://raw.githubusercontent.com/lumik0/win10/main/res/ins.json', 'install/');
    let d = fs.readFileSync(__dirname + '/install/ins.json', 'utf-8');
    d = JSON.parse(d);
    if(!fs.existsSync(__dirname+'/res')) fs.mkdirSync(__dirname+'/res');
    if(!fs.existsSync(__dirname+'/res/sys')) fs.mkdirSync(__dirname+'/res/sys');
    if(!fs.existsSync(__dirname+'/res/images')) fs.mkdirSync(__dirname+'/res/images');
    if(!fs.existsSync(__dirname+'/res/apps')) fs.mkdirSync(__dirname+'/res/apps');
    if(!fs.existsSync(__dirname+'/res/windows')) fs.mkdirSync(__dirname+'/res/windows');
    if(!fs.existsSync(__dirname+'/res/desktop')) fs.mkdirSync(__dirname+'/res/desktop');
    if(!fs.existsSync(__dirname+'/res/apps/finder')) fs.mkdirSync(__dirname+'/res/apps/finder');
    if(!fs.existsSync(__dirname+'/res/apps/notepad')) fs.mkdirSync(__dirname+'/res/apps/notepad');
    if(!fs.existsSync(__dirname+'/res/apps/settings')) fs.mkdirSync(__dirname+'/res/apps/settings');
    if(!fs.existsSync(__dirname+'/res/apps/winver')) fs.mkdirSync(__dirname+'/res/apps/winver');
    for(let i = 0; i < d.length; i++) {
        downloadFile(d[i][0], d[i][1]);
    }
}

io.on('connection', (socket) => {
    socket.on('ex file', (path) => {
        try {
            let d = fs.existsSync(__dirname + path);
            socket.emit('ex file', d);
        } catch(e) { socket.emit('error',e); }
    });

    socket.on('update', () => {
        update();
        socket.emit('update finish');
    });

    socket.on('read file', (path, type) => {
        try {
            let d = fs.readFileSync(__dirname + path);
            if(type === 'json') d = d.toJSON();
            socket.emit('file', d);
        } catch(e) { socket.emit('error',e); }
    });

    socket.on('write file', (path, data) => {
        fs.writeFileSync(__dirname + path, data, 'utf-8');
    });

    socket.on('install', () => {
        update();
        socket.emit('install finish');
        fs.writeFileSync( __dirname + '/res/reg.json','{}','utf-8');
    });
});

server.listen(80, () => {
    console.log('Server started');
});