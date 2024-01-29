win = { name: 'Win10: сведения', width: 415, height: 380, noMax: true, noMin: true };

function start(args) {

    app.append(
    `
    <div style="width:100%; text-align:center">
    <img src="/res/apps/winver/win10.png" width=325 class="alignX">
    <br/><br/><br/><hr>
    </div>
    <div style="margin-left:35px; font-size:12px">
        <span>Win10 Операционная система в браузере</span><br/>
        <span>Версия 1.0 Beta</span>
    </div>

    <div class="" style="float:right; position:fixed; bottom:15px; right:15px">
        <button class="button" onclick="exit()">OK</button>
    </div>
    `
    );

}
//script_require('winver/lol.js');
