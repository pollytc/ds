/**
 * Created by Administrator on 2016/11/7.
 */
(function(window){
    var DS = window.$s||window.$ui||{};
    window.$ui=DS;DS.trace = console.log;DS.uimains = [];
    var config = DS.config={body:'',unit:"px",width:400,height:500};
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj){
        trace(errorMessage, scriptURI, lineNumber,columnNumber,errorObj)
    }
    window.addEventListener('load',function(){
        DS.uistage = new uiDiv(config.body?document.querySelector(config.body):null);
        DS.uistage.setStyle('overflow','hidden');
        DS.uistage.height=config.width;
        DS.uistage.width=config.height;
        DS.uimains.forEach(function(e){e()});
        window.requestAnimationFrame(function(){
            DS.uistage.caller();
            DS.uistage.invalidate();
        });
    })
    DS.dsMain = function(back,fig){
        if(typeof fig =='string')config.body = fig;
        else for(var s in fig)config[s] = fig[s];
        if(DS.uistage)back();
        else DS.uimains.push(back);
    }

    function htmltotext(html){
        var span=document.createElement('span');
        span.innerHTML = html;
        return span.textContent;
    }

    function Point(x, y) {
        this.x = x | 0;
        this.y = y | 0;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.copyFrom = function (point) {
        this.x = point.x;
        this.y = point.y;
        this.length = point.length;
    };
    Point.distance = function (point1, point2) {
        return new Point(point1.x - point2.x, point1.y - point2.y).length;
    }
    Point.prototype.equals = function (point) {
        return this.x == point.x || this.y == point.y;
    }
//内插值 待验证
    Point.interpolate = function (pt1, pt2, f) {
        var nor = pt1.clone().subtract(pt2);
        nor.normalize(nor.length * f);
        return nor.add(pt1);
    }
//
    Point.prototype.normalize = function (len) {
        var Q = Math.tan(this.y / this.x);
        this.setTo(Math.cos(Q) * len, Math.sin(Q) * len);
    };
    Point.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.polar = function (len, angle) {
        return new Point(Math.cos(angle) * len, Math.sin(angle) * len);
    };
    Point.prototype.subtract = function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    };
    Point.prototype.setTo = function (xa, ya) {
        this.x = xa || 0;
        this.y = ya || 0;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    function Matrix(a, b, c, d, tx, ty) {
        //this.a =1//   水平缩放绘图
        //this.b=0// 	水平倾斜绘图
        //this.c=1// 	垂直倾斜绘图
        //this.d =1// 	垂直缩放绘图
        //this.tx=0// 	水平移动绘图
        //this.ty=0// 	垂直移动绘图
        this.setTo(a, b, c, d, tx, ty);
    }

    Matrix.prototype.clone = function () {
        return new Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
    }
//矩阵后加
//将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
    Matrix.prototype.concat = function (matrix) {
        this.append(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
        return this;

    }
//将源 Point 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
    Matrix.prototype.copyFrom = function (matrix) {
        this.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
//包括用于缩放、旋转和转换的参数。
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
        this.a *= sx;
        this.b *= sx;
        this.c *= sy;
        this.d *= sy;
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

    function Color(color) {
        this.R = (0x00ff0000 & color) >> 16;//red
        this.G = (0x0000ff00 & color) >> 8;//green;
        this.B = 0x000000ff & color;//blue
        if (color > 0xffffff) {
            this.A = (0xff000000 && color) >> 24;
            if (this.A < 0)this.A += 256;
        }//alpha
        else this.A = 255;
    }
    Color.toStr = function (v, radio) {
        radio = radio || 16;
        var c = new Color(v);
        var s = "#";
        if (radio == 32) {
            c.A < 10 ? s += "0" : 0;
            s += c.A.toString(16);
        }
        c.R < 10 ? s += "0" : 0;
        s += c.R.toString(16);
        c.G < 10 ? s += "0" : 0;
        s += c.G.toString(16);
        c.B < 10 ? s += "0" : 0;
        s += c.B.toString(16);
        return s;
    }

    var dsExtend =DS.dsExtend= function dsExtend(subclass, pclass,div) {
        var spro = subclass.prototype;
        var ppro=pclass.prototype;
        var oc = spro.constructor;
        if(ppro.__init){
            ppro.constructor=oc;
        }
        spro.__init.prototype = new pclass(div);
        for(var ss in spro)spro.__init.prototype[ss]=spro[ss]
        spro.__init.prototype.constructor = oc;
    }
    function uiEventDispatcher(ele) {
        if(typeof ele =='string')
            this.ele=document.createElement(ele);
        else
            this.ele=ele||document.createElement('div');
        this.uid = this.constructor.name
    }
//向上执行被重写的函数,paramArr
    uiEventDispatcher.prototype.__call = function (parent,key,paramArr) {
        paramArr=paramArr||[];
        parent.prototype[key].call(this,paramArr);
    }
    uiEventDispatcher.prototype.addEventListener = function (type, listener, useCapture) {
        var self = this;
        //listener.proxy = function(e){
        //    e.currentTarget = this;
        //    listener.call(,e);
        //};
        this.ele.addEventListener(type,listener, useCapture)
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

    DS.uiDisplayObject=uiDisplayObject;
    function uiDisplayObject(arg){
        dsExtend(uiDisplayObject,uiEventDispatcher,arg);
        var obj =new uiDisplayObject.prototype.__init();
        Object.defineProperties(obj,{
            x:{set:function(v){this._x=v+config.unit;},get:function(){return this._x.replace(config.unit,'')*1},enumerable:true},
            y:{set:function(v){this._y =v+config.unit;},get:function(){return this._y.replace(config.unit,'')*1},enumerable:true},
            width:{set:function(v){this._width=v+config.unit},get:function(){return this._width.replace(config.unit,'')*1},enumerable:true},
            height:{set:function(v){this._height=v+config.unit},get:function(){return this._height.replace(config.unit,'')*1},enumerable:true},
            percentWidth:{set:function(v){this._width = v+"%"},get:function(){return this._width}},
            percentHeight:{set:function(v){this._height = v+"%"},get:function(){return this._height}},
            maxWidth:{set:function(v){this._maxwidth=v+config.unit},get:function(){return this._maxwidth.replace(config.unit,'')*1}},
            maxHeigth:{set:function(v){this._maxheigth=v+config.unit},get:function(){return this._maxheigth.replace(config.unit,'')*1}},
            minWidth:{set:function(v){this._minwidth=v+config.unit},get:function(){return this._minwidth.replace(config.unit,'')*1}},
            minHeight:{set:function(v){this._minheight=v+config.unit},get:function(){return this._minheight.replace(config.unit,'')*1}},
            scaleX:{set:function(v){this._scaleX=v;this._mat.scale(this._scaleX,this._scaleY);},get:function(){return this._scaleX}},
            scaleY:{set:function(v){this._scaleY=v;this._mat.scale(this._scaleX,this._scaleY);},get:function(){return this._scaleY}},
        })
        return obj;
    }
    uiDisplayObject.prototype.__init = function(){
        this.style = this.ele.style;
        this._text ='';
        this._width='';
        this._height='';
        this._maxwidth='';
        this._maxheigth ='';
        this._minwidth ='';
        this._minheight ='';
        this._x = '';
        this._y = '';
        this._scaleX =1;
        this._scaleY =1;
        this.align ='left';
        this.backgroundColor="#ffffff";
        this.parent=null;
        this._mat=new Matrix();
        this.includeInLayout = false;
        this.class =this.constructor.name;
    }
    uiDisplayObject.prototype.caller = function(){

    }
    uiDisplayObject.prototype.setAttr= function(attr,value){
        this.ele[attr] = value;
    }
    uiDisplayObject.prototype.setStyle =function(style,value){
        this.style[style] =value;
    }
    uiDisplayObject.prototype.invalidate= function () {
        if(!this.includeInLayout){
            this.style.position= 'absolute';
        }else{
            this.style.position= 'relative';
        }
        this.style.top= this._y;
        this.style.left=this._x;
        this.style.float = this.align;
        this.style.backgroundColor = this.backgroundColor;
        this.style.width = this._width;
        this.style.height =this._height;
        if(this._maxwidth)this.style['max-width']=this._maxwidth;
        if(this._maxheigth)this.style['max-height']=this._maxheigth;
        if(this._minwidth)this.style['min-width']=this._minwidth;
        if(this._minheight)this.style['min-height']=this._minheight;
        if(this._text)this.ele.innerHTML=this._text;
        if(!this._mat.isEmpty())this.style.transform = this._mat.toString();
        this.ele.setAttribute('class',this.class);
        if(this.parent)this.parent.ele.appendChild(this.ele);
    }

    DS.uiDiv=uiDiv;
    function uiDiv(arg){
        dsExtend(uiDiv,uiDisplayObject,arg);
        return new uiDiv.prototype.__init();
    }

    uiDiv.prototype.__init = function(){
        this.__children=[];
        this.__namechildren=[];
        this.numChildren=0;
    };

    uiDiv.prototype.addChild = function (div) {
        var index = this.__children.push(div);
        this.numChildren++;
        this.__namechildren[div.name] = index;
        div.parent = this;
        //this.ele.appendChild(div.ele)
    };
    uiDiv.prototype.addChildAt = function (displayObject, index){
        if (this.__children[index] == null) {
            this.__children[index] = displayObject;
        } else {
            var s1 = this.__children.slice(0, index);
            var s2 = this.__children.slice(index, this.__children.length);
            s1.push(displayObject);
            this.__children = s1.concat(s2);
        }
        this.__namechildren[displayObject.name] = index;
        this.numChildren++;
        displayObject.parent = this;
    };
    uiDiv.prototype.contains = function (displayObject) {
        return this.__children[this.__namechildren[displayObject.name]-1];
    };
    uiDiv.prototype.getChildAt = function (index) {
        return this.__children[index];
    };
    uiDiv.prototype.getChildByName = function (name) {
        return this.__children[this.__namechildren[name]-1];
    };
    uiDiv.prototype.getChildIndex = function (displayobject) {
        return this.__namechildren[displayobject.name]-1;
    };
    uiDiv.prototype.invalidate = function(){
        for(var i = 0;i<this.__children.length;i++){
            this.__children[i].invalidate();
        }
        this.__call(uiDisplayObject,'invalidate');
    }
    uiDiv.prototype.caller = function(){
        for(var i = 0;i<this.__children.length;i++){
            this.__children[i].caller();
        }
        this.__call(uiDisplayObject,'caller');
    }
    DS.uiButton=uiButton;
    function uiButton(){
        dsExtend(uiButton,uiDisplayObject,'input');
        var obj = new uiButton.prototype.__init();
        Object.defineProperties(obj,{
            'text':{set:function(v){
                var t = document.createElement('span');
                t.innerHTML=v;
                this._text = t.innerText;
            },get:function(){
                return this._text;
            }}
        })
        return obj;
    }
    uiButton.prototype.__init=function(){
        this.ele.type='button';
    };
    uiButton.prototype.invalidate=function(){
        this.style.cursor ='pointer';
        this.__call(uiDisplayObject,'invalidate');
    }
    function uiTextFormat() {
        this.align = "left";
        //表示段落的对齐方式。
        this.bold = false
        //指定文本是否为粗体字。
        this.bullet = false;//disc
        //表示文本为带项目符号的列表的一部分。
        this.color = "#000";
        //表示文本的颜色。
        this.font = "Arial";//（在 Mac OS X 上，默认字体为 Times）
        //使用此文本格式的文本的字体名称，以字符串形式表示。
        this.indent = 0;
        //表示从左边距到段落中第一个字符的缩进。
        this.italic = false;
        //表示使用此文本格式的文本是否为斜体。
        this.kerning = false;
        //一个布尔值，表示是启用 (true) 还是禁用 (false) 字距调整。
        this.leading = 1.7;
        //一个整数，表示行与行之间的垂直间距（称为前导）量。
        this.leftMargin = 0;
        //段落的左边距，以像素为单位。
        this.letterSpacing = 0;
        //一个数字，表示在所有字符之间均匀分配的空间量。
        this.rightMargin = 0;
        //段落的右边距，以像素为单位。
        this.size = 15;
        //使用此文本格式的文本的大小（以像素为单位）。
        this.tabStops = [];
        //将自定义 Tab 停靠位指定为一个非负整数的数组。
        this.target = "_blank";
        //表示显示超链接的目标窗口。
        this.underline = false;
        //表示使用此文本格式的文本是带下划线 (true) 还是不带下划线 (false)。
        this.url = "";
        //表示使用此文本格式的文本的目标 URL。
    }
    uiTextFormat.prototype.format=function(ele){
        var style = ele.style;
        style['font-size'] = this.size+config.unit;
        if(this.italic)
            style['font-style']='italic';

        style['font-family']=this.font;
        style.color =this.color;
        style['text-align'] = this.align;
        if(this.indent)
            style['text-indent']=this.indent+'em';

        if(this.bullet){
            style['list-style-type'] ='disc';
        }

        if(this.underline)
            style['text-decoration']='underline';
        if(this.kerning){
            style['line-height']=this.leading;
            style.marginLeft = this.leftMargin;
            style.marginRight=this.rightMargin;
            style['letter-spacing']=this.letterSpacing;
            style['word-spacing']=this.letterSpacing;
        }
        if(this.bold){
            style['font-weight'] = 'bold';
        }
        if(this.url){
            this.ele.innerHTML = "<a href="+this.format.url+">"+this.ele.innerHTML+"</a>";
        }
        return ele;
    }
    DS.uiTextFormat =uiTextFormat;
    DS.uiTextField=uiTextField;
    function uiTextField(arg){
        dsExtend(uiTextField,uiDisplayObject,arg);
        var obj=new uiTextField.prototype.__init();
        Object.defineProperties(obj,{
            'text':{set:function(v){
                this._text = htmltotext(v);
            },get:function(){
                return this._text;
            }},
            'htmlText':{set:function(v){
                this._text =v;
            },get:function(){
                return this._text;
            }}
        })
        return obj;
    }
    uiTextField.prototype.__init =function(){
        this.multiline = true;
        this.format = new uiTextFormat();
    };
    uiTextField.prototype._formatindex=0;
    uiTextField.prototype.setSelectionFormat = function(sindex,eindex,format){
        this._formatindex++;
        var oldtext = htmltotext(this._text)
        var s2 =oldtext.substring(sindex,eindex);
        var span = document.createElement('span');
        format.format(span);
        span.setAttribute('fid',this._formatindex);
        span.innerHTML = s2;
        this._text=this._text.replace(s2,span.outerHTML);
        return this._formatindex;
    }
    uiTextField.prototype.unsetSelectionFormat =function(formatindex){
        var e = "span[fid=\""+formatindex+"\"]";
        var span = document.createElement('span');
        span.innerHTML = this._text;
        var r = span.querySelector(e);
        if(r)this._text=this._text.replace(r.outerHTML, r.innerHTML);
    }
    uiTextField.prototype.invalidate=function(){
        if(!this.multiline){
            this.style['white-space']="nowrap";
            this.style['word-break']='keep-all';
        }
        this.__call(uiDisplayObject,"invalidate");
        this.format.format(this.ele);
    }

    DS.uiTextInput=uiTextInput;
    function uiTextInput(){
        dsExtend(uiTextInput,uiDisplayObject,'input');
        var obj =new uiTextInput.prototype.__init();
        Object.defineProperties(obj,{
            'text':{set:function(v){
                this.ele.value =  htmltotext(v);
            },get:function(){
                return this.ele.value;
            }}
        })
        return obj;
    }
    uiTextInput.prototype.__init = function(){
        this.ele.type="input"
        this.format = new uiTextFormat();
    }
    uiTextInput.prototype.invalidate=function(){
        //this.style['border-width']='0px';
        this.style['outline']='medium';
        this.style['line-height'] = '1.7em';
        this.format.format(this.ele)
        this.__call(uiDisplayObject,'invalidate');
    }

    DS.uiTextare = uiTextare;
    function uiTextare(){
        dsExtend(uiTextare,uiDisplayObject,'textarea');
        var obj = new uiTextare.prototype.__init();
        Object.defineProperties(obj,{
            'text':{set:function(v){
                this.ele.value =  htmltotext(v);
            },get:function(){
                return this.ele.value;
            }}
        })
        return obj;
    }
    uiTextare.prototype.__init=function(){}
    uiTextare.prototype.invalidate = function(){
        this.style.resize="none";
        this.style['box-sizing']='border-box';
        this.__call(uiDisplayObject,'invalidate');
    }

    DS.uiScrollPane = uiScrollPane;
    function uiScrollPane(){
        dsExtend(uiScrollPane,uiDiv);
        return new uiScrollPane.prototype.__init();
    }
    uiScrollPane.prototype.__init=function(){
    }
    uiScrollPane.prototype.invalidate=function(){
        this.style.overflow='auto';
        this.__call(uiDiv,'invalidate');
    }
    DS.uiListView = uiListView;
    function uiListView(){
        dsExtend(uiListView,uiDiv);
        return new uiListView.prototype.__init();
    }
    uiListView.prototype.setItemClass=function(itemcalss){
        this.itemclass = itemcalss;
    }
    uiListView.prototype.setDataList = function(data){
        this.list =data;
    }

    uiListView.prototype.__init = function () {
        this.itemclass = uiListItem;
        this.list = null;
        this.addEventListener('mousemove',function(e){
            trace(e.target);
        })
    }
    uiListView.prototype.invalidate=function(){
        this.style.overflowX='hidden';
        this.style.overflowY='auto';
        if(this.list){
            for(var i = 0;i<this.list.length;i++){
                var t = new this.itemclass();
                t.percentWidth =100;
                t.update(this.list[i]).includeInLayout = true;
                this.addChild(t);
            }
        }

        this.__call(uiDiv,'invalidate');
    }
    DS.uiListItem = uiListItem;
    function uiListItem(){
        dsExtend(uiListItem,uiDiv);
        return new uiListItem.prototype.__init();
    }
    uiListItem.prototype.__init=function(item){
        this.label = new uiTextField();
        this.label.includeInLayout = true;
        this.des = new uiTextField();
        this.des.includeInLayout = true;
        this.addChild(this.label);
        this.addChild(this.des);
        this._movelen = 100;
    }
    uiListItem.prototype.update =function(data){
        this.label.text = data.label;
        this.des.text = data.des;
        return this;
    }
    DS.uiSlider = uiSlider;
    function uiSlider(){
        dsExtend(uiSlider,uiDisplayObject);
        return new uiSlider.prototype.__init()
    }
    uiSlider.prototype.addChild =function(v){
        v.includeInLayout = true;
        this.container.width+= v.width;
        this.container.addChild(v);
    }
    uiSlider.prototype.removeChild=function(v){
        this.container.removeChild(v)
    }

    uiSlider.prototype.__init = function(){
        this.container =new uiDiv();
        this.container.invalidate();
        this.ele.appendChild(this.container.ele)
        this.offsetX = 0;
        this.offsetY = 0;
        this.timeid =0;
        this.timeid2 =0;
        this._movelen=0;
    }
    uiSlider.prototype.caller = function(){
        console.log('caller')
        this._movelen = Math.abs(this.width-this.container.width);
        this.container.height =this.height;
        var self = this;
        var move = function(e){
            self.__move(e);
        }
        this.addEventListener('mousedown',function(e){
            clearInterval(this.timeid);
            clearInterval(this.timeid2);
            this.timeid2 = setInterval(function(){
                self.offsetX =0;
                self.offsetY=0;
            },1000);
            uistage.addEventListener('mousemove',move)
        })
        uistage.addEventListener('mouseup',function(e){
            self.__stop(e.movementX,e.movementY);
            clearInterval(this.timeid2);
            uistage.removeEventListener('mousemove',move)
        })
    }
    uiSlider.prototype.__stop=function(dx,dy){
        var self = this;
        this.timeid = setInterval(function(){
            if(self.offsetX>0 &&self.container.x+self._movelen>self.width ||self.offsetX<0&&self.container.x<0){
                self.offsetX*=-1;
                return
            }else{
                self.offsetX=self.offsetX*0.5;
                self.container.x+=self.offsetX;
                self.container.invalidate();
                if(Math.abs(self.offsetX)>0.1)
                return
            }
            clearInterval(self.timeid);
        },100);
    }
    uiSlider.prototype.__move=function(e){
        if(this.container.update && !this.container.update())return;

        if(e.movementX>0 &&this.container.x+this._movelen>this.width || e.movementX<0&&this.container.x<0)return
        this.offsetX = Math.abs(this.offsetX)>Math.abs(e.movementX)?this.offsetX: e.movementX;
        this.offsetY = e.movementY;
        this.container.x+=e.movementX;
        this.container.invalidate();
    }
    uiSlider.prototype.invalidate= function () {
        this.style.overflow='hidden';
        this.__call(uiDisplayObject,'invalidate');
        this.container.invalidate()
    }
    DS.uiCheckbox =uiCheckbox;
    function uiCheckbox(arg){
        dsExtend(uiCheckbox,uiDisplayObject,arg||'label');
        var obj =new uiCheckbox.prototype.__init();
        Object.defineProperties(obj,{
            checked:{set:function(v){this.ele.checked =v;this.text=this.text;},get:function(){return this.ele.checked}},
            text:{set:function(v){this._text=v;},get:function(){return this._text}},
            group:{set:function(v){this.check.name=v},get:function(){return this.check.name}}
        })
        obj.text='';
        return obj;
    }
    uiCheckbox.prototype.__init = function(){
        this.check = document.createElement('input');
        this.check.type='checkbox';
        this.textpos ='left';//right
    }
    uiCheckbox.prototype.invalidate=function(){
        this.__call(uiDisplayObject,'invalidate');
        if(this.textpos=="right")
            this.ele.innerHTML=this._text+this.check.outerHTML;
        else this.ele.innerHTML=this.check.outerHTML+this._text;
    }
    DS.uiRadio =uiRadio;
    function uiRadio(arg){
        dsExtend(uiRadio,uiDisplayObject,arg||'label');
        var obj =new uiRadio.prototype.__init();
        Object.defineProperties(obj,{
            checked:{set:function(v){this.check.checked =v;this.text=this.text;},get:function(){return this.check.checked}},
            text:{set:function(v){this._text=v;},get:function(){return this._text}},
            group:{set:function(v){this.check.name=v},get:function(){return this.check.name}}
        })
        obj.text='';
        return obj;
    }
    uiRadio.prototype.__init = function(){
        this.check = document.createElement('input');
        this.check.type='radio';
        this.textpos ='left';//right
    }
    uiRadio.prototype.invalidate=function(){
        this.__call(uiDisplayObject,'invalidate');
        if(this.textpos=="right")
            this.ele.innerHTML=this._text+this.check.outerHTML;
        else this.ele.innerHTML=this.check.outerHTML+this._text;
    }

    DS.uiGroup=uiGroup;
    function uiGroup(){
        dsExtend(uiGroup,uiDiv);
        return new uiGroup.prototype.__init();
    }
    uiGroup.prototype.__init=function(){
        this.direction = 'v';//v;

    }
    uiGroup.prototype.setGroup=function(cla,labels,single){
        if(this.direction =='h'){
            for(var i =0;i<labels.length;i++){
                var c=new cla('div');
                c.align='none';
                c.includeInLayout = true;
                c.text = labels[i].text;c.group=labels[i].group||this.uid;
                this.addChild(c);
            }
        }else{
            for(var i =0;i<labels.length;i++){
                var c=new cla();
                c.includeInLayout = true;
                c.text = labels[i].text;c.group=labels[i].group||this.uid;
                this.addChild(c);
            }
        }
    }

})(window)
