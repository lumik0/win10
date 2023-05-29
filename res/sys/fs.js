/*const fs_require = function(v) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', v, false);

    xhr.send();

    if (xhr.status != 200) {
        return( xhr.status + ': ' + xhr.statusText );
    } else {
        return( xhr.responseText );
    }
}

const fs_get_path = function(path) {
    let p = ''+path;
    p = p.split('/');

    let o = `["C"]['data']`;

    for(let i = 1; i < p.length; i++) {
        if(p[i] === '') break;
        eval(`if(p[i] === fs`+o+`["`+p[i]+`"].name) { o+='["`+p[i]+`"]["data"]';}`);
    }
    eval(`p = fs`+o+`; //if(fs`+o+`.name === p[p.length]) { p = fs`+o+`; } else { p = null; }`);

    return p;
}

const fs_isFile = function(e) {
    if(e.includes('.')) return true; else false;
}

let f_ex = /(?:\.([^.]+))?$/;
const fs_open = function(path) {

    try {
        let ppath;
        if(typeof path !== 'string') path = fs_get_path(path);
        else ppath = fs_get_path(path);

        let ex = f_ex.exec(path)[1]
        if(ex === 'exe') {
            runWindow(path);
            return true;
        } else if(ex === 'link') {
            runWindow(ppath);
            return true;
        }
        return false
    } catch { window.location = '/res/bsod.html'; }
}*/

const fs_readfile = function(path, call) {
    $.ajax({
        type: "GET",
        url: path,
        success: call
    });
    return true;
}

const fs_writefile = function(path, data) {
    socket.emit('write file', path, data);
    return true;
}

let f_ex = /(?:\.([^.]+))?$/;
const fs_openfile = function(path) {

    fs_readfile(path, (data) => {
        
        //try {
            let ex = f_ex.exec(path)[1]
            if(ex === 'js') {
                runWindow(path);
                return true;
            } else if(ex === 'link') {
                runWindow(data);
                return true;
            }
            return false
        //} catch { window.location = '/res/bsod.html'; }

    });
}

const fs_getFilesInDir = function(path, call) {
    path = path.replaceAll('/','-');

    $.ajax({
        type: "GET",
        url: '/getfiles?path='+path,
        success: function(data) {
            data = JSON.parse(data);
            call(data);
        }
    });
}

//const fs_exists = function(path) {
//    path = fs_get_path(path);
//}

/*let fs = {
    C: {
        name: "Браузерный диск",
        data: {
            'System': { name: 'System',
                type: 'folder',
                data: {
                    'test.json': { name: 'test.json',
                        type: 'file', data: ['["C:/System/winver.exe"]']
                    }, 'Apps': { name: 'Apps',
                        type: 'folder',
                        data: {
                            'winver.exe': { name: 'winver.exe',
                                type: 'file', data: fs_require('/res/apps/winver/winver.js')
                            }, 'finder.exe': { name: 'finder.exe',
                                type: 'file', data: fs_require('/res/apps/finder/main.js')
                            }, 'test.txt': { name: 'test.txt',
                                type: 'file', data: 'ds'
                            }, 'notepad.exe': { name: 'notepad.exe',
                                type: 'file', data: fs_require('/res/apps/notepad/main.js')
                            }, 'error.exe': { name: 'error.exe',
                                type: 'file', data: fs_require('/res/apps/error.js')
                            }, 'confirm.exe': { name: 'confirm.exe',
                                type: 'file', data: fs_require('/res/apps/confirm.js')
                            }, 'settings.exe': { name: 'settings.exe',
                                type: 'file', data: fs_require('/res/apps/settings/main.js')
                            }, 'test.exe': { name: 'test.exe',
                                type: 'file', data: fs_require('/res/apps/test.js')
                            }
                        }
                    }, 'Desktop': { name: 'Desktop',
                        type: 'folder',
                        data: {
                            'Проводник.link': { name: 'Проводник.link',
                                type: 'file', data: 'C/System/Apps/finder.exe'
                            }
                        }
                    }
                }
            }
        }
    }
}*/