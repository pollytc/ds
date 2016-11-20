/**
 * Created by Administrator on 2016/11/20.
 */
function figure(){
    $s.dsExtend(figure,$s.dsDisplayObjectContainer)

    return new figure.prototype.__init()
}
figure.prototype.__init = function(){
    this.zhai = new $s.dsTextField();
    this.addChild(this.zhai);

    this.weight = new $s.dsTextField();
    this.weight.x = 100;
    this.addChild(this.weight);
    var self = this;
    $s.stage.addEventListener('updatefigure',function(){
        self.update();
    });
    //房间内行为改变
    $s.stage.addEventListener('action',function(e){
        trace(e.type)
    });
    //场景变化
    $s.stage.addEventListener('scene',function(e){
        trace(e.type)
    });
    this.update();
}
figure.prototype.update = function(){
    var param=$s.dsSharedObject.getLocal('person');
    this.zhai.text = '宅指数:'+param.data.zhai;
    this.weight.text = '体重:'+param.data.weight;
}
