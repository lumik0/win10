win = { name: 'Настройки', width: 500, height:500, ore: false};

body.append(
    '<table width="100%">'+
    '  <tbody><tr>'+
    '     <td width="20%">'+
    `         <button id="home" style="width:100%; padding:5px">Home</button>`+
    `         <button id="main" style="width:100%; padding:5px">Main</button>`+
    `         <button id="update" style="width:100%; padding:5px">Update</button>`+
    '     </td>'+
    '     <td valign="top" width="80%" id="content">'+
    '         This is home'+
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

$('#home').on("click", () => {
    $('#content').html(
        ''+
        ''+
        ''+
        'This is home'+
        ''+
        ''+
        ''+
        ''
    );
});

$('#main').on("click", () => {
    $('#content').html(
        ''+
        ''+
        ''+
        '<button class="metro_btn"">...</button>'+
        ''+
        ''+
        ''+
        ''
    );
});

$('#update').on("click", () => {
    $('#content').html(
        ''+
        ''+
        '<span id="version">Version: ???</span><br/>'+
        `<button class="metro_btn" onclick="$.ajax({ type: 'GET', url: 'https://raw.githubusercontent.com/lumik0/win10/main/res/update.txt', success: function(data) { fs_readfile('/res/update.txt', (d) => { if(data === d) alert('Это последнее обновление'); else socket.emit('update'); }) } })">Update</button>`+
        ''+
        ''+
        ''+
        ''
    );

    $.ajax({
        type: 'GET',
        url: 'https://raw.githubusercontent.com/lumik0/win10/main/res/update.txt',
        success: function(data) {
            $('#version').html('Version:<br/>'+data);
        }
    });
});