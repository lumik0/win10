win = { name: 'Параметры', width: 500, height:500, ore: false, dark: true};

function start(args) {
    app.append(
        `
        <div id="main-settings">
        <div id="main-settings-menu" class="container-effect">
            <div class="btn-effect" id="settings-menu-system">
                <div class="text">Система</div>
                <div class="btn"></div>
            </div>
            <div class="btn-effect" id="settings-menu-s">
                <div class="text">Персонализация</div>
                <div class="btn"></div>
            </div>
            <div class="btn-effect" id="settings-menu-update">
                <div class="text">Обновление</div>
                <div class="btn"></div>
            </div>
        </div>
        `+
        '<table id="content" style="display:none" width="100%">'+
        '  <tbody><tr>'+
        '     <td width="20%" id="settings-menu">'+
        `         `+
        '     </td>'+
        '     <td valign="top" width="80%" id="settings-content">'+
        '         '+
        '     </td>'+
        '  </tr></tbody>'+
        '</table>'+
        ''+
        ''+
        ''+
        ''+
        ''+
        ''+
        '</div>'+
        `
        
        <style>
        #main-settings {
            background: black; color:white;
        }

        .container-effect{
            display: flex;
            gap: 10px;
            padding: 30px;
        }
        
        .btn-effect{
            display: flex;
            justify-content: center;
            width: 100%; height:50px;
            padding:10px 30px;
            background-color: #181818;
            cursor: pointer;
            border: 1px solid transparent;
        }
        
        .btn-effect .text{
             color: #fff;
             font-size: 12px;
        }
        </style>`
    );

    $(document).ready(function() {
        $(".btn-effect").on('mousemove', function(event) {
          var thisElement = $(this);
          var rect = thisElement.offset();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
      
          thisElement.css("background", `radial-gradient(circle at ${x}px ${y}px ,    rgba(255,255,255,0.2),rgba(36,36,36,1) )`);
          thisElement.css("border-image", `radial-gradient(20% 75% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 9 / 1px / 0px stretch `);
        });
      
        $(".btn-effect").on('mouseout', function(event) {
          var thisElement = $(this);
          thisElement.css("background", `#181818`);
          thisElement.css("border-image", `none`);
        });
      });
      
      const offset = 69;
      const angles = []; //in deg
      for (let i = 0; i <= 360; i += 20) {
        angles.push((i * Math.PI) / 180);
      }
      let nearBy = [];
      
      function clearNearBy() {
        nearBy.splice(0, nearBy.length).forEach((e) => (e.style.borderImage = null));
      }
      
      
      const body = document.querySelector(".container-effect");
      body.addEventListener("mousemove", (e) => {
        const x = e.x;
        const y = e.y;
      
        clearNearBy();
        nearBy = angles.reduce((acc, rad, i, arr) => {
          const cx = Math.floor(x + Math.cos(rad) * offset);
          const cy = Math.floor(y + Math.sin(rad) * offset);
          const element = document.elementFromPoint(cx, cy);
          if (element !== null) {
            if (
              element.classList.contains("btn-effect")
            ) {
              const brect = element.getBoundingClientRect();
              const bx = x - brect.left;
              const by = y - brect.top;
              if (!element.style.borderImage)
                element.style.borderImage = `radial-gradient(${offset * 2}px ${
                                  offset * 2
                              }px at ${bx}px ${by}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1),transparent ) 9 / 1px / 0px stretch `;
              return [...acc, element];
            }
          }
          return acc;
        }, []);
      });

    $('#settings-menu-system').on('click', () => {
      $('#main-settings-menu').hide();
      $('#settings-menu').html(
        `
        <span>Система</span><br/><br/>
        <button class="button" id="settings-content-menu-system" style="width:100%; padding:5px">Дисплей</button>
        <button class="button" id="settings-content-menu-winver" style="width:100%; padding:5px">О программе</button>
        `
      );
      $('#content').show();
      update();
    });
    $('#settings-menu-s').on('click', () => {
      $('#main-settings-menu').hide();
      $('#settings-menu').html(
        `
        <span>Персонализация</span><br/><br/>
        <button class="button" id="settings-content-menu-bg" style="width:100%; padding:5px">Фон</button>
        <button class="button" id="settings-content-menu-panel" style="width:100%; padding:5px">Панель задач</button>
        `
      );
      $('#content').show();
      update();
    });
    $('#settings-menu-update').on('click', () => {
      $('#main-settings-menu').hide();
      $('#settings-menu').html(
        `
        <span>Обновление</span><br/><br/>
        <button class="button" id="settings-content-menu-update" style="width:100%; padding:5px">Центр обновления Win10</button>
        `
      );
      $('#content').show();
      update();
    });
    
    function update() {
        menu.prepend('<button id="settings-back" class="window_btn"><</button>');
        $('#settings-back').on('click', () => {
            $('#settings-back').remove();
            $('#main-settings-menu').show();
            $('#settings-menu').html('');
            $('#content').hide();
        });

        $('#settings-content-menu-update').on("click", () => {
            $('#settings-content').html(
                ''+
                ''+
                '<span id="version">Version: ???</span><br/>'+
                `<button class="button" onclick="$.ajax({ type: 'GET', url: 'https://raw.githubusercontent.com/lumik0/win10/main/res/update.txt', success: function(data) { fs_readfile('/res/update.txt', (d) => { if(data === d) runWindow('/res/apps/error.js', ['Error', 'Это последнее обновление']); else socket.emit('update'); }) } })">Update</button>`+
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
    }
}

