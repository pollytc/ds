/**
 * Created by Administrator on 2016/11/23.
 */
(function(){

    function createElement(html){
        var em = document.createElement('div');
        em.innerHTML= html;
        return em.children[0];
    }
    function Matrix(a, b, c, d, tx, ty) {
        //this.a =1//   ˮƽ���Ż�ͼ
        //this.b=0// 	ˮƽ��б��ͼ
        //this.c=1// 	��ֱ��б��ͼ
        //this.d =1// 	��ֱ���Ż�ͼ
        //this.tx=0// 	ˮƽ�ƶ���ͼ
        //this.ty=0// 	��ֱ�ƶ���ͼ
        this.setTo(a, b, c, d, tx, ty);
    }

    Matrix.prototype.clone = function () {
        return new Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
    }
//������
//��ĳ�������뵱ǰ�������ӣ��Ӷ�������������ļ���Ч����Ч�ؽ����һ��
    Matrix.prototype.concat = function (matrix) {
        this.append(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
        return this;
    }
//��Դ Point �����е����о������ݸ��Ƶ����÷� Matrix �����С�
    Matrix.prototype.copyFrom = function (matrix) {
        this.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
//�����������š���ת��ת���Ĳ�����
    Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
        rotation = rotation*Math.PI/180;
        var mat1=new Matrix();
        mat1.identity();
        mat1.rotate(rotation);
        mat1.scale(scaleX,scaleY);
        mat1.translate(tx,ty);
        return mat1;
    }

    Matrix.prototype.identity = function () {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    }

    Matrix.prototype.invert = function () {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        var tx1 = this.tx;
        var n = a1*d1-b1*c1;

        this.a = d1/n;
        this.b = -b1/n;
        this.c = -c1/n;
        this.d = a1/n;
        this.tx = (c1*this.ty-d1*tx1)/n;
        this.ty = -(a1*this.ty-b1*tx1)/n;
        return this;
    }
    Matrix.prototype.rotateX = function(angle){
        angle = angle*Math.PI/180;
        var cos = Math.cos(angle);
        var sin = 1;//Math.sin(angle);

        var a1 = this.a;
        var b1 = this.b;

        this.a = a1*cos+this.c*sin;
        this.b = b1*cos+this.d*sin;
        this.c = -a1*sin+this.c*cos;
        this.d = -b1*sin+this.d*cos;
        return this;
    }
    Matrix.prototype.rotateY = function(angle){
        angle = angle*Math.PI/180;
        var cos = 1;//Math.cos(angle);
        var sin = Math.sin(angle);

        var a1 = this.a;
        var b1 = this.b;

        this.a = a1*cos+this.c*sin;
        this.b = b1*cos+this.d*sin;
        this.c = -a1*sin+this.c*cos;
        this.d = -b1*sin+this.d*cos;
        return this;
    }
    Matrix.prototype.rotate = function (angle) {
        angle = angle*Math.PI/180;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        var a1 = this.a;
        var b1 = this.b;

        this.a = a1*cos+this.c*sin;
        this.b = b1*cos+this.d*sin;
        this.c = -a1*sin+this.c*cos;
        this.d = -b1*sin+this.d*cos;
        return this;
    }
    Matrix.prototype.scale = function (sx, sy) {
        this.a = sx;
        //this.b *= sx;
        //this.c *= sy;
        this.d = sy;
        //this.tx/=sx;
        //this.ty/=sy;
        return this;
    }

    Matrix.prototype.setTo = function (aa, bb, ca, da, txa, tya) {
        this.a = aa || 1;
        this.b = bb || 0;
        this.c = ca || 0;
        this.d = da || 1;
        this.tx = txa || 0;
        this.ty = tya || 0;
    }
    Matrix.PERRAD = Math.PI/180;
    Matrix.prototype.skew = function(sx,sy){
        sx = sx*Matrix.PERRAD;
        sy = sy*Matrix.PERRAD;
        this.append(Math.cos(sx), Math.sin(sy), -Math.sin(sx), Math.cos(sy), 0, 0);
    }
    Matrix.prototype.append = function(a, b, c, d, tx, ty) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        if (a != 1 || b != 0 || c != 0 || d != 1) {
            this.a  = a1*a+c1*b;
            this.b  = b1*a+d1*b;
            this.c  = a1*c+c1*d;
            this.d  = b1*c+d1*d;
        }
        this.tx = a1*tx+c1*ty+this.tx;
        this.ty = b1*tx+d1*ty+this.ty;
        return this;
    };
    Matrix.prototype.translate = function (dx, dy) {
        this.tx = this.a*dx + this.c*dy;
        this.ty = this.b*dx + this.d*dy;
        return this;
    }
    Matrix.prototype.deltaTransformPoint = function(point){
        var pt = new Point();
        pt.x = point.x*this.a+point.y*this.c;
        pt.y = point.x*this.b+point.y*this.d;
        return pt;
    }
    Matrix.prototype.isEmpty=function(){
        return this.a==1 && this.b==0&&this.c==0&&this.d==1&&this.tx==0&&this.ty==0;
    }
    Matrix.prototype.transformPoint = function (point) {
        var pt = new Point();
        pt.x = point.x*this.a+point.y*this.c+this.tx;
        pt.y = point.x*this.b+point.y*this.d+this.ty;
        return pt;
    }
    Matrix.prototype.toString=function(){
        return 'Matrix('+this.a+','+this.b+','+this.c+','+this.d+','+this.tx+','+this.ty+')';
    }

    function uiExtend(subclass, pclass,div) {
        var spro = subclass.prototype;
        var oc = spro.constructor;
        spro.__init.prototype = new pclass(div);
        for(var ss in spro)spro.__init.prototype[ss]=spro[ss]
        spro.__init.prototype.constructor = oc;
    }
    //proto.push(uiEventDispatcher);
    function uiDisplayObject(html){
        if(typeof html =='string')
            this.ele=document.createElement(html);
        else
            this.ele=html||document.createElement('div');
        this._mat=new Matrix();
        this._events={};
        this.parent = null;
    }
    Object.defineProperties(uiDisplayObject.prototype,{
        x:{get:function(){return this.ele.offsetLeft},set:function(v){this.ele.style.left=v;}},
        y:{get:function(){this.ele.offsetTop},set:function(v){this.ele.style.top=v;}},
        width:{set:function(v){this.ele.style.top=v;},get:function(){return this.ele.offsetWidth}},
        height:{set:function(v){this.ele.style.height=v;},get:function(){return this.ele.offsetHeight}},
        scaleX:{set:function(v){
            this._scaleX=v;
            this._mat.scale(this._scaleX,this._scaleY);
            this.ele.style.transform = this._mat.toString();
        },get:function(){return this._scaleX}},
        scaleY:{set:function(v){
            this._scaleY=v;
            this._mat.scale(this._scaleX,this._scaleY);
            this.ele.style.transform = this._mat.toString();
        },get:function(){return this._scaleY}},
    })
    uiDisplayObject.prototype.css = function(style,value){
        if(typeof style=='object'){
            for(var s in style){
                this.ele.style[s]=style[s]
            }
            return;
        }
        if(value != undefined)this.ele.style[style]=value;
        else return this.ele.style[style];
    }

    uiDisplayObject.prototype.tojquery=function(){
        return $(this.ele);
    }

    uiDisplayObject.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
        if (this._events[type] == null)this._events[type] = Array();
        this._events[type].push(listener);
    }

    uiDisplayObject.prototype.dispatchEvent = function (event) {
        event.currentTarget = this;
        var a = this._events[event.type];
        var ps = [];
        var p = this.parent;
        while(p){
            ps.push(p);
            p = p.parent;
        }
        for (var i in a) {
            if(event.bubbles){
                for(var j = 0;j<ps.length;j++){
                    a[i].call(ps[j], event);
                }
            }else{
                for(var j = ps.length-1;j>=0;j--){
                    a[i].call(ps[j], event);
                }
            }
        }
    }
    uiDisplayObject.prototype.removeEventListener = function (type, listener, useCapture) {
        var ts = this._events[type];
        var i = ts.indexOf(listener);
        if (i != -1) {
            ts.splice(i, 1);
            if (ts.length <= 0) {
                delete  this._events[type];
            }
        }
    }

    uiDisplayObject.prototype.__call = function (parent,key,paramArr) {
        paramArr=paramArr||[];
        if(Array.isArray(paramArr))
        return parent.prototype[key].apply(this,paramArr);
        else
            parent.prototype[key].call(this,paramArr);
    }

    function uiInteractiveObject(html) {
        uiExtend(uiInteractiveObject,uiDisplayObject,html);
        return new uiInteractiveObject.prototype.__init();
    }
    uiInteractiveObject.prototype.__init=function(){};
    uiInteractiveObject.prototype.addEventListener = function (type, listener, useCapture) {
        this.ele.addEventListener(type,listener, useCapture)
    }

    uiInteractiveObject.prototype.dispatchEvent = function (event) {
        this.ele.dispatchEvent(event);
    }
    uiInteractiveObject.prototype.removeEventListener = function (type, listener) {
        this.ele.removeEventListener(type, listener);
    }

    function uiObjectContainer(html){
        uiExtend(uiObjectContainer,uiDisplayObject,html);
        return new uiObjectContainer.prototype.__init();
    }
    uiObjectContainer.prototype.__init = function(){}
    uiObjectContainer.prototype.addChild =function(obj){
        this.ele.appendChild(obj.ele);
        obj.parent = this;
    }
    uiObjectContainer.prototype.removeChild=function(obj){
        if(obj.parent != this)return;
        this.ele.removeChild(obj.ele);
        obj.parent = null;
    }

    function uiObject(html){
        if(typeof html=='string')
            uiExtend(uiObject,uiObjectContainer,createElement(html));
        else
            uiExtend(uiObject,uiObjectContainer,html);
        return new uiObject.prototype.__init();
    }
    uiObject.prototype.__init = function(){
        this.main = this.ele;
    };
    uiObject.prototype.addChild =function(obj){
        if(typeof obj =='string'){
            this.main.appendChild(createElement(obj));
            return;
        }
        obj.parent = this;
        this.main.appendChild(obj.ele);
    }
    uiObject.prototype.empty=function(){
        if(this.parent){
            this.parent.ele.removeChild(this.ele);
        }
        this.parent=null;

    }

    function uiPanel(){
        var html ='<div data-role="panel" data-position-fixed="true" data-theme="a" id="add-form" class="ui-panel ui-body-a ui-panel-animate ui-panel-open">\
            <div class="ui-panel-inner"></div>\
        </div>'
        uiExtend(uiPanel,uiObject,html);
        return new uiPanel.prototype.__init();
    }
    uiPanel.prototype.__init=function(){
        this.main = this.ele.querySelectorAll('.ui-panel-inner')[0];
    }

    function uiDialog(){
        var html ='<div role="dialog" class="ui-dialog-contain ui-overlay-shadow ui-corner-all">\
            <div data-role="header" data-theme="b" role="banner" class="ui-header ui-bar-b">\
            <a href="#" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-rel="back">Close</a>\
            <h1 class="ui-title" role="heading" aria-level="1">Dialog</h1>\
            </div>\
            <div role="main" class="ui-content">\
            </div>\
            </div>';
        uiExtend(uiDialog,uiObject,html);
        return new uiDialog.prototype.__init();
    }
    uiDialog.prototype.__init =function(){
        this.head = this.ele.querySelector('div[data-role=header] h1')
        this.main = this.ele.querySelector('div[role=main]');
        var self =this;
        this.ele.querySelector('a.ui-icon-delete').onclick=function(e){
            if(self.parent)self.parent.removeChild(self);
        }
    }
    uiDialog.prototype.title = function(v){
        this.head.innerHTML = v;
    }

    function uiList(){
        uiExtend(uiList,uiObjectContainer,createElement('<ul data-role="listview" data-split-icon="gear" data-split-theme="a" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul>'));
        return new uiList.prototype.__init();
    }
    uiList.prototype.__init=function(){
        this.length = 0;
    }
    uiList.prototype.additem = function(item,id){
        id =id||this.length;
        this.length++;
        var html = '<li class="ui-li-has-alt ui-li-has-thumb" data-uid='+id+'>\
            <a class="ui-btn">\
                <img src="%img%">\
                <h2>%name%</h2>\
                <p>%content%</p>\
                <span class="ui-li-count ui-body-inherit" data-rel="popup" >1</span>\
            <a class="ui-btn ui-btn-icon-notext ui-icon-plus ui-btn-a"></a>\
            </a>\
            </li>';

        for(var s in item){html =html.replace("%"+s+"%",item[s])};
        var et = createElement(html);
        var self = this;
        et.onclick = function(e){
            if(e.target.className.indexOf('ui-icon-plus')!=-1)
            self.itemState(et.getAttribute('data-uid'));
        }
        this.ele.appendChild(et);
    }
    uiList.prototype.addlist=function(list){
        for(var s in list){this.additem(list[s])};
    }
    uiList.prototype.itemState=function(itemid){
        var item = this.ele.querySelectorAll('li[data-uid="'+itemid+'"]')[0];
        var attr= parseInt(item.getAttribute('data-select'));
        item.setAttribute('data-select',attr?0:1);
        if(item){
            var href = item.querySelectorAll('a[class~=ui-icon-plus]')[0];
            if(attr)
                href.className=href.className.replace('ui-btn-b','ui-btn-a');
            else
                href.className=href.className.replace('ui-btn-a','ui-btn-b');
        }
    }
    function hotTip(){
        var html= '<div class="ui-popup-container pop in ui-popup-active" id="popupBasic-popup" style="max-width: 711px; top: 521.4px; left: 15px;"><div data-role="popup" id="popupBasic" class="ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all">\
            <p>This is a completely basic popup, no options set.</p>\
        </div></div>';
        var e = createElement(html);
        uiExtend(hotTip,uiDisplayObject,e);
    }
    hotTip.prototype.__init=function(){};
    function uiStage(){
        var html = document.querySelectorAll('div[data-role=page]')[0];

        uiExtend(uiStage,uiObject,html);
        return new uiStage.prototype.__init();
    }
    uiStage.prototype.__init =function(){
        this.children=[];
    };
    uiStage.prototype.empty=function(){
        for(var i = 0;i<this.children.length;i++){
            this.children[i].empty();
        }
    }
    uiStage.prototype.addChild=function(obj){
        this.children.push(obj);
        this.__call(uiObject,'addChild',obj);
    };
    uiStage.prototype.removeChild=function(obj){
        for(var i = 0;i<this.children.length;i++){
            if(this.children[i]==obj){
                this.children.splice(i,1);
                break;
            }
        }
        this.__call(uiObjectContainer,'removeChild',obj);
    };

    var $s = window.$s||{};window.$s = $s;
    if(!$s.fn)$s.fn={};
    var proto =[];
    proto.push(uiDisplayObject,uiObjectContainer,uiDialog,uiList,uiPanel);
    proto.forEach(function(e){
        $s[e.prototype.constructor.name]=e;
    })

    window.onload = function(){
        $s.uistage = new uiStage();
    }


})();