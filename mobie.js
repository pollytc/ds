/**
 * Created by Administrator on 2016/11/13.
 */
$s.ready(function(){
    $s.stage.color=0xff0000;
    var s = new $s.dsSprite();
    s.graphics.beginFill(0x00ff00);
    s.graphics.drawCircle(0,0,50);
    s.x =100;s.y=100;
    s.addEventListener('click',function(){
        alert(1)
    })
    $s.stage.addChild(s);
    $s.stage.screenOrientation('h');

    var ss = new $s.dsSprite();
    ss.graphics.beginFill(0x0000ff);
    ss.graphics.drawRect(200,0,100,100);
    $s.stage.addChild(ss);

},{width:'100%',height:'100%'});
