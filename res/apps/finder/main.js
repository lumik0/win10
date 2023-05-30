win = { name: 'Проводник', width: 700, height: 500, ore: true };

body.append(
    '<table width="100%">'+
    '  <tbody><tr>'+
    '     <td width="20%">'+
    '         <button id="downloads" style="width:100%; padding:5px">Downloads</button>'+
    `         <button id="desktop" style="width:100%; padding:5px">Desktop</button>`+
    `         <button id="apps" style="width:100%; padding:5px">Apps</button>`+
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
    $('#file').html('');
    if(what === 'desktop') {
        fs_getFilesInDir('/res/desktop', (v) => {
            for(let i = 0; i < v.length; i++) {
                $('#file').append(`<button onclick="fs_openfile('/res/desktop/`+v[i]+`')" style="height:75px; width: 75px">` +v[i]+`</button> `);
            }
        });
    }
    if(what === 'apps') {
        fs_getFilesInDir('/res/apps', (v) => {
            for(let i = 0; i < v.length; i++) {
                $('#file').append(`<button onclick="fs_openfile('/res/apps/`+v[i]+`')" style="height:75px; width: 75px">` +v[i]+`</button> `);
            }
        });
    }
}