win = { name: 'Блокнот', width: 500, height: 505, ore: false };

function start(args) {
    let path = args;

    app.append(
        //'<div style="display:gird">'+
        //''+
        '<div id="menu'+id+'"></div>'+
        //'<li class="hov">Файл'+
        //'<ul class="main">'+
        //'<li id="notepad-menu-new">Новый</li>'+
        //'<li id="notepad-menu-open">Открыть</li>'+
        //'<li id="notepad-menu-save">Сохранить</li>'+
        //'<li id="notepad-menu-savehow">Сохранить как..</li>'+
        //'<li onclick="exit()">Выход</li>'+
        //'</ul>'+
        //'</li>'+
        ''+
        //'<button class="window_btn">File</button><button class="window_btn">Edit</button></div>'+
        '<div id="notepad-text'+id+'" contenteditable="true" style="position: relative; overflow:scroll; height:460px"></div>'+
        ''+
        ''+
        ''+
        ''
    );

    /*const menuItems = [
        { text : "Файл", id : 1, subMenuItems : [
            { text : "Новый", handler : neww, shortcut : "Ctrl+N", icon : "✏"},
            { text : "Open" },
            { text : "Open Recent", subMenuItems : [
                { text : "File1.txt"},
                { text : "File2.txt"},
                { separator : true},
                { text : "Or even older" , subMenuItems : [
                    { text : "File3.txt"},
                    { text : "File4.txt"},
                ]}
            ]},
            { separator : true},
            { text : "Save", shortcut : "Ctrl+S", icon : "&#128190;", enabled : false },
            { text : "Save As...", shortcut : "Ctrl+Shift+S" }
        ]}, 
        { text : "Edit", subMenuItems : [
            { text : "Cut", icon : "✂️" },
            { text : "Copy", icon : "📄" },
            { text : "Paste", icon : "📋"},
        ]}, 
        { text : "Help", subMenuItems : [
            { text : "More", icon : "☃", subMenuItems : [
                { text : "This" },
                { text : "And that" },
            ]},
        ]},
    ];*/

    const menuItems = [
        { text : "Файл", id : 1, subMenuItems : [
            { text : "Новый", handler : neww, shortcut : "Ctrl+N", icon : "📄"},
            { text : "Открыть", enabled : false },
            { text : "Сохранить", handler : save, shortcut : "Ctrl+S", icon : "&#128190;", enabled : true },
        ]}
    ];

    function neww() {

    }
    function open() {

    }
    function save() {
        if(path) {
            fs_writefile(path, $('#notepad-text'+id+'').html(), () => {
                
            });
        } else {

        }
    }
    menubar = new MenuBar(document.getElementById("menu"+id), menuItems);

    if(path) fs_readfile(path, (data) => {
        $('#notepad-text'+id+'').html(data);
    });
}
