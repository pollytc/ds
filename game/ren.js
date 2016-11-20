/**
 * Created by Administrator on 2016/10/30.
 */

function Person(){
    $s.dsExtend(Person,$s.dsDisplayObjectContainer);
    var per =new Person.prototype.__init();
    Object.defineProperties(per,
        {'action':
        {set:function(v){
            this._action=v;
            $s.stage.dispatchEvent($s.dsEvent('action'));},
         get:function(){return this._action}}
        }
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
    this.__code = {};
    this.__curkey = '';
    this.__cur= {};
};
Person.prototype.push = function(dx,dy,key,bestop){
    if(this.__code[key]==null)this.__code[key]=[];
    this.__code[key].push({x:dx,y:dy,stop:bestop});
}
Person.prototype.gowalk = function(key){
    this.__curkey=key;
    var cc = this.__code[key];
    if(cc.length<=0)return false;
    if(this.__cur.stop)return;
    this.__cur=cc.shift();
    this.walk(this.__cur.x, this.__cur.y);
    return true;

}

Person.prototype.walk = function(dx,dy,face){
        if(dx<this.x) {this.scaleX = -1;}
    else if(this.scaleX==-1)this.scaleX = -1;

    this.foot.play();
    var r = new $s.dsRectangle(dx - 10, dy -10, 20, 20);
    var self = this;
    if (r.contains(self.x, self.y)) {

    } else {
        var a = Math.atan2(dy - self.y, dx - self.x);
        clearInterval(self.timeid);
        self.timeid = setInterval(function () {
            self.x += Math.cos(a) * self.speed;
            self.y += Math.sin(a) * self.speed;
            if (r.contains(self.x, self.y)) {
                if(self.__curkey){
                    self.__cur={}
                    if(self.gowalk(self.__curkey))return
                }
                self.stand(1);
                self.dispatchEvent(new $s.dsEvent('walkover'));
            }
        }, 100);
    }
}
Person.prototype.stand = function(face){
    clearInterval(this.timeid);
    this.foot.gotoAndStop(2);
}



