win = {name: 'Браузер', ore:false, width: 1000, height: 700};

function start(args) {
    let src = '';

    if(args) {
        if(args.type === 'path') {
            src = args.data;
        }
    }

    app.append(
        `
        <button class="button"><</button> <button class="button">></button> <button class="button">()</button> <input id="browser-url" type="text" placeholder="URL" /><button class="button" id="browser-seturl">Перейти</button><br/>
        <iframe id="browser-bro" width="995" height="650" src="`+src+`"></iframe>
        
        `
    );

    $('#browser-seturl').on('click', () => {
        $('#browser-bro').attr('src', $('#browser-url').val());
    });
}
