/**
 * Created by Administrator on 2016/11/4.
 */
function road(){
    var fstage = $s.dsSprite();
    fstage.name ='fstage'
    fstage.x = -350;
    $s.stage.addChild(fstage);
    var road = new $s.dsSprite();
    road.name ='road';
    road.graphics.lineStyle(2,0x7B0000);
    road.graphics.beginFill(0xffff00);
    road.graphics.drawRect(0,450,1600,250);
    fstage.addChild(road);

    var bg = new $s.dsLoader().load('img/jiedao.png');
    bg.name ='bg';
    fstage.addChild(bg);

    var c2 = new $s.dsMovieClip('chukou');
    c2.name='c2';
    c2.y=570;
    c2.x = 650;
    fstage.addChild(c2);
    var c1 = new $s.dsMovieClip('chukou');
    c1.name='c1';
    c1.y=570
    fstage.addChild(c1);
    ////
    var c3 = new $s.dsMovieClip('chukou');
    c3.name = 'c3'
    c3.x = 1400;
    c3.y =380
    fstage.addChild(c3);

    var person = new Person();
    person.y = 550;
    person.x = 650;
    fstage.addChild(person);
    var pos = {};
    var bghot = [
        {key:1,r:new $s.dsRectangle(0,404,53,109)},
        {key:2,r:new $s.dsRectangle(372,420,50,100)},
        {key:3,r:new $s.dsRectangle(572,368,50,83)},
        {key:4,r:new $s.dsRectangle(744,361,55,107)},
        {key:5,r:new $s.dsRectangle(910,368,42,86)}
    ]
    c1.addEventListener('mousedown',function(e){
        var p = fstage.globalToLocal(new $s.dsPoint(e.stageX, e.stageY));
        person.action='sport';
        person.walk(p.x, p.y,1);
    })
    c2.addEventListener('mousedown',function(event){
        var p = fstage.globalToLocal(new $s.dsPoint(e.stageX, e.stageY));
        person.action='room';
        person.walk(p.x, p.y,1);
    })
    c3.addEventListener('mousedown',function(event){
        var p = fstage.globalToLocal(new $s.dsPoint(e.stageX, e.stageY));
        person.action='square';
        person.walk(p.x, p.y,1);
    })
    bg.addEventListener('mousedown' ,function(e){
        for(var i = 0;i<bghot.length;i++){
            if(bghot[i].r.contains(e.stageX, e.stageY)){
                showMenu(bghot[i].key);
                return;
            }
        }
        pos.x = e.stageX;
       $s.stage.addEventListener('mousemove',movebg)
    });
    bg.addEventListener('mouseup',function(){
        $s.stage.removeEventListener('mousemove',movebg);
    });

    function movebg(event){
        var v=event.stageX-pos.x;

        if(fstage.x<=$s.stage.stageWidth-fstage.width && v<0){
            fstage.x=$s.stage.stageWidth-fstage.width-1
            $s.stage.invalidate();
            return
        }else if(fstage.x>0 && v>0){
            fstage.x=1;
            $s.stage.invalidate();
            return
        }
        person.stand(1);
        fstage.x+=v;
        pos.x = event.stageX;
        $s.stage.invalidate();
    }

    road.addEventListener('mousedown',function(e){
        var p = fstage.globalToLocal(new $s.dsPoint(e.stageX, e.stageY));
        person.walk(p.x, p.y,1);
    });
    person.addEventListener('walkover',function(){
        switch(person.action){
            case 'square':
                changeScene('square');
                break;
            case "room":
                changeScene('room')
                break;
            case 'sport':
                changeScene('sport');
                break;
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