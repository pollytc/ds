/**
 * Created by Administrator on 2016/11/20.
 */
function figure(){
    $s.dsExtend(figure,$s.dsDisplayObjectContainer)
    return new figure.prototype.__init()
}
figure.prototype.__init = function(){
    var tsize = new $s.dsTextFormat();
    tsize.size='15';
    this.zhai = new $s.dsTextField();
    this.zhai.defaultTextFormat = tsize;
    this.addChild(this.zhai);
    this.weight = new $s.dsTextField();
    this.weight.defaultTextFormat = tsize;
    this.weight.x = 100;
    this.addChild(this.weight);
    this.zhishu = new $s.dsTextField();
    this.zhishu.defaultTextFormat = tsize;
    this.zhishu.x = 200;
    this.addChild(this.zhishu);
    var self = this;
    $s.stage.addEventListener('updatefigure',function(){
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
                var param = localData();
                param.zhai++;
                self.list.push(t);
                $s.stage.addChild(t);
                self.update();
            },2000);
        }else{
            clearInterval(self.actionid)
        }
        saveserver({act:'behavior',beha:e.action});
    });
    //场景变化
    $s.stage.addEventListener('scene',function(e){
        var param = localData();
        if(!param)return;
        param.scene = e.scene;
        localData(param);
        saveserver({act:'scene',sce:e.scene});
    });
    this.update();
}


figure.prototype.update = function(){
    var param = localData();
    if(!param)return;
    this.zhai.text = '宅指数:'+param.zhai;
    this.weight.text = '体重:'+param.weight;
    this.zhishu.text = '健康指数:'+(param.weight/(param.height*param.height)).toFixed(2);
    localData(param);
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

