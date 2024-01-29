win = { name: 'Проводник', width: 100+'%', height: 100, ore: true, bottom: 0, noMenu: true, resize: false, moved: true, hide: true, background: false };

function oopen(v) {
    let ex = f_ex.exec(v)[1];
    if(ex) {
        v = v.replaceAll('-','/');
        fs_openfile(v);
    } else {
        let s = v.split('/');
        s.splice(1, 1); s.splice(0, 1);
        let what = s.join('-');
        runWindow('/res/apps/finder/main.js', what);
    }
}

const UpdateDesktop = function() {
    $('#desktop').html('');

    fs_getFilesInDir('/res/desktop', (v) => {
        for(let i = 0; i < v.length; i++) {
            let src = 'https://winaero.com/blog/wp-content/uploads/2018/11/folder-icon-big-256.png';
            let ex = f_ex.exec(v[i])[1];
            if(ex === 'link') {
                src = '/res/images/linkexe.png';
                fs_readfile('/res/desktop/'+v[i], (d) => {
                    let vs = d.split('/');
                    vs.splice(d.split('/').length-1, 1);
                    console.log(vs);
                    src = vs.join('/')+'/icon.png';
                    $('#desktop').append(`<div class="icon-desktop"><a onclick="oopen('/res/desktop/`+v[i]+`')"><img id="des-ico-`+i+`" src="`+src+`"><span>`+v[i]+`</span></a></div>`);
                    $('#des-ico-'+i).on('error', () => {
                        $('#des-ico-'+i).attr('src','/res/images/linkexe.png');
                    });
                });
            } else if(ex === 'png' || ex === 'jpg' || ex === 'gif') {
                what = what.replaceAll('-','/');
                fs_readfile('/res/desktop/'+v[i], (d) => {
                    src = '/res/desktop/'+v[i];
                    $('#desktop').append(`<div class="icon-desktop"><a onclick="oopen('/res/desktop/`+v[i]+`')"><img id="des-ico-`+i+`" src="`+src+`"><span>`+v[i]+`</span></a></div>`);
                    $('#des-ico-'+i).on('error', () => {
                        $('#des-ico-'+i).attr('src','https://schtirlitz.ru/800/600/http/cdn.onlinewebfonts.com/svg/img_164346.png');
                    });
                });
            } else {
                if(ex === 'js') src = '/res/images/exe.png';
                else if(ex !== undefined) src = 'https://schtirlitz.ru/800/600/http/cdn.onlinewebfonts.com/svg/img_164346.png';
                $('#desktop').append(`<div class="icon-desktop"><a onclick="oopen('/res/desktop/`+v[i]+`')"><img id="des-ico-`+i+`" src="`+src+`"><span>`+v[i]+`</span></a></div>`);
            }
        }
    });
}

function start() {
    app.append(`
    <div id="panel" style="left:-0px; position: fixed">
        <img id="start" onmousedown="return false" src="/res/images/start.png" width="48" style="position: fixed; bottom: -1px">
        <img id="search" onmousedown="return false" src="/res/images/search.png" width="48" style="position: fixed; left: 48px; bottom: -1px">
        <img id="a" onmousedown="return false" src="/res/images/a.png" width="1570" style="position: fixed; left: 96px; bottom: -98px">
        <img id="a" onmousedown="return false" src="/res/images/wea.png" width="264" style="position: fixed; left: 1656px; bottom: 0">
        <div id="menu-start" onmousedown="return false" style="width: 500px; height: 500px; position: fixed; bottom: 40px; background: black; bottom:-100%; transition: bottom 0.1s cubic-bezier(1, -0.05, 0, 0.99) 0s;">
            <div style="bottom:1px; position: absolute;">
                <button class="btn_black" style="width: 120px;" onclick="fs_openfile('/res/apps/finder/main.js'); closeMenuStart();">Проводник</button><br/>
                <button class="btn_black" style="width: 120px;" onclick="fs_openfile('/res/apps/settings/main.js'); closeMenuStart();">Параметры</button><br/>
                <button class="btn_black" style="width: 120px;" onclick="window.location = '/';">Перезагрузить</button>
            </div>
        </div>
    </div>

    <div id="desktop" style="display:flex" onclick="closeMenuStart();" onmousedown="return false">

    </div>
    
    <style>
    #desktop .icon-desktop {
        padding: 4px 8px 4px 8px;
        border: 2px solid transparent;
        text-align: center;
        margin-bottom: 5px;
        height: 65px;
      }
      
      #desktop .icon-desktop a {
        display: block;
        text-decoration: none;
        cursor: default;
      }
      
      #desktop .icon-desktop img {
        height: 50px;
        width: 55px;
      }
      
      #desktop .icon-desktop span {
        display: block;
        color: white;
        font-size: 11px;
        text-align: center;
      }
      
      #desktop .icon-desktop:hover {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.2);
      }
      
      #desktop .icon-desktop:first-child {
        margin-top: 5px;
      }
      </style>
    
    `
    );

    $('#p_'+id).css('width','99.8%');
    $('#p_'+id).css('height','98vh');
    
    UpdateDesktop();
}