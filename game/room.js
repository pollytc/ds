/**
 * created by administrator on 2016/11/2.
 */
function room() {
    var fstage = new $s.dsSprite();
    fstage.width = 800;
    fstage.height = 600;
    fstage.y = $s.stage.stageHeight-fstage.height;
    fstage.name = 'fstage';
    var h=fstage.height - $s.stage.stageHeight;
    var w = fstage.width -$s.stage.stageWidth;
    if($s.platform.moblie)
        fstage.startDrag(false,new $s.dsRectangle(-w,fstage.y,w,h));
    $s.stage.addChild(fstage);
    var bg = new $s.dsLoader();
    bg.load('img/shinei.png');
    bg.name = 'bg';
    fstage.addChild(bg);
    var bgclick = new $s.dsLoader().load("img/bgclick.png");
    bgclick.y = 318;
    bgclick.x = 10
    bgclick.name = 'bgclick';
    fstage.addChild(bgclick)

    var men = new $s.dsLoader().load('img/men.png');
    men.y = 335;
    men.x = 10;
    men.name = "men"
    fstage.addChild(men);
    men.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('chumen', men.x+20,men.y+200);
    })

    var zhouzi = new $s.dsLoader().load('img/zhuozi.png');
    zhouzi.x = 513;
    zhouzi.y = 220;
    zhouzi.name = "zhouzi";
    fstage.addChild(zhouzi);

    var biji = new $s.dsLoader().load('img/bijiben.png');
    biji.x = 500;
    biji.y = 180;
    biji.name = 'biji';
    fstage.addChild(biji);
    biji.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('kandianying', zhouzi.x+100, zhouzi.y+200)
    })

    var taiji = new $s.dsLoader().load('img/taishiji.png');
    taiji.x = 600;
    taiji.y = 120;
    taiji.name = 'taiji';
    fstage.addChild(taiji);
    taiji.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('wanyouxi', zhouzi.x+100, zhouzi.y+200);
    });

    var zuoyi = new $s.dsMovieClip('zuoyi');
    zuoyi.gotoAndStop(0);
    zuoyi.x = 580;
    zuoyi.y = 230;
    fstage.addChild(zuoyi);

    var cesuo = new $s.dsLoader().load('img/cesuo.png');
    cesuo.x = 89;
    cesuo.y = 145;
    cesuo.name = 'cesuo'
    fstage.addChild(cesuo);
    cesuo.addEventListener($s.dsMouseEvent.CLICK, function(){
        addCode('shangcesou', cesuo.x+100, cesuo.y+300);
    })

    var person = new Person();
    person.y = 550;
    person.x = 300;
    person.name = "person";
    fstage.addChild(person);
    person.addEventListener('walkover',function(e){
        doCode(person.action);
    })
    var beizi = new $s.dsMovieClip('beizi');
    beizi.gotoAndStop(1)
    beizi.x = 393;
    beizi.y = 460;
    fstage.addChild(beizi);
    beizi.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('diebeizi', beizi.x+200,beizi.y);
    })

    bgclick.addEventListener($s.dsMouseEvent.CLICK, goto);
    function goto(event) {
        var po =fstage.globalToLocal(new $s.dsPoint(event.stageX, event.stageY));
        addCode('',po.x,po.y);
    }
    function addCode(type, dx, dy) {
        var p = fstage.getChildByName('person');
        p.alpha = 1;
        if (p.action != type) {
            reset(p.action);
            p.action = type;
        }
        person.walk(dx, dy,1);
    }

    function doCode(type) {
        switch (type) {
            case 'diebeizi':
                var mc = fstage.getChildByName('beizi');
                mc.gotoAndStop(0);
                break;
            case "shangcesou":
                break;
            case "wanyouxi":
            case "kandianying":
            case "shangwang":
                var p = fstage.getChildByName('person');
                p.visible = false;
                var mc = fstage.getChildByName('zuoyi');
                mc.gotoAndStop(1);
                break;
            case "chumen":
                changeScene('road');
                break;
        }
    }

    function reset(type) {
        switch (type) {
            case 'diebeizi':
                //var mc=stage.getChildByName('beizi');
                //mc.gotoAndStop(1);
                break;
            case "shangcesou":
                break;
            case "wanyouxi":
            case "kandianying":
            case "shangwang":
                var p = fstage.getChildByName('person');
                p.visible = true;
                var mc = fstage.getChildByName('zuoyi');
                mc.gotoAndStop(0);
                break;
            case "chumen":
                break;
        }
    }
}

