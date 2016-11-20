/**
 * Created by Administrator on 2016/10/30.
 */

function Person(){
    $s.dsExtend(Person,$s.dsDisplayObjectContainer);
    var per =new Person.prototype.__init();
    Object.defineProperties(per,
        {'action':
        {set:function(v){this._action=v;$s.stage.dispatchEvent($s.Event('action'))},
            get:function(){return this._action}}}
    )
    return per;
}
Person.prototype.__init =function() {
    this.head = new $s.dsLoader();
    this.head.name = "head";
    this.body = new $s.dsLoader()
    this.hand = new $s.dsMovieClip('hand');
    this.hand.gotoAndStop(3)
    this.foot = new $s.dsMovieClip('jiao');
    this.foot.gotoAndStop(2);
    this.speed = 5;
    this.timeid =0;
    this._action = '';
    this.addChild(this.head);
    this.addChild(this.body);
    this.addChild(this.hand);
    this.addChild(this.foot);
    this.init();
}
Person.prototype.init=function(){
    var per=$s.dsSharedObject.getLocal('person');
    this.body.x =-8;
    this.body.y = -107;
    this.foot.y =-25;
    this.hand.y=-80;
    this.hand.x = 5;
    this.head.y =-150;
    this.head.load('img/head'+per.data.sex+'.png');
    this.body.load('img/body0005.png');
};


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
    this.foot.gotoAndStop(2);
}



