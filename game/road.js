/**
 * Created by Administrator on 2016/11/4.
 */
function road(){
    var fstage = $s.dsSprite();
    fstage.width = 800;
    fstage.height = 600;
    $s.stage.addChild(fstage);
    fstage.y = $s.stage.stageHeight-fstage.height;
    var road = new $s.dsSprite();
    road.name ='road'
    road.graphics.lineStyle(2,0x7B0000);
    road.graphics.beginFill(0xffffff);
    road.x = 1;
    road.y = fstage.height-251;
    road.graphics.drawRect(0,0,fstage.width-2,250);
    fstage.addChild(road);

    var towanda = new $s.dsSprite();
    towanda.graphics.beginFill(0xffff00);
    towanda.graphics.drawRect(0,0,300,200);
    towanda.x = 500;
    towanda.y = -201;
    road.addChild(towanda);

    var bg = new $s.dsLoader().load('img/jiedao.png');
    bg.name ='bg';
    fstage.addChild(bg);
    var person = new Person();
    person.y = 550;
    person.x = 50;
    fstage.addChild(person);
    var pos = {};
    bg.mousePixel =true;
    road.mousePixel =true;
    bg.addEventListener('mousedown' ,function(e){
        pos.x = e.stageX;
       $s.stage.addEventListener('mousemove',movebg)
    },true);
    bg.addEventListener('mouseup',function(){
        $s.stage.removeEventListener('mousemove',movebg);
    },true);

    function movebg(event){
        var v=event.stageX-pos.x;
        if(bg.x<=fstage.width-bg.width && v<0){
            bg.x=fstage.width-bg.width-1
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
    road.addEventListener('mousedown',function(e){
        var p = fstage.globalToLocal(new $s.dsPoint(e.stageX, e.stageY));
        person.walk(p.x, p.y,1);
        trace(p)
    },true);
    towanda.addEventListener('click',function(){
        person.action = 'square';
        //731,480

        person.walk(631, 366,1);
    })
    person.addEventListener('walkover',function(){
        if(person.action=='square'){
            changeScene('square');
        }else if(person.action=='home'){
            changeScene('room')//16, y: 557
        }
    })

}