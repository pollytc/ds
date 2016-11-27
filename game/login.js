/**
 * Created by Administrator on 2016/11/4.
 */

function login(bool){
    var logo = new $s.dsLoader().load('img/logo.png');
    logo.addEventListener('complete',function(){
        logo.x = $s.stage.stageWidth*0.1;
        logo.y = ($s.stage.stageHeight-logo.height)*0.5;
    })
    $s.stage.addChild(logo);

    var btn = new $s.dsLoader().load('img/btn.png');
    btn.name = 'btn'
    btn.x = $s.stage.stageWidth*0.7;
    btn.y = 100;
    var panel = null
    btn.addEventListener('mousedown',function(){
        if(!panel)panel = loginPanel();
    })
    $s.stage.addChild(btn);
    var btn1 = new $s.dsLoader().load('img/shuoming.png');
    btn1.x = $s.stage.stageWidth*0.7;
    btn1.y = 200;
    btn1.addEventListener('mousedown',function(){

    })
    $s.stage.addChild(btn1);

    function loginPanel(){
        var loginhtml = '<form class="userform">\
            <h2>Login</h2>\
            <label for="name">Username:</label>\
        <div class="ui-input-text ui-body-inherit ui-corner-all ui-mini ui-shadow-inset ui-input-has-clear"><input type="text" name="name" id="name" value="" data-clear-btn="true" data-mini="true"><a href="#" tabindex="-1" aria-hidden="true" class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-input-clear-hidden" title="Clear text">Clear text</a></div>\
        <label for="password">Password:</label>\
        <div class="ui-input-text ui-body-inherit ui-corner-all ui-mini ui-shadow-inset ui-input-has-clear"><input type="password" name="password" id="password" value="" data-clear-btn="true" autocomplete="off" data-mini="true"><a href="#" tabindex="-1" aria-hidden="true" class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-input-clear-hidden" title="Clear text">Clear text</a></div>\
        <div class="ui-grid-a">\
            <div class="ui-block-a"><a href="#" data-rel="close" class="ui-btn ui-shadow ui-corner-all ui-btn-b ui-mini">NONE</a></div>\
        <div class="ui-block-b"><a href="#" data-rel="close" class="ui-btn ui-shadow ui-corner-all ui-btn-a ui-mini">YES</a></div>\
        </div>\
        </form>'

        var panel = $s.uiPanel();
        panel.addChild(loginhtml)
        $s.uistage.addChild(panel);
        panel.css({'position': 'absolute'});
        panel.x = ($s.uistage.width - panel.width) * 0.5 + "px";
        panel.y = ($s.uistage.height - panel.height) * 0.5 + "px";
        panel.tojquery().find('.ui-grid-a').click(function(e){
            var pa =panel.tojquery();
            if(e.target.innerHTML=="YES"){
                var n =pa.find('#name').val();
                var p =pa.find('#password').val();
                if(!p ||!n)return alert('账号或密码为空');
                dsserver({act:'login',user:n,pass:p},function(d){
                    if(d.success){
                        $s.uistage.empty();
                        changeScene('room');
                    }
                })
            }else if(e.target.innerHTML=='NONE'){
                pa.find('#name').val('');
                pa.find('#password').val('');
            }
        })
        return panel;
    }
}


