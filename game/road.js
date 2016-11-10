/**
 * Created by Administrator on 2016/11/4.
 */
function road(){
    var road = new Sprite();
    road.graphics.lineStyle(2,0x7B0000);
    road.graphics.beginFill(0xffffff);
    road.x = 1;
    road.y = stage.stageHeight-251
    road.graphics.drawRect(0,0,stage.stageWidth-2,250);
    stage.addChild(road);

    var bg = new Loader().load('./img/jiedao.png');
    stage.addChild(bg);
    var person = new Person();
    person.y = 550;
    person.x = 50;
    stage.addChild(person);
    var pos = {};
    var timeid =0;
    bg.addEventListener(tcMouseEvent.MOUSE_DOWN ,function(e){
        pos.x = e.stageX;
       bg.addEventListener(tcMouseEvent.MOUSE_MOVE,movebg)
    });
    bg.addEventListener(tcMouseEvent.MOUSE_UP,function(){
        bg.removeEventListener(tcMouseEvent.MOUSE_MOVE,movebg);
    })

    function movebg(event){
        var v=event.stageX-pos.x;
        if(bg.x<=stage.stageWidth-bg.width && v<0){
            bg.x=stage.stageWidth-bg.width-1
            stage.invalidate();
            return
        }else if(bg.x>0 && v>0){
            bg.x=1;
            stage.invalidate();
            return
        }
        person.stand(1);
        bg.x+=v;
        person.x+=v;
        pos.x = event.stageX;
        stage.invalidate();
    }
    road.addEventListener(tcMouseEvent.MOUSE_DOWN,function(e){
        person.walk(e.stageX, e.stageY,1);
    });

}