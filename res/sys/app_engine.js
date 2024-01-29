const showError = function(err, message) {
    runWindow('C/System/Apps/error.exe', [err, message]);
}

const exit = function() {
    closeWindow(p_id);
}

const bsod = function() {
    window.location = '/res/bsod.html';
}

let buttons = 0;

class Button {
    constructor(text, x, y, width, height, func) {
        buttons++;
        this.id = buttons;
        this.x = x; this.y = y; this.text = text; this.width = width; this.height = height; this.func = func;
        $('#p_'+p_id).append('<button id="button_'+buttons+'_'+p_id+'" style="position: fixed; left: '+this.x+'px; top: '+(this.y+25)+'px; width: '+this.width+'px; height: '+this.height+'px" class="button">'+this.text+'</button>');
        //$('#p_'+p_id).on('click', func);
        document.getElementById('button_'+this.id+'_'+p_id).onclick = func;
    }

    setText(value) { $('#button_'+this.id+'_'+p_id).html(value); }
    setWidth(value) { $('#button_'+this.id+'_'+p_id).css({'width':value}); }
    setHeight(value) { $('#button_'+this.id+'_'+p_id).css({'height':value}); }
    setX(x) { $('#button_'+this.id+'_'+p_id).css({'left':x}); }
    setY(y) { $('#button_'+this.id+'_'+p_id).css({'top':(y+25)}); }
    setFunc(value) {
        this.func = value;
        document.getElementById('button_'+this.id+'_'+p_id).onclick = this.func;
    }

    getText() { return $('#button_'+this.id+'_'+p_id).html() }
    getWidth() { return $('#button_'+this.id+'_'+p_id).css('width'); }
    getHeight() { return $('#button_'+this.id+'_'+p_id).css('height'); }
    getX() { return $('#button_'+this.id+'_'+p_id).css('left'); }
    getY() { return $('#button_'+this.id+'_'+p_id).css('top'); }

    remove() {
        $('#button_'+this.id+'_'+p_id).remove();
        buttons--;
    }
}