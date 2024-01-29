win = { name: 'Ошибка', width: 400, height: 200, ore: false, noMax: true, noMin: true };

function start(args) {
    app.append(
    '<div style="padding:5px">'+
    '<img src="/res/images/error.png" width="50" style="vertical-align: middle;">'+
    args[0]+
    '<br/><br/>'+
    args[1]+
    '</div>');
}