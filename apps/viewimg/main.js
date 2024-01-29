win = { name: 'Просмотр картинки', width: 500, height: 500, ore: false, dark: true };

function start(args) {
    app.append(
        `
        <img class="align" width="400" src="`+args+`">
        `
    );

    if(!args) {
        exit();
        runWindow('/res/apps/sys/error.js', ["Error", 'Не найдена картинка']);
        return;
    }
}
