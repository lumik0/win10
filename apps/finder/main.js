win = { name: 'Проводник', width: 700, height: 500, ore: true };

var what = 'desktop';

function start(args) {

app.append(
    '<table width="100%">'+
    '  <tbody><tr>'+
    '     <td width="20%" valign="top">'+
    '         <button class="button" id="downloads" style="width:100%; padding:3px">Downloads</button>'+
    `         <button class="button" id="desktopdd" style="width:100%; padding:3px">Desktop</button>`+
    `         <button class="button" id="apps" style="width:100%; padding:3px">Apps</button>`+
    '         <button class="button" id="disk-res" style="width:100%; padding:3px">Disk Res</button>'+
    '     </td>'+
    '     <td valign="top" id="file" style="display:flex; flex-wrap: wrap">'+
    '         Finder'+
    '     </td>'+
    '  </tr></tbody>'+
    '</table>'+
    ''+
    ''+
    ''+
    ''+
    ''+
    `
    <style>
    #file .icon-desktop {
        padding: 4px 8px 4px 8px;
        border: 2px solid transparent;
        text-align: center;
        margin-bottom: 5px;
      }
      
      #file .icon-desktop a {
        display: block;
        text-decoration: none;
        cursor: default;
      }
      
      #file .icon-desktop img {
        height: 50px;
        width: 55px;
      }
      
      #file .icon-desktop span {
        display: block;
        color: black;
        font-size: 11px;
        text-align: center;
      }
      
      #file .icon-desktop:hover {
        background: rgba(0, 183, 255, 0.2);
        border: 2px solid rgba(0, 183, 255, 0.4);
      }
      
      #file .icon-desktop:first-child {
        margin-top: 5px;
      }
      </style>`
);

$('#desktopdd').on( "click", function() {
    what = 'desktop'; update();
});
$('#apps').on( "click", function() {
    what = 'apps'; update();
});
$('#disk-res').on( "click", function() {
    what = '-'; update();
});

if(args) {
    what = args;
    update();
}

}

function oopen(v) {
    let ex = f_ex.exec(v)[1];
    if(ex) {
        v = v.replaceAll('-','/');
        fs_openfile(v);
    } else {
        let s = v.split('/');
        s.splice(1, 1); s.splice(0, 1);
        what = s.join('-');
        update();
    }
}

function update() {
    $('#file').html('');
    what = what;

        fs_getFilesInDir('/res/'+what, (v) => {
            for(let i = 0; i < v.length; i++) {
                let src = 'https://winaero.com/blog/wp-content/uploads/2018/11/folder-icon-big-256.png';
                let ex = f_ex.exec(v[i])[1];
                if(ex === 'link') {
                    src = '/res/images/linkexe.png';
                    fs_readfile('/res/'+what+'/'+v[i], (d) => {
                        let vs = d.split('/');
                        vs.splice(d.split('/').length-1, 1);
                        console.log(vs);
                        src = vs.join('/')+'/icon.png';
                        $('#file').append(`<div class="icon-desktop"><a onclick="oopen('/res/`+what+`/`+v[i]+`')"><img id="files-ico-`+i+`" src="`+src+`"><span>`+v[i]+`</span></a></div>`);
                        $('#files-ico-'+i).on('error', () => {
                            $('#files-ico-'+i).attr('src','/res/images/linkexe.png');
                        });
                    });
                } else if(ex === 'png' || ex === 'jpg' || ex === 'gif') {
                    what = what.replaceAll('-','/');
                    fs_readfile('/res/'+what+'/'+v[i], (d) => {
                        src = '/res/'+what+'/'+v[i];
                        $('#file').append(`<div class="icon-desktop"><a onclick="oopen('/res/`+what+`/`+v[i]+`')"><img id="files-ico-`+i+`" src="`+src+`"><span>`+v[i]+`</span></a></div>`);
                        $('#files-ico-'+i).on('error', () => {
                            $('#files-ico-'+i).attr('src','https://schtirlitz.ru/800/600/http/cdn.onlinewebfonts.com/svg/img_164346.png');
                        });
                    });
                } else {
                    if(ex === 'js') src = '/res/images/exe.png';
                    else if(ex !== undefined) src = 'https://schtirlitz.ru/800/600/http/cdn.onlinewebfonts.com/svg/img_164346.png';
                    $('#file').append(`<div class="icon-desktop"><a onclick="oopen('/res/`+what+`/`+v[i]+`')"><img id="files-ico-`+i+`" src="`+src+`"><span>`+v[i]+`</span></a></div>`);
                }
            }
        });
}
