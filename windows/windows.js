let proccess = [];
let a = 1;
let windows = {};
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
    let x_pr = 60;
    for(let i = 0; i < 50; i++) {
        $('#d_aico_'+i).remove();
        $('#ico_'+i).remove();
    }

    for(let i = 0; i < proccess.length; i++) {
        if(windows[proccess[i].id]) if(!windows[proccess[i].id].hide) {
            x_pr+=40;
            src = '/res/images/linkexe.png';

            let vs = proccess[i].p.split('/');
                vs.splice(proccess[i].p.split('/').length-1, 1);
                console.log(vs);
                src = vs.join('/')+'/icon.png';
                let bottom = 4;
                $('#panel').append(`<div onmousedown="oWindow(`+proccess[i].id+`); return false" id="d_ico_`+i+`" style="position: fixed; width:30px; height:30px; left: `+x_pr+`px; bottom: `+bottom+`px"><img id="ico_`+i+`" src="`+src+`" style="width:100%;height:100%"><div>`);
                $('#ico_'+i).on('error', () => {
                    $('#ico_'+i).attr('src','/res/images/linkexe.png');
                    $('#ico_'+i).css('bottom','7px');
                });
        }
    }
}

const closeWindow = function(p) {
    let i = proccess.findIndex(e => e.id === p);

    //$('#p_'+p).css({width:0});
    //$('#p_'+p).css({height:0});
    $('#p_'+p).css({opacity:0});

    setTimeout(() => {
        proccess.splice(i,1);
        delete windows[p];
        $('#p_'+p).remove();
        $('#scr_'+p).remove();
        $('#ico_'+p).remove();
    
        UpdateT();
    },100);
}

const minWindow = function(p) {
    $('#p_'+p).hide();
}

const oWindow = function(p) {
    a++;
    p_id = p;
    $('#p_'+p).show();
    $('#p_'+p).css({'z-index':a});
}

