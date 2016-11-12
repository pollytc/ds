/**
 * created by administrator on 2016/11/2.
 */
function room() {
    var bg = new $s.dsLoader();
    bg.load('img/shinei.png');
    bg.name = 'bg';
    $s.stage.addChild(bg);
    var bgclick = new $s.dsLoader().load("img/bgclick.png");
    bgclick.y = 318;
    bgclick.x = 10
    bgclick.name = 'bgclick';
    $s.stage.addChild(bgclick)

    var men = new $s.dsLoader().load('img/men.png');
    men.y = 335;
    men.x = 10;
    men.name = "men"
    $s.stage.addChild(men);
    men.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('chumen', 50,546)
    })

    var zhouzi = new $s.dsLoader().load('img/zhuozi.png');
    zhouzi.x = 513;
    zhouzi.y = 220;
    zhouzi.name = "zhouzi";
    $s.stage.addChild(zhouzi);

    var biji = new $s.dsLoader().load('img/bijiben.png');
    biji.x = 500;
    biji.y = 180;
    biji.name = 'biji';
    $s.stage.addChild(biji);
    biji.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('kandianying', 621, 378)
    })

    var taiji = new $s.dsLoader().load('img/taishiji.png');
    taiji.x = 600;
    taiji.y = 120;
    taiji.name = 'taiji';
    $s.stage.addChild(taiji);
    taiji.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('wanyouxi', 621, 378);
    });

    var zuoyi = new $s.dsMovieClip('zuoyi');
    zuoyi.gotoAndStop(0);
    zuoyi.x = 580;
    zuoyi.y = 230;
    $s.stage.addChild(zuoyi);

    var cesuo = new $s.dsLoader().load('img/cesuo.png');
    cesuo.x = 89;
    cesuo.y = 145;
    cesuo.name = 'cesuo'
    $s.stage.addChild(cesuo);
    cesuo.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('shangcesou', 199, 441);
    })

    var person = new Person();
    person.y = 550;
    person.x = 300;
    person.name = "person";
    $s.stage.addChild(person);
    person.addEventListener('walkover',function(e){
        doCode(person.action);
    })
    var beizi = new $s.dsMovieClip('beizi');
    beizi.gotoAndStop(1)
    beizi.x = 393;
    beizi.y = 460;
    $s.stage.addChild(beizi);
    beizi.addEventListener($s.dsMouseEvent.CLICK, function () {
        addCode('diebeizi', 580, 453);
    })

    bgclick.addEventListener($s.dsMouseEvent.CLICK, goto);
    function goto(event) {
        trace(event.target.name)
        trace(event.stageX, event.stageY)
        addCode('',event.stageX, event.stageY)
        //person.walk(event.stageX, event.stageY,1);
    }
    function addCode(type, dx, dy) {
        var p = $s.stage.getChildByName('person');
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
                var mc = $s.stage.getChildByName('beizi');
                mc.gotoAndStop(0);
                break;
            case "shangcesou":
                break;
            case "wanyouxi":
            case "kandianying":
            case "shangwang":
                var p = $s.stage.getChildByName('person');
                p.visible = false;
                var mc = $s.stage.getChildByName('zuoyi');
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
                var p = $s.stage.getChildByName('person');
                p.visible = true;
                var mc = $s.stage.getChildByName('zuoyi');
                mc.gotoAndStop(0);
                break;
            case "chumen":
                break;
        }
    }
}

