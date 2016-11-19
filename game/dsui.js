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

    function uiPanel(html){
        html = html||'<div class="uiPanel"> <header>登录</header></div>';
        uiExtend(uiPanel,uiEventDispatcher,html);
        var obj = new uiPanel.prototype.__init();
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
    uiPanel.prototype.__init=function(){};
    uiPanel.prototype.addChild=function(obj){
        this.ele.append(obj.ele);
    }
    uiPanel.prototype.title = function(t){
        $(this.ele,'header').html(t);
    }
    uiPanel.prototype.removeChild=function(obj){
        obj.ele.remove();
    }

    function uiLogin(){
        var html ='<div id="login" class="uiPanel"> <header>登录</header> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身份</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9][a-z][A-Z]" placeholder="唯一识别号" type="text"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身高</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9]" placeholder="身高" type="number"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">体重</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9]" placeholder="体重" type="number"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">性别</label></div> <div class="weui-cell__bd"> <select class="weui-select" name="select2"> <option value="1" selected="selected">男</option> <option value="2">女</option> </select> </div> </div> <div class="button-sp-area"> <a class="weui-btn weui-btn_plain-default">确定</a> </div> </div>';
        uiExtend(uiLogin,uiPanel);
        return new uiLogin.prototype.__init();
    }
    uiLogin.prototype.__init = function(){
        this.ele.append('<div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身份</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9][a-z][A-Z]" placeholder="唯一识别号" type="text"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">身高</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9]" placeholder="身高" type="number"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">体重</label></div> <div class="weui-cell__bd"> <input class="weui-input" pattern="[0-9]" placeholder="体重" type="number"> </div> </div> <div class="weui-cell"> <div class="weui-cell__hd"><label class="weui-label">性别</label></div> <div class="weui-cell__bd"> <select class="weui-select" name="select2"> <option value="1" selected="selected">男</option> <option value="2">女</option> </select> </div> </div> <div class="button-sp-area"> <a class="weui-btn weui-btn_plain-default">确定</a> </div>');
        this.ele.on('click','.button-sp-area',function(e){
            this.dispatchEvent($.Event('login',false));
        })
    }

    function movieList(){
        var html ='<div class="uiPanel"><header>电影</header>'+
            '</div>'
        uiExtend(movieList,uiPanel,html);
        return new movieList.prototype.__init();
    }
    movieList.prototype.__init=function(){
        this.ele.css('min-Width','300px');
        this.ele.css('max-Height','600px');
    };
    movieList.prototype.addItem = function(item){
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

    var list = [uiEventDispatcher,uiLogin,movieList,uiPanel];
    list.forEach(function(e){
        $[e.prototype.constructor.name]=e;
    })
    $.uistage = new uiPanel('body');
})(Zepto);