function resizeWindow(element, elementZ, event) {
    let startX = event.clientX,
        startY = event.clientY;

    let startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10),
        startHeight = parseInt(document.defaultView.getComputedStyle(element).width, 10)

    let origX = element.offsetLeft,
        origY = element.offsetTop;

    let deltaX = startX - origX,
        deltaY = startY - origY;

    let origXZ = elementZ.offsetLeft,
        origYZ = elementZ.offsetTop;

    let deltaXZ = startX - origXZ,
        deltaYZ = startY - origYZ;

    document.addEventListener("mousedown", downHandler, true);
    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);

    let top; let left;

    function downHandler(e) {
        let p = ''+element.id;
        p = Number(p.replace('p_',''));
        oWindow(p);

        top = element.style.top;
        left = element.style.left;
    }

    function moveHandler(e) {
        if (!e) e = window.event;

        let p = ''+element.id;
        p = Number(p.replace('p_',''));
        oWindow(p);
        
        // element.style.top = (e.clientX - deltaX) + "px";
        // element.style.left = (e.clientY - deltaY) + "px";
        // element.style.width = (e.clientX - deltaXZ) + "px";
        // element.style.height = (e.clientY - deltaYZ) + "px";
        //element.style.width = (startWidth + e.clientX - startX) + "px";
        //element.style.width = (e.clientX - element.offsetLeft) + 'px';
        //element.style.width = startWidth + e.clientX - startX + "px";
        //element.style.height = startHeight + e.clientY - startY + "px";
        //element.style.width = (e.clientX - element.offsetLeft) + 'px';
        //element.style.height = (e.clientY - element.offsetTop) + 'px';

        //if (e.stopPropagation) e.stopPropagation();
        //else e.cancelBubble = true;
    }

    function upHandler(e) {
        if (!e) e = window.event;
        let p = ''+element.id;
        p = Number(p.replace('p_',''));
        oWindow(p);

        document.removeEventListener("mousedown", downHandler, true);
        document.removeEventListener("mouseup", upHandler, true);
        document.removeEventListener("mousemove", moveHandler, true);

        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
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
        
        //elementToDrag.style.left = (e.clientX - deltaX) + "px";
        //elementToDrag.style.top = (e.clientY - deltaY) + "px";
        $('#p_'+p).css({"transform":'translate('+(e.clientX - origX)+'px, '+(e.clientY - origY)+'px)'});

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
    
    if($('#p_'+p).css('width') !== windows[p].width+'px') {
        $('#p_'+p).css({width: windows[p].width+'px'});
        $('#p_'+p).css({height: windows[p].height+'px'});
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
            runWindow('/res/apps/sys/error.js', ["Error", e]);
            return;
        }
    }
    start_args+=');';

    p_id = Math.floor(Math.random() * 9999999999999);
    if(proccess.findIndex((e) => e.p === path) !== -1) {
        if(windows[proccess[proccess.findIndex((e) => e.p === path)].id].ore) {
            return;
        }
    }
    proccess.push({p: path, id: p_id});

    let data = '';
    try {
        fs_readfile(path, (d) => {
            data = d.toString().replaceAll('var','let');
            data = data.replace('win','windows['+p_id+']');
            console.log(data.split('\n')[0]);
            try {
                eval(data.split('\n')[0]);
            } catch {
                closeWindow(p_id);
                runWindow('/res/apps/sys/error.js', ["Error", 'Не поддерживает Win32']);
                return;
            }

            if(!windows[p_id]) {
                closeWindow(p_id);
                runWindow('/res/apps/sys/error.js', ["Error", 'Не поддерживает Win32']);
                return;
            }

            /*if(windows[p_id].ore === true) {
                if(proccess.filter(e => e.p === path).length > 1) {
                    closeWindow(p_id); return;
                }
            }*/
        });
    } catch(e) {
        closeWindow(p_id);
        runWindow('/res/apps/sys/error.js', ["Error", e]);
        return;
    }

    a++;
    setTimeout(() => {
        let control_menu = `  <div id="p_menu_`+p_id+`" onmousedown="drag(this.parentNode, event);"><span style="margin:3px; font-size:14px">`+windows[p_id].name+`</span><div style="float: right"><button onclick="minWindow(`+p_id+`)" class="window_btn">&mdash;</button><button onclick="maxWindow(`+p_id+`)" class="window_btn">▢</button><button onclick="closeWindow(`+p_id+`)" class="window_btnRed">⨉</button></div></div>`;
        let align = 'align'; let dark = 'window_dark';

        if(windows[p_id].noMenu) control_menu = '';
        if(windows[p_id].noMin) control_menu = `  <div id="p_menu_`+p_id+`" onmousedown="drag(this.parentNode, event);"><span style="margin:3px; font-size:14px">`+windows[p_id].name+`</span><div style="float: right"><button disabled class="window_btn">&mdash;</button><button onclick="maxWindow(`+p_id+`)" class="window_btn">▢</button><button onclick="closeWindow(`+p_id+`)" class="window_btnRed">⨉</button></div></div>`;
        if(windows[p_id].noMax) control_menu = `  <div id="p_menu_`+p_id+`" onmousedown="drag(this.parentNode, event);"><span style="margin:3px; font-size:14px">`+windows[p_id].name+`</span><div style="float: right"><button onclick="minWindow(`+p_id+`)" class="window_btn">&mdash;</button><button onclick="maxWindow(`+p_id+`)" disabled class="window_btn">▢</button><button onclick="closeWindow(`+p_id+`)" class="window_btnRed">⨉</button></div></div>`;
        if(windows[p_id].noClose) control_menu = `  <div id="p_menu_`+p_id+`" onmousedown="drag(this.parentNode, event);"><span style="margin:3px; font-size:14px">`+windows[p_id].name+`</span><div style="float: right"><button onclick="minWindow(`+p_id+`)" class="window_btn">&mdash;</button><button onclick="maxWindow(`+p_id+`)" class="window_btn">▢</button><button onclick="closeWindow(`+p_id+`)" disabled class="window_btnRed">⨉</button></div></div>`;
        if(windows[p_id].noMax && windows[p_id].noClose) control_menu = `  <div id="p_menu_`+p_id+`" onmousedown="drag(this.parentNode, event);"><span style="margin:3px; font-size:14px">`+windows[p_id].name+`</span><div style="float: right"><button onclick="minWindow(`+p_id+`)" class="window_btn">&mdash;</button><button onclick="maxWindow(`+p_id+`)" disabled class="window_btn">▢</button><button onclick="closeWindow(`+p_id+`)" disabled class="window_btnRed">⨉</button></div></div>`;
        if(windows[p_id].noMin && windows[p_id].noMax) control_menu = `  <div id="p_menu_`+p_id+`" onmousedown="drag(this.parentNode, event);"><span style="margin:3px; font-size:14px">`+windows[p_id].name+`</span><div style="float: right"><button style="padding:5px 10px" onclick="closeWindow(`+p_id+`)" class="window_btnRed">⨉</button></div></div>`;
        if(windows[p_id].moved) align = '';
        if(!windows[p_id].dark) dark = '';

        $('#proccess').append(''+
        `<div id="p_`+p_id+`" onmousedown="oWindow(`+p_id+`);" class="window `+align+` `+dark+`" style="box-shadow: #2f2f2f 1px 1px, black 0.1em 2px 0.4em; z-index: `+a+`; width: `+windows[p_id].width/2+`px; height: `+windows[p_id].height/2 +`px; opacity: 0;">`+
        control_menu+
        `<div style="position:fixed; bottom: 0; right: 0; cursor: se-resize; padding:5px; background: #d0d0d0; border-radius: 50px 0 0 0;" onmousedown="resizeWindow(this.parentNode, this, event)"></div>`+
        '</div>');

        addScriptWindow(p_id, '(function() { var id = "'+p_id+'"; var app = $("#p_'+p_id+'"); var menu=$("#p_menu_'+p_id+'"); \n'+data+'\n '+start_args+' \n} )();');
        setTimeout(() => {
            $('#p_'+p_id).css({opacity: 1});
            $('#p_'+p_id).css({width: windows[p_id].width+'px'});
            $('#p_'+p_id).css({height: windows[p_id].height+'px'});
            /*if(windows[p_id].bottom) $('#p_'+p_id).css({bottom: windows[p_id].bottom+'px'});
            if(windows[p_id].top) $('#p_'+p_id).css({top: windows[p_id].top+'px'});
            if(windows[p_id].right) $('#p_'+p_id).css({right: windows[p_id].right+'px'});
            if(windows[p_id].left) $('#p_'+p_id).css({left: windows[p_id].left+'px'});*/

            if(windows[p_id].resize === false) {
                $('#p_'+p_id).css({'resize':'none'});
                $('#p_'+p_id).css({'overflow':'none'});
            }
            if(windows[p_id].background === false) {
                $('#p_'+p_id).css({'background':'none'});
                $('#p_'+p_id).css({'box-shadow':'none'});
            }

            /*if(windows[p_id].bottom) $('#p_'+p_id).css({"transform":'translate('+0+'px, '+windows[p_id].bottom+'px)'});
            if(windows[p_id].top) $('#p_'+p_id).css({"transform":'translate('+0+'px, '+windows[p_id].top+'px)'});
            if(windows[p_id].right) $('#p_'+p_id).css({"transform":'translate('+windows[p_id].right+'px, '+0+'px)'});
            if(windows[p_id].left) $('#p_'+p_id).css({"transform":'translate('+windows[p_id].left+'px, '+0+'px)'});*/
        },10);
        
        UpdateT();
    },100);
}
