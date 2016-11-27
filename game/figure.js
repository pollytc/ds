/**
 * Created by Administrator on 2016/11/20.
 */
function figure(){
    $s.dsExtend(figure,$s.dsDisplayObjectContainer)
    return new figure.prototype.__init()
}
figure.prototype.__init = function(){
    this.param=$s.dsSharedObject.getLocal('person');
    this.zhai = new $s.dsTextField();
    this.addChild(this.zhai);
    this.weight = new $s.dsTextField();
    this.weight.x = 100;
    this.addChild(this.weight);
    this.zhishu = new $s.dsTextField();
    this.zhishu.x = 200;
    this.addChild(this.zhishu);
    var self = this;
    $s.stage.addEventListener('updatefigure',function(){
        self.param=$s.dsSharedObject.getLocal('person');
        self.update();
    });
    this.list = new PushList();
    //房间内行为改变
    $s.stage.addEventListener('action',function(e){
        if(e.action=='shangwang'){
            clearInterval(self.actionid)
            self.actionid = setInterval(function(){
                var t = new $s.dsTextField();
                t.text =1;
                self.param.data.zhai++;
                self.list.push(t);
                $s.stage.addChild(t);
                self.update();
            },2000);
        }else{
            clearInterval(self.actionid)
        }
    });
    //场景变化
    $s.stage.addEventListener('scene',function(e){
        if(!self.data)return
        self.param.data.scene = e.scene;
        self.update();
    });
    this.update();
}


figure.prototype.update = function(){
    var param = this.param;
    if(!param.data)return;
    this.zhai.text = '宅指数:'+param.data.zhai;
    this.weight.text = '体重:'+param.data.weight;
    this.zhishu.text = '健康指数:'+(param.data.weight/(param.data.height*param.data.height)).toFixed(2);
    param.flush();
}

function PushList(){
    this.list = [];
    this.timeid = 0;
    this.running = false;
}
PushList.prototype.push=function(obj){
    this.list.push(obj);
    obj.len = 20;
    var self = this;
    if(!this.running){
        this.running = true;
        this.timeid = setInterval(function(){
            self.list.forEach(function(e,i){
                e.x+= e.len;
                e.len--;
                if(e.len<=0){
                    e.parent.removeChild(e);
                    self.list.splice(i,1)
                }
            })
            if(self.list.length<=0){
                self.running = false;
                clearInterval(self.timeid)
            }
        },200);
    }

}

