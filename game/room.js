/**
 * created by administrator on 2016/11/2.
 */
function room() {
    var bg = new Loader();
    bg.load('/ds/img/shinei.png');
    bg.name = 'bg';
    stage.addChild(bg);
    var bgclick = new Loader().load("/ds/img/bgclick.png");
    bgclick.y = 318;
    bgclick.x = 10
    bgclick.name = 'bgclick';
    stage.addChild(bgclick)

    var men = new Loader().load('/ds/img/men.png');
    men.y = 335;
    men.x = 10;
    men.name = "men"
    stage.addChild(men);
    men.addEventListener(tcMouseEvent.CLICK, function () {
        addCode('chumen', 50,546)
    })

    var zhouzi = new Loader().load('/ds/img/zhuozi.png');
    zhouzi.x = 513;
    zhouzi.y = 220;
    zhouzi.name = "zhouzi";
    stage.addChild(zhouzi);

    var biji = new Loader().load('/ds/img/bijiben.png');
    biji.x = 500;
    biji.y = 180;
    biji.name = 'biji';
    stage.addChild(biji);
    biji.addEventListener(tcMouseEvent.CLICK, function () {
        addCode('kandianying', 621, 378)
    })

    var taiji = new Loader().load('/ds/img/taishiji.png');
    taiji.x = 600;
    taiji.y = 120;
    taiji.name = 'taiji';
    stage.addChild(taiji);
    taiji.addEventListener(tcMouseEvent.CLICK, function () {
        addCode('wanyouxi', 621, 378);
    });

    var zuoyi = new MovieClip('zuoyi');
    zuoyi.gotoAndStop(0);
    zuoyi.x = 580;
    zuoyi.y = 230;
    stage.addChild(zuoyi);

    var cesuo = new Loader().load('/ds/img/cesuo.png');
    cesuo.x = 89;
    cesuo.y = 145;
    cesuo.name = 'cesuo'
    stage.addChild(cesuo);
    cesuo.addEventListener(tcMouseEvent.CLICK, function () {
        addCode('shangcesou', 199, 441);
    })

    var person = new Person();
    person.y = 550;
    person.x = 300;
    person.name = "person";
    stage.addChild(person);
    person.addEventListener('walkover',function(e){
        doCode(person.action);
    })
    var beizi = new MovieClip('beizi');
    beizi.gotoAndStop(1)
    beizi.x = 393;
    beizi.y = 460;
    stage.addChild(beizi);
    beizi.addEventListener(tcMouseEvent.CLICK, function () {
        addCode('diebeizi', 580, 453);
    })

    bgclick.addEventListener(tcMouseEvent.CLICK, goto);
    function goto(event) {
        if (event.currentTarget.name == 'bgclick') {
            trace(event.stageX, event.stageY)
            person.walk(event.stageX, event.stageY,1);
        }
    }

    //function walk(dx, dy) {
        //var r = new Rectangle(dx - 5, dy - 5, 10, 10);
        //var p = stage.getChildByName('person');
        //if (r.contains(p.x, p.y)) {
        //
        //} else {
        //    var a = Math.atan2(dy - p.y, dx - p.x);
        //    clearInterval(p.timeid);
        //    p.walk(1);
        //    p.timeid = setInterval(function () {
        //        p.x += Math.cos(a) * p.speed;
        //        p.y += Math.sin(a) * p.speed;
        //        if (r.contains(p.x, p.y)) {
        //            p.stand(1);
        //            clearInterval(p.timeid);
        //            doCode(p.action);
        //        }
        //    }, 100);
        //}

    //}

    function addCode(type, dx, dy) {
        var p = stage.getChildByName('person');
        p.alpha = 1;
        if (p.action != type) {
            reset(p.action);
            person.walk(dx, dy,1);
            p.action = type;
        }
    }

    function doCode(type) {
        switch (type) {
            case 'diebeizi':
                var mc = stage.getChildByName('beizi');
                mc.gotoAndStop(0);
                break;
            case "shangcesou":
                break;
            case "wanyouxi":
            case "kandianying":
            case "shangwang":
                var p = stage.getChildByName('person');
                p.visible = false;
                var mc = stage.getChildByName('zuoyi');
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
                var p = stage.getChildByName('person');
                p.visible = true;
                var mc = stage.getChildByName('zuoyi');
                mc.gotoAndStop(0);
                break;
            case "chumen":
                break;
        }
    }
}

