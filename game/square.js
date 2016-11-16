/**
 * Created by Administrator on 2016/11/16.
 */
function square(){
    var fstage = new $s.dsSprite();
    fstage.width =800;
    fstage.height=600;
    $s.stage.addChild(fstage);
    var bg = new $s.dsSprite();
    bg.graphics.lineStyle(2,0x7B0000);
    bg.graphics.beginFill(0xffffff)
    bg.graphics.drawRect(0,0,800,500);
    bg.y = 100;
    fstage.addChild(bg);
    var builder = new $s.dsLoader().load('img/guangchaung.png');
    fstage.addChild(builder);

    var person = new Person();
    person.y = 550;
    person.x = 50;
    fstage.addChild(person);

    var pollice = new $s.dsMovieClip('xiaobing');
    pollice.x = 700;
    pollice.y = 200;
    pollice.stop();
    fstage.addChild(pollice);

    var guanggao = new $s.dsLoader().load('img/guangao.png');
    guanggao.x= 500;
    guanggao.y = 40;
    fstage.addChild(guanggao);

    var pingmu = new $s.dsMovieClip({name:'dupu',type:'manifest'});
    pingmu.x= 150;
    pingmu.y= 90;
    fstage.addChild(pingmu);

    var gaoshi = new $s.dsLoader().load('img/gaoshi.png');
    gaoshi.x = 700;
    gaoshi.y = 450;
    fstage.addChild(gaoshi);

    bg.addEventListener('click',function(e){
        var p = fstage.globalToLocal(new $s.dsPoint(e.stageX, e.stageY));
        person.walk(p.x, p.y,1);
    });

    $s.stage.addEventListener(Event.ENTER_FRAME,function(e){

    })
}