/**
 * Created by Administrator on 2016/10/30.
 */
function Person(){
    $s.dsExtend(Person,$s.dsDisplayObjectContainer);
    return new Person.prototype.__init();
}
Person.prototype.__init =function() {
    this.head = new $s.dsLoader();
    this.head.name = "head";
    this.body = new $s.dsDisplayObject();
    this.hand = new $s.dsSprite();
    this.foot = new $s.dsMovieClip('jiao');
    this.foot.gotoAndStop(1);
    this.speed = 5;
    this.timeid =0;
    this.action = '';
    this.addChild(this.head);
    this.addChild(this.body);
    this.addChild(this.hand);
    this.addChild(this.foot);
    this.init();
}
Person.prototype.init=function(){
    this.body.x = 20;
    this.body.y = -163;
    this.foot.y =-60;
    this.foot.x = -25;
    this.hand.y=-200;
    this.hand.x = 10;
    this.head.y = -360;
    this.head.x =-15;
    this.hand.graphics.lineStyle(2);
    this.hand.graphics.moveTo(0,0);
    this.hand.graphics.lineTo(0,100);
    this.body.graphics.beginFill(0xffffff,1);
    this.body.graphics.decodePath('AhpQUQghgXgZkZQgakyAAmyQAAmvAakyQAbkyAlAAQAlAAAaEyQAaEyCDITQCEITh6ChQh6Cig1AqQg4ArgFAFg');
    this.head.load('img/head1.png');
    //this.foot.__load('http://test.com/ds/movie/zai.json');
    this.scaleX=this.scaleY = 0.5;
};

//var s = new $s.dsSprite();
//s.graphics.beginFill(0xffff00);
//s.graphics.drawCircle(0,0,5);
//$s.stage.addChild(s);
//var ap = new $s.dsSprite();
//ap.graphics.beginFill(0x00ff00);
//ap.graphics.drawCircle(0,0,5);
//$s.stage.addChild(ap);
Person.prototype.walk = function(dx,dy,face){
    this.foot.play();
    var r = new $s.dsRectangle(dx - 10, dy -10, 20, 20);
    var p = this;
    if (r.contains(p.x, p.y)) {

    } else {
        var a = Math.atan2(dy - p.y, dx - p.x);
        clearInterval(p.timeid);
        p.timeid = setInterval(function () {
            p.x += Math.cos(a) * p.speed;
            p.y += Math.sin(a) * p.speed;
            //s.x = p.x;
            //s.y = p.y;
            if (r.contains(p.x, p.y)) {
                p.stand(1);
                p.dispatchEvent(new $s.dsEvent('walkover'));
            }
        }, 100);
    }
}
Person.prototype.stand = function(face){
    clearInterval(this.timeid);
    this.foot.gotoAndStop(1);
}



