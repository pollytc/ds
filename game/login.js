/**
 * Created by Administrator on 2016/11/4.
 */

function login(){
    var bg = new DisplayObject();
    bg.graphics.lineStyle(2,0x780000);
    bg.graphics.beginFill(0xffffff);
    bg.graphics.drawRect(1,1,stage.stageWidth-2,stage.stageHeight-2);
    stage.addChild(bg);

    var logo = new Loader().load('img/logo.png');
    logo.x = 200;
    logo.y = 150;
    stage.addChild(logo);

    var btn = new Loader().load('img/btn.png');
    btn.x = 600;
    btn.y = 200;
    btn.addEventListener('mousedown',function(){
        changeScene('room');
    })
    stage.addChild(btn);
    var btn1 = new Loader().load('img/shuoming.png');
    btn1.x = 600;
    btn1.y = 300;
    btn1.addEventListener('mousedown',function(){

    })
    stage.addChild(btn1);

}
