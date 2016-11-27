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
    towanda.graphics.drawRect(0,0,300,100);
    towanda.x = 500;
    towanda.y = -101;
    road.addChild(towanda);

    var bg = new $s.dsLoader().load('img/jiedao.png');
    bg.name ='bg';
    fstage.addChild(bg);
    var person = new Person();
    person.y = 550;
    person.x = 50;
    fstage.addChild(person);
    var pos = {};
    var bghot = [
        {key:1,r:new $s.dsRectangle(0,404,53,109)},
        {key:2,r:new $s.dsRectangle(372,420,50,100)},
        {key:3,r:new $s.dsRectangle(572,368,50,83)},
        {key:4,r:new $s.dsRectangle(744,361,55,107)},
        {key:5,r:new $s.dsRectangle(910,368,42,86)}
    ]

    bg.addEventListener('mousedown' ,function(e){
        for(var i = 0;i<bghot.length;i++){
            if(bghot[i].r.contains(e.stageX, e.stageY)){
                showMenu(bghot[i].key);
                return;
            }
        }
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
        person.walk(631, 366,1);
    })
    person.addEventListener('walkover',function(){
        if(person.action=='square'){
            changeScene('square');
        }else if(person.action=='home'){
            changeScene('room')//16, y: 557
        }
    })
    var menu  = null;
    function showMenu(key){
        if(menu){
            $s.uistage.addChild(menu);
        }
        var menu = new $s.uiDialog();
        menu.css({'position': 'absolute'});
        $s.uistage.addChild(menu);
        menu.x = ($s.uistage.width - menu.width) * 0.5 + "px";
        //panel.y = ($s.uistage.height - panel.height) * 0.5 + "px";
        var list = new $s.uiList();
        list.css({'max-height':'400px'});
        menu.addChild(list);
        dsserver({act:'menulist'},function(d){
            list.addlist(d.data);
        })
    }
}