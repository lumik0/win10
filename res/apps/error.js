win = { name: 'Ошибка', width: 400, height: 200, ore: false };

function start(args) {
    body.append(
    '<div style="padding:5px">'+
    '<img src="/images/error.png" width="50" style="vertical-align: middle;">'+
    args[0]+
    '<br/><br/>'+
    args[1]+
    '</div>');
}