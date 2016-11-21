/**
 * Created by Administrator on 2016/11/19.
 */

;(function($){
    function uiExtend(subclass, pclass,div) {
        var spro = subclass.prototype;
        var oc = spro.constructor;
        spro.__init.prototype = new pclass(div);
        for(var ss in spro)spro.__init.prototype[ss]=spro[ss]
        spro.__init.prototype.constructor = oc;
    }
    function uiEventDispatcher(ele) {
        if(typeof ele =='string')
            this.ele=$(ele);
        else
            this.ele=ele||$('div');
        this.uid = this.constructor.name;
    }
    //向上执行被重写的函数,paramArr
    uiEventDispatcher.prototype.__call = function (parent,key,paramArr) {
        paramArr=paramArr||[];
        parent.prototype[key].call(this,paramArr);
    }
    uiEventDispatcher.prototype.addEventListener = function (type, listener, useCapture) {
        //this.ele.addEventListener(type,listener, useCapture)
        this.ele.on(type,listener)
    }
    uiEventDispatcher.prototype.dispatchEvent = function (event) {
        this.ele.dispatchEvent(event);
    }
    uiEventDispatcher.prototype.removeEventListener = function (type, listener) {
        this.ele.removeEventListener(type, listener);
    }
    uiEventDispatcher.prototype.hasEventListener = function (type) {
        return this.ele.hasEventListener(type);
    }
    uiEventDispatcher.prototype.willTrigger = function (type) {
        return this.ele.willTrigger(type);
    }
    uiEventDispatcher.prototype.toString= function(){
        return this.ele.outerHTML;
    }

    function uiObjectContainer(html){
        uiExtend(uiObjectContainer,uiEventDispatcher,html);
        var obj = new uiObjectContainer.prototype.__init();
        Object.defineProperties(obj,{x:{set:function(v){
            this.ele.css('left',v);
        },get:function(){return this.ele.css('left');}},y:{
            set:function(v){
                this.ele.css('top',v);
            },get:function(){
                return this.ele.css('top');
            }
        },width:{set:function(v){
            return this.ele.css('width',v);
        },get:function(){
            return this.ele[0].offsetWidth;
        }},height:{
            set:function(v){this.ele.css('height',v);},get:function(){return this.ele[0].offsetHeight;}
        }})
        return obj;
    }
    uiObjectContainer.prototype.__init = function(){this.parent = null;}
    uiObjectContainer.prototype.addChild = function (obj) {
        obj.parent = this;
        this.ele.append(obj.ele);
    }
    uiObjectContainer.prototype.removeChild = function(obj){
        obj.parent =null;
        obj.ele.remove();
    }

    function uiPanel(html){
        html = html||'<div class="uiPanel"></div>';
        uiExtend(uiPanel,uiObjectContainer,html);
        var obj = new uiPanel.prototype.__init();
        return obj;
    }
    uiPanel.prototype.__init=function(){

        this.ele.addClass('uiPanel');
    };
    uiPanel.prototype.show=function(obj){
        obj.parent = this;
        this.ele.append(obj.ele);
        this.ele.show();
    }
    uiPanel.prototype.addClose = function(){
        var l =this.ele.find('header>i')
        var self = this;
        if(l.length==0)
        {
            var e = $('<i class="weui-icon-cancel close"></i>');
            var h =this.ele.find('header');
            h.append(e);
            e.on('click',function(){
                self.parent.hide(self);
            })
        }
    }
    uiPanel.prototype.model=function(){
        var bg=$('<div class="bg"></div>');
        this.ele.before(bg);
    }
    uiPanel.prototype.title = function(t){
        var s=this.ele.find('header>span');
        if(s.length==0){
            this.ele.find('header').append('<span>'+t+'</span>');
        }else {
            s.html(t);
        }
    }
    uiPanel.prototype.hide=function(obj){
        obj.parent = null;
        obj.ele.remove();
        this.ele.hide();
    }

    function uiTabPanel(){
        uiExtend(uiTabPanel,uiPanel);
        return new uiTabPanel.prototype.__init();
    }
    uiTabPanel.prototype.__init = function(){
        this.tab = $('<div class="weui-navbar"></div>');
        this.panel =$('<div class="weui-tab__panel"></div>');
        var body =$('<div class="weui-tab"></div>');
        this.ele.append(body);
        body.append(this.tab);
        body.append(this.panel);
        this.curtab = null;
        var self = this;
        this.tab.on('click','.weui-navbar__item',function(e){
            self.panel.find('div[data-for="'+self.curtab.data('tar')+'"]').hide();
            self.curtab.removeClass('weui-bar__item_on');
            self.curtab = $(e.target);
            self.panel.find('div[data-for="'+self.curtab.data('tar')+'"]').show();
            self.curtab.addClass('weui-bar__item_on');
            //self.dispatchEvent()
        });
    }
    uiTabPanel.prototype.setSelecttab = function(tab){
        this.panel.find('div[data-for="'+self.curtab.data('tar')+'"]').hide();
        this.curtab.removeClass('weui-bar__item_on');
        this.curtab = this.tab.find('[data-tar="'+tab+'"]');
        this.panel.find('div[data-for="'+self.curtab.data('tar')+'"]').show();
        this.curtab.addClass('weui-bar__item_on');
    }
    uiTabPanel.prototype.addtab=function(tab,panel){
        //key=key||this.tab.children().length;
        if(!this.curtab){
            this.curtab=$('<div class="weui-navbar__item" data-tar="'+tab+'">'+tab+'</div>');
            this.curtab.addClass('weui-bar__item_on');
            this.tab.append(this.curtab);
        }else{
            this.tab.append('<div class="weui-navbar__item" data-tar="'+tab+'">'+tab+'</div>');
            panel.ele.hide();
        }
        panel.ele.data('for',tab);
        this.panel.append(panel.ele);
    }

    function uiLogin(){
        uiExtend(uiLogin,uiPanel);
        return new uiLogin.prototype.__init();
    }
    uiLogin.prototype.__init=function(){
        this.ele.append('<div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身份</label></div> <div class="weui-cell__bd"> <input class="weui-input" placeholder="唯一识别号" name="ID" type="text"> </div> </div><div class="button-sp-area"> <a class="weui-btn weui-btn_plain-default">确定</a> </div>');
        this.ele.on('click','weui-btn',function(e){
            $s.dsURLRequest('')
        })
    };

    function uiResitger(){
        uiExtend(uiResitger,uiPanel);
        return new uiResitger.prototype.__init();
    }

    uiResitger.prototype.__init = function(){
        var self = this;
        this.ele.append('<div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身份</label></div> <div class="weui-cell__bd"> <input class="weui-input" placeholder="唯一识别号" name="ID" type="text"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身高</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9]" placeholder="身高" name="length" type="number"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">体重</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9]" placeholder="体重" name="weight" type="number"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">性别</label></div> <div class="weui-cell__bd"> <select class="weui-select" name="select"> <option value="1" selected="selected">男</option> <option value="2">女</option> </select> </div> </div> <div class="button-sp-area"> <a class="weui-btn weui-btn_plain-default">确定</a> </div>');
        this.ele.on('click','.button-sp-area',function(e){
            var param ={};
            self.ele.find('input').each(function(i,e){
                param[e.name]= e.value;
            })
            param['zhai']=0;
            param['sex']=self.ele.find('select').val();
            var sd =$s.dsSharedObject.getLocal('person');
            sd.data =param;
            sd.flush();
            //this.dispatchEvent($.Event('submit',false));
        })
    }


    function MovieList(){
        //var html ='<div class="uiPanel"><header><span>电影</span><i class="weui-icon-cancel close"></i></header></div>'
        uiExtend(MovieList,uiPanel);
        return new MovieList.prototype.__init();
    }
    MovieList.prototype.__init=function(){
        this.title('电影');
        this.addClose();
        this.model();
        this.ele.css('width','100%');
        this.ele.css('height','100%');
    };
    MovieList.prototype.addItem = function(item){
        item.img =item.img||'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==';
        var itstr='<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">\
            <div class="weui-media-box__hd">\
            <img class="weui-media-box__thumb" src="%img%" alt="">\
            </div>\
            <div class="weui-media-box__bd">\
            <h4 class="weui-media-box__title">%title%</h4>\
            <p class="weui-media-box__desc">%content%</p>\
        </div>\
        </a>'
        for(var s in item){
            itstr=itstr.replace('%'+s+'%',item[s]);
        }
        this.ele.append(itstr);
    }
    MovieList.prototype.addlist = function(list){
        var self = this;
        list.forEach(function(e,i){
            self.addItem(e);
        })
    }
    $(function(){
        $.uibody = new uiObjectContainer('#stage');
    })
    var list = [uiEventDispatcher,uiLogin,MovieList,uiPanel,uiTabPanel,uiObjectContainer,uiResitger];
    list.forEach(function(e){
        $[e.prototype.constructor.name]=e;
    });
})(Zepto);



