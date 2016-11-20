/**
 * Created by Administrator on 2016/11/4.
 */

function login(){
    //var bg = new $s.dsDisplayObject();
    //bg.graphics.lineStyle(2,0x780000);
    //bg.graphics.beginFill(0xffffff);
    //bg.graphics.drawRect(1,1,$s.stage.stageWidth-2,$s.stage.stageHeight-2);
    //$s.stage.addChild(bg);

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
        var sd = $s.dsSharedObject.getLocal('person');
        if(sd.data){
            changeScene('room');
            return;
        }
        if(!panel)panel = new $.uiLogin();
        $.uistage.show(panel);
        panel.x = ($s.stage.stageWidth-panel.width)*0.5;
        panel.y = ($s.stage.stageHeight-panel.height)*0.5;
        panel.addEventListener('submit',function(){
            $.uistage.hide(panel);
            changeScene('room');
        })
    })
    $s.stage.addChild(btn);
    var btn1 = new $s.dsLoader().load('img/shuoming.png');
    btn1.x = $s.stage.stageWidth*0.7;
    btn1.y = 200;
    btn1.addEventListener('mousedown',function(){

    })
    $s.stage.addChild(btn1);

}
