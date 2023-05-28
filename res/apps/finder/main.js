win = { name: 'Проводник', width: 700, height: 500, ore: true };

body.append(
    '<table width="100%">'+
    '  <tbody><tr>'+
    '     <td width="20%">'+
    '         <button id="downloads" style="width:100%; padding:5px">Downloads</button>'+
    `         <button id="desktop" style="width:100%; padding:5px" onclick="what = 'desktop'; update();">Desktop</button>`+
    `         <button id="apps" style="width:100%; padding:5px" onclick="what = 'apps'; update();">Apps</button>`+
    '         <button id="disk-c" style="width:100%; padding:5px">Disk C</button>'+
    '     </td>'+
    '     <td valign="top" width="80%" id="file">'+
    '         test'+
    '     </td>'+
    '  </tr></tbody>'+
    '</table>'+
    ''+
    ''+
    ''+
    ''+
    ''+
    ''+
    ''
);

$('#desktop').on( "click", function() {
    what = 'desktop'; update();
});
$('#apps').on( "click", function() {
    what = 'apps'; update();
});

var what = '';

function update() {
    if(what === 'desktop') {
        $('#file').html('');

        var v = fs_get_path('C/System/Desktop');
        for(let file in v) {
            $('#file').append(`<button onclick="fs_open('C/System/Desktop/`+file+`')" style="height:75px; width: 75px">` +file+`</button> `);
        }
    }
    if(what === 'apps') {
        $('#file').html('');

        var v = fs_get_path('C/System/Apps');
        for(let app in v) {
            $('#file').append(`<button onclick="fs_open('C/System/Apps/`+app+`')" style="height:75px; width: 75px">` +app+`</button> `);
        }
    }
}