win = { name: 'Командная строка', width: 500, height: 250, ore: false, dark: true };

function log(text) {
    document.getElementById('cmd'+id).innerHTML += "<br/>"+text;
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function start(args) {
    app.append(
        ''+
        '<div id="cmd'+id+'" contenteditable="true" style="position: relative; overflow:overlay; width:500px; height:225px">'+
        'Win10 [Version 0]<br/>'+
        '(c) Никакая Корпорация. Все права не защищены.<br/>'+
        '<br/>'+
        '>'+
        '</div>'+
        ''
    );

    let element = document.getElementById('cmd'+id);
    let cmds = []; let cmd = ''; var argss; let cmdup = 0;

    element.addEventListener("keydown", function(event) {
        if(event.key === 'ArrowUp') {
            if(cmds[cmdup] === undefined) cmdup = 0;
            event.preventDefault();
            cmd = cmds[cmdup];
            element.innerHTML = ' > '+cmds[cmdup];
            cmdup++;
            console.log(cmdup);
            console.log(cmds);
            console.log(cmds[cmdup]);
        } else if(event.key === 'ArrowDown') {
            if(cmds[cmdup] === undefined) cmdup = cmds.length-1;
            event.preventDefault();
            cmd = cmds[cmdup];
            element.innerHTML = ' > '+cmds[cmdup];
            cmdup--;
            console.log(cmdup);
            console.log(cmds);
            console.log(cmds[cmdup]);
        }
    });

    element.addEventListener("keypress", function(event) {
        placeCaretAtEnd(element);

        if (event.key === "Enter") {
            event.preventDefault();
            argss = cmd.split(' ');



            switch(argss[0]) {
                case "echo":
                    log(argss[1]);
                    break;
                case "clear":
                    element.innerHTML = ' > ';
                    cmd = ''; placeCaretAtEnd(element);
                    break;
                case "ver":
                    log('Win [Version 0]');
                    break;
            }
            if(argss[0] === 'clear') return;



            log('');
            log(' > ');
            cmdup = 0;
            cmds.push(cmd);
            cmd = '';
            placeCaretAtEnd(element);
            return;
        }
        cmd += event.key;
    });
}
