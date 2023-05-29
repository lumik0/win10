let proccess = [];
let a = 1;
let win = {};
let p_id = 0;

const addScriptWindow = function(p, v) {
    $('#proccess').append('<script id="scr_'+p+'">'+v+'</script>');
}

const script_require = function(v) {
    fs_readfile('/res/apps/'+v, (data) => {
        addScriptWindow(p_id, data);
    });
}

const require = function(v) {
    let d = undefined;
    fs_readfile('/res/apps/'+v, (data) => {
        d = data;
    }); return d;
}

const UpdateT = function() {
    let x_pr = 46;
    for(let i = 0; i < 50; i++) {
        $('#ico_'+i).remove();
    }

    for(let i = 0; i < proccess.length; i++) {
        x_pr+=46;
        $('#proccess').append('<img id="ico_'+i+'" src="/images/search.png" width="48" style="position: fixed; left: '+x_pr+'px; bottom: -1px">');
    }
}

const closeWindow = function(p) {
    let i = proccess.findIndex(e => e.id === p);

    $('#p_'+p).css({width:0});
    $('#p_'+p).css({height:0});
    $('#p_'+p).css({opacity:0});

    setTimeout(() => {
        proccess.splice(i,1);
        delete win[p];
        $('#p_'+p).remove();
        $('#scr_'+p).remove();
        $('#ico_'+p).remove();
    
        UpdateT();
    },500);
}

const oWindow = function(p) {
    a++;
    p_id = p;
    $('#p_'+p).css({'z-index':a});
}

function drag(elementToDrag, event) {
    let startX = event.clientX,
        startY = event.clientY;

    let origX = elementToDrag.offsetLeft,
        origY = elementToDrag.offsetTop;

    let deltaX = startX - origX,
        deltaY = startY - origY;

    if (document.addEventListener) {
        document.addEventListener("mousedown", downHandler, true);
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent) {
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousedown", downHandler);
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        elementToDrag.attachEvent("onclosecapture", upHandler);
    } else {
        var oldmovehandler = document.onmousemove;
        var olduphandler = document.onmouseup;
        document.onmousemove = moveHandler;
        document.onmouseup = upHandler;
    }
    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;

    function downHandler(e) {
        let p = ''+elementToDrag.id;
        p = Number(p.replace('p_',''));
        oWindow(p);
    }

    function moveHandler(e) {
        if (!e) e = window.event;

        let p = ''+elementToDrag.id;
        p = Number(p.replace('p_',''));
        oWindow(p);
        
        elementToDrag.style.left = (e.clientX - deltaX) + "px";
        elementToDrag.style.top = (e.clientY - deltaY) + "px";

        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }

    function upHandler(e) {
        if (!e) e = window.event;
        let p = ''+elementToDrag.id;
        p = Number(p.replace('p_',''));
        oWindow(p);

        //elementToDrag.style['z-index'] = 1;
        for(let i = 0; i < proccess.length; i++) {
            if( elementToDrag.id !== 'p_'+proccess[i].id ) {
                //$('#p_'+proccess[i].id).css({'z-index':1});
            }
        }
        if (document.removeEventListener) {
            document.removeEventListener("mousedown", downHandler, true);
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.detachEvent) {
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmousedown", downHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        } else {
            document.onmouseup = olduphandler;
            document.onmousemove = oldmovehandler;
        }

        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
}

const maxWindow = function(p) {
    let i = proccess.findIndex(e => e.id === p);

    oWindow(p);
    
    if($('#p_'+p).css('width') !== win[p].width+'px') {
        $('#p_'+p).css({width: win[p].width+'px'});
        $('#p_'+p).css({height: win[p].height+'px'});
        $('#p_'+p).css({top: '50%'});
        $('#p_'+p).css({left: '50%'});
    } else {
        $('#p_'+p).css({width: '100%'});
        $('#p_'+p).css({height: '96%'});
        $('#p_'+p).css({top: '48%'});
        $('#p_'+p).css({left: '50%'});
    }
}

const runWindow = function() {
    let path = arguments[0];
    let args = [];
    let start_args = 'start(';
    if(arguments[1]) {
        try {
            for(let i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];

                if(typeof args[i] === 'object') {
                    if(Array.isArray(args[i]) === true) {
                        start_args+='[';
                        for(let j = 0; j < args[i].length; j++) {
                            start_args+='"'+args[i][j]+'",';
                        }
                        let new_s = '';
                        for(let k = 0; k < start_args.length-1; k++) new_s+=start_args[k];
                        start_args = new_s;
                        start_args+='],';
                    }
                    if(Array.isArray(args[i]) === false) {
                        start_args+='{';
                        for(let j in args[i]) {
                            if(typeof args[i][j] === 'number') start_args+='"'+j+'":'+args[i][j]+',';
                            else start_args+='"'+j+'":"'+args[i][j]+'",';
                        }
                        let new_s = '';
                        for(let k = 0; k < start_args.length-1; k++) new_s+=start_args[k];
                        start_args = new_s;
                        start_args+='},';
                    }
                } else if(typeof args[i] === 'number') {
                    start_args+=''+args[i]+',';
                } else {
                    start_args+='"'+args[i]+'",';
                }
            }
            let new_s = '';
            for(let k = 0; k < start_args.length-1; k++) new_s+=start_args[k];
            start_args = new_s;
        } catch(e) {
            runWindow('/res/apps/error.js', ["Error", e]);
            return;
        }
    }
    start_args+=');';

    p_id = Math.floor(Math.random() * 9999999999999);
    proccess.push({p: path, id: p_id});

    let data = '';
    //try {
        fs_readfile(path, (d) => {
            data = d.toString().replaceAll('var','let');
            data = data.replace('win','win['+p_id+']');
            console.log(data.split('\n')[0]);
            eval(data.split('\n')[0]);

            if(win[p_id].ore === true) {
                if(proccess.filter(e => e.p === path).length === 2) {
                    closeWindow(p_id); return;
                }
            }
        });
    /*} catch(e) {
        closeWindow(p_id);
        runWindow('/res/apps/error.js', ["Error", e]);
        return;
    }*/

    a++;
    $('#proccess').append(''+
    `<div id="p_`+p_id+`" onmousedown="oWindow(`+p_id+`);" class="window align" style="box-shadow: #2f2f2f 1px 1px, black 0.1em 2px 0.4em; z-index: `+a+`; color: black; width: `+win[p_id].width/2+`px; height: `+win[p_id].height/2 +`px; opacity: 0">`+
    `  <div onmousedown="drag(this.parentNode, event);"><button onclick="closeWindow(`+p_id+`)" class="window_btnRed">X</button><button onclick="maxWindow(`+p_id+`)" class="window_btn">[]</button><button class="window_btn">-</button>`+win[p_id].name+`</div><br/>`+
    '</div>');

    addScriptWindow(p_id, '(function() { var body = $("#p_'+p_id+'");\n'+data+'\n '+start_args+' \n})();');
    setTimeout(() => { $('#p_'+p_id).css({opacity: 1}); $('#p_'+p_id).css({width: win[p_id].width+'px'}); $('#p_'+p_id).css({height: win[p_id].height+'px'}); },10);
    
    UpdateT();
}

const UpdateDesktop = function() {
    $('#desktop').html('');

    fs_getFilesInDir('/res/desktop', (v) => {
        for(let i = 0; i < v.length; i++) {
            $('#desktop').append(`<button onclick="fs_open('C/System/Desktop/`+v[i]+`')" style="height:75px; width: 75px">` +v[i]+`</button> `);
        }
    });
}

UpdateDesktop();