/**
 * Created by Administrator on 2016/11/17.
 */
function sport(){
    var fstage = new $s.dsSprite();
    fstage.width = 800;
    fstage.height=600;
    $s.stage.addChild(fstage);
    var ellw = 300;
    var ellh  = 200;
    var cenx = 400;
    var ceny = 300;
    var bg = new $s.dsSprite();
    bg.graphics.lineStyle(2,0xffff00);
    bg.graphics.drawEllipse(0,0,ellw,ellh);
    bg.graphics.drawEllipse(0,30,ellw+50,ellh+50);
    bg.x = cenx;
    bg.y = ceny;
    var flowes = [];
    for(var i=0;i<5;i++){
        var l = new $s.dsLoader().load('img/hua.png');
        l.x = Math.random()*100;
        l.y = Math.random()*100;
        flowes.push(l);
        fstage.addChild(l);
    }
    fstage.addChild(bg);

    var person = new Person();
    person.x = 700;
    person.y = 400;
    fstage.addChild(person);

    var pollice = new $s.dsMovieClip('xiaobing');
    pollice.x = 700;
    pollice.y = 50;
    pollice.stop();
    fstage.addChild(pollice);
    var rotation = 0;
    setInterval(function(){
        if(rotation>=360)rotation=0;
        rotation++;
        var r =rotation/Math.PI*0.5;
        person.x = Math.cos(r)*ellw+cenx;
        person.y = Math.sin(r)*ellw*ellh/ellw+ceny;
    },200)
}