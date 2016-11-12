/**
 * Created by Administrator on 2016/11/4.
 */
function road(){
    var road = new $s.dsSprite();
    road.name ='road'
    road.graphics.lineStyle(2,0x7B0000);
    road.graphics.beginFill(0xffffff);
    road.x = 1;
    road.y = $s.stage.stageHeight-251
    road.graphics.drawRect(0,0,$s.stage.stageWidth-2,250);
    $s.stage.addChild(road);

    var bg = new $s.dsLoader().load('img/jiedao.png');
    bg.name ='bg'
    $s.stage.addChild(bg);
    var person = new Person();
    person.y = 550;
    person.x = 50;
    $s.stage.addChild(person);
    var pos = {};
    var timeid =0;
    bg.mousePixel =true;
    road.mousePixel =true;
    bg.addEventListener($s.dsMouseEvent.MOUSE_DOWN ,function(e){
        pos.x = e.stageX;
       $s.stage.addEventListener($s.dsMouseEvent.MOUSE_MOVE,movebg)
    },true);
    bg.addEventListener($s.dsMouseEvent.MOUSE_UP,function(){
        $s.stage.removeEventListener($s.dsMouseEvent.MOUSE_MOVE,movebg);
    },true)

    function movebg(event){
        var v=event.stageX-pos.x;
        if(bg.x<=$s.stage.stageWidth-bg.width && v<0){
            bg.x=$s.stage.stageWidth-bg.width-1
            $s.stage.invalidate();
            return
        }else if(bg.x>0 && v>0){
            bg.x=1;
            $s.stage.invalidate();
            return
        }
        person.stand(1);
        bg.x+=v;
        person.x+=v;
        pos.x = event.stageX;
        $s.stage.invalidate();
    }
    road.addEventListener($s.dsMouseEvent.MOUSE_DOWN,function(e){
        person.walk(e.stageX, e.stageY,1);
    },false);
}