win = { name: 'Настройки', width: 500, height:500, ore: false};

body.append(
    '<table width="100%">'+
    '  <tbody><tr>'+
    '     <td width="20%">'+
    `         <button id="home" style="width:100%; padding:5px">Home</button>`+
    `         <button id="main" style="width:100%; padding:5px">Main</button>`+
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
        '<button class="metro_btn" onclick="localStorage.clear(); bsod()">Reset</button>'+
        ''+
        ''+
        ''+
        ''
    );
});