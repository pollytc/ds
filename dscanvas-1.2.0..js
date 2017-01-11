
/**
 * Created by Administrator on 2016/11/10.
 * //代码原则
 下划线属性，函数，都不被使用
 _单下划线，是类属性,函数没有单下滑线
 __双下划线，是原型属性，函数
 ds开头的类，不被使用的类
 */
(function(win,fun){
    win.$s||fun(win,function(key,keyfun){$s[key]=keyfun(win);})
})(window,function(window,exports){
    var $s =window.$s||{},config ={width:'100%',height:'100%',baseURI:'',pre:'ds',canvas:'',file:'.json'};
    window.$s=$s;$s.config =config;$s.mains =[];
    var trace =window.trace=$s.trace = console.log;

    $s.platform={};
    function initCanvas(){
        $s.platform.moblie= navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
        var c2 = document.createElement("canvas");
        c2.style = "display:none";
        document.body.appendChild(c2);
        $s.fdds = c2;
        $s.mains.forEach(function(e){
            var m = e.fun;
            var con = e.fig;
            if(con.canvas){con.canvas = document.querySelector(con.canvas);}
            if(!con.canvas){con.canvas = document.createElement("canvas");document.body.appendChild(con.canvas);}
            var parent = con.canvas.parentNode;
            if(!parent){
                document.body.appendChild(con.canvas);
                parent = document.body;
            }
            if(typeof con.width =='string'){
                var w = parseFloat(con.width)/100*parent.offsetWidth;
                con.canvas.width = w;
            }else{
                con.canvas.width = Math.min(con.width,parent.offsetWidth);
            }
            if(typeof con.height =='string'){
                var h = parseFloat(con.height)/100*parent.offsetHeight;
                con.canvas.height = h;
            }else{
                con.canvas.height = Math.min(con.height,parent.offsetHeight);
            }
            var stage = new dsStage(con.canvas);
            stage._config = con;
            m.call(stage);
        });

        $s.mains=[];
    }
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj){
        console.log(errorMessage, scriptURI, lineNumber,columnNumber,errorObj)
    }
    $s.ready=function(main,fig) {
        var result={};
        for(var s in config){result[s]=config[s]}
        if(typeof fig =='string'){
            result.canvas = fig;
        }else{
            for(var s in fig){result[s]=fig[s]}
        }

        $s.mains.push({fun:main,fig:result});
        if (document.readyState == "complete") {
            initCanvas();
        } else {
            window.addEventListener('DOMContentLoaded', initCanvas);
        }

    }
    //浏览器版本
    $s.dsEvent=dsEvent;
    function dsEvent(type,bubbles,cancle){
        $s.event.initEvent(type,bubbles,cancle);
        return $s.event;
    }
    /*
     bubbles:
     捕获阶段 (EventPhase.CAPTURING_PHASE)。
     目标阶段 (EventPhase.AT_TARGET)。
     冒泡阶段 (EventPhase.BUBBLING_PHASE)。
     */

    Event.ENTER_FRAME = "enter_frame";
    Event.ADDED_TO_STAGE = "addtostage";
    Event.REMOVE_FROM_STAGE = "removefromstage";
    Event.ACTIVATE = "activate";
    Event.BROWSER_ZOOM_CHANGE = "browser_zoom_change";
    Event.CANCEL = "cancel";
    Event.CHANGE = "change";
    Event.CHANNELMESSAGE = "channelMessage"
    Event.CHANNELSTATE = "channelState"
    Event.CLEAR = "clear"
    Event.CLOSE = "close"
    Event.COMPLETE = "complete"
    Event.CONNECT = "connect"
    Event.COPY = "copy"
    Event.DEACTIVATE = "deactivate"
    Event.EXITFRAME = "exitFrame"
    Event.FULLSCREEN = "fullScreen"
    Event.INIT = "init"
    Event.MOUSELEAVE = "mouseLeave"
    Event.OPEN = "open"
    Event.PASTE = "paste"
    Event.REMOVED = "removed"
    Event.RENDER = "render"
    Event.RESIZE = "resize"
    Event.SCROLL = "scroll"
    Event.SELECT = "select"
    Event.SELECTALL = "selectAll"
    Event.SOUNDCOMPLETE = "soundComplete"
    Event.TABCHILDRENCHANGE = "tabChildrenChange";

    MouseEvent.CLICK = "click";
    MouseEvent.DOUBLE_CLICK = "doubleclick";
    MouseEvent.MIDDLE_CLICK = "middleclick";
    MouseEvent.MIDDLE_MOUSE_DOWN = "middlemousedown";
    MouseEvent.MIDDLE_MOUSE_UP = "middlemouseup";
    MouseEvent.MOUSE_DOWN = "mousedown";
    MouseEvent.MOUSE_MOVE = "mousemove";
    MouseEvent.MOUSE_OUT = "mouseout";
    MouseEvent.MOUSE_OVER = "mouseover";
    MouseEvent.MOUSE_UP = "mouseup";
    MouseEvent.MOUSE_WHEEL = "mousewheel";
    MouseEvent.RELEASE_OUTSIDE = "releaseoutside";
    MouseEvent.RIGHT_CLICK = "rightclick";
    MouseEvent.RIGHT_MOUSE_DOWN = "rightmousedown";
    MouseEvent.RIGHT_MOUSE_UP = "rightmouseup";
    MouseEvent.ROLL_OUT = "rollout";
    MouseEvent.ROLL_OVER = "rollover";
    MouseEvent.TOUCH_START ='touchstart';
    MouseEvent.touchmove='touchmove';
    MouseEvent.touchend='touchend';

    MouseEvent.TOUCH_BEGIN='touchstart';
    MouseEvent.TOUCH_END='touchend';
    MouseEvent.TOUCH_MOVE='touchmove';
    MouseEvent.TOUCH_OUT='';
    MouseEvent.TOUCH_OVER='';
    MouseEvent.TOUCH_ROLL_OUT='';
    MouseEvent.TOUCH_ROLL_OVER='';

    KeyboardEvent.KEY_DOWN = "keydown";
    KeyboardEvent.KEY_UP = "keyup";

    FocusEvent.FOCUS_IN = "focusIn"
    FocusEvent.FOCUS_OUT = "focusOut "
    FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange"
    FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange"

    var utils= {
        uid:0,
        UUID: function (){return Math.random().toString(36).substr(2)+(this.uid++);},
        INTERACTIVEEVENT: [Event.ENTER_FRAME,],
        MOUSE: [FocusEvent.FOCUS_IN, FocusEvent.FOCUS_OUT, FocusEvent.KEY_FOCUS_CHANGE, FocusEvent.MOUSE_FOCUS_CHANGE, MouseEvent.ROLL_OVER, MouseEvent.ROLL_OUT, MouseEvent.RIGHT_MOUSE_UP, MouseEvent.RIGHT_MOUSE_DOWN, MouseEvent.RIGHT_CLICK, MouseEvent.RELEASE_OUTSIDE, MouseEvent.MOUSE_WHEEL, MouseEvent.MOUSE_UP, MouseEvent.MOUSE_OVER,'click', MouseEvent.DOUBLE_CLICK, MouseEvent.MIDDLE_CLICK, MouseEvent.MIDDLE_MOUSE_DOWN, MouseEvent.MIDDLE_MOUSE_UP, MouseEvent.MOUSE_DOWN, MouseEvent.MOUSE_MOVE, MouseEvent.MOUSE_OUT],
        KEY: [KeyboardEvent.KEY_DOWN, KeyboardEvent.KEY_UP],
        TOUCH:['touchstart','touchmove','touchend','touchcancel'],
        accepts: {
            script: 'text/javascript, application/javascript, application/x-javascript',
            json:   'application/json',
            xml:    'application/xml, text/xml',
            html:   'text/html',
            text:   'text/plain'
        },
    }
    var CompositeOperation = {
        SOURCE_OVER: "source-over",
        SOURCE_ATOP: "source-atop",
        SOURCE_IN: "source-in",
        SOURCE_OUT: "source-out",
        DESTINATION_OVER: "destination-over",
        DESTINATION_ATOP: "destination-atop",
        DESTINATION_IN: "destination-in",
        DESTINATION_OUT: "destination-out",
        LIGHTER: "lighter",
        COPY: "copy",
        XOR: "xor"
    }
    var dsChildOf=$s.dsChildOf=function dsChildOf(child,parent){
        var vb = child.__proto__;
        while(vb&&vb.constructor != dsEventDispatcher.prototype.constructor){
            if(vb.constructor ==parent.prototype.constructor)
                return true;
            vb=vb.__proto__;
        }
        return false;
    }
    var dsExtend =$s.dsExtend= function dsExtend(subclass, pclass,div) {
        var spro = subclass.prototype;
        //var ppro=pclass.prototype;
        var oc = spro.constructor;
        spro.__init.prototype = new pclass(div);
        for(var ss in spro)spro.__init.prototype[ss]=spro[ss]
        spro.__init.prototype.constructor = oc;

    }
    $s[config.pre+'Color']=dsColor;
    function dsColor(color) {
        this.R = (0x00ff0000 & color) >> 16;//red
        this.G = (0x0000ff00 & color) >> 8;//green;
        this.B = 0x000000ff & color;//blue
        if (color > 0xffffff) {
            this.A = (0xff000000 && color) >> 24;
            if (this.A < 0)this.A += 256;
        }//alpha
        else this.A = 255;
    }
    /*
     生成16位颜色值
     */
    dsColor.toColor = function (r, g, b, a) {
        var c = 0;
        c += r << 16;
        c += g << 8;
        c += b;
        if (a != null)c += a << 24;
        return c;
    }
    /*
     16位颜色值转换为16位颜色字符串
     */
    dsColor.toStr = function (v, radio) {
        radio = radio || 16;
        var c = new dsColor(v);
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
    dsColor.prototype.toArray = function () {
        return [this.R, this.G, this.B, this.A];
    }
    dsColor.prototype.toString = function () {
        console.log("r=" + this.R + " g=" + this.G + " b=" + this.B + " a=" + this.A);
    }
    $s[config.pre+'ByteArray']=dsByteArray;
    function dsByteArray(len) {
        this.bytesAvailable = 0;
        this.endian = 'big_endian';//little_endian;
        this.length = len;
        this.objectEncoding = 'AMF3';
        this.position = 0;
        this.shareable = false;
        this.length = this.length || 128;
        this.__data = new Uint8Array(this.length);
    }
    dsByteArray._class={};
    dsByteArray.registerClassAlias =function (aliasName, classObject) {
        dsByteArray._class[aliasName] = classObject;
    }
    dsByteArray.defaultObjectEncoding = 'AMF3';
    dsByteArray.prototype.atomicCompareAndSwapIntAt = function (byteIndex, expectedValue, newValue) {
        var old = this.position;
        this.position = byteIndex;
        if (this.readInt() == expectedValue) {
            this.position = byteIndex;
            this.writeInt(newValue);
            this.position = old;
            return expectedValue;
        } else {
            this.position = old;
            return newValue;
        }
    }
//在单一的原子操作中，将此字节数组中的一个整数值与另一个整数值进行比较，如果它们匹配，则将这些字节与另一个值进行交换。
    dsByteArray.prototype.atomicCompareAndSwapLength = function (expectedLength, newLength) {
        if (this.length == expectedLength) {
            this.length = newLength;
        }
        return this.length;
    }
//在单一的原子操作中，将此字节数组的长度与所提供的一个值进行比较，如果它们匹配，则更改此字节数组的长度。
    dsByteArray.prototype.clear = function () {
        this.__data = new Uint8Array(1);
        this.length = 0;
    };
//清除字节数组的内容，并将 length 和 position 属性重置为 0。
    dsByteArray.prototype.compress = function (algorithm) {

    }
//	压缩字节数组。
    dsByteArray.prototype.deflate = function () {

    }
//使用 deflate 压缩算法压缩字节数组。
    dsByteArray.prototype.inflate = function () {

    }
//使用 deflate 压缩算法将字节数组解压缩。
    dsByteArray.prototype.readBoolean = function () {
        return Boolean(this.__data[this.position++]);
    }
//从字节流中读取布尔值。
    dsByteArray.prototype.readByte = function () {
        return this.__data[this.position++] - 128;
    }
//从字节流中读取带符号的字节。
    dsByteArray.prototype.readBytes = function (bytes, offset, length) {
        var l = this.__data.subarray(offset, offset + length);
        bytes.__data.set(l);
        bytes.length = length;
    }

//从字节流中读取 length 参数指定的数据字节数。
//指数部分Exponent （E）     : 11bit      （b62-b52）//
//尾数部分Mantissa   （M）   : 52bit      （b51-b0）
    dsByteArray.prototype.readDouble = function () {
        var z = this.__data[this.position];
        var kk = this.__data[this.position + 1];
        z = z << 3 | kk >> 5;
        var f = kk & 15 | 16;
        f = f.toString(2);
        f += (this.__data[this.position + 2] | 256).toString(2).substr(1);
        f += (this.__data[this.position + 3] | 256).toString(2).substr(1);
        f += (this.__data[this.position + 4] | 256).toString(2).substr(1);
        f += (this.__data[this.position + 5] | 256).toString(2).substr(1);
        f += (this.__data[this.position + 6] | 256).toString(2).substr(1);
        f += this.__data[this.position + 7].toString(2);
        f = f.substr(1);
        var v = 0;
        for (var i = 0; i < f.length; i++) {
            v += Math.pow(0.5, i + 1) * parseInt(f[i]);
        }
        return v + z;
    }

//指数部分Exponent （E）      : 8bit       （b30-b23）
//尾数部分Mantissa   （M）    : 23bit     （b22-b0）
//从字节流中读取一个 IEEE 754 双精度（64 位）浮点数。
    dsByteArray.prototype.readFloat = function () {
        var z = this.__data[this.position];
        var f = this.__data[this.position + 1];
        if (f & 127 == f)z *= -1;
        f = f.toString(2);
        f += (this.__data[this.position + 2] | 256).toString(2).substr(1);
        f += (this.__data[this.position + 3] | 256).toString(2).substr(1);
        f = f.substr(1);
        var v = 0;
        for (var i = 0; i < f.length; i++) {
            v += Math.pow(0.5, i + 1) * parseInt(f[i]);
        }
        this.position += 4;
        return z + v;
    }
//从字节流中读取一个 IEEE 754 单精度（32 位）浮点数。
    dsByteArray.prototype.readInt = function () {
        var s = this.__data[this.position];
        s = this.__data[this.position + 1] << 8 | s;
        s = this.__data[this.position + 2] << 16 | s;
        var b = this.__data[this.position + 3] & 127;
        s = b << 24 | s;
        if (b == this.__data[this.position + 3]) {
            s *= -1;
        }
        return s;
    }
//从字节流中读取一个带符号的 32 位整数。
    dsByteArray.prototype.readMultiByte = function (length, charSet) {
        var str = '';
        for (var i = 0; i<length; i++) {
            str += String.fromCharCode(this.__data[this.position]);
            this.position++
        }
        return unescape(str);
    }
//使用指定的字符集从字节流中读取指定长度的多字节字符串。
    dsByteArray.prototype.readObject = function () {
        var s = '';
        while (this.__data[this.position] != 0) {
            s += String.fromCharCode(this.__data[this.position]);
            this.position++;
        }
        this.position++;
        s = JSON.parse(s);
        if (s instanceof Array) return s;
        if(s.class){
            if(dsByteArray._class[s.class]){
                var cls = dsByteArray._class[s.class];
                var o = new cls();
                for (var l in s){
                    o[l]=s[l];
                }
                return o;
            }else{
                var obj = eval("new " + s.class + "()");
                for (var k in s) {
                    obj[k] = s[k];
                }
                return obj;
            }
        }
        return null;
    }

    dsByteArray.prototype.readShort = function () {
        return this.__data[this.position] | this.__data[this.position + 1] << 8
    }
//从字节流中读取一个带符号的 16 位整数。
    dsByteArray.prototype.readUnsignedByte = function () {

    }
//从字节流中读取无符号的字节。
    dsByteArray.prototype.readUnsignedInt = function () {
        var s = this.__data[this.position];
        s = this.__data[this.position + 1] << 8 | s;
        s = this.__data[this.position + 2] << 16 | s;
        s = this.__data[this.position + 3] << 24 | s;
        return s;
    }
//从字节流中读取一个无符号的 32 位整数。
    dsByteArray.prototype.readUnsignedShort = function () {
        var s = this.__data[this.position];
        s = this.__data[this.position + 1] << 8 | s;
        s = this.__data[this.position + 2] << 16 | s;
        s = this.__data[this.position + 3] << 24 | s;
        return s;
    }
//从字节流中读取一个无符号的 16 位整数。
    dsByteArray.prototype.readUTF = function () {
        var str = '';
        for (var i = 0; i < 16; i++) {
            str += String.fromCharCode(this.__data[this.position]);
            this.position++;
        }
        return unescape(str);
    }
//从字节流中读取一个 UTF-8 字符串。
    dsByteArray.prototype.readUTFBytes = function (length) {
        var str = '';
        for (var i = 0; i < length; i++) {
            str += String.fromCharCode(this.__data[i]);
        }
        return unescape(str);
    }
//从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串。
    dsByteArray.prototype.toJSON = function (k) {

    }
//提供一种可覆盖的方法，用于在 dsByteArray 对象中自定义值的 JSON 编码。
    dsByteArray.prototype.toString = function () {

    }
//将字节数组转换为字符串。
    dsByteArray.prototype.uncompress = function (algorithm) {

    }
//解压缩字节数组。
    dsByteArray.prototype.writeBoolean = function (value) {
        this.__data.fill(value, this.position, this.position + 1);
        this.position++;
    }
//写入布尔值。
    dsByteArray.prototype.writeByte = function (value) {
        if (value >= -128 && value < 127) {
            value += 128
            this.__data.fill(value, this.position, this.position + 1);
            this.position++;
        } else {
            throw 'wrong writeByte'
        }

    }
//在字节流中写入一个字节。
//将来自指定字节数组、字节数、起始偏移（基于零的索引）字节的长度字节数序列写入字节流。
    dsByteArray.prototype.writeBytes = function (bytes, offset, length) {
        var l = bytes.__data.subarray(offset, offset + length);
        this.__data.set(l);
        this.length += length;
    }

//在字节流中写入一个 IEEE 754 双精度（64 位）浮点数。
//指数部分Exponent （E）     : 11bit      （b62-b52）//
//尾数部分Mantissa   （M）   : 52bit      （b51-b0）
    dsByteArray.prototype.writeDouble = function (value) {
        var z = parseInt(value);
        var f = value - z;
        var n = f.toString().length
        f = f * Math.pow(10, n);
        var a = [];
        z = z >> 2;

        if (value > Math.pow(2, 11))throw 'writeDouble ,value too long';
        var z = parseInt(value);
        var f = (value - z).toString(2).substr(2);
        var arr = [0, 0, 0, 0, 0, 0, 0, 0];
        arr[7] = parseInt(f.substr(44, 8), 2);
        arr[6] = parseInt(f.substr(36, 8), 2);
        arr[5] = parseInt(f.substr(28, 8), 2);
        arr[4] = parseInt(f.substr(20, 8), 2);
        arr[3] = parseInt(f.substr(12, 8), 2);
        arr[2] = parseInt(f.substr(4, 8), 2);
        var b1 = parseInt(f.substr(0, 4), 2);
        arr[0] = z >> 3;
        var b2 = z - (arr[0] << 3);
        arr[1] = b2 << 5 | b1;
        if (value > 0)arr[1] = arr[1] | 16;
        this.__data.set(arr, this.position, this.position + 8);
        this.position += 8;
    }

//指数部分Exponent （E）      : 8bit       （b30-b23）
//尾数部分Mantissa   （M）    : 23bit     （b22-b0）
//在字节流中写入一个 IEEE 754 单精度（32 位）浮点数。
    dsByteArray.prototype.writeFloat = function (value) {
        if (value > Math.pow(2, 8))throw 'wrong writeFloat';
        var arr = [0, 0, 0, 0];
        arr[0] = parseInt(value);
        var f = value - arr[0];
        var ff = f.toString(2).substr(2);
        arr[1] = parseInt(ff.substr(0, 7), 2);
        if (value > 0)arr[1] = arr[1] | 128;
        arr[2] = parseInt(ff.substr(7, 8), 2);
        arr[3] = parseInt(ff.substr(15, 8), 2);
        this.__data.set(arr, this.position);
        this.position += 4;
    }
//在字节流中写入一个带符号的 32 位整数。
    dsByteArray.prototype.writeInt = function (value) {
        if (value > Math.pow(2, 31))throw 'wrong writeInt';
        var val = Math.abs(parseInt(value));
        var arr = [0, 0, 0, 0];
        arr[0] = val & 255;
        arr[1] = (val & 65280) >> 8;
        arr[2] = (val & 16711680) >> 16;
        arr[3] = (val & 4278190080) >> 24;
        if (value > 0)arr[3] = arr[3] | 128;

        this.__data.set(arr, this.position)
        this.position += 4;
    }
//使用指定的字符集将多字节字符串写入字节流。
    dsByteArray.prototype.writeMultiByte = function (value, charSet) {
        var e = escape(value);
        for (var i = 0; i<e.length;i++) {
            this.__data[this.position] = e[i].charCodeAt();
            this.position++;
        }
        return e.length;
    }
//将对象以 AMF 序列化格式写入字节数组。
    dsByteArray.prototype.writeObject = function (object) {
        if (object instanceof Array) {

        } else {
            for(var s in dsByteArray._class){
                if(dsByteArray._class[s].constructor.name==object.constructor.name){
                    object['class'] = s;
                    break;
                }
            }
            if(object['class']==null)
            object['class'] = object.constructor.name;
        }
        var json = JSON.stringify(object);
        var arr = [];
        for (var k = 0; k < json.length; k++) {
            arr.push(json[k].charCodeAt());
        }
        arr.push(0);
        this.__data.set(arr, this.position);
        this.position += arr.length;
    }
//在字节流中写入一个 16 位整数。
    dsByteArray.prototype.writeShort = function (value) {
        if (value > 65280)throw 'wrong writeShort';
        this.__data[this.position] = value & 255;
        if (value > 255)this.__data[this.position + 1] = (value & 65280) >> 8;
        else this.__data[this.position + 1] = 0;
        this.position += 2;
    }
//在字节流中写入一个无符号的 32 位整数。
    dsByteArray.prototype.writeUnsignedInt = function (value) {
        if (value > Math.pow(2, 32))throw 'wrong writeUnsignedInt'
        var arr = [0, 0, 0, 0];
        arr[0] = value & 255;
        arr[1] = (value & 65280) >> 8;
        arr[2] = (value & 16711680) >> 16;
        arr[3] = (value & 4278190080) >> 24;
        this.__data.set(arr, this.position);
        this.position += 4;
    }
    dsByteArray.prototype.writeUTF = function (value) {
        var e = escape(value);
        for (var i = 0; i < 16; i++) {
            this.__data[this.position] = e[i].charCodeAt();
            this.position++;
        }
    }
//将 UTF-8 字符串写入字节流。
    dsByteArray.prototype.writeUTFBytes = function (value) {
        var e = escape(value);
        for (var i = 0; i < e.length; i++) {
            this.__data[i] = e[i].charCodeAt();
            this.position++;
        }
    }
    $s[config.pre+'Rectangle']=dsRectangle;
    function dsRectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w<=0?1:w;
        this.height = h<=0?1:h;
        this.left = this.x;
        this.right = this.x + this.width;
        this.size = new dsPoint(this.width, this.height);
        this.top = this.y;
        this.topLeft = new dsPoint(this.x, this.y);
        this.bottom = this.y + this.height;
        this.bottomRight = new dsPoint(this.x, this.bottom);
    }
    dsRectangle.prototype.clone = function () {
        return new dsRectangle(this.x, this.y, this.width, this.height);
    };
    dsRectangle.prototype.contains = function (x, y) {
        return this.left < x && x < this.right && this.top < y && y < this.bottom;
    };
    dsRectangle.prototype.containsPoint = function (point) {
        return this.contains(point.x, point.y);
    };
    dsRectangle.prototype.containsRect = function (rectangle) {

    };
    dsRectangle.prototype.copyFrom = function (rectangle) {
        this.x = rectangle.x;
        this.y = rectangle.y;
        this.left = rectangle.left;
        this.top = rectangle.top;
        this.right = rectangle.right;
        this.bottom = rectangle.bottom;
        this.topLeft = rectangle.topLeft.copy();
        this.bottomRight = rectangle.bottomRight.copy();

    };
    dsRectangle.prototype.equals = function (rectangle) {

    };
    dsRectangle.prototype.inflate = function (dx, dy) {
        this.width += dx;
        this.height += dy;
        this.copyFrom(new dsRectangle(this.x, this.y, this.width, this.height));
    };
    dsRectangle.prototype.inflatePoint = function (point) {
        this.inflate(point.x, point.y);
    };
    /*
     返回相交的矩形
     */
    dsRectangle.prototype.intersection = function (rectangle) {
        var x1 = rectangle.x, y1 = rectangle.y, x2 = rectangle.right, y2 = rectangle.bottom;
        if (this.x > x1) {
            x1 = this.x;
        }
        if (this.y > y1) {
            y1 = this.y;
        }
        if (this.right < x2) {
            x2 = this.right;
        }
        if (this.bottom < y2) {
            y2 = this.bottom;
        }
        return (x2 <= x1 || y2 <= y1) ? null : new dsRectangle(x1, y1, x2 - x1, y2 - y1);
    };
    /*
     判断是否相交
     */
    dsRectangle.prototype.instersects = function (rectangle) {
        return (rectangle.x <= this.right && this.x <= rectangle.right && rectangle.y <= this.bottom && this.y <= rectangle.bottom);
    };
    dsRectangle.prototype.isEmpty = function () {
        return this.width | this.height;
    };
    dsRectangle.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        this.copyFrom(new dsRectangle(this.x, this.y, this.width, this.height));
    };
    dsRectangle.prototype.offsetPoint = function (point) {
        this.offset(point.x, point.y);
    };
    dsRectangle.prototype.setEmpty = function () {
        this.copyFrom(new dsRectangle(0, 0, 0, 0));
    };
    dsRectangle.prototype.setTo = function (xa, ya, wa, ha) {
        this.copyFrom(new dsRectangle(xa, ya, wa, ha));
    };
    dsRectangle.prototype.union = function () {

    }
    function dsAABB(x1,y1,x2,y2){
        this.x1 = x1==null?Number.MAX_VALUE:x1;
        this.y1 = y1==null?Number.MAX_VALUE:y1;
        this.x2 = x2==null?Number.MIN_VALUE:x2;
        this.y2 = y2==null?Number.MIN_VALUE:y2;
    }
    dsAABB.prototype.instersects=function(ab){
        //(rectangle.x <= this.right && this.x <= rectangle.right && rectangle.y <= this.bottom && this.y <= rectangle.bottom);
        return (ab.x1 <= this.x2 && this.x1 <= ab.x2 && ab.y1 <= this.y2 && this.y1 <= ab.y2);
    }
    dsAABB.prototype.setTo=function(x1,y1,x2,y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        return this;
    }
    dsAABB.prototype.add = function(ab){
        this.x1 = Math.min(this.x1,ab.x1);
        this.y1 = Math.min(this.y1,ab.y1);
        this.x2 = Math.max(this.x2,ab.x2);
        this.y2 = Math.max(this.y2,ab.y2);
        return this;
    }
    dsAABB.prototype.contains = function(x,y){
        return this.x1<x&&this.x2>x&&this.y1<y&&this.y2>y;
    }
    dsAABB.prototype.setXY = function(x,y){
        this.x1 = Math.min(this.x1,x);
        this.y1 = Math.min(this.y1,y);
        this.x2 = Math.max(this.x2,x);
        this.y2 = Math.max(this.y2,y);
        return this;
    }
    dsAABB.prototype.setMIN=function(x,y){
        this.x1=Math.min(x,this.x1);
        this.y1=Math.min(y,this.y1);
    }
    dsAABB.prototype.setMAX=function(x,y){
        this.x2=Math.max(x,this.x2);
        this.y2=Math.max(y,this.y2);
    }
    dsAABB.prototype.inflate=function(x,y){
        this.x1 +=x;
        this.y1 +=y;
        this.x2 +=x;
        this.y2 +=y;
        return this;
    }
    dsAABB.prototype.isEmpty=function(){
        return this.x1==this.x2 && this.y1==this.y2 || this.x1>this.x2 ||this.y1>this.y2;
    }
    dsAABB.prototype.clone = function(){
        var ab = new dsAABB();
        ab.x1 = this.x1;
        ab.y1 = this.y1;
        ab.x2 = this.x2;
        ab.y2 = this.y2;
        return ab;
    }
    dsAABB.prototype.width = function(){
        return Math.abs(this.x2-this.x1);
    }
    dsAABB.prototype.height = function(){
        return Math.abs(this.y2-this.y1);
    }
    $s[config.pre+'AABB']=dsAABB;
    $s[config.pre+'Point']=dsPoint;
    function dsPoint(x, y) {
        this.x = x | 0;
        this.y = y | 0;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    dsPoint.prototype.add = function (point) {
        return new dsPoint(this.x + point.x, this.y + point.y);
    };
    dsPoint.prototype.clone = function () {
        return new dsPoint(this.x, this.y);
    };
    dsPoint.prototype.copyFrom = function (point) {
        this.x = point.x;
        this.y = point.y;
        this.length = point.length;
    };
    dsPoint.distance = function (point1, point2) {
        return new dsPoint(point1.x - point2.x, point1.y - point2.y).length;
    }
    dsPoint.prototype.equals = function (point) {
        return this.x == point.x || this.y == point.y;
    }
//内插值 待验证
    dsPoint.prototype.interpolate = function (pt1, pt2, f) {
        var nor = pt1.clone().subtract(pt2);
        nor.normalize(nor.length * f);
        return nor.add(pt1);
    }
//
    dsPoint.prototype.normalize = function (len) {
        var Q = Math.tan(this.y / this.x);
        this.setTo(Math.cos(Q) * len, Math.sin(Q) * len);
    };
    dsPoint.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    };
    dsPoint.polar = function (len, angle) {
        return new dsPoint(Math.cos(angle) * len, Math.sin(angle) * len);
    };
    dsPoint.prototype.subtract = function (point) {
        return new dsPoint(this.x - point.x, this.y - point.y);
    };
    dsPoint.prototype.setTo = function (xa, ya) {
        this.x = xa || 0;
        this.y = ya || 0;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    dsPoint.prototype.toString = function () {
        return "x = " + this.x + " y = " + this.y;
    }
    $s[config.pre+'Matrix']=dsMatrix;
    function dsMatrix(a, b, c, d, tx, ty) {
        //this.a =1//   水平缩放绘图
        //this.b=0// 	水平倾斜绘图
        //this.c=1// 	垂直倾斜绘图
        //this.d =1// 	垂直缩放绘图
        //this.tx=0// 	水平移动绘图
        //this.ty=0// 	垂直移动绘图
        this.setTo(a, b, c, d, tx, ty);
    }

    dsMatrix.prototype.clone = function () {
        return new dsMatrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
    }
//矩阵后加
//将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
    dsMatrix.prototype.concat = function (matrix) {
        this.append(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
        return this;

    }
//将源 dsPoint 对象中的所有矩阵数据复制到调用方 dsMatrix 对象中。
    dsMatrix.prototype.copyFrom = function (matrix) {
        this.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
//包括用于缩放、旋转和转换的参数。
    dsMatrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
        rotation = rotation*Math.PI/180;
        var mat1=new dsMatrix();
        mat1.identity();
        mat1.rotate(rotation);
        mat1.scale(scaleX,scaleY);
        mat1.translate(tx,ty);
        return mat1;
    }
    dsMatrix.prototype.createGradientBox=function(width, height, rotation, tx, ty){
        var mat = new dsMatrix();

    }

    dsMatrix.prototype.identity = function () {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    }

    dsMatrix.prototype.invert = function () {
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
    dsMatrix.prototype.rotateX = function(angle){
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
    dsMatrix.prototype.rotateY = function(angle){
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
    dsMatrix.prototype.rotate = function (angle) {
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
    dsMatrix.prototype.scale = function (sx, sy) {
        //this.a *= sx;
        //this.b *= sx;
        //this.c *= sy;
        //this.d *= sy;
        this.a = sx;
        //this.b *= sx;
        //this.c *= sy;
        this.d = sy;

        //this.tx/=sx;
        //this.ty/=sy;
        return this;
    }

    dsMatrix.prototype.setTo = function (aa, bb, ca, da, txa, tya) {
        this.a = aa || 1;
        this.b = bb || 0;
        this.c = ca || 0;
        this.d = da || 1;
        this.tx = txa || 0;
        this.ty = tya || 0;
    }
    dsMatrix.PERRAD = Math.PI/180;
    dsMatrix.prototype.skew = function(sx,sy){
        sx = sx*dsMatrix.PERRAD;
        sy = sy*dsMatrix.PERRAD;
        this.append(Math.cos(sx), Math.sin(sy), -Math.sin(sx), Math.cos(sy), 0, 0);
    }
    dsMatrix.prototype.append = function(a, b, c, d, tx, ty) {
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
    dsMatrix.prototype.translate = function (dx, dy) {
        this.tx =dx;//+= this.a*dx + this.c*dy;
        this.ty =dy;//+= this.b*dx + this.d*dy;
        return this;
    }
    dsMatrix.prototype.deltaTransformPoint = function(point){
        var pt = new dsPoint();
        pt.x = point.x*this.a+point.y*this.c;
        pt.y = point.x*this.b+point.y*this.d;
        return pt;
    }

    dsMatrix.prototype.transformPoint = function (point) {
        var pt = new dsPoint();
        pt.x = point.x*this.a+point.y*this.c+this.tx;
        pt.y = point.x*this.b+point.y*this.d+this.ty;
        return pt;
    }
    function dsEventDispatcher() {
        this.__events = [];
        this.__oldfun = [];
        this.__uuid = this.constructor.name + utils.UUID();
    }
    dsEventDispatcher.prototype.__call = function (parent,key,paramArr) {
        paramArr=paramArr||[];
        return parent.prototype[key].apply(this,paramArr);
    }
    dsEventDispatcher.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
        if (this.__events[type] == null)this.__events[type] = Array();
        this.__events[type].push(listener);
    }

    dsEventDispatcher.prototype.dispatchEvent = function (event) {
        event.currentTarget = this;
        var a = this.__events[event.type];
        if(!a)return;
        var ps = [];
        var p = this.parent;

        while(p){
            ps.push(p);
            p = p.parent;
        }
        for (var i in a) {
            if(event.bubbles){
                a[i].call(this,event)
                for(var j = 0;j<ps.length;j++){
                    ps[j].dispatchEvent(event)
                }
            }else{
                for(var j = ps.length-1;j>=0;j--){
                    ps[j].dispatchEvent(event)
                }
                a[i].call(this,event)
            }
        }
    }
    dsEventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
        var ts = this.__events[type];
        var i = ts.indexOf(listener);
        if (i != -1) {
            ts.splice(i, 1);
            if (ts.length <= 0) {
                delete  this.__events[type];
            }
        }
    }
    dsEventDispatcher.prototype.hasEventListener = function (type) {
        return this.__events[type].length | this.__events[type];
    }
    dsEventDispatcher.prototype.willTrigger = function (type) {
        var o = this;
        while (o) {
            if (o.hasEventListener(type)) { return true; }
            o = o.parent;
        }
        return false;
    }
    dsEventDispatcher.prototype.__release = function(){
        this.__events = [];
        this.__oldfun = [];
    }

    $s[config.pre+'DisplayObject']=dsDisplayObject;
    function dsDisplayObject() {
        dsExtend(dsDisplayObject,dsEventDispatcher);
        var obj = new dsDisplayObject.prototype.__init();
        Object.defineProperties(obj, {
            "x":{
                set:function(v){
                    this._x = v*1;
                    this._mat.translate(this._x,this._y);
                },get:function(){
                    return this._x;
                }
            },
            "y":{
                set:function(v){
                    this._y = v*1;
                    this._mat.translate(this._x,this._y);
                },get:function(){
                    return this._y;
                }
            },
            'width':{
                set:function(v){
                    this._width=v;
                },
                get:function(){
                    return Math.max(this._width,this.__AABB().width());
                }
            },
            'height':{
                set:function(v){
                    this._height =v;
                },get:function(){
                    return Math.max(this._height,this.__AABB().height());
                }
            },
            "graphics": {
                set: function (v) {
                    if (v == null && this._graphics)this._graphics._target = null;
                    this._graphics = v;
                },
                get: function () {
                    if (this._graphics == null) {
                        this._graphics = new dsGraphics();
                    }
                    return this._graphics;
                }
            },
            "mask": {
                set: function (v) {
                    if (v == null) {
                        if (this._mask) {
                            this._mask._ismask = false;
                            this._mask = null;
                        }
                    } else {
                        if (this._mask) {
                            this._mask._ismask = false
                        }
                        v._ismask = true;
                        this._mask = v;
                    }
                },
                get: function () {
                    return this._mask
                }
            },
            "scaleX": {
                set: function (v) {
                    this._scaleX = v;
                    this._mat.scale(v,1);
                }, get: function () {
                    return this._scaleX;
                }
            },
            "scaleY": {
                set: function (v) {
                    this._scaleY = v;
                    this._mat.scale(1,v);
                }, get: function () {
                    return this._scaleY
                }
            },
            'rotation':{
                set:function(v){
                    this._mat.rotate(v-this._rotation);
                    this._rotation = v;
                },get:function(){
                    return this._rotation;
                }
            }
        })
        return obj;
    }

    dsDisplayObject.prototype.__init=function (){
        this.__events = [];
        this._x = 0;
        this._y = 0;
        this._height = 0;
        this._width = 0;
        this.alpha = 1;
        this._mask = null;
        this._ismask = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.name = this.constructor.name + "_" + utils.UUID();
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this.parent = null;
        this.transform = null;
        this.visible = true;
        this.blendMode = "source-over";//source-in,source-out,source-atop,lighter,xor,destination-over,destination-in,destination-,destination-atop,darker
        this.cacheAsBitmap = false;//缓存显示对象的内部位图表示形式。
        this.stage = null;
        this._graphics = null;
        this.filters = [];
        this._mat = new dsMatrix().identity();
    }
    dsDisplayObject.prototype.__init.prototype = new dsEventDispatcher;
//循环图形渲染函数
    dsDisplayObject.prototype.__render = function (ctx) {
        if (!this.visible || this._ismask)return false;
        if(this.cacheAsBitmap){
            //位图缓存
            if(this.maskdata){
                var ab = this._mask.__AABB();
                ctx.drawImage(this.maskdata,ab.x1,ab.y1);
            }else{
                this.stage.__renderfb(this);
            }
            return false;
        }
        ctx.transform(this._mat.a,this._mat.b,this._mat.c,this._mat.d,this._mat.tx,this._mat.ty);

        ctx.globalAlpha = this.alpha;
        if (this._mask) {
            if(this.maskdata){
                var ab = this._mask.__AABB();
                ctx.drawImage(this.maskdata,ab.x1,ab.y1);
                if(!this.cacheAsBitmap)this.stage.__renderfb(this);
            }else{
                this.stage.__renderfb(this);
            }
            return false;
        } else {
            for (var i = 0; i < this.filters.length; i++) {
                this.filters[i].__render(ctx);
            }
            if (this._graphics) {
                this._graphics.__render(ctx);
            }
        }
        return true;
    }
//循环处理业务逻辑的函数
    dsDisplayObject.prototype.__frame = function () {
        if(!this.visible) return false;
        $s.event.initEvent(Event.ENTER_FRAME, false, false)
        this.dispatchEvent($s.event);
        return true;
    }

    dsDisplayObject.prototype.getBounds = function (displayObject) {
        //未考虑旋转
        var lw = this._graphics ? this._graphics["lineWidth"] : 0;
        var rect=this.getRect(displayObject);
        return new dsRectangle(rect.x, rect.y, rect.width + lw, rect.height + lw);
    }

    dsDisplayObject.prototype.getRect = function (displayObject){
        //比较与getBounds ,此方法不包含linestyle的
        var p=displayObject._mat.transformPoint(new dsPoint(this.x,this.y))
        return new dsRectangle(p.x, p.y, this.width, this.height);
    }
    dsDisplayObject.prototype.hitTestObject = function(displayObject){
        var r1 = this.__AABB();
        var r2 = displayObject.__AABB();
        return r1.instersects(r2);
    }
//point 全局坐标
    dsDisplayObject.prototype.hitTestPoint = function(dx,dy,shapeFlag){
        var ab = this.__AABB();
        var bool = ab.contains(dx,dy);
        if(shapeFlag&&bool){
            var m= this.__ctxToData();
            //if(this.name=='c2')
            //    this.stage.__ctx2d.putImageData(m,100,0);
            dx -=ab.x1,dy-=ab.y1;
            var index= parseInt((dy*m.width+dx)*4);
            return m.data[index+3];
        }
        return bool
    }
    dsDisplayObject.prototype.localToGlobal = function (point) {
        var p = this.parent;
        var po= this._mat.transformPoint(point);
        while (p) {
            po=p._mat.transformPoint(po);
            p = p.parent;
        }
        return po;
    }
    dsDisplayObject.prototype.globalToLocal = function (point) {
        var p = this.parent;
        var m = this._mat.clone().invert();
        while (p) {
            m.concat(p._mat.clone().invert());
            p = p.parent;
        }
        return m.transformPoint(point);

    }
    //鼠标点击，图形绘制
    dsDisplayObject.prototype.__ctxToData = function () {
        var ab = this.__AABB();
        //舞台限制
        ab.x1 =Math.max(ab.x1,0);
        ab.y2 =Math.max(ab.y2,0);
        if(this.stage){
            ab.x2=Math.min(ab.x2,this.stage.stageWidth);
            ab.y2=Math.min(ab.y2,this.stage.stageHeight);
        }

        //对象的全局左边，副本坐标应该和主程序一致。
        var oldpos = new dsPoint(this.x,this.y);
        var gpos = this.parent?this.parent.localToGlobal(oldpos):this.localToGlobal(oldpos);
        this.x = gpos.x;
        this.y = gpos.y;
        //舞台副本设置
        $s.fdds.width =600//ab.x2;
        $s.fdds.height =600//ab.y2;
        var fbc = $s.fdds.getContext("2d");
        fbc.clearRect(0,0,$s.fdds.width,$s.fdds.height);
        fbc.save();
        this.__render(fbc);
        fbc.restore();
        //坐标还原
        this.x = oldpos.x;
        this.y = oldpos.y;
        //var off =this.parent?this.parent.localToGlobal(new dsPoint(0,0)):new dsPoint(0,0);
        //fbc.strokeStyle='#ff0000';
        //fbc.rect(ab.x1,ab.y1,ab.width(), ab.height());
        //fbc.strokeStyle="green";
        //fbc.stroke();
        if(this.stage){
            var mat =this.stage._mat;
        }
        return fbc.getImageData(ab.x1,ab.y1,ab.width(), ab.height());
    }
    dsDisplayObject.prototype.__AABB = function (self) {
        var ab = this._graphics?this._graphics.__aabb:new dsAABB(0,0,0,0);
        if(ab.width()<this._width)ab.x2 = ab.x1+this._width;
        if(ab.height()<this._height)ab.y2 = ab.y1+this._height;
        if(self){
            return ab;
        }
        //var pp = this.localToGlobal(new dsPoint(this.x,this.y));
        var p1 = this.localToGlobal(new dsPoint(ab.x1,ab.y1));
        var p2 = this.localToGlobal(new dsPoint(ab.x2,ab.y2));
        //如果有变形，下面是必要的，则 return new dsAABB(p1.x,p1.y,p2.x,p2.y);
        var p3 =this.localToGlobal(new dsPoint(ab.x1,ab.y2));
        var p4 =this.localToGlobal(new dsPoint(ab.x2,ab.y1));
        var minx = Math.min(p1.x,p2.x,p3.x,p4.x);
        var miny = Math.min(p1.y,p2.y,p3.y,p4.y);
        var maxx = Math.max(p1.x,p2.x,p3.x,p4.x);
        var maxy = Math.max(p1.y,p2.y,p3.y,p4.y);
        return new dsAABB(minx,miny,maxx,maxy);
    }
    $s.event=document.createEvent("HTMLEvents");
    $s.__initEvent=function(event,sx,sy){
        event.stopImmediatePropagation = function(){
            event._stopImmediatePropagation = true;
        }
        event.stoppropagation = function(){
            event._stoppropagation = true;
        }
        event.stageX = sx;
        event.stageY = sy;
        return event
    }


    $s[config.pre+'InteractiveObject']=dsInteractiveObject;
    function dsInteractiveObject() {
        dsExtend(dsInteractiveObject,dsDisplayObject);
        //鼠标事件目标阶段
        return new dsInteractiveObject.prototype.__init();
    }
    dsInteractiveObject.prototype.__init=function(){
        this.doubleClickEnabled = false;
        this.mouseEnabled = true;
        this.__activeEvent=[];
        this.mousePixel = true;
    };
    $s.__globalEvent=[]
    dsInteractiveObject.prototype.__addEvent=function(type,useCapture){
        if ($s.__activeType.indexOf(type) != -1) {
            var fun = null;
            var self  = this;
            if ($s.__mouseType.indexOf(type) != -1){
                fun = function(event){
                    event=$s.__initEvent(event,event.offsetX, event.offsetY);
                    var child = self.stage.getObjectsUnderPoint(new dsPoint(event.offsetX, event.offsetY));
                    if (child.length > 0){
                        if(dsChildOf(child[0],dsInteractiveObject))child[0].__mouseaction(event);}else{self.stage.__mouseaction(event);
                    }
                }
            }else if(this.stage.__keyType.indexOf(type) != -1){
                fun = function(event){
                    event=$s.__initEvent(event,0,0);
                    if (self.stage.focus) {
                        if(dsChildOf(stage.focus,dsInteractiveObject))stage.focus.__mouseaction(event);
                    }else{
                        self.stage.__mouseaction(event)
                    }
                }
            }else if(this.stage.__touchType.indexOf(type)!=-1){
                fun = function(event){
                    if(event.type='touchmove')event.preventDefault();
                    var po = event.changedTouches[0];
                    event=$s.__initEvent(event,po.clientX,po.clientY);
                    var child = self.stage.getObjectsUnderPoint(new dsPoint(po.clientX,po.clientY));
                    if (child.length > 0) {
                        if(dsChildOf(child[0],dsInteractiveObject))child[0].__mouseaction(event);}else{self.stage.__mouseaction(event)}
                }
            }
            if($s.__globalEvent[type]==null){
                $s.__globalEvent[type]=[type, fun,-1];
                this.stage.__canvas.addEventListener(type, fun,useCapture);
            }
            $s.__globalEvent[type][2]++;
        }
    }
    dsInteractiveObject.prototype.__removeEvent =function(type){
        var event=$s.__globalEvent[type];
        if(event[2]>0){event[2]--}else{
            delete $s.__globalEvent[type];
            this.stage.__canvas.removeEventListener(event[0], event[1]);
        }
    }
    dsInteractiveObject.prototype.__mouseaction = function (event) {
        if(!this.mouseEnabled)return
        var evs = this.__activeEvent[event.type];
        event.dsCurrentTarget = this;
        event.dsTarget = this;
        if(!evs){
            this.__eventaction(true, event);
            return;
        };
        for (var i = 0; i < evs.length; i++) {
            if (event._stoppropagation) return;//取消自身的行为
            evs[i][1].call(this, event);
            this.__eventaction(evs[i][2], event);
        }
    };
    //事件的冒泡，捕抓
    dsInteractiveObject.prototype.__eventaction = function (useCapture, event) {
        if (event._stopimmediatepropagation)return;
        var pare =this.parent;
        var arr = [];
        while (pare) {
            arr.push(pare);
            pare=pare.parent;
        }
        if (useCapture) {
            //冒泡
            for (var i = 0; i < arr.length; i++) {
                event.dsCurrentTarget = arr[i];
                arr[i].dispatchEvent(event);
            }
        } else {
            //捕抓
            for (var i = arr.length-1; i >=0; i--) {
                event.dsCurrentTarget = arr[i];
                arr[i].dispatchEvent(event);
            }
        }
    };
    $s.__activeType = utils.MOUSE.concat(utils.KEY).concat(utils.TOUCH);
    $s.__mouseType = utils.MOUSE;
    $s.__keyType = utils.KEY;
    $s.__touchType = utils.TOUCH;
    /*
     useCapture == true 冒泡 false 捕抓 默认 false
     priority 优选级
     */
    dsInteractiveObject.prototype.addEventListener = function (type, listener,useCapture, priority, useWeakReference) {
        //主动触发事件的监听处理
        if ($s.__activeType.indexOf(type) != -1) {
            if(this.__activeEvent[type] ==null){
                this.__activeEvent[type]=[];
            }
            var arr = this.__activeEvent[type];
            for(var i = 0;i<arr.length;i++){if(arr[i][0]==type&&arr[i][1]==listener)return}
            var obj = [type, listener,useCapture];
            this.__activeEvent[type].push(obj);
            this.__activeEvent[type].sort(function (e1, e2){return e1[2] > e2[2]});
            this.__addEvent(type,useCapture);
        } else {
            this.__call(dsEventDispatcher,"addEventListener",[type, listener, useCapture, priority, useWeakReference]);
        }
    };
    dsInteractiveObject.prototype.removeEventListener = function (type, listener) {
        if ($s.__activeType.indexOf(type) != -1) {
            var ts = this.__activeEvent[type];
            for (var i in ts) {
                if (ts[i][1] == listener) {
                    ts.splice(i,1);
                    if(ts.length==0){
                        delete this.__activeEvent[type];
                        this.__removeEvent(type);
                    }
                    break;
                }
            }
        } else {
            this.__call(dsEventDispatcher,"removeEventListener", [type,listener]);
        }
    };
    dsInteractiveObject.prototype.dispatchEvent = function (event) {
        if ($s.__activeType.indexOf(event.type) != -1) {
            var a = this.__activeEvent[event.type];
            if (a == null)return
            event.currentTarget = this;
            for (var i in a) {
                a[i][1].call(this, event);
            }
        } else {
            this.__call(dsEventDispatcher,"dispatchEvent", [event]);
        }
    };
    dsInteractiveObject.prototype.hasEventListener = function (type) {
        if (type in this.__activeType)
            return this.__activeEvent[type];
        else {
            return his.__call(dsEventDispatcher,"hasEventListener", [type]);
        }
        return false;
    };
    $s[config.pre+'DisplayObjectContainer']=dsDisplayObjectContainer;
    function dsDisplayObjectContainer() {
        dsExtend(dsDisplayObjectContainer, dsInteractiveObject);
        return new dsDisplayObjectContainer.prototype.__init();
    }

    dsDisplayObjectContainer.prototype.__init= function(){
        this.mouseChildren = true;
        this.numChildren = 0;
        this.__children = Array();//放置子对象
    }
    dsDisplayObjectContainer.prototype.__frame = function(){
        if(this.__call(dsDisplayObject,"__frame")){
            for (var i in this.__children) {
                this.__children[i].__frame();
            }
        }
        return true;
    };
    dsDisplayObjectContainer.prototype.__render = function (ctx) {
        if(this.__call(dsDisplayObject,"__render", [ctx]))
        {
            for (var i = 0; i < this.__children.length; i++) {
                ctx.save();
                this.__children[i].__render(ctx);
                ctx.restore();
            }
            return true;
        }
        return false;
    }
    dsDisplayObjectContainer.prototype.addChild = function (displayObject) {
        if(displayObject.parent){
            displayObject.parent.removeChild(displayObject);
        }
        var index = this.__children.push(displayObject);
        this.numChildren++;
        displayObject.parent = this;
        displayObject.stage = this.stage;
        return displayObject;
    };
    dsDisplayObjectContainer.prototype.addChildAt = function (displayObject, index) {
        if (this.__children[index] == null) {
            this.__children[index] = displayObject;
        } else {
            var s1 = this.__children.slice(0, index);
            var s2 = this.__children.slice(index, this.__children.length);
            s1.push(displayObject);
            this.__children = s1.concat(s2);
        }
        this.numChildren++;
        displayObject.parent = this;
        displayObject.stage = this.stage;
        return displayObject;
    };
    dsDisplayObjectContainer.prototype.contains = function (displayObject) {
        var bool =-1;
        for(var i = 0;i<this.__children;i++){
            var d =  this.__children[i];
            if(dsChildOf(d,dsDisplayObjectContainer)){
                bool = d.contains(displayObject);
            }else{
                if(d ==displayObject)return i;
            }
            if(bool != -1)return bool;
        }
        return bool;
    };
    dsDisplayObjectContainer.prototype.getChildAt = function (index) {
        return this.__children[index];
    };
    dsDisplayObjectContainer.prototype.getChildByName = function (name) {
        for(var i = 0;i<this.__children.length;i++){
            var d =  this.__children[i];
            if(d.name==name)return d;
        }
        return null;
    };
    dsDisplayObjectContainer.prototype.getChildIndex = function (displayobject) {
        var bool =-1;
        for(var i = 0;i<this.__children.length;i++){
            var d =  this.__children[i];
            bool= d==displayobject?i:-1;
            if(bool != -1) break;
        }
        return bool;
    };
    /*
     该方法只返回 displayobject 对象
     */
    dsDisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        var arr = [];
        for (var i = this.__children.length - 1; i >=0; i--) {
            var child= this.__children[i];
            if (child.hitTestPoint(point.x,point.y,child.mousePixel)) {

                if (dsChildOf(child, dsDisplayObjectContainer)) {
                    arr = arr.concat(child.getObjectsUnderPoint(point));
                }
                arr.push(child);
            }
        }
        return arr;
    };
    dsDisplayObjectContainer.prototype.removeChild = function (displayobject) {
        if(displayobject.parent != this) return;
        var index = this.getChildIndex(displayobject);
        this.__children.splice(index,1);
        this.numChildren--;
        displayobject.parent = null;
        displayobject.stage = null;
        //displayObject.dispatchEvent(new Event(Event.ADDTOSTAGE));
        return displayobject;
    };
    dsDisplayObjectContainer.prototype.removeChildAt = function (index) {
        var displayObject = this.__children[index];
        if(!displayObject)return null;
        this.__children.splice(index,1);
        this.numChildren--;
        displayObject.parent = null;
        displayObject.stage = null;
        //displayObject.dispatchEvent(Event.ADDTOSTAGE);
        return displayObject;
    };

    dsDisplayObjectContainer.prototype.setChildIndex = function (displayobject, index) {
        if (displayobject.parent)
            displayobject.parent.removeChild(displayobject);
        this.addChildAt(displayobject, index);
    };

    dsDisplayObjectContainer.prototype.swapChildren = function (displayobject1, displayobject2) {
        if(displayobject1.parent != this || displayobject2.parent != this)return;
        var index = 0;
        for(var i = 0;i<this.__children.length;i++){
            if(this.__children[i]==displayobject1){
                this.__children[i]=displayobject2;index++;
            }
            if(this.__children[i]==displayobject2){
                this.__children[i]=displayobject1;index++
            }
            if(index>=2)break;
        }
    }
    dsDisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
        var d1 =this.__children[index1];
        var d2 =this.__children[index2];
        this.__children[index1]=d2;
        this.__children[index2]=d1;
    };
    dsDisplayObjectContainer.prototype.__AABB = function () {
        var ab  =this.__call(dsDisplayObject,"__AABB");
        for (var i = 0; i < this.__children.length; i++) {
            var a = this.__children[i].__AABB().clone();
            ab.add(a);
        }
        return ab;
    }

//渲染副本内容
    function dsStage(canvas) {
        dsExtend(dsStage, dsDisplayObjectContainer);
        // 只能是用户出发全屏事件，鼠标、键盘触发
        var obj = new dsStage.prototype.__init(canvas);
        Object.defineProperties(obj, {
            "stageHeight": {
                set: function (v) {
                    this.__canvas.height = v;
                    this._stageHeight = v;
                }, get: function () {
                    return this._stageHeight;
                }
            }, "stageWidth": {
                set: function (v) {
                    this.__canvas.width = v;
                    this._stageWidth = v;
                }, get: function () {
                    return this._stageWidth
                }
            }, "frameRate": {
                set: function (v) {
                    this._frameRate = v;
                    this.__pt = parseInt(1000 / this._frameRate);
                },
                get: function () {
                    return this._frameRate
                }
            }, "focus": {
                set: function (v) {
                    if (this._focus && this._focus == v)return;
                    if (this._focus != null) {
                        this._focus.dispatchEvent(new dsFocusEvent(dsFocusEvent.FOCUS_OUT));
                        this._focus.__befocus = false;
                    }
                    this._focus = v;
                    this._focus.__befocus = true;
                    this._focus.dispatchEvent(new dsFocusEvent(dsFocusEvent.FOCUS_IN))
                }, get: function () {
                    return this._focus;
                }
            }, 'color': {
                set: function (v) {
                    if (typeof v == 'number') this._color = dsColor.toStr(v);
                    else this._color = v;
                }, get: function () {
                    return this._color;
                }
            }
        })
        return obj;
    };
    dsStage.prototype.__init=function(canvas){

        this.__globalEvent = {};
        this.__activeEvent = {};
        //this.__mainevent=[];//监听的事件函数
        this.name = "Stage";
        this.__fb = null;
        this.__canvas = canvas;
        this.__ctx2d = canvas.getContext("2d");
        this._color = "#fff";
        this._focus = null;
        this._frameRate = 30;
        this.fullScreenHeight = 0;
        this.fullScreenWidth = 0;
        this.fullScreenSourceRect;
        this.mouseLock = false;
        this.quality = 1;
        this.scaleMode = "StageScaleMode.EXACT_FIT";
        this._stageHeight = canvas.height;
        this._stageWidth = canvas.width;
        this.stage = this;
        this.__et = 0;
        this.__bt = 0;
        this.__pt = parseInt(1000 / this._frameRate);
        var self = this;
        window.requestAnimationFrame(frame);
        function frame() {
            self.__frame();
            self.__et = new Date().getTime();
            if (self.__et - self.__bt > self.__pt) {
                self.__render(self.__ctx2d);
                self.__bt = self.__et;
            }
            window.requestAnimationFrame(frame);
        }

        window.addEventListener(MouseEvent.MOUSE_MOVE, function (e) {
            self._mouseX = e.clientX;
            self._mouseY = e.clientY;
        })
    };

    dsStage.prototype.screenOrientation = function(direct){
        if(direct=='h'){
            this.rotation =90;
            var b=this.stageHeight+this.stageWidth;
            this._stageHeight =b-this.stageHeight;
            this._stageWidth = b-this.stageWidth;
            this.x=this.stageHeight;
        }else if(direct=='v'){
            trace('fgdhgf')
            this.rotation =0;
            this.x = 0;
            this._stageWidth = this.__canvas.width;
            this._stageHeight = this.__canvas.height;
        }
    }

    dsStage.prototype.displayState = function (state) {
        if (state == "full_screen" || state == "full_screen_interactive") {
            var de = this.__canvas;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        } else if (state == "normal") {
            var de = this.__canvas;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        }
    }
    dsStage.prototype.invalidate = function (){
        this.__render(this.__ctx2d);
    }
    dsStage.prototype.__renderfb = function (displayobject) {
        $s.fdds.width = this.stageWidth;
        $s.fdds.height = this.stageHeight;
        var fbc = $s.fdds.getContext("2d");
        var ma = displayobject.mask;
        var ab = ma.__AABB();
        displayobject.mask = null;
        ma._ismask = false;
        fbc.globalAlpha =0;
        displayobject.__render(fbc);
        fbc.globalCompositeOperation = CompositeOperation.DESTINATION_IN;
        ma.__render(fbc);
        var simg = fbc.getImageData(ab.x1,ab.y1,ab.width(),ab.height());
        $s.fdds.width = ab.width();
        $s.fdds.height = ab.height();
        fbc.putImageData(simg,0,0);
        var m = new Image();
        m.src = $s.fdds.toDataURL();
        displayobject.maskdata = m;
        displayobject.mask = ma;
        ma._ismask = true;
        //return m;
    }
    //重置舞台，归置为空
    dsStage.prototype.reset = function(){
        this.name = "Stage";
        //this.__fb = null;
        //this.__canvas = canvas;
        //this.__ctx2d = canvas.getContext("2d");
        this._color = "#fff";
        this._focus = null;
        this._frameRate = 30;
        this.fullScreenHeight = window.screen.availHeight;
        this.fullScreenWidth = window.screen.availWidth;
        this.fullScreenSourceRect;
        this.mouseLock = false;
        this.quality = 1;
        this.scaleMode = "StageScaleMode.EXACT_FIT";
        //this._stageHeight = canvas.height;
        //this._stageWidth = canvas.width;
        this.stage = this;
        this.__et = 0;
        this.__bt = 0;
        this.__pt = parseInt(1000 / this._frameRate);
        this.__namechildren =[];
        this.__children =[];
        this.numChildren =0;
        this.__events=[];
        for(var i in this.__globalEvent){
            var op=this.__globalEvent[i];
            this.__canvas.removeEventListener(op[0],op[1]);
        }
        this.__globalEvent={};
    }
    dsStage.prototype.__render = function (ctx) {
        ctx.save();
        ctx.transform(this._mat.a,this._mat.b,this._mat.c,this._mat.d,this._mat.tx,this._mat.ty);
        this.__ctx2d.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.__ctx2d.fillStyle = this.color;
        this.__ctx2d.fillRect(0, 0, this.stageWidth, this.stageHeight);
        for (var i = 0; i < this.__children.length; i++) {
            ctx.save();
            this.__children[i].__render(ctx);
            ctx.restore();
        }
        ctx.restore();
    }
//显示对象
    $s[config.pre+'Sprite']=dsSprite;
    function dsSprite() {
        dsExtend(dsSprite,dsDisplayObjectContainer);
        return new dsSprite.prototype.__init();
    }
    dsSprite.prototype.__init=function() {
        this.soundTransform = null;
        this.useHandCursor = false;
        this.dropTarget = null;
        this.__drag = null;
    }

    dsSprite.prototype.startDrag = function (lockCenter, rectangle) {
        this.__drag = {"lock": lockCenter, 'rect': rectangle,dragx:0,dragy:0,doldx:0,doldy:0};
        var self = this;
        this.move = function(e){
            e.preventDefault();
            self.__drag.dragx = e.stageX;
            self.__drag.dragy = e.stageY;
        }
        var events = $s.platform.moblie?['touchstart','touchend','touchmove']:['mousedown','mouseup','mousemove']
        this.start = function (e) {
            self.__drag.start = true;
            self.__drag.doldx = self.__drag.dragx = e.stageX;
            self.__drag.doldy = self.__drag.dragy = e.stageY;
            stage.addEventListener(events[2], self.move);
        }
        this.end = function () {
            self.__drag.start = false;
            stage.removeEventListener(events[2], self.move);
        }
        this.addEventListener(events[0], this.start)
        stage.addEventListener(events[1], this.end)

    }
    dsSprite.prototype.stopDrag = function(){
        this.__drag = null;
        if($s.platform.moblie){
            this.removeEventListener('touchstart',this.start)
            stage.removeEventListener('touchend',this.end);
            stage.removeEventListener('touchmove',self.move);
        }else{
            this.removeEventListener('mousedown',this.start)
            stage.removeEventListener('mouseup',this.end);
            stage.removeEventListener('mousemove',self.move);
        }
    }
    dsSprite.prototype.__frame = function(){
        if(this.__call(dsDisplayObjectContainer,"__frame")){
            if (this.__drag && this.__drag.start) {
                if (this.__drag['lock']) {
                    this.y = this.__drag.dragx - this.width * 0.5;
                    this.x = this.__drag.dragy - this.height * 0.5;
                } else {
                    this.y +=this.__drag.doldx-this.__drag.dragx;
                    this.x +=-this.__drag.doldy+this.__drag.dragy;
                    this.__drag.doldx=this.__drag.dragx;
                    this.__drag.doldy=this.__drag.dragy;
                }
                if (this.__drag['rect']) {
                    var r = this.__drag['rect'];
                    if (this.x < r.x)this.x = r.x;
                    if (this.x > r.right)this.x = r.right;
                    if (this.y < r.y)this.y = r.y;
                    if (this.y > r.bottom) this.y = r.bottom;
                }
                //if (this.dropTarget) {
                //    if (this.hitTestObject(this.dropTarget)) {
                //        this.dropTarget.addChild(this);
                //    }
                //}
            }
        }
    }
    $s[config.pre+'Bitmap']=dsBitmap;
    function dsBitmap(bitmapData, pixelSnapping, smoothing) {
        dsExtend(dsBitmap, dsDisplayObject);
        return new dsBitmap.prototype.__init(bitmapData, pixelSnapping, smoothing);
    }
    dsBitmap.prototype.__AABB=function(){
        var p = this.localToGlobal(new dsPoint(this.x,this.y));
        return new dsAABB(0,0,this.bitmapData._width,this.bitmapData._height).inflate(p.x, p.y);
    }
    dsBitmap.prototype.__init=function dsBitmap(bitmapData, pixelSnapping, smoothing) {
        this.bitmapData = bitmapData;
        this.pixelSnapping = pixelSnapping;
        this.smoothing = smoothing;
    }
    dsBitmap.prototype.__render = function (ctx) {
        if (this.bitmapData._transparent && this.bitmapData._img) {
            ctx.drawImage(this.bitmapData._img, this.x, this.y, this.bitmapData.width, this.bitmapData.height);
        } else {
            ctx.putImageData(this.bitmapData._imgdata, this.x, this.y);
        }
    }

    $s[config.pre+'BitmapData']=dsBitmapData;
//Int8Array; Uint8Array; Uint8ClampedArray; Int16Array; Uint16Array; Int32Array; Uint32Array; Float32Array; Float64Array;
    function dsBitmapData(w, h, transparent, fillcolor) {
        this._width = w;
        this._height = h;
        this.__x = 0;
        this.__y = 0;
        this._rect = new dsRectangle(0, 0, w, h);
        this._transparent = transparent;
        this._color = fillcolor;
        this._floodrect = [];
        this._imgdata = $s.fdds.getContext('2d').createImageData(w, h);
        this._img = null;
        this.floodFill(0, 0, fillcolor);
    }
    dsBitmapData.prototype.applyFilter = function (sourceBitmapData, sourceRect, destPoint, filter) {

    }
    dsBitmapData.prototype.clone = function () {
        var clone = Object.create(dsBitmapData.prototype);
        fbcanvavs.width = this.width;
        fbcanvavs.height = this.height;
        fbcanvavs.putImageData(this._imgdata);
        clone._imgdata = fbcanvavs.getImageData(0, 0, this.width, this.height);
        return clone;
    }
    dsBitmapData.prototype.colorTransform = function (rect, colorTransform) {
        var i = rect.x * 4 + this._width * 4 * rect.y;
        var len = rect.width * rect.height;
        var data = this._imgdata[i];
        for (; i < len; i += 4) {
            data[i] = data[i] * colorTransform.redMultiplier + colorTransform.redOffset;
            data[i + 1] = data[i + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset;
            data[i + 2] = data[i + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset;
            data[i + 3] = data[i + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset;
        }
    }
    dsBitmapData.prototype.compare = function (otherBitmapData) {
        if (this.width != otherBitmapData.width) return -3;
        if (this.height != otherBitmapData.height) return -4;

        fbcanvavs.width = this.width;
        fbcanvavs.height = this.height;
        var rdata = fbcanvavs.getImageData(0, 0, this.width, this.height);
        var desdata = this._imageData.data;
        var soudata = otherBitmapData._imageData.data;
        var len = this.width * this.height;
        for (var i = 0; i < len; i += 4) {
            var c = (desdata[i] === soudata[i]) && (desdata[i + 1] === soudata[i + 1]) && (desdata[i + 2] === soudata[i + 2]);
            var a = desdata[i + 3] === soudata[i + 3];
            if (!c) {
                rdata[i] = desdata[i] - soudata[i];
                rdata[i + 1] = desdata[i + 1] - soudata[i + 1];
                rdata[i + 2] = desdata[i + 2] - soudata[i + 2];
            } else if (!a) {
                rdata[i] = rdata[i + 1] = rdata[i + 2] = 255;
                rdata[i + 3] = desdata[i + 3] - soudata[i + 3];
            }
        }
    }
    dsBitmapData.prototype.copyChannel = function (sourceBitmapData, sourceRect, destPoint, sourceChannel, destChannel) {
        var len = sourceRect.width * sourceRect.height;
        var i = (destPoint.x + this.width * destPoint.y) * 4;
        var d = this._imgdata.data;
        var s = sourceBitmapData._imgdata.data;
        for (var j = 0; i < len; i += 4, j += 4) {
            d[i + destChannel] = s[j + sourceChannel];
        }
    }
//alphaBitmapData, alphaPoint, mergeAlpha 这个是哪个参数暂时不实现
    dsBitmapData.prototype.copyPixels = function (sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha) {
        fbcanvavs.width = sourceBitmapData.width;
        fbcanvavs.height = sourceBitmapData.height;
        var ctx = fbcanvavs.getContext("2d");
        ctx.putImageData(sourceBitmapData._imgdata);
        var m = ctx.getImageData(sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height);
        fbcanvavs.width = this.width;
        fbcanvavs.height = this.height;
        ctx.putImageData(this._imgdata);
        ctx.putImageData(m, destPoint.x, destPoint.y);
        this._imgdata = ctx.getImageData(0, 0, this.width, this.height);

    }
    dsBitmapData.prototype.copyPixelsToByteArray = function (rect, data) {
        var i = (rect.x + this.width * rect.y) * 4;
        var len = rect.width * rect.height;
        if (len != data.length)throw "copyPixelsToByteArray error";
        for (i; i < len; i++) {
            this._imgdata.data[i] = data[i];
        }
    }
    dsBitmapData.prototype.dispose = function () {
        this._imgdata = null;
        this._img = null;
        this.width = 0;
        this.height = 0;
    }
    dsBitmapData.prototype.draw = function (displayobject, matrix, colorTransform, blendMode, clipRect, smoothing) {
        //ctx.imageSmoothingEnabled = smoothing;
        //ctx.webkitImageSmoothingEnabled = smoothing;
        //ctx.mozImageSmoothingEnabled = smoothing;
        this._imgdata = displayobject.__ctxToData();
        if (this._transparent) {
            this._trans();
        }
        return this;
    }

    dsBitmapData.prototype.drawWithQuality = function (source, matrix, colorTransform, blendMode, clipRect, smoothing, quality) {

    }

    dsBitmapData.prototype.encode = function (rect, compressor, byteArray) {

    }

    dsBitmapData.prototype.fillRect = function (rect, color) {
        this._floodrect.push(rect);
        //var mrect = this._rect.intersection(rect);
        var c = new dsColor(color).toArray();
        for (var i = rect.x; i < rect.right; i++) {
            W
            for (var j = rect.y; j < rect.bottom; j++) {
                var index = i * 4 + this._width * 4 * j;
                this._imgdata.data[index] = c[0];
                this._imgdata.data[index + 1] = c[1];
                this._imgdata.data[index + 2] = c[2];
                this._imgdata.data[index + 3] = c[3];
            }
        }
        if (this._transparent) {
            this._trans();
        }
    }
    dsBitmapData.prototype.floodFill = function (x, y, color) {
        var c = new dsColor(color).toArray();
        var da = this._imgdata.data;
        if (this._floodrect && this._floodrect.length > 0) {

        } else {
            var c = new dsColor(color).toArray();
            for (var i = 0; i < this._rect.width; i++) {
                for (var j = 0; j < this._rect.height; j++) {
                    var index = i * 4 + this._width * 4 * j;
                    this._imgdata.data[index] = c[0];
                    this._imgdata.data[index + 1] = c[1];
                    this._imgdata.data[index + 2] = c[2];
                    if (this._transparent)this._imgdata.data[index + 3] = c[3];
                    else this._imgdata.data[index + 3] = 255;
                }
            }
            if (this._transparent) {
                this._trans();
            }
        }
    }

    dsBitmapData.prototype._trans = function () {
        $s.fdds.width = this._width;
        $s.fdds.height = this._height;
        $s.fdds.getContext("2d").putImageData(this._imgdata, 0, 0);
        this._img = document.createElement("img");
        this._img.src = $s.fdds.toDataURL();
    }


    dsBitmapData.prototype.generateFilterRect = function (sourceRect, filter) {
        fbcanvavs.width = this.width;
        fbcanvavs.height = this.height;
        fbcanvavs.putImageData(this._imgdata);
        var m = fbcanvavs.getImageData(sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height);
        var m = filter.__render(m);
        fbcanvavs.putImageData(m);
        this._imgdata = fbcanvavs.getImageData(0, 0, this.width, this.height);
    }

    dsBitmapData.prototype.getColorBoundsRect = function (mask, color, findColor) {
        var lefttop = new dsPoint();
        var rightbottom = new dsPoint();
        var d = this._imgdata.data;
        if (findColor) {
            for (var i = 0; i < d.length; i += 4) {
                var value = d[i + 3] << 24 | d[i] << 16 | d[i + 1] << 8 | d[i + 2];
                if (value & mask == color) {
                    var p = i / 4;
                    var yy = p / this.width;
                    var xx = p % this.width;
                    lefttop.x = Math.min(xx, lefttop.x);
                    lefttop.y = Math.min(yy, lefttop.y);
                    rightbottom.x = Math.max(xx, rightbottom.x);
                    rightbottom.y = Math.max(yy, rightbottom.y);
                }
            }
        } else {
            for (var i = 0; i < d.length; i += 4) {
                var value = d[i + 3] << 24 | d[i] << 16 | d[i + 1] << 8 | d[i + 2];
                if (value & mask != color) {
                    var p = i / 4;
                    var yy = p / this.width;
                    var xx = p % this.width;
                    lefttop.x = Math.min(xx, lefttop.x);
                    lefttop.y = Math.min(yy, lefttop.y);
                    rightbottom.x = Math.max(xx, rightbottom.x);
                    rightbottom.y = Math.max(yy, rightbottom.y);
                }
            }
        }
        return new dsRectangle(lefttop.x, lefttop.y, rightbottom.x - lefttop.x, rightbottom.y - lefttop.y);
    }

    dsBitmapData.prototype.getPixel = function (x, y) {
        x = x >= this._width ? this._width - 1 : x;
        y = y >= this._height ? this._height - 1 : y;
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        var i = x * 4 + this._width * 4 * y;
        return dsColor.toColor(this._imgdata.data[i], this._imgdata.data[i + 1], this._imgdata.data[i + 2]);
    }
    dsBitmapData.prototype.getPixel32 = function (x, y) {
        x = x >= this._width ? this._width - 1 : x;
        y = y >= this._height ? this._height - 1 : y;
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        var i = x * 4 + this._width * 4 * y;
        return dsColor.toColor(this._imgdata.data[i], this._imgdata.data[i + 1], this._imgdata.data[i + 2], this._imgdata.data[i + 3]);
    }
    dsBitmapData.prototype.getPixels = function (rect) {
        var md = $s.fdds.getContext("2d").createImageData(0, 0, rect.width, rect.height);
        var xx = rect.x;
        var yy = rect.y;
        var i = xx * 4 + this._width * 4 * yy
        for (i; i < md.data.length; i++) {
            md.data[i] = this._imgdata[i];
        }
        return md.data;
    }
    dsBitmapData.prototype.getPixels = function (rect) {
        var len = rect.width * rect.height;
        var i = (rect.x + this._width * rect.y) * 4;
        var d = this._imgdata;
        var h = [];
        for (i; i < len; i += 4) {
            h.push(dsColor.toColor(d[i], d[i + 1], d[i + 2], d[i + 3]));
        }
        return h;
    }

    dsBitmapData.prototype.histogram = function (hRect) {
        var i = (hRect.x + this._width * hRect.y) * 4;
        var len = hRect.width * hRect.height;
        var data = this._imgdata;
        var h = [[], [], [], []];
        for (var i = 0, l = 256; i < l; i++) {
            h[0][i] = 0;
            h[1][i] = 0;
            h[2][i] = 0;
            h[3][i] = 0;
        }
        for (; i < len; i += 4) {
            h[0] = h[data[i]]++;
            h[1] = h[data[i]]++;
            h[2] = h[data[i]]++;
            h[3] = h[data[i]]++;
        }
        return h;
    }
//secondBitmapDataPoint,secondAlphaThreshold,secondObject 的值是 BitmapData 对象时使用此参数。
    dsBitmapData.prototype.hitTest = function (firstPoint, firstAlphaThreshold, secondObject, secondBitmapDataPoint, secondAlphaThreshold) {
        firstAlphaThreshold = firstAlphaThreshold || 0;
        var sx = secondObject.x - firstPoint.x;
        var sy = secondObject.y - firstPoint.y;
        if (secondObject instanceof dsPoint) {
            if (sx > this.width || sx < firstPoint.x || sy > this.height || sy < this.y)return false;
            return firstAlphaThreshold <= this.__data[((this.width * sy) + sx) * 4 + 3];
        } else if (secondObject instanceof dsRectangle) {
            var rect = new dsRectangle(firstPoint.x, firstPoint.y, this.width, this.height).intersection(secondObject);
            if (rect == null)return false;
            var i = rect.x * this.width + rect.y;
            var len = rect.width * rect.height;
            for (var j = 0; j < len; j += 4) {
                if (firstAlphaThreshold <= this.__data[i + j + 3])return true;
            }
            return false;
        } else if ( dsChildOf(secondObject,Bitmap)) {
            return this.hitTest(firstPoint, firstAlphaThreshold, secondObject.bitmapData, secondBitmapDataPoint, secondAlphaThreshold)
        } else if (secondObject instanceof BitmapData) {
            secondAlphaThreshold = secondAlphaThreshold || 1;
            secondBitmapDataPoint = secondBitmapDataPoint || new dsPoint();
            var r2 = new dsRectangle(secondBitmapDataPoint.x, secondBitmapDataPoint.y, secondObject.width, secondObject.height);
            return this.hitTest(firstPoint, firstAlphaThreshold, r2, secondBitmapDataPoint, secondAlphaThreshold)
        }
    }
    dsBitmapData.prototype.lock = function () {

    }
    dsBitmapData.prototype.merge = function (sourceBitmapData, sourceRect, destPoint, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier) {
        //[(redSrc * redMultiplier) + (redDest * (256 - redMultiplier))] / 256;
        var p = (sourceRect.x + sourceRect.width * sourceRect.y) * 4;
        var len = sourceRect.width * sourceRect.height;
        var pp = (destPoint.x + destPoint.y * this.width) * 4;
        var dst = this._imgdata;
        var sou = sourceBitmapData._imgdata;
        for (var i = p; i < len; i += 4, pp += 4) {
            dst[pp] = sou[p] * redMultiplier + (dst[pp] * (256 - redMultiplier)) / 256;
            dst[pp + 1] = sou[p + 1] * greenMultiplier + (dst[pp] * (256 - greenMultiplier)) / 256;
            dst[pp + 2] = sou[p + 2] * blueMultiplier + (dst[pp] * (256 - blueMultiplier)) / 256;
            dst[pp + 3] = sou[p + 3] * alphaMultiplier + (dst[pp] * (256 - alphaMultiplier)) / 256;
        }
    }
//RED : 1,
//GREEN : 2,
//BLUE : 4,
//ALPHA : 8,
    dsBitmapData.prototype.noise = function (randomSeed, low, high, channelOptions, grayScale) {
        low = low || 0;
        high = high || 255;
        var range = high - low;
        channelOptions = channelOptions || 7;
        grayScale = !!grayScale;
        var red = (channelOptions & 1) === 1;
        var green = (channelOptions & 2) === 2;
        var blue = (channelOptions & 4) === 4;
        var alpha = (channelOptions & 8) === 8;
        var d = this._imgdata.data;
        for (var i = 0, l = d.length; i < l; i += 4) {
            var r = i;
            var g = i + 1;
            var b = i + 2;
            var a = i + 3;
            if(d[a]==0)continue;
            if (grayScale) {
                d[i] = d[g] = d[b] = (Math.random() * range >> 0) + low;
            } else {
                d[r] = (red) ? (Math.random() * range >> 0) + low : 0;
                d[g] = (green) ? (Math.random() * range >> 0) + low : 0;
                d[b] = (blue) ? (Math.random() * range >> 0) + low : 0;
            }
            d[a] = (alpha) ? (Math.random() * range >> 0) + low : 255;
        }
    }
    dsBitmapData.prototype.paletteMap = function (sourceBitmapData, sourceRect, destPoint, redArray, greenArray, blueArray, alphaArray) {

    }
    dsBitmapData.prototype.perlinNoise = function (baseX, baseY, numOctaves, randomSeed, stitch, fractalNoise, channelOptions, grayScale, offsets) {
        if (numOctaves === 0) {
            this.fillRect(new dsRectangle(0, 0, this.width, this.height), 0);
            return;
        }
        baseX = baseX || 1;
        baseY = baseY || 1;
        stitch = !!stitch;
        fractalNoise = !!fractalNoise;
        channelOptions = channelOptions || 7;
        grayScale = !!grayScale;
        offsets = offsets || [];
        var channels = [];
        if (!grayScale) {
            var chR = channels[0] = (channelOptions & 1) === 1;
            var chG = channels[1] = (channelOptions & 2) === 2;
            var chB = channels[2] = (channelOptions & 4) === 4;
        }
        var chA = channels[3] = (channelOptions & 8) === 8;
        var data = this._imgdata.data;
        NoiseGenerator.setProperties(randomSeed);
        for (var y = 0, h = this._imgdata.height; y < h; y++) {
            for (var x = 0, w = this._imgdata.width; x < w; x++) {
                var noises;
                if (stitch) {
                    noises = NoiseGenerator.getStitchNoises(x, y, w, h, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets);
                } else {
                    noises = NoiseGenerator.getNoises(x, y, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets);
                }
                var r = ((w * y) + x) * 4;
                var g = r + 1;
                var b = r + 2;
                var a = r + 3;
                if(data[a]==0)continue
                if (grayScale) {
                    data[r] = data[g] = data[b] = noises[0] * 256;
                } else {
                    data[r] = (chR) ? noises[0] * 256 : 0;
                    data[g] = (chG) ? noises[1] * 256 : 0;
                    data[b] = (chB) ? noises[2] * 256 : 0;
                }
                data[a] = (chA) ? noises[3] * 256 : 255;
            }
        }

    }
    dsBitmapData.prototype.pixelDissolve = function (sourceBitmapData, sourceRect, destPoint, randomSeed, numPixels, fillColor) {
        var w = this.width;
        var h = this.height;
        var sx = sourceRect.x >> 0;
        var sy = sourceRect.y >> 0;
        var sw = sourceRect.width >> 0;
        var sh = sourceRect.height >> 0;
        var dx = destPoint.x >> 0;
        var dy = destPoint.y >> 0;
        numPixels = numPixels || sw * sh / 30 >> 0;
        fillColor = fillColor || 0;
        var compare = this === sourceBitmapData;
        var red, green, blue, alpha;
        if (compare) {
            red = fillColor >> 16 & 0xFF;
            green = fillColor >> 8 & 0xFF;
            blue = fillColor & 0xFF;
            alpha = fillColor >> 24 & 0xFF;
        }

        var sData = sourceBitmapData._imgdata.data;
        var tData = this._imgdata.data;

        var buffer = [];
        for (var i = 0, l = sw * sh; i < l; i++) {
            buffer[i] = i;
        }
        if (randomSeed > buffer.length)randomSeed = buffer.length - 1;
        while (0 < numPixels) {
            var bi = buffer.splice(randomSeed, 1)[0];
            var bx = bi % sw;
            var by = bi / sw >> 0;
            var tx = bx + dx;
            var ty = by + dy;
            if (tx < 0 || ty < 0 || w <= tx || h <= ty) {
                continue;
            }
            var ti = ((w * ty) + tx) * 4;
            if (compare) {
                tData[ti] = red;
                tData[++ti] = green;
                tData[++ti] = blue;
                tData[++ti] = alpha;
            } else {
                var si = bi * 4;
                tData[ti] = sData[si];
                tData[++ti] = sData[++si];
                tData[++ti] = sData[++si];
                tData[++ti] = sData[++si];
            }
            if (buffer.length === 0) {
                return 0;
            }
            numPixels--;
            randomSeed = Math.random() * (buffer.length - 1) >> 0;
        }
        return randomSeed;
    }
    dsBitmapData.prototype.scroll = function (x, y) {
        this.__x = x;
        this.__y = y;
    }

    dsBitmapData.prototype.setPixel = function (x, y, color) {
        var c = new dsColor(color).toArray();
        x = x >= this._width ? this._width - 1 : x;
        y = y >= this._height ? this._height - 1 : y;
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        var i = x * 4 + this._width * 4 * y;
        this._imgdata.data[i] = c[0];
        this._imgdata.data[i + 1] = c[1];
        this._imgdata.data[i + 2] = c[2];
        this._imgdata.data[i + 3] = c[3];
    }

    dsBitmapData.prototype.setPixel32 = function (x, y, color) {
        var c = new dsColor(color).toArray();
        x = x >= this._width ? this._width - 1 : x;
        y = y >= this._height ? this._height - 1 : y;
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        var i = x * 4 + this._width * 4 * y;
        this._imgdata.data[i] = c[0];
        this._imgdata.data[i + 1] = c[1];
        this._imgdata.data[i + 2] = c[2];
        this._imgdata.data[i + 3] = c[3];
    }

    dsBitmapData.prototype.setPixels = function (rect, inputByteArray) {
        var len = rect.width * rect.height;
        var i = rect.x * 4 + this._width * 4 * rect.y;
        for (i; i < len; i += 4) {
            this._imgdata.data[i] = inputByteArray[i];
            this._imgdata.data[i + 1] = inputByteArray[i + 1];
            this._imgdata.data[i + 2] = cinputByteArray[i + 2];
            this._imgdata.data[i + 3] = inputByteArray[i + 3];
        }
    }

    dsBitmapData.prototype.setVector = function (rect, inputVector) {

    }
    function getThresholdMethod(operation) {
        switch (operation) {
            case "<" :
                return function (pixelValue, threshold) {
                    return pixelValue < threshold;
                };
            case "<=" :
                return function (pixelValue, threshold) {
                    return pixelValue <= threshold;
                };
            case ">" :
                return function (pixelValue, threshold) {
                    return pixelValue > threshold;
                };
            case ">=" :
                return function (pixelValue, threshold) {
                    return pixelValue >= threshold;
                };
            case "==" :
                return function (pixelValue, threshold) {
                    return pixelValue == threshold;
                };
            case "!=" :
                return function (pixelValue, threshold) {
                    return pixelValue != threshold;
                };
        }
    }
    dsBitmapData.prototype.threshold = function (sourceBitmapData, sourceRect, destPoint, operation, threshold, color, mask, copySource) {
        var thresholdMethod = getThresholdMethod(operation);
        color = color || 0;
        var red = color >> 16 & 0xFF;
        var green = color >> 8 & 0xFF;
        var blue = color & 0xFF;
        var alpha = color >> 24 & 0xFF;
        if (mask === undefined) mask = 0xFFFFFFFF;
        var sData = sourceBitmapData._imgdata.data;
        var dData = this._imgdata.data;
        var sly = sourceRect.y+sourceRect.height;
        var slx = sourceRect.x+sourceRect.width;
        for(var sx = sourceRect.x,dx = destPoint.x;sx<slx;sx++,dx++){
            for(var sy = sourceRect.y,dy = destPoint.y;sy<sly;sy++,dy++){
                var j =(sy*sourceBitmapData.width+sx)*4;
                var i = (dy*this.width+dx)*4;
                var pixelValue = (sData[j] << 24 | sData[j+1] << 16 | sData[j+2] << 8 | sData[j+3]) >>> 0;

                if(thresholdMethod(pixelValue & mask, threshold & mask)){
                    dData[i] = red;
                    dData[i+1] = green;
                    dData[i+2] = blue;
                    dData[i+3] = alpha;
                }else if(copySource){
                    dData[i] = sData[j];
                    dData[i+1] = sData[j+1];
                    dData[i+2] = sData[j+2];
                    dData[i+3] = sData[j+3];
                }
            }
        }
    }
    dsBitmapData.prototype.unlock = function (changeRect) {

    }
//此函数来源于 createjs.BitmapData;
    var NoiseGenerator = (function(){
        var PERSISTENCE = 0.5;
        var A = 1103515245;
        var B = 12345;
        var M = 2147483647;
        var seed = 1;
        var interpolate;

        function NoiseGenerator() {
        }

        NoiseGenerator.setProperties = function (s, type) {
            if (s !== 0) {
                seed = s % 0xffffff;
            }
            if (type === "cos") {
                interpolate = cosineInterpolate;
            } else {
                interpolate = linearInterpolate;
            }
        };
        NoiseGenerator.getStitchNoises = function (x, y, w, h, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets) {
            var xw = x + w;
            var yh = y + h;
            var n11 = getNoises(x, y, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets);
            var n12 = getNoises(xw, y, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets);
            var n21 = getNoises(x, yh, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets);
            var n22 = getNoises(xw, yh, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets);
            var ratioX = x / w;
            var ratioY = y / h;
            var iRatioX = 1 - ratioX;
            var iRatioY = 1 - ratioY;
            var noises = [0, 0, 0, 0];
            if (grayScale || channels[0]) {
                noises[0] = n11[0] * ratioX * ratioY + n12[0] * iRatioX * ratioY + n21[0] * ratioX * iRatioY + n22[0] * iRatioX * iRatioY;
            }
            if (!grayScale && channels[1]) {
                noises[1] = n11[1] * ratioX * ratioY + n12[1] * iRatioX * ratioY + n21[1] * ratioX * iRatioY + n22[1] * iRatioX * iRatioY;
            }
            if (!grayScale && channels[2]) {
                noises[2] = n11[2] * ratioX * ratioY + n12[2] * iRatioX * ratioY + n21[2] * ratioX * iRatioY + n22[2] * iRatioX * iRatioY;
            }
            if (channels[3]) {
                noises[3] = n11[3] * ratioX * ratioY + n12[3] * iRatioX * ratioY + n21[3] * ratioX * iRatioY + n22[3] * iRatioX * iRatioY;
            }
            return noises;
        };
        function getNoises(x, y, baseX, baseY, numOctaves, fractalNoise, channels, grayScale, offsets) {
            var chR = channels[0];
            var chG = channels[1];
            var chB = channels[2];
            var chA = channels[3];
            var noises = [0, 0, 0, 0];
            var buffers = [];
            for (var i = 0; i < numOctaves; i++) {
                var pow = i + 1;
                var freq = Math.pow(2, pow);
                var amp = Math.pow(PERSISTENCE, pow);
                var ox, oy;
                if (offsets[i]) {
                    ox = offsets[i].x;
                    oy = offsets[i].y;
                } else {
                    ox = oy = 0;
                }
                var tx = (x + ox) / baseX * freq;
                var ty = (y + oy) / baseY * freq;
                if (grayScale) {
                    buffers[0] = createNoise(tx, ty, 0);
                } else {
                    if (chR) buffers[0] = createNoise(tx, ty, 0);
                    if (chG) buffers[1] = createNoise(tx, ty, 1);
                    if (chB) buffers[2] = createNoise(tx, ty, 2);
                }
                if (chA) buffers[3] = createNoise(tx, ty, 3);
                for (var j = 0, m = 4; j < m; j++) {
                    var v = buffers[j];
                    if (v === undefined) {
                        continue;
                    }
                    if (fractalNoise) {
                        v = v * 0.6 + 0.2;
                    } else {
                        v = v * v;
                    }
                    noises[j] += v * amp;
                }
            }
            return noises;
        }

        NoiseGenerator.getNoises = getNoises;
        function createNoise(x, y, c) {
            var ix1 = x >> 0;
            var iy1 = y >> 0;
            var fx = x - ix1;
            var fy = y - iy1;
            var ix2 = ix1 + 1;
            var iy2 = iy1 + 1;
            var n11 = noise(ix1, iy1, c);
            var n12 = noise(ix2, iy1, c);
            var n21 = noise(ix1, iy2, c);
            var n22 = noise(ix2, iy2, c);
            var n1 = interpolate(n11, n12, fx);
            var n2 = interpolate(n21, n22, fx);
            return interpolate(n1, n2, fy);
        }

        function linearInterpolate(a, b, x) {
            return a * (1 - x) + b * x;
        }

        function cosineInterpolate(a, b, x) {
            var ft = x * Math.PI;
            var f = (1 - Math.cos(ft)) * 0.5;
            return a * (1 - f) + b * f;
        }

        function noise(x, y, c) {
            var r = (seed + x) * ((y + c) ^ B);
            r = ((r << 13) ^ r) & 0xffffffff;
            return ((A * r + B) & M) / (M + 1);
        }

        return NoiseGenerator;
    }());
    $s[config.pre+'TextField']=dsTextField;
    function dsTextField() {
        dsExtend(dsTextField, dsInteractiveObject);
        var text = new dsTextField.prototype.__init();
        Object.defineProperties(text, {
            "text": {
                set: function (v) {
                    this._text = this.maxChars ? v.substr(0, this.maxChars) : v.toString();
                    this._length = this._text.length;
                    this._chapters = [];
                    if (this.displayAsPassword) {
                        this._chapters.push(new dsTextChapter(this, '******'));
                    } else {
                        if (this.multiline) {
                            this.textWidth = 0;
                            var a = this._text.split('\n');//多行分析
                            for (var k = 0; k < a.length; k++) {
                                if (this.numLines || this.numLines > k)break;
                                this._chapters.push(new dsTextChapter(this, a[k]));
                                this.textWidth = Math.max(this._chapters[k].width, this.textWidth);
                            }
                        } else {
                            this._chapters.push(new dsTextChapter(this, this._text));
                            this.textWidth = this._chapters[0].width;
                        }
                    }

                    this.textHeight = 0;
                    for (var i = 0; i < this._chapters.length; i++) {
                        this.textHeight += this._chapters[i].height
                    }
                    if (this.multiline)this.height = this.textHeight+4;
                },
                get: function () {
                    return this._text;
                }
            },
            "length": {
                get: function () {
                    return this._length;
                },
            },
            'type': {
                set: function (v) {
                    this._type = v;
                    //if (this._type == "input") {
                    //    this.addEventListener(MouseEvent.CLICK, this._sproxy)
                    //} else {
                    //    this.removeEventListener(MouseEvent.CLICK, this._sproxy);
                    //}
                },
                get: function () {
                    return this._type;
                }
            },
            'htmlText': {
                set: function (v) {
                    this._htmlText = v;
                    var span = window.document.createElement('span');
                    span.innerHTML = v;
                    this.text = span.innerText;
                },
                get: function () {
                    return this._htmlText;
                }
            },
            "selectionBeginIndex": {
                get: function () {
                    return this._selectionBeginIndex
                }
            },
            "selectionEndIndex": {
                get: function () {
                    return this._selectionEndIndex
                }
            }
        });
        text.type = 'input';
        return text;
    }
    dsTextField.prototype.__init=function() {
        this.width = 100;
        this.height = 12;
        this.alwaysShowSelection = true;//Boolean
        //如果设置为 true 且文本字段没有焦点，Flash Player 将以灰色突出显示文本字段中的所选内容。
        //antiAliasType : String
        //用于此文本字段的消除锯齿类型。
        this.autoSize = 'none';//left,right,center
        //控制文本字段的自动大小调整和对齐。
        this.background = false;
        //指定文本字段是否具有背景填充。
        this.backgroundColor = "#00ffff"
        //文本字段背景的颜色。
        this.border=false;//: Boolean
        //指定文本字段是否具有边框。
        this.borderColor="#ff0000" //: uint
        //文本字段边框的颜色。
        //bottomScrollV : int
        //	[只读] 一个整数（从 1 开始的索引），表示指定文本字段中当前可以看到的最后一行。
        //caretIndex : int
        //	[只读] 插入点（尖号）位置的索引。
        //condenseWhite : Boolean
        //一个布尔值，指定是否删除具有 HTML 文本的文本字段中的额外空白（空格、换行符等等）。
        this.defaultTextFormat = new dsTextFormat();
        //指定应用于新插入文本（例如，用户输入的文本或使用 replaceSelectedText() 方法插入的文本）的格式。
        this.displayAsPassword = false;
        //指定文本字段是否是密码文本字段。
        //embedFonts : Boolean
        //指定是否使用嵌入字体轮廓进行呈现。
        //gridFitType : String
        //用于此文本字段的网格固定类型。
        this._htmlText = '';
        //包含文本字段内容的 HTML 表示形式。
        this._length = 0;
        //	[只读] 文本字段中的字符数。
        this.maxChars = 0;
        //文本字段中最多可包含的字符数（即用户输入的字符数）。
        //maxScrollH : int
        //	[只读] scrollH 的最大值。
        //maxScrollV : int
        //	[只读] scrollV 的最大值。
        //mouseWheelEnabled : Boolean
        //一个布尔值，表示当用户单击某个文本字段并滚动鼠标滚轮时，Flash Player 是否自动滚动多行文本字段。
        this.multiline = false;
        //表示字段是否为多行文本字段。
        this.numLines = 0;
        //	[只读] 定义多行文本字段中的文本行数。
        this.restrict = '';
        //表示用户可输入到文本字段中的字符集。
        //scrollH : int
        //当前水平滚动位置。
        //scrollV : int
        //文本在文本字段中的垂直位置。
        this.selectable = true;
        //一个布尔值，表示文本字段是否可选。
        this._selectionBeginIndex = 0;
        //	[只读] 当前所选内容中第一个字符从零开始的字符索引值。
        this._selectionEndIndex = 0;
        //	[只读] 当前所选内容中最后一个字符从零开始的字符索引值。
        //sharpness : Number
        //此文本字段中字型边缘的清晰度。
        //styleSheet : StyleSheet
        //将样式表附加到文本字段。
        this._text = "";
        //作为文本字段中当前文本的字符串。
        this.textColor = "#000";
        //文本字段中文本的颜色（采用十六进制格式）。
        this.textHeight = 0;
        //	[只读] 文本的高度，以像素为单位。
        //textInteractionMode : String
        //	[只读] 交互模式属性，默认值为 TextInteractionMode.NORMAL。
        this.textWidth = 0;
        //	[只读] 文本的宽度，以像素为单位。
        //thickness : Number
        //此文本字段中字型边缘的粗细。
        this._type = '';//dynamic,input
        //文本字段的类型。
        //useRichTextClipboard : Boolean
        //指定在复制和粘贴文本时是否同时复制和粘贴其格式。
        this.wordWrap = false;
        //一个布尔值，表示文本字段是否自动换行。
        this._chapters = [];
        this._proxy = null;
    }
    dsTextField.prototype.appendText = function (newText) {
        this.text += newText;
    }
    dsTextField.prototype.getCharBoundaries = function (charIndex) {

    }
    dsTextField.prototype.getCharIndexAtPoint = function (x, y) {
        //var h=Math.floor(x/this.defaultTextFormat.size);
        var w = Math.floor(y / this.defaultTextFormat.size);
        var line = this.getLineIndexAtPoint(x, y);
        return w;
        //return line.getAtom(w).char
    }
    dsTextField.prototype.getFirstCharInParagraph = function (charIndex) {
    }
    dsTextField.prototype.getImageReference = function (id) {
    }
    dsTextField.prototype.getLineIndexAtPoint = function (x, y) {
        var h = Math.floor(x / this.defaultTextFormat.size);
        //var w=Math.floor(y/this.defaultTextFormat.size);
        //h=Math.min(this._lines.length,Math.max(h,0))
        h = h < 0 ? 0 : (h > this._lines.length ? this._lines.length : h)
        return this._lines[h]
    }
    dsTextField.prototype.getLineIndexOfChar = function (charIndex) {
        //var w=Math.floor(y/this.defaultTextFormat.size);
        //var line=this.getLineIndexAtPoint(x,y);
        //return line.getAtom().char;
    }
    dsTextField.prototype.getLineLength = function (lineIndex) {
        return this._lines.length;
    }
    dsTextField.prototype.getLineMetrics = function (lineIndex) {
    }
    dsTextField.prototype.getLineOffset = function (lineIndex) {
    }
    dsTextField.prototype.getLineText = function (lineIndex) {
        lineIndex = lineIndex < 0 ? 0 : (lineIndex > this._lines.length ? this._lines.length : lineIndex);
        return this._lines[lineIndex].text
    }
    dsTextField.prototype.getParagraphLength = function (charIndex) {
    }
    dsTextField.prototype.isFontCompatible = function (fontName, fontStyle) {
    }
    dsTextField.prototype.replaceSelectedText = function (value) {
    }
    dsTextField.prototype.replaceText = function (beginIndex, endIndex, newText) {
    }
    dsTextField.prototype.setSelection = function (beginIndex, endIndex) {
        var ll = 0;
        var b = 0;
        for (var i = 0; i < this._lines.length; i++) {
            ll += this._lines[i].getAtomLength();
            if (b == 0) {
                if (beginIndex < ll) {
                    var bb = ll - this._lines[i].getAtomLength()
                    var b = beginIndex - bb;
                    this._lines[i].backgroundBegin(b);
                    if (endIndex < ll) {
                        var e = endIndex - bb + 1;
                        this._lines[i].backgroundEnd(e);
                        return;
                    }
                    b = 1;
                }
            } else if (b == 1) {
                if (endIndex < ll) {
                    this._lines[i].backgroundEnd(ll - endIndex);
                    b = 2;
                    return;
                }
            }
        }
        if (b == 1) {
            this._lines[i].backgroundEnd(ll);
        }
    }
    dsTextField.prototype.setTextFormat = function (format, beginIndex, endIndex) {
    }
    dsTextField.prototype.__render = function (ctx) {
        if(!this._text)return
        this.__call(dsDisplayObject,'__render',[ctx]);
        if (this.background) {
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, 0, this.width+4, this.height+4);//左右,上下各2像素的宽度
        }
        if(this.border){
            ctx.strokeStyle=this.borderColor;
            ctx.strokeRect(0, 0, this.width+4, this.height+4);
        }
        this.defaultTextFormat.toformat(ctx);
        var format = this.defaultTextFormat;
        var h = format.size;//文本基线
        if(this.multiline){
            for (var c = 0; c < this._chapters.length; c++) {
                var cp = this._chapters[c];
                for (var l = 0; l < cp.lines.length; l++) {
                    var lp = cp.lines[l];
                    var wx = 0;
                    if (this.autoSize == "right") {
                        wx=this.width-ctx.measureText(lp.text).width;
                    } else if (this.autoSize == 'center'){
                        wx=(this.width-ctx.measureText(lp.text).width)*0.5;
                    } else {
                        wx=2;
                    }
                    ctx.fillText(lp.text, wx, (c+l+1)*h);
                }
            }
        }else{
            var lp = this._chapters[0].lines[0];
            ctx.fillText(lp.text, 2, h);
        }
    }
    dsTextField.prototype._sproxy = function (event) {
        if (!this.selectable) return;
        if (this._proxy == null) {
            if (this.displayAsPassword) {
                this._proxy = window.document.createElement('input');
                this._proxy.type = 'password';
            } else {
                if (this.multiline) {
                    this._proxy = window.document.createElement('textarea');
                    this._proxy.style.resize = 'none';
                } else {
                    this._proxy = window.document.createElement('input');
                }
            }

            this._proxy.style.position = 'absolute';
            var self = this;
            this._proxy.onblur = function (e) {
                e.currentTarget.style.display = "none";
                self.text = e.currentTarget.value;
            };
            window.document.body.appendChild(this._proxy);
        }
        if (this.maxChars)this._proxy.style.maxlength = this.maxChars;
        this._proxy.style.pattern = this.restrict;
        this._proxy.style.top = this.y + "px";
        this._proxy.style.left = this.x + "px";
        this._proxy.style.display = "block";
        this._proxy.style.width = this.width + "px";
        this._proxy.style.height = this.height + "px";
        this._proxy.style.fontsize = this.defaultTextFormat.size + 'px';
        this._proxy.value = this.text;
        this._proxy.focus();
    }
    $s[config.pre+'TextFormat']=dsTextFormat;
    function dsTextFormat() {
        this.align = "left";
        //表示段落的对齐方式。
        this.blockIndent = 0;
        //表示块缩进，以像素为单位。
        this.bold = false;
        //指定文本是否为粗体字。
        this.bullet = false;
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
        this.leading = 0;
        //一个整数，表示行与行之间的垂直间距（称为前导）量。
        this.leftMargin = 0;
        //段落的左边距，以像素为单位。
        this.letterSpacing = 0;
        //一个数字，表示在所有字符之间均匀分配的空间量。
        this.rightMargin = 0;
        //段落的右边距，以像素为单位。
        this.size = 24;
        //使用此文本格式的文本的大小（以像素为单位）。
        this.tabStops = [];
        //将自定义 Tab 停靠位指定为一个非负整数的数组。
        this.target = "";
        //表示显示超链接的目标窗口。
        this.underline = false;
        //表示使用此文本格式的文本是带下划线 (true) 还是不带下划线 (false)。
        this.url = "";
        //表示使用此文本格式的文本的目标 URL。
    }
    dsTextFormat.prototype.toformat = function (ctx) {
        ctx.fillStyle = this.color;
        var s = "";
        if (this.bold)s += "bold";
        if (this.italic)s += " italic";
        s += " " + this.size + "px " + this.font;
        ctx.font = s;
    }

    function dsTextChapter(parent, text) {
        this.text = text;
        this.lines = [];
        var format = parent.defaultTextFormat;
        if (parent.multiline && parent.wordWrap) {
            this.maxword = Math.floor((parent.width-4) / format.size);
            this.maxword = this.maxword || 1;
            var le = 0;
            while (le < this.text.length) {
                this.lines.push(new dsTextLine(this.text.substr(le, this.maxword)));
                le += this.maxword;
            }
        } else {
            this.lines.push(new dsTextLine(this.text));
        }
        //this.width = format.size * this.lines[0].words.length;
        this.height = this.lines.length * format.size;
    }
//行
    function dsTextLine(text) {
        this.text = text;
        this.words = this.text.split('');
    }
    $s[config.pre+'MovieClip']=dsMovieClip;
    function dsMovieClip() {
        dsExtend(dsMovieClip, dsSprite);
        var m = new dsMovieClip.prototype.__init();
        Object.defineProperties(m, {
            "totalFrames": {
                get: function () {
                    return this._imgs.length
                }
            },
            "frameRate": {
                get: function () {
                    return this._frameRate;
                }, set: function (v) {
                    this._frameRate = v;
                    this.__pt = parseInt(1000 / this._frameRate);
                }
            }
        })
        return m;
    }
    var p = dsMovieClip.prototype;
    p.__init=function(){
        this.type='sequence';
        this.__et = 0;
        this.__bt = 0;
        this._frameRate = 24;
        this.__pt = parseInt(1000 /this._frameRate);
        this.currentFrame = 0;
        this.enabled = false;
        this.isPlaying = true;
        this._totalFrames = 0;
        this._sheet = null;
    }
    p.load = function(source){
        if(!source)return;
        var url = this.stage._config.baseURI+source+this.stage._config.file;
        var res=new dsURLLoader(new dsURLRequest(url));
        var self = this;
        var fun = function (e) {
            res.removeEventListener('complete',fun);
            try{var d = JSON.parse(res.data)}catch(e){throw source+'is wrong ,may be format is wrong'}
            if(d.meta.type =='manifest'){
                self.__loadManifest(d);
            }else if(d.meta.type=='sequence'){
                self.__loadSequence(d);
            }
        }
        res.addEventListener('complete',fun);
        return this;
    }
    p.gotoAndPlay = function (frame){
        this.isPlaying = true;
        this.currentFrame = frame;
    }
    p.gotoAndStop = function (frame) {
        this.isPlaying = false;
        this.currentFrame = frame;
    }
    p.nextFrame = function () {
        if (this.currentFrame < this.totalFrames)this.currentFrame++;
        this.isPlaying = false;
    }
    p.play = function () {
        this.isPlaying = true;
    }
    p.preFrame = function () {
        if (this.currentFrame > 1)this.currentFrame--;
        this.isPlaying = false;
    }
    p.stop = function () {
        this.isPlaying = false;
    }
    // png 序列帧
    p.__loadManifest = function(d){
        var self = this;
        this._sheet = new SpriteSheet(d);
        var al = 0;
        for (var i = 0; i < d.frames.length; i++) {
            var m = new Image();
            m.src = this.stage._config.baseURI+d.frames[i].filename + d.meta.image;
            m.onerror = function (e) {
                throw 'cannot find ' + m.src
            };
            m.onload = function (e) {
                al++;
                if (al == d.frames.length - 1)
                    this.dispatchEvent($s.dsEvent('complete', false, false))
                else {
                    var ev = $s.dsEvent('progress');
                    ev.beload = al;
                    ev.alload = d.frames.length - 1;
                    self.dispatchEvent(ev);
                }
            };
            this._sheet.imgs.push(m);
        }
        this.width = d.meta.size.w;
        this.height = d.meta.size.h;

        this._totalFrames = this._sheet.imgs.length;
    }
    //sprite 序列帧
    p.__loadSequence=function(d){
        var self = this;
        var img = new Image();
        img.src = this.stage._config.baseURI + d.meta.image;
        img.onerror = function (e) {
            throw 'can find img url ' + self.src;
        }
        img.onload = function (e) {
            $s.fdds.width = d.meta.size.w;
            $s.fdds.height = d.meta.size.h;
            var xt = $s.fdds.getContext("2d");
            xt.drawImage(img, 0, 0);
            self._sheet = new SpriteSheet(d).prase(xt);
            self.width = self._sheet.width;
            self.height = self._sheet.height;
            self._totalFrames = self._sheet.imgs.length;
            self.dispatchEvent($s.dsEvent('complete'));
        }
    }
    p.__render = function (ctx) {
        if(this.__call(dsDisplayObjectContainer,"__render",[ctx])){
            this.__et = new Date().getTime();
            if (this._sheet) {
                var b = this._sheet.getImg(this.currentFrame);
                ctx.drawImage(b.img,0, 0, b.w, b.h);
                if (this.isPlaying && this.__et - this.__bt > this.__pt){
                    this.currentFrame++;
                    if (this.currentFrame >= this._totalFrames)this.currentFrame = 0;
                    this.__bt = this.__et;
                }
            }
        }
    }
    $s[config.pre+'SpriteSheet']=SpriteSheet;
    function SpriteSheet(data){
        this.data = data;
        this.imgs = [];
        this.width =0;
        this.height =0;
    }
    SpriteSheet.prototype.prasearr = function(arr){
        for(var i =0;i<arr.length;i++){
            var m = new Image();
            m.src = arr[i].filename+this.data.meta.image;
            m.onerror = function(e){throw 'cannot find '+m.src};
            m.onload=function(e){};
            this.imgs.push(m);
        }
    }
    SpriteSheet.prototype.prase = function(ctx){
        var arr = [];
        for(var i = 0;i<this.data.frames.length;i++){
            var o =this.data.frames[i];
            arr.push(ctx.getImageData(o.frame.x, o.frame.y, o.frame.w, o.frame.h));
            this.width=Math.max(o.frame.w,this.width);
            this.height=Math.max(o.frame.h,this.height)
        }

        for(var j = 0;j<arr.length;j++){
            var f  = this.data.frames[j];
            $s.fdds.width = f.frame.w;
            $s.fdds.height = f.frame.h;
            ctx.clearRect(0,0,f.frame.w,f.frame.h);
            ctx.putImageData(arr[j],0,0);
            var m = new Image();
            m.src=$s.fdds.toDataURL('image/png');
            this.imgs.push(m);
        }
        return this;
    }

    SpriteSheet.prototype.getImg = function(index){
        var o = this.data.frames[index].frame;
        o.img = this.imgs[index];
        return o;
    }
    $s[config.pre+'URLRequest']=dsURLRequest;
    $s.dsURLRequest=dsURLRequest;
    function dsURLRequest(url){
        this.contentType ='application/x-www-form-urlencoded';// multipart/form-data
        this.data={};//"arraybuffer""blob""document""json""text"
        this.digest='';
        this.method ='get';//post
        this.requestHeaders=[];//HTTP 请求标头的数组 键值对
        this.url = url;
        this.userAgent=navigator.userAgent;
        this.dataType ='text';
        //Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/526.9+ (KHTML, like Gecko) AdobeAIR/1.5"
        //"Mozilla/5.0 (Windows; U; en) AppleWebKit/526.9+ (KHTML, like Gecko) AdobeAIR/1.5"
        //"Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/526.9+ (KHTML, like Gecko) AdobeAIR/1.5"
    }
    if (!XMLHttpRequest.prototype.sendAsBinary) {
        XMLHttpRequest.prototype.sendAsBinary = function(sData) {
            var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
            for (var nIdx = 0; nIdx < nBytes; nIdx++) {
                ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
            }
            this.send(ui8Data);
        };
    }
    $s[config.pre+'URLLoader']=dsURLLoader;
    function dsURLLoader(request){
        dsExtend(dsURLLoader, dsEventDispatcher);
        return new dsURLLoader.prototype.__init(request);
    }
    dsURLLoader.prototype.load = function (request) {
        var res =this.request = typeof request =='string'?new dsURLRequest(request):request
        var sendata = objtoquery(res.data);
        if(this.request.method=='get')
            this.http.open(this.request.method, this.request.url+"?"+sendata, true);
        else if(this.request.method=='post'){
            this.http.open(this.request.method, this.request.url, true);
        }
        for(var i = 0;i<this.request.requestHeaders.length;i++){
            var h = this.request.requestHeaders[i];
            this.http.setRequestHeader(h.head.h.value);
        }
        var mime= utils.accepts[res.dataType];
        this.http.setRequestHeader('Accept', mime || '*/*');
        this.http.setRequestHeader('Content-Type',res.contentType);
        var self = this;
        this.http.onload = function (event){
            self.data = event.target.response;
        }
        this.http.send(sendata);
    }
    dsURLLoader.prototype.close = function(){
        this.http.abort();
    }
//图形加载
    dsURLLoader.prototype.__init=function(request) {
        this.request = request;
        //this.dataFormat = "text";//"arraybuffer""blob""document""json""text"
        this.data = null;
        this.bytesLoaded = 0;
        this.bytesTotal = 0;
        var self = this;
        var http;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            http = new XMLHttpRequest();
        } else {// code for IE6, IE5
            http = new ActiveXObject("Microsoft.XMLHTTP");
        }
        http.addEventListener("progress", function (event) {
            //console.log(event);
            //this.dispatchEvent()
        });
        http.addEventListener("load", function (event) {
            //console.log("load");
            //event.loaded;
            //event.total;
            //console.log(event);
        });
        http.addEventListener("error", function () {
            throw "error";
        });
        http.addEventListener("abort", function () {
            //console.log("abort");
        });
        http.addEventListener("loadend", function (e) {
            //trace('end',e)
        });
        http.addEventListener('readystatechange',function(e){
            //http.readyState;
            //http.status;
            //self.data = e.target.response;
            //console.log(http.readyState,http.status,e);
            if(http.readyState==4){
                self.data = http.response;
                $s.event.initEvent(Event.COMPLETE,false,false);
                self.dispatchEvent($s.event);
            }
        })
        this.http=http;
        //this.http.timeout = 5000;
        if(this.request) this.load(this.request);
    }

    function dsLoader(url) {
        this.width =0;
        this.height =0;
        this.data = null;
        this.cacheAsBitmap = true;
        if (url != null) {
            this.load(url);
        }
    }
    $s[config.pre+'Loader']=dsLoader;
    function dsLoader() {
        dsExtend(dsLoader, dsInteractiveObject);
        return new dsLoader.prototype.__init();
    }
    dsLoader.prototype.__init=function(){}
    dsLoader.prototype.load = function (url) {
        var self = this;
        var mm = new Image();
        mm.onload = function () {
            self.data = mm;
            self.width = mm.width
            self.height =mm.height;
            //self.stage.invalidate()
            self.dispatchEvent( $s.dsEvent(Event.COMPLETE,false,false));
        }
        mm.onerror = function(e){
            throw url+' cannot find';
        }
        mm.src = url;
        return this;
    }
    dsLoader.prototype.__render = function (ctx) {
        if (this.data == null)return;

        ctx.transform(this._mat.a,this._mat.b,this._mat.c,this._mat.d,this._mat.tx,this._mat.ty);
        ctx.drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
    }
    $s[config.pre+'BlurFilter']=dsBlurFilter;
    function dsBlurFilter(blurX, blurY, quality) {
        this.blurX = blurX | 4;
        this.blurY = blurY | 4;
        this.quality = quality | 1;
    }

//斜角
    function BevelFilter() {

    }
//发光
    function GlowFilter() {

    }
    $s[config.pre+'DropShadowFilter']=dsDropShadowFilter;
//投影
    function dsDropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
        this.distance = distance//:Number (default = 4.0) — 阴影的偏移距离，以像素为单位。
        this.angle = Math.PI / 180 * (angle != null ? angle : 0);//:Number (default = 45) — 阴影的角度，0 到 360 度（浮点）。
        this.color = color || 0//:uint (default = 0) — 阴影颜色，采用十六进制格式 0xRRGGBB。默认值为 0x000000。
        this.alpha = alpha || 1//:Number (default = 1.0) — 阴影颜色的 Alpha 透明度值。有效值为 0.0 到 1.0。例如，0.25 设置透明度值为 25%。
        this.blurX = blurX || 4//:Number (default = 4.0) — 水平模糊量。有效值为 0 到 255.0（浮点）。
        this.strength = strength || 1//:Number (default = 1.0) — 印记或跨页的强度。该值越高，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255.0。
        this.quality = quality || 1//:int (default = 1) — 应用滤镜的次数。使用 BitmapFilterQuality 常量：
        this.inner = inner//:Boolean (default = false) — 表示阴影是否为内侧阴影。值 true 指定内侧阴影。值 false 指定外侧阴影（对象外缘周围的阴影）。
        this.knockout = knockout//:Boolean (default = false) — 应用挖空效果 (true)，这将有效地使对象的填色变为透明，并显示文档的背景颜色。
        this.hideObject = hideObject//:Boolean (default = false) — 表示是否隐藏对象。如果值为 true，则表示没有绘制对象本身，只有阴影是可见的。
    }
    dsDropShadowFilter.prototype.__render = function (ctx) {
        ctx.shadowBlur = this.strength;
        ctx.shadowColor = this.color;
        ctx.shadowOffsetX = this.blurX * Math.cos(this.angle);
        ctx.shadowOffsetY = this.blurY * Math.sin(this.angle);
    }
    $s[config.pre+'Sound']=dsSound;
    function dsSound(stream, context) {
        dsExtend(dsSound, dsEventDispatcher);
        return new dsSound.prototype.__init(stream, context);
    }
    /*
     stream:URLRequest = null, context:SoundLoaderContext = null
     */
    dsSound.prototype.__init=function(stream, context) {
        //bytesLoaded : uint
        //	[只读] 返回此声音对象中当前可用的字节数。
        //bytesTotal : int
        //	[只读] 返回此声音对象中总的字节数。
        //Inherited	constructor : Object
        //对类对象或给定对象实例的构造函数的引用。
        //id3 : ID3Info
        //	[只读] 提供对作为 MP3 文件一部分的元数据的访问。
        //isBuffering : Boolean
        //	[只读] 返回外部 MP3 文件的缓冲状态。
        //isURLInaccessible : Boolean
        //	[只读] 表示 Sound.url 属性是否已截断。
        //length : Number
        //	[只读] 当前声音的长度（以毫秒为单位）。
        //url : String
        //	[只读] 从中加载此声音的 URL。
        this.__audio = new Audio();
        var self = this;
        var fun = function(e){
            self.dispatchEvent(e);
        };
        this.__audio.addEventListener('loadstart',fun);
        this.__audio.addEventListener('progress',fun);
        this.__audio.addEventListener('suspend',fun);
        this.__audio.addEventListener('abort',fun);
        this.__audio.addEventListener('error',fun);
        this.__audio.addEventListener('stalled',fun);
        this.__audio.addEventListener('play',fun);
        this.__audio.addEventListener('pause',fun);
        this.__audio.addEventListener('loadedmetadata',fun);
        this.__audio.addEventListener('loadeddata',fun);
        this.__audio.addEventListener('waiting',fun);
        this.__audio.addEventListener('playing',fun);
        this.__audio.addEventListener('canplaythrough',fun);
        this.__audio.addEventListener('seeking',fun);
        this.__audio.addEventListener('seeked',fun);
        this.__audio.addEventListener('timeupdate',fun);
        this.__audio.addEventListener('ended',fun);
        this.__audio.addEventListener('ratechange',fun);
        this.__audio.addEventListener('durationchange',fun);
        this.__audio.addEventListener('volumechange',fun);
    }

    dsSound.prototype.close = function () {
        this.__audio.stop();
    }
    /*
     target:ByteArray, length:Number, startPosition:Number = -1
     */
    dsSound.prototype.extract = function (target, length, startPosition) {

    }
    /*
     stream:URLRequest, context:SoundLoaderContext = null
     */
    dsSound.prototype.load = function (stream, context) {
        if(typeof stream=='string')
            this.__audio.src=stream;
    }
    /*
     bytes:ByteArray, bytesLength:uint
     */
    dsSound.prototype.loadCompressedDataFromByteArray = function (bytes, bytesLength) {

    }
    /*
     将 ByteArray 对象中的 PCM 32 位浮点声音数据加载到 Sound 对象中。
     bytes:ByteArray, samples:uint, format:String = "float", stereo:Boolean = true, sampleRate:Number = 44100.0
     */
    dsSound.prototype.loadPCMFromByteArray = function (bytes, samples, format, stereo, sampleRate) {

    }
    /*
     startTime:Number = 0, loops:int = 0, sndTransform:flash.media:SoundTransform = null
     */
    dsSound.prototype.play = function (startTime, loops, sndTransform) {
        this.__audio.play();
    }
    //exports('dsGraphics',function(global){
    //
    //})
    $s[config.pre+'Graphics']=dsGraphics;
    function dsGraphics() {
        this.__aabb = new dsAABB();
        this._code = [];
        this._codeindex = 0;
        this.__drawline = false;
        this.__drawfill = false;
        this._to=[];
    }

    dsGraphics.prototype.__render = function (ctx) {
        ctx.save();
        ctx.beginPath();
        for (var i = 0; i < this._code.length; i++) {

            var code = this._code[i];
            var lstyle = null;
            var line = code['line'];
            lstyle = line && line[0];
            if (lstyle == "style") {
                ctx.lineWidth = line[1];
                ctx.strokeStyle = line[2];
                ctx.lineCap = line[3];
                ctx.lineJoin = line[4];
                ctx.miterLimit = line[5];
                ctx.globalAlpha *= line[6];
            };

            var fstyle = null;
            var fill = code['fill'];
            fstyle = fill && fill[0];
            if (fstyle == 'style') {
                ctx.fillStyle = fill[1];
                ctx.globalAlpha *= fill[2];
            }

            var draw = code['draw'];
            if (draw) {
                var type = draw[0];
                if (type == "rect") {
                    if (fstyle&&fstyle != 'style') {
                        ctx.fillStyle = this._gradient(ctx, fill, draw[1]);
                    }
                    if (this.__drawline){
                        ctx.strokeRect.apply(ctx, draw[1]);
                    }
                    if (this.__drawfill){
                        ctx.fillRect.apply(ctx, draw[1]);
                    }
                } else if (type == 'circle') {
                    if (fstyle&&fstyle != 'style') {
                        var arr = [draw[1][0]-draw[1][2],draw[1][1]-draw[1][2],draw[1][2]*2,draw[1][2]*2];
                        ctx.fillStyle = this._gradient(ctx, fill, arr);
                    }
                    ctx.arc.apply(ctx,draw[1]);
                    if (this.__drawline)ctx.stroke();
                    if (this.__drawfill)ctx.fill();
                } else if (type == 'ellipse') {
                    ctx.save();
                    ctx.scale(1,draw[2])
                    ctx.arc.apply(ctx,draw[1]);
                    if (this.__drawline)ctx.stroke();
                    if (this.__drawfill)ctx.fill();
                    ctx.restore();
                }else if(type=='end'){
                    ctx.beginPath();
                }
            }
        }
        if(this._to.length){
            for(var a = 0;a<this._to.length;a++){
                var attr=this._to[a];
                ctx[attr[0]].apply(ctx,attr[1]);
            }
            if (this.__drawline)ctx.stroke();
            if (this.__drawfill)ctx.fill();
        }
        ctx.closePath();
        ctx.restore();
    }
    dsGraphics.prototype._gradient = function (ctx, style, draw) {
        var gradient = null;
        if (style[1] == 'bitmap') {
            gradient = ctx.createPattern(style[2].data, style[4]);
        }else {
            if (style[1] == 'linear') {
                gradient = ctx.createLinearGradient(draw[0], 0, draw[0]+draw[2], 0);
            } else if (style[1] == 'radial'){
                var cx =draw[0]+draw[2]*0.5;
                var cy = draw[1]+draw[3]*0.5;
                var w = Math.min(draw[2],draw[3]);
                gradient = ctx.createRadialGradient(cx, cy, w*0.25, cx, cy,w*0.5);
            }
            var color = style[2];
            var radio = style[4];
            for (var i = 0; i < color.length; i++) {
                gradient.addColorStop(radio[i]/255, color[i]);
            }
        };
        return gradient;
    }

    dsGraphics.prototype._addCode = function (key, param) {
        if (this._code[this._codeindex] == null)
            this._code[this._codeindex] = {};
        this._code[this._codeindex][key] = param;
    }

    dsGraphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        this._addCode("fill", ['gradient', type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio]);
        this.__drawfill = true;

    };
    dsGraphics.prototype.beginBitmapFill = function (bitmapdata, matrix, repeat, smooth) {
        this._addCode('fill', ['bitmap', bitmapdata, matrix, repeat, smooth]);
        this.__drawfill = true;
    }
    /*
     color 只能是8位颜色值
     */
    dsGraphics.prototype.beginFill = function (color, alpha) {
        if (typeof color == "number")color = dsColor.toStr(color);
        this._addCode("fill", ['style', color, alpha || 1]);
        this.__drawfill = true;
    }

    dsGraphics.prototype.lineBitmapStyle = function (bitmapdata, matrix, repeat, smooth) {
        this._addCode('line', ['bitmap', bitmapdata, matrix, repeat, smooth]);
        this.__drawline = true;
    }

    dsGraphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (typeof color == 'number')color = dsColor.toStr(color);
        this._addCode("line", ['style', thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit]);
        this.__drawline = true;
    }

    dsGraphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        this.__drawline = true;
        this._addCode("line", ["gradient", type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio]);
    }

    dsGraphics.prototype.curveTo = function(controlX, controlY, anchorX, anchorY){
        this.__aabb.setXY(controlX, controlY);
        this.__aabb.setXY(anchorX, anchorY);
        this.__drawline = true;
        this._to.push(['quadraticCurveTo',[controlX, controlY,anchorX, anchorY]]);
        //console.log('graphics.curveTo('+controlX.toFixed(2)+","+controlY.toFixed(2)+","+anchorX.toFixed(2)+","+anchorY.toFixed(2)+")")
    }
    dsGraphics.prototype.cubicCurveTo = function(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY){
        this.__aabb.setXY(controlX1, controlY1);
        this.__aabb.setXY(controlX2, controlY2);
        this.__aabb.setXY(anchorX, anchorY);
        this.__drawline = true;
        this._to.push(['bezierCurveTo',[controlX1, controlY1, controlX2, controlY2, anchorX, anchorY]]);
        //console.log('cubic',controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
    }
//贝塞尔曲线轮廓
    dsGraphics.prototype.getCurveBoundary=function (ax, ay, bx, by, cx, cy, dx, dy) {
        var tobx = bx - ax;
        var toby = by - ay;
        var tocx = cx - bx;
        var tocy = cy - by;
        var todx = dx - cx;
        var tody = dy - cy;
        var step = 1 / 40;    // precission
        var d, px, py, qx, qy, rx, ry, tx, ty, sx, sy, x, y, i, minx, miny, maxx, maxy;

        function min(num1, num2) {
            if (num1 > num2)
                return num2;
            if (num1 < num2)
                return num1;
            return num1;
        }

        function max(num1, num2) {
            if (num1 > num2)
                return num1;
            if (num1 < num2)
                return num2;
            return num1;
        }

        for (var i = 0; i < 41; i++) {
            d = i * step;
            px = ax + d * tobx;
            py = ay + d * toby;
            qx = bx + d * tocx;
            qy = by + d * tocy;
            rx = cx + d * todx;
            ry = cy + d * tody;
            var toqx = qx - px;
            var toqy = qy - py;
            var torx = rx - qx;
            var tory = ry - qy;

            sx = px + d * toqx;
            sy = py + d * toqy;
            tx = qx + d * torx;
            ty = qy + d * tory;
            var totx = tx - sx;
            var toty = ty - sy;

            x = sx + d * totx;
            y = sy + d * toty;
            if (i == 0) {
                minx = x;
                miny = y;
                maxx = x;
                maxy = y;
            }
            else {
                minx = min(minx, x);
                miny = min(miny, y);
                maxx = max(maxx, x);
                maxy = max(maxy, y);
            }
        }
        return {x: Math.round(minx), y: Math.round(miny), width: Math.round(maxx - minx), height: Math.round(maxy - miny)};
    }
    dsGraphics.prototype.lineTo = function (x, y) {
        this.__aabb.setXY(x,y);
        this.__drawline = true;
        this._to.push(['lineTo',[x, y]]);
    }
    dsGraphics.prototype.moveTo = function (x, y) {
        this.__aabb.setXY(x,y);
        this.__drawline = true;
        this._to.push(['moveTo',[x, y]]);
    }
    dsGraphics.prototype.clear = function () {
        if(this._to==null)this._to =[];
        this._to.push(['clear',[]]);
    }
    dsGraphics.prototype.endFill = function () {
        this._addCode("draw", ['end']);
        this._codeindex++;
    };
    dsGraphics.prototype.drawCircle = function (x, y, r) {
        this.__aabb.add(new dsAABB(x-r,y-r,x+r,y+r));
        this._addCode("draw", ['circle', [x, y, r, 0, 2 * Math.PI]]);
        this._codeindex++;
    };

    dsGraphics.prototype.drawEllipse = function (x, y, w, h) {
        var hw = w*0.5;
        var hh = h*0.5;
        this._addCode("draw", ['ellipse', [x, y, w,0, 2 * Math.PI],h/w]);
        this._codeindex++;
    };
    dsGraphics.prototype.drawRect = function (x, y, w, h) {
        this.__aabb.add(new dsAABB(x,y,x+w,y+h));
        this._addCode('draw', ['rect', [x, y, w, h]]);
        this._codeindex++;
    }
    dsGraphics.BASE_64 = {"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,"a":26,"b":27,"c":28,"d":29,"e":30,"f":31,"g":32,"h":33,"i":34,"j":35,"k":36,"l":37,"m":38,"n":39,"o":40,"p":41,"q":42,"r":43,"s":44,"t":45,"u":46,"v":47,"w":48,"x":49,"y":50,"z":51,"0":52,"1":53,"2":54,"3":55,"4":56,"5":57,"6":58,"7":59,"8":60,"9":61,"+":62,"/":63};
//AiSo0QCfBQBMCWQBECKgMCvQgMCkhOCeQhNCfh8Bp
    dsGraphics.prototype.decodePath = function(str) {
        var instructions = [this.moveTo, this.lineTo, this.curveTo, this.cubicCurveTo, this.endFill];
        var paramCount = [2, 2, 4, 6, 0];
        var i=0, l=str.length;
        var params = [];
        var x=0, y=0;
        var base64 = dsGraphics.BASE_64;

        while (i<l) {
            var c = str.charAt(i);
            var n = base64[c];
            var fi = n>>3; // highest order bits 1-3 code for operation.
            var f = instructions[fi];
            // check that we have a valid instruction & that the unused bits are empty:
            if (!f || (n&3)) {
                break;
                //throw("bad path data (@"+i+"): "+c);
            }
            var pl = paramCount[fi];
            if (!fi) { x=y=0; } // move operations reset the position.
            params.length = 0;
            i++;
            var charCount = (n>>2&1)+2;  // 4th header bit indicates number size for this operation.
            for (var p=0; p<pl; p++) {
                var num = base64[str.charAt(i)];
                var sign = (num>>5) ? -1 : 1;
                num = ((num&31)<<6)|(base64[str.charAt(i+1)]);
                if (charCount == 3) { num = (num<<6)|(base64[str.charAt(i+2)]); }
                num = sign*num/10;
                if (p%2) { x = (num += x); }
                else { y = (num += y); }
                params[p] = num;
                i += charCount;
            }
            f.apply(this,params);
        }
        return this;
    };

    $s[config.pre+'SharedObject']=dsSharedObject;
    dsSharedObject.type = 'cookie';//session,local/
    function dsSharedObject(){
        this.name ='';
        this.data={};
    }
    dsSharedObject.prototype.flush = function(data){
        if(data){
            if(typeof data =="object"){
                this.data = JSON.stringify(data);
            }else{
                this.data = data;
            }
        }
        dsSharedObject.store.setItem(this.name,this.data);
    }
    dsSharedObject.prototype.clear = function(){
        dsSharedObject.store.removeItem(this.name);
    }
    dsSharedObject.getLocal = function(key){
        // var store = dsSharedObject.save?window.sessionStorage:window.localStorage;
        // var p = store?store.getItem(key):getCookie(key);
        var  p = dsSharedObject.store.getItem(key);
        var s = new dsSharedObject();
        s.data=p;
        s.name = key;
        return s;
    }
    dsSharedObject.store = new CookieStorage();
    dsSharedObject.setType = function (type) {
        switch (type){
            case "cookie":
                dsSharedObject.store =new CookieStorage();
                break;
            case "session":
                dsSharedObject.store = window.sessionStorage;
                break;
            case "local":
                dsSharedObject.store = window.localStorage;
                break;
        }
    }

    function CookieStorage(){}
    CookieStorage.prototype.setItem=function(key,value,time){
        time = time||'';
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    CookieStorage.prototype.removeItem=function(key){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(key);
        if(cval!=null)
            document.cookie= key + "="+cval+";expires="+exp.toGMTString();
    }
    CookieStorage.prototype.getItem = function (key) {
        var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    // function setCookie(name,value,time)
    // {
    //     var strsec = getsec(time);
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() + strsec*1);
    //     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    // }
    function getsec(str)
    {
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
            return str1*1000;
        }
        else if (str2=="h")
        {
            return str1*60*60*1000;
        }
        else if (str2=="d")
        {
            return str1*24*60*60*1000;
        }
    }
    // function delCookie(name)
    // {
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() - 1);
    //     var cval=getCookie(name);
    //     if(cval!=null)
    //         document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    // }
    // function getCookie(name)
    // {
    //     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    //     if(arr=document.cookie.match(reg))
    //         return unescape(arr[2]);
    //     else
    //         return null;
    // }

    function objtoquery(obj){
        var res =""
        for(var s in obj) {
            var v = obj[s];
            if(typeof obj[s] =='object'){
                v= JSON.stringify(obj[s]);
            }
            res+=s+"="+v+"&";
        };
        if(res.length>1){
            res= res.substr(0,res.length-1);
            return res;
        }
        return '';

    }
    function dsRequire(src){
        if (Array.isArray(src)) {
            for (var j = 0; j < src.length; j++) {
                dsRequire(src[j]);
            }
            return;
        }
        var srcs = document.querySelectorAll('script');
        for (var i = 0; i < srcs.length; i++) {
            if (srcs[i].src == src)return;
        }
        var s = document.createElement('script')
        s.src = src;
        document.head.appendChild(s);
        s.onload = function (e) {
            console.log(e)
        }
    }
});