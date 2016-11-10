/**
 * Created by Administrator on 2016/11/10.
 * //����ԭ��

 �»������ԣ�������������ʹ��
 _���»��ߣ���������,����û�е��»���
 __˫�»��ߣ���ԭ�����ԣ�����
 ds��ͷ���࣬����ʹ�õ���
 */
(function(win,fun){
    win.$s||fun(win,function(key,keyfun){
        $s[key]=keyfun(win);
    })
})(window,function(window,exports){
    var $s =window.$s||{};
    window.$s = $s;
    $s.mains=[];
    var config = $s.config ={width:800,height:600,baseURI:'',file:'json'};
    $s.ready=function(main, config) {
        if($s.stage!= null){
            main();
        }else{
            $s.mains.push(main);
        }
        if(typeof config =='string'){
            $s.config.canvas = parseStr(config);
        }else{
            for(var s in config){
                $s.config[s] = config[s];
            }
        }
        window.onload = function () {
            if($s.config.canvas==null){
                var c1 = document.createElement("canvas");
                c1.width = $s.config.width;
                c1.height = $s.config.height;
                document.body.appendChild(c1);
                $s.stage = new dsStage(c1);
            }
            var c2 = document.createElement("canvas");
            c2.style = "display:none";
            document.body.appendChild(c2);
            $s.fdds = c2;
            $s.mains.forEach(function(e){e($s);});
        }
        window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj){
            trace(errorMessage, scriptURI, lineNumber,columnNumber,errorObj)
        }
    }
    var exlist = [];
    $s.export = function(fun){
        if(typeof fun == 'string'){
            var f =exlist[fun];
            if(f==null) throw fun+'not fint in export';
            return f;
        }else{
            exlist[fun.constructor.name] = fun;
            trace(fun.constructor.name)
        }

    }
    function parseStr(str){
        if(typeof str != 'string')return [];
        try{
            var pre =str.substr(0,1);
            if(pre=="#")return [document.getElementById(str.substr(1))];
            if(pre==".")return document.getElementsByClassName(str.substr(1));
            return document.getElementsByTagName(str);
        }catch(e){
            throw 'can not find '+str+' elements';
        }
    }
    window.trace=$s.trace = console.log;

    $s.dsEvent=dsEvent;
    /*
     bubbles:
     ����׶� (EventPhase.CAPTURING_PHASE)��
     Ŀ��׶� (EventPhase.AT_TARGET)��
     ð�ݽ׶� (EventPhase.BUBBLING_PHASE)��
     */
    function dsEvent(type, bubbles, cancelable) {
        this.type = type;
        this._bubbles = bubbles || false;
        this._cancelable = cancelable || false;
        this._currentTarget = null;
        this._target = null;
        this.eventPhase = 0;
        this._stopimmediatepropagation = false;
        this._stoppropagation = false;
    }

    dsEvent.prototype.isDefaultPrevented = function () {

    }
//cancelable ��ֵΪ true �����ʹ�� preventDefault() ��ȡ���¼�
    dsEvent.prototype.preventDefault = function () {

    }
//��ֹ���¼����е�ǰ�ڵ��к����к����ڵ��е��¼����������д���
    dsEvent.prototype.stopImmediatePropagation = function () {
        this._stopimmediatepropagation = true
    }
//�˷�������Ӱ�쵱ǰ�ڵ� (currentTarget) �е��κ��¼�������
    dsEvent.prototype.stopPropagation = function () {
        this._stoppropagation = true;
    }
    dsEvent.initEvent = function (type, bubbles, cancelable) {
        var eve = new dsEvent(type, bubbles, cancelable);
        Object.defineProperties(eve, {
            "cancelable": {
                set: function (v) {
                    this._cancelable = v
                }
            },
            "bubbles": {
                set: function (v) {
                    this._bubbles = v;
                }
            },
            "currentTarget": {
                get: function () {
                    return this._currentTarget;
                }
            },
            "target": {
                get: function () {
                    return this._target;
                }
            }
        });
        return eve;
    }
    dsEvent.ENTER_FRAME = "enter_frame";
    dsEvent.ADDED_TO_STAGE = "addtostage";
    dsEvent.REMOVE_FROM_STAGE = "removefromstage";
    dsEvent.ACTIVATE = "activate";
    dsEvent.BROWSER_ZOOM_CHANGE = "browser_zoom_change";
    dsEvent.CANCEL = "cancel";
    dsEvent.CHANGE = "change";
    dsEvent.CHANNELMESSAGE = "channelMessage"
    dsEvent.CHANNELSTATE = "channelState"
    dsEvent.CLEAR = "clear"
    dsEvent.CLOSE = "close"
    dsEvent.COMPLETE = "complete"
    dsEvent.CONNECT = "connect"
    dsEvent.COPY = "copy"
    dsEvent.DEACTIVATE = "deactivate"
    dsEvent.EXITFRAME = "exitFrame"
    dsEvent.FULLSCREEN = "fullScreen"
    dsEvent.INIT = "init"
    dsEvent.MOUSELEAVE = "mouseLeave"
    dsEvent.OPEN = "open"
    dsEvent.PASTE = "paste"
    dsEvent.REMOVED = "removed"
    dsEvent.RENDER = "render"
    dsEvent.RESIZE = "resize"
    dsEvent.SCROLL = "scroll"
    dsEvent.SELECT = "select"
    dsEvent.SELECTALL = "selectAll"
    dsEvent.SOUNDCOMPLETE = "soundComplete"
    dsEvent.TABCHILDRENCHANGE = "tabChildrenChange";
    $s.dsMouseEvent=dsMouseEvent;
    function dsMouseEvent(type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount) {
        this.type = type
        this.bubbles = bubbles
        this.cancelable = cancelable
        this.altKey = altKey
        this.buttonDown = buttonDown
        this.ctrlKey = ctrlKey
        this.delta = delta
        this.isRelatedObjectInaccessible
        this.localX = localX
        this.localY = localY
        this.movementX = 0;
        this.relatedObject = relatedObject
        this.shiftKey = shiftKey
        this.stageX = 0
        this.stageY = 0
        this.clickCount = clickCount;
        this.commandKey = commandKey
        this.controlKey = controlKey;
    }
    dsMouseEvent.prototype = dsEvent.initEvent();
    dsMouseEvent.prototype.updateAfterEvent = function () {

    }
    dsMouseEvent.CLICK = "click";
    dsMouseEvent.DOUBLE_CLICK = "doubleclick";
    dsMouseEvent.MIDDLE_CLICK = "middleclick";
    dsMouseEvent.MIDDLE_MOUSE_DOWN = "middlemousedown";
    dsMouseEvent.MIDDLE_MOUSE_UP = "middlemouseup";
    dsMouseEvent.MOUSE_DOWN = "mousedown";
    dsMouseEvent.MOUSE_MOVE = "mousemove";
    dsMouseEvent.MOUSE_OUT = "mouseout";
    dsMouseEvent.MOUSE_OVER = "mouseover";
    dsMouseEvent.MOUSE_UP = "mouseup";
    dsMouseEvent.MOUSE_WHEEL = "mousewheel";
    dsMouseEvent.RELEASE_OUTSIDE = "releaseoutside";
    dsMouseEvent.RIGHT_CLICK = "rightclick";
    dsMouseEvent.RIGHT_MOUSE_DOWN = "rightmousedown";
    dsMouseEvent.RIGHT_MOUSE_UP = "rightmouseup";
    dsMouseEvent.ROLL_OUT = "rollout";
    dsMouseEvent.ROLL_OVER = "rollover";
    $s.dsKeyboardEvent=dsKeyboardEvent;
    dsKeyboardEvent.prototype = dsEvent.initEvent();
    function dsKeyboardEvent(type, bubbles, cancelable, charCodeValue, keyCodeValue, keyLocationValue, ctrlKeyValue, altKeyValue, shiftKeyValue, controlKeyValue, commandKeyValue) {
        this.type = type
        this.bubbles = bubbles
        this.cancelable = cancelable
        this.altKey = altKeyValue
        this.charCode = charCodeValue
        this.ctrlKey = ctrlKeyValue
        this.keyCode = keyCodeValue
        this.keyLocation = keyLocationValue
        this.shiftKey = shiftKeyValue
    }

    dsKeyboardEvent.KEY_DOWN = "keydown";
    dsKeyboardEvent.KEY_UP = "keyup";
    $s.dsFocusEvent=dsFocusEvent;
    dsFocusEvent.prototype = dsEvent.initEvent();
    function dsFocusEvent(type, bubbles, cancelable, relatedObject, shiftKey, keyCode, direction) {
        this.type = type;
        this._bubbles = bubbles || false;
        this._cancelable = cancelable || false;
        this._currentTarget = null;
        this.relatedObject = relatedObject;
        this.shiftKey = shiftKey;
        this.keyCode = keyCode;
        this.direction = direction;
    }
    dsFocusEvent.FOCUS_IN = "focusIn"
    dsFocusEvent.FOCUS_OUT = "focusOut "
    dsFocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange"
    dsFocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange"

    var utils= {
            uid:0,
            UUID: function (){return Math.random().toString(36).substr(2)+(this.uid++);},
            INTERACTIVEEVENT: [dsEvent.ENTER_FRAME,],
            MOUSE: [dsFocusEvent.FOCUS_IN, dsFocusEvent.FOCUS_OUT, dsFocusEvent.KEY_FOCUS_CHANGE, dsFocusEvent.MOUSE_FOCUS_CHANGE, dsMouseEvent.ROLL_OVER, dsMouseEvent.ROLL_OUT, dsMouseEvent.RIGHT_MOUSE_UP, dsMouseEvent.RIGHT_MOUSE_DOWN, dsMouseEvent.RIGHT_CLICK, dsMouseEvent.RELEASE_OUTSIDE, dsMouseEvent.MOUSE_WHEEL, dsMouseEvent.MOUSE_UP, dsMouseEvent.MOUSE_OVER, dsMouseEvent.CLICK, dsMouseEvent.DOUBLE_CLICK, dsMouseEvent.MIDDLE_CLICK, dsMouseEvent.MIDDLE_MOUSE_DOWN, dsMouseEvent.MIDDLE_MOUSE_UP, dsMouseEvent.MOUSE_DOWN, dsMouseEvent.MOUSE_MOVE, dsMouseEvent.MOUSE_OUT],
            KEY: [dsKeyboardEvent.KEY_DOWN, dsKeyboardEvent.KEY_UP]
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
            if(vb.constructor ==parent.prototype.constructor)return true;
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
     ����16λ��ɫֵ
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
     16λ��ɫֵת��Ϊ16λ��ɫ�ַ���
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
    $s.dsByteArray=dsByteArray;
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
//�ڵ�һ��ԭ�Ӳ����У������ֽ������е�һ������ֵ����һ������ֵ���бȽϣ��������ƥ�䣬����Щ�ֽ�����һ��ֵ���н�����
    dsByteArray.prototype.atomicCompareAndSwapLength = function (expectedLength, newLength) {
        if (this.length == expectedLength) {
            this.length = newLength;
        }
        return this.length;
    }
//�ڵ�һ��ԭ�Ӳ����У������ֽ�����ĳ��������ṩ��һ��ֵ���бȽϣ��������ƥ�䣬����Ĵ��ֽ�����ĳ��ȡ�
    dsByteArray.prototype.clear = function () {
        this.__data = new Uint8Array(1);
        this.length = 0;
    };
//����ֽ���������ݣ����� length �� position ��������Ϊ 0��
    dsByteArray.prototype.compress = function (algorithm) {

    }
//	ѹ���ֽ����顣
    dsByteArray.prototype.deflate = function () {

    }
//ʹ�� deflate ѹ���㷨ѹ���ֽ����顣
    dsByteArray.prototype.inflate = function () {

    }
//ʹ�� deflate ѹ���㷨���ֽ������ѹ����
    dsByteArray.prototype.readBoolean = function () {
        return Boolean(this.__data[this.position++]);
    }
//���ֽ����ж�ȡ����ֵ��
    dsByteArray.prototype.readByte = function () {
        return this.__data[this.position++] - 128;
    }
//���ֽ����ж�ȡ�����ŵ��ֽڡ�
    dsByteArray.prototype.readBytes = function (bytes, offset, length) {
        var l = this.__data.subarray(offset, offset + length);
        bytes.__data.set(l);
        bytes.length = length;
    }

//���ֽ����ж�ȡ length ����ָ���������ֽ�����
//ָ������Exponent ��E��     : 11bit      ��b62-b52��//
//β������Mantissa   ��M��   : 52bit      ��b51-b0��
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

//ָ������Exponent ��E��      : 8bit       ��b30-b23��
//β������Mantissa   ��M��    : 23bit     ��b22-b0��
//���ֽ����ж�ȡһ�� IEEE 754 ˫���ȣ�64 λ����������
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
//���ֽ����ж�ȡһ�� IEEE 754 �����ȣ�32 λ����������
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
//���ֽ����ж�ȡһ�������ŵ� 32 λ������
    dsByteArray.prototype.readMultiByte = function (length, charSet) {
        var str = '';
        for (var i = 0; i<length; i++) {
            str += String.fromCharCode(this.__data[this.position]);
            this.position++
        }
        return unescape(str);
    }
//ʹ��ָ�����ַ������ֽ����ж�ȡָ�����ȵĶ��ֽ��ַ�����
    dsByteArray.prototype.readObject = function () {
        var s = '';
        while (this.__data[this.position] != 0) {
            s += String.fromCharCode(this.__data[this.position]);
            this.position++;
        }
        this.position++;
        s = JSON.parse(s);
        if (s instanceof Array) return s;
        var obj = eval("new " + s.class + "()");
        for (var k in s) {
            obj[k] = s[k];
        }
        return obj;
    }

    dsByteArray.prototype.readShort = function () {
        return this.__data[this.position] | this.__data[this.position + 1] << 8
    }
//���ֽ����ж�ȡһ�������ŵ� 16 λ������
    dsByteArray.prototype.readUnsignedByte = function () {

    }
//���ֽ����ж�ȡ�޷��ŵ��ֽڡ�
    dsByteArray.prototype.readUnsignedInt = function () {
        var s = this.__data[this.position];
        s = this.__data[this.position + 1] << 8 | s;
        s = this.__data[this.position + 2] << 16 | s;
        s = this.__data[this.position + 3] << 24 | s;
        return s;
    }
//���ֽ����ж�ȡһ���޷��ŵ� 32 λ������
    dsByteArray.prototype.readUnsignedShort = function () {
        var s = this.__data[this.position];
        s = this.__data[this.position + 1] << 8 | s;
        s = this.__data[this.position + 2] << 16 | s;
        s = this.__data[this.position + 3] << 24 | s;
        return s;
    }
//���ֽ����ж�ȡһ���޷��ŵ� 16 λ������
    dsByteArray.prototype.readUTF = function () {
        var str = '';
        for (var i = 0; i < 16; i++) {
            str += String.fromCharCode(this.__data[this.position]);
            this.position++;
        }
        return unescape(str);
    }
//���ֽ����ж�ȡһ�� UTF-8 �ַ�����
    dsByteArray.prototype.readUTFBytes = function (length) {
        var str = '';
        for (var i = 0; i < length; i++) {
            str += String.fromCharCode(this.__data[i]);
        }
        return unescape(str);
    }
//���ֽ����ж�ȡһ���� length ����ָ���� UTF-8 �ֽ����У�������һ���ַ�����
    dsByteArray.prototype.toJSON = function (k) {

    }
//�ṩһ�ֿɸ��ǵķ����������� dsByteArray �������Զ���ֵ�� JSON ���롣
    dsByteArray.prototype.toString = function () {

    }
//���ֽ�����ת��Ϊ�ַ�����
    dsByteArray.prototype.uncompress = function (algorithm) {

    }
//��ѹ���ֽ����顣
    dsByteArray.prototype.writeBoolean = function (value) {
        this.__data.fill(value, this.position, this.position + 1);
        this.position++;
    }
//д�벼��ֵ��
    dsByteArray.prototype.writeByte = function (value) {
        if (value >= -128 && value < 127) {
            value += 128
            this.__data.fill(value, this.position, this.position + 1);
            this.position++;
        } else {
            throw 'wrong writeByte'
        }

    }
//���ֽ�����д��һ���ֽڡ�
//������ָ���ֽ����顢�ֽ�������ʼƫ�ƣ���������������ֽڵĳ����ֽ�������д���ֽ�����
    dsByteArray.prototype.writeBytes = function (bytes, offset, length) {
        var l = bytes.__data.subarray(offset, offset + length);
        this.__data.set(l);
        this.length += length;
    }

//���ֽ�����д��һ�� IEEE 754 ˫���ȣ�64 λ����������
//ָ������Exponent ��E��     : 11bit      ��b62-b52��//
//β������Mantissa   ��M��   : 52bit      ��b51-b0��
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

//ָ������Exponent ��E��      : 8bit       ��b30-b23��
//β������Mantissa   ��M��    : 23bit     ��b22-b0��
//���ֽ�����д��һ�� IEEE 754 �����ȣ�32 λ����������
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
//���ֽ�����д��һ�������ŵ� 32 λ������
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
//ʹ��ָ�����ַ��������ֽ��ַ���д���ֽ�����
    dsByteArray.prototype.writeMultiByte = function (value, charSet) {
        var e = escape(value);
        for (var i = 0; i<e.length;i++) {
            this.__data[this.position] = e[i].charCodeAt();
            this.position++;
        }
        return e.length;
    }
//�������� AMF ���л���ʽд���ֽ����顣
    dsByteArray.prototype.writeObject = function (object) {
        if (object instanceof Array) {

        } else {
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
//���ֽ�����д��һ�� 16 λ������
    dsByteArray.prototype.writeShort = function (value) {
        if (value > 65280)throw 'wrong writeShort';
        this.__data[this.position] = value & 255;
        if (value > 255)this.__data[this.position + 1] = (value & 65280) >> 8;
        else this.__data[this.position + 1] = 0;
        this.position += 2;
    }
//���ֽ�����д��һ���޷��ŵ� 32 λ������
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
//�� UTF-8 �ַ���д���ֽ�����
    dsByteArray.prototype.writeUTFBytes = function (value) {
        var e = escape(value);
        for (var i = 0; i < e.length; i++) {
            this.__data[i] = e[i].charCodeAt();
            this.position++;
        }
    }
    
    $s.dsRectangle=dsRectangle;
    function dsRectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
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
     �����ཻ�ľ���
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
     �ж��Ƿ��ཻ
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
    dsAABB.prototype.inflate=function(x,y){
        this.x1 +=x;
        this.y1 +=y;
        this.x2 +=x;
        this.y2 +=y;
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
    $s.dsPoint=dsPoint;
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
//�ڲ�ֵ ����֤
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
    $s.dsMatrix=dsMatrix;
    function dsMatrix(a, b, c, d, tx, ty) {
        //this.a =1//   ˮƽ���Ż�ͼ
        //this.b=0// 	ˮƽ��б��ͼ
        //this.c=1// 	��ֱ��б��ͼ
        //this.d =1// 	��ֱ���Ż�ͼ
        //this.tx=0// 	ˮƽ�ƶ���ͼ
        //this.ty=0// 	��ֱ�ƶ���ͼ
        this.setTo(a, b, c, d, tx, ty);
    }

    dsMatrix.prototype.clone = function () {
        return new dsMatrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
    }
//������
//��ĳ�������뵱ǰ�������ӣ��Ӷ�������������ļ���Ч����Ч�ؽ����һ��
    dsMatrix.prototype.concat = function (matrix) {
        this.append(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
        return this;

    }
//��Դ dsPoint �����е����о������ݸ��Ƶ����÷� dsMatrix �����С�
    dsMatrix.prototype.copyFrom = function (matrix) {
        this.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
//�����������š���ת��ת���Ĳ�����
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
        this.a *= sx;
        this.b *= sx;
        this.c *= sy;
        this.d *= sy;
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
//����ִ�б���д�ĺ���,paramArr
//    dsEventDispatcher.prototype.__recall = function (key, paramArr, parent) {
//        var pn = parent;
//        if (this.__oldfun[pn][key]) {
//            if (paramArr instanceof Array) {
//                return this.__oldfun[pn][key].apply(this, paramArr);
//            } else {
//                return this.__oldfun[pn][key].call(this, paramArr);
//            }
//        }
//    }
    dsEventDispatcher.prototype.__call = function (parent,key,paramArr) {
        paramArr=paramArr||[];
        if(parent.prototype[key]==null)
            trace(1)
        return parent.prototype[key].apply(this,paramArr);
    }
    dsEventDispatcher.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
        if (this.__events[type] == null)this.__events[type] = Array();
        this.__events[type].push(listener);
    }

    dsEventDispatcher.prototype.dispatchEvent = function (event) {
        if (dsChildOf(event,dsEvent)) {
            event.currentTarget = this;
            var a = this.__events[event.type];
            for (var i in a) {
                a[i].call(this, event);
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

    $s.dsDisplayObject =dsDisplayObject;
    function dsDisplayObject() {
        dsExtend(dsDisplayObject,dsEventDispatcher);
        var obj = new dsDisplayObject.prototype.__init();
        Object.defineProperties(obj, {
            "x":{
                set:function(v){
                    this._x = v;
                    this._mat.translate(this._x,this._y);
                },get:function(){
                    return this._x;
                }
            },
            "y":{
                set:function(v){
                    this._y = v;
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
                    if(this._graphics)
                    {
                        var w=this._graphics.__aabb.width();
                        this._width = this._width>=w?this._width:w;
                    }
                    return this._width;
                }
            },
            'height':{
                set:function(v){
                    this._height =v;
                },get:function(){
                    if(this._graphics)
                    {
                        var w=this._graphics.__aabb.height();
                        this._height = this._height>=w?this._height:w;
                    }
                    return this._height;
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
                    this._rotation = v;
                    this._mat.rotate(v);
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
        this.cacheAsBitmap = false;//������ʾ������ڲ�λͼ��ʾ��ʽ��
        this.stage = null;
        this._graphics = null;
        this.filters = [];
        this._mat = new dsMatrix().identity();
        this.__aabb = new dsAABB();
    }
    dsDisplayObject.prototype.__init.prototype = new dsEventDispatcher;
//ѭ��ͼ����Ⱦ����
    dsDisplayObject.prototype.__render = function (ctx) {
        if (!this.visible || this._ismask)return false;
        if(this.cacheAsBitmap){
            //λͼ����
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
//ѭ������ҵ���߼��ĺ���
    dsDisplayObject.prototype.__frame = function () {
        if(!this.visible) return false;
        this.dispatchEvent(new dsEvent(dsEvent.ENTER_FRAME, false, false));
        return true;
    }

    dsDisplayObject.prototype.getBounds = function (displayObject) {
        //δ������ת
        var lw = this._graphics ? this._graphics["lineWidth"] : 0;
        var rect=this.getRect(displayObject)
        return new dsRectangle(rect.x, rect.y, rect.width + lw, rect.height + lw);
    }

    dsDisplayObject.prototype.getRect = function (displayObject) {
        //�Ƚ���getBounds ,�˷���������linestyle��
        var p=displayObject._mat.transformPoint(new dsPoint(this.x,this.y))
        return new dsRectangle(p.x, p.y, this.width, this.height);
    }
    dsDisplayObject.prototype.hitTestObject = function (displayObject) {
        var r1 = this.__AABB();
        var r2 = displayObject.__AABB();
        return r1.instersects(r2);
    }
//point ȫ������
    dsDisplayObject.prototype.hitTestPoint = function (dx,dy,shapeFlag) {
        shapeFlag =shapeFlag||false;
        var ab = this.__AABB();
        var bool = ab.contains(dx,dy);
        if(shapeFlag&&bool){
            var m= this.__ctxToData();
            $s.stage.__ctx2d.putImageData(m,0,0);
            dx -=ab.x1,dy-=ab.y1;
            var index= (dy*m.width+dx)*4;
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

    dsDisplayObject.prototype.__ctxToData = function () {
        var ab = this.__AABB();
        $s.fdds.width = ab.x2;
        $s.fdds.height = ab.y2;
        var fbc = $s.fdds.getContext("2d");
        fbc.clearRect(0,0,this.width,this.height);
        this.__render(fbc);
        return fbc.getImageData(ab.x1,ab.y1,ab.width(), ab.height());
    }
    dsDisplayObject.prototype.__AABB = function () {
        var p1 = this.localToGlobal(new dsPoint(0,0));
        var p2=this.localToGlobal(new dsPoint(this.width,0));
        var p3=this.localToGlobal(new dsPoint(this.width,this.height));
        var p4=this.localToGlobal(new dsPoint(0,this.height));
        var ab = this.__aabb.clone();
        ab.setXY(p1.x, p1.y);
        ab.setXY(p2.x, p2.y);
        ab.setXY(p3.x, p3.y);
        ab.setXY(p4.x, p4.y);
        return ab;
    }
    $s.dsInteractiveObject=dsInteractiveObject;
    function dsInteractiveObject() {
        dsExtend(dsInteractiveObject,dsDisplayObject);
        //����¼�Ŀ��׶�
        return new dsInteractiveObject.prototype.__init();
    }
    dsInteractiveObject.prototype.__init=function(){
        this.doubleClickEnabled = false;
        this.mouseEnabled = true;
        this._befocus = false;
        this.__activeType = utils.INTERACTIVEEVENT.concat(utils.MOUSE).concat(utils.KEY);
        this.__mouseType = utils.MOUSE;
        this.__keyType = utils.KEY;
        this.__activeEvent = new Object();
        this.__mouseEvent = new Object();
        this.__keyEvent = new Object();
    };
    dsInteractiveObject.prototype.__mouseaction = function (event) {
        var evs = this.__activeEvent[event.type];
        if(evs==null)return
        var p = this.globalToLocal(new dsPoint(event.offsetX,event.offsetY));
        var mev = new dsMouseEvent(event.type, 1, event.cancelable, p.x, p.y, this, event.ctrlKey, event.altKey, event.shiftKey, event.button, event.detail, false, false,1);
        mev.stageX=event.offsetX;
        mev.stageY=event.offsetY;
        mev._currentTarget = this;
        if(dsChildOf(this,dsDisplayObjectContainer)){
            var c = this.getObjectsUnderPoint(mev.stageX, mev.stageY);
            if (c.length)mev.target = c[0];
        }else mev.target = this;
        for (var i = 0; i < evs.length; i++) {
            if (mev._stoppropagation) return;//ȡ����������Ϊ
            evs[i]["fun"].call(this, mev);
            this.__eventaction(evs[i]["param"][0], mev);
        }
    };
    //�����¼�
    dsInteractiveObject.prototype.__keyaction = function (event) {
        var evs = this.__activeEvent[event.type];
        var mev = new dsKeyboardEvent(event.type, event.bubbles);
        mev._currentTarget = this;
        for (var i = 0; i < evs.length; i++) {
            if (mev._stoppropagation) return;//ȡ����������Ϊ
            evs[i]["fun"].call(this, mev);
            this.__eventaction(evs[i]["param"][0], mev);
        }
    };
    //�¼���ð�ݣ���ץ
    dsInteractiveObject.prototype.__eventaction = function (useCapture, event) {
        if (event._stopimmediatepropagation)return;
        var pare =this.parent;
        var arr = [];
        while (pare) {
            arr.push(pare);
            pare=pare.parent;
        }

        if (useCapture) {
            //ð��
            for (var i = 0; i < arr.length; i++) {
                event._target = arr[i]
                arr[i].dispatchEvent(event);
            }
        } else {
            //��ץ
            for (var i = arr.length-1; i >0; i--) {
                event._target = arr[i];
                arr[i].dispatchEvent(event);
            }
        }
    };
    /*
     useCapture == true ð�� false ��ץ Ĭ�� false
     priority ��ѡ��
     */
    dsInteractiveObject.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
        //���������¼��ļ�������
        if (this.__activeType.indexOf(type) != -1) {
            ////����¼��ļ�������
            var self = this;
            var fun = null;
            if (self.__mouseType.indexOf(type) != -1) {
                fun = function (event) {
                    if(self ==$s.stage){
                        return stage.__mouseaction(event);
                    }
                    var child = $s.stage.getObjectsUnderPoint(new dsPoint(event.offsetX, event.offsetY));
                    if (child.length > 0) {
                        if (self == child[0]) {
                            self.__mouseaction(event);
                        }
                    }
                }
            } else if (self.__keyType.indexOf(type) != -1) {
                fun = function (event) {
                    if ($s.stage.focus == self) {
                        self.__keyaction(event);
                    }
                }
            }

            if (this.__activeEvent[type] == null) {
                this.__activeEvent[type] = [];
                $s.stage.__canvas.addEventListener(type, fun);
                $s.stage.__mainevent.push({type:type,fun:fun});
            }
            var obj = {"fun": listener, "param": [useCapture, priority, useWeakReference]}
            this.__activeEvent[type].push(obj);
            this.__activeEvent[type].sort(function (e1, e2) {
                return e1["param"][1] > e2["param"][1]
            })
        } else {
            this.__call(dsEventDispatcher,"addEventListener",[type, listener, useCapture, priority, useWeakReference]);
        }
    };
    dsInteractiveObject.prototype.removeEventListener = function (type, listener) {
        if (this.__activeType.indexOf(type) != -1) {
            var ts = this.__activeEvent[type];
            for (var i in ts) {
                if (ts[i]['fun'] == listener) {
                    ts.splice(i, 1);
                    if (ts.length <= 0) {
                        var me=$s.stage.__mainevent;
                        for(var i=0;i<me.length;i++){
                            if(me[i].type == type){
                                $s.stage.__canvas.removeEventListener(me[i].type,me[i].fun)
                                me.splice(1,i);
                                break;
                            }
                        }
                        delete  this.__activeEvent[type];
                    }
                }
            }
        } else {
            this.__call(dsEventDispatcher,"removeEventListener", [type,listener]);
        }
    };
    dsInteractiveObject.prototype.dispatchEvent = function (event) {
        if (this.__activeType.indexOf(event.type) != -1) {
            var a = this.__activeEvent[event.type];
            if (a == null)return
            event.currentTarget = this;
            for (var i in a) {
                a[i]["fun"].call(this, event);
            }
        } else {
            this.__call(dsEventDispatcher,"dispatchEvent", [event]);
        }
    };
    dsInteractiveObject.prototype.hasEventListener = function (type) {
        if (type in this.__activeType)
            return this.__activeEvent[type];
        else {
            this.__call(dsEventDispatcher,"hasEventListener", [type]);
        }
        return false;
    };
    $s.dsDisplayObjectContainer=dsDisplayObjectContainer
    function dsDisplayObjectContainer() {
        dsExtend(dsDisplayObjectContainer, dsInteractiveObject);
        return new dsDisplayObjectContainer.prototype.__init();
    }
    dsDisplayObjectContainer.prototype.__init= function(){
        this.mouseChildren = true;
        this.numChildren = 0;
        this.__children = Array();//�����Ӷ���
        this.__namechildren = Array();//�����Ӷ������ƣ�ÿ�������������Ψһֵ��
    }
    dsDisplayObjectContainer.prototype.__frame = function(){
        if(this.__call(dsDisplayObject,"__frame")){
            for (var i in this.__children) {
                this.__children[i].__frame();
            }
        }
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
        var index = this.__children.push(displayObject);
        this.numChildren++;
        this.__namechildren[displayObject.name] = index;
        displayObject.parent = this;
        displayObject.stage = $s.stage;
        displayObject.dispatchEvent(new dsEvent(dsEvent.ADDTOSTAGE));
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
        this.__namechildren[displayObject.name] = index;
        this.numChildren++;
        displayObject.parent = this;
        displayObject.stage = $s.stage;
        displayObject.dispatchEvent(new dsEvent(dsEvent.REMOVE_FROM_STAGE));
    };
    dsDisplayObjectContainer.prototype.contains = function (displayObject) {
        return this.__children[this.__namechildren[displayObject.name]-1];
    };
    dsDisplayObjectContainer.prototype.getChildAt = function (index) {
        return this.__children[index];
    };
    dsDisplayObjectContainer.prototype.getChildByName = function (name) {
        return this.__children[this.__namechildren[name]-1];
    };
    dsDisplayObjectContainer.prototype.getChildIndex = function (displayobject) {
        return this.__namechildren[displayobject.name]-1;
    };
    /*
     �÷���ֻ���� displayobject ����
     */
    dsDisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        var arr = [];
        for (var i = this.__children.length - 1; i >= 0; i--) {
            if (this.__children[i].hitTestPoint(point.x,point.y,true)) {
                if (dsChildOf(this.__children[i], dsDisplayObjectContainer)) {
                    arr = arr.concat(this.__children[i].getObjectsUnderPoint(point));
                }
                arr.push(this.__children[i]);
            }
        }
        return arr;
    };
    dsDisplayObjectContainer.prototype.removeChild = function (displayobject) {
        var index = this.__namechildren[displayobject.name];
        delete this.__namechildren[displayobject.name];
        delete this.__children[index];
        this.numChildren--;
        displayObject.parent = null;
        displayObject.stage = null;
        //displayObject.dispatchEvent(new dsEvent(dsEvent.ADDTOSTAGE));
        return displayobject;
    };
    dsDisplayObjectContainer.prototype.removeChildAt = function (index) {
        var displayObject = this.__children[index];
        delete this.__children[index];
        delete this.__namechildren[dis.name];
        this.numChildren--;
        displayObject.parent = null;
        displayObject.stage = null;
        //displayObject.dispatchEvent(dsEvent.ADDTOSTAGE);
        return displayObject;
    };

    dsDisplayObjectContainer.prototype.setChildIndex = function (displayobject, index) {
        if (displayobject.parent)
            displayobject.parent.removeChild(displayobject);
        this.addChildAt(displayobject, index);
    };

    dsDisplayObjectContainer.prototype.swapChildren = function (displayobject1, displayobject2) {
        var t = this.__namechildren[displayobject1.name];
        this.__namechildren[displayobject1.name] = this.__namechildren[displayobject2.name];
        this.__namechildren[displayobject2.name] = t;
        this.__children[this.__namechildren[displayobject1.name]] = displayobject1;
        this.__children[this.__namechildren[displayobject2.name]] = displayobject2;
    }
    dsDisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
        var dis = this.__children[index1];
        this.__children[index1] = this.__children[index2];
        this.__children[index2] = dis;
        this.__namechildren[this.__children[index1].name] = index1;
        this.__namechildren[this.__children[index2].name] = index2;
    };
    dsDisplayObjectContainer.prototype.__AABB = function () {
        var ab  =this.__call(dsDisplayObject,"__AABB");
        for (var i = 0; i < this.__children.length; i++) {
            var a = this.__children[i].__AABB().clone();
            ab.add(a);
        }
        return ab;
    }

//��Ⱦ��������
    function dsStage(canvas) {
        dsExtend(dsStage, dsDisplayObjectContainer);
        // ֻ�����û�����ȫ���¼�����ꡢ���̴���
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
        this.__mainevent=[];//�������¼�����
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
        this.stage = window;
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

        window.addEventListener(dsMouseEvent.MOUSE_MOVE, function (e) {
            self._mouseX = e.clientX;
            self._mouseY = e.clientY;
        })
    };
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
        } else if (state == "NORMAL") {
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
    dsStage.prototype.invalidate = function () {
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
    //������̨������Ϊ��
    dsStage.prototype.reset = function(){
        this.name = "Stage";
        //this.__fb = null;
        //this.__canvas = canvas;
        //this.__ctx2d = canvas.getContext("2d");
        this._color = "#fff";
        this._focus = null;
        this._frameRate = 30;
        this.fullScreenHeight = 0;
        this.fullScreenWidth = 0;
        this.fullScreenSourceRect;
        this.mouseLock = false;
        this.quality = 1;
        this.scaleMode = "StageScaleMode.EXACT_FIT";
        //this._stageHeight = canvas.height;
        //this._stageWidth = canvas.width;
        this.stage = window;
        this.__et = 0;
        this.__bt = 0;
        //this.__pt = parseInt(1000 / this._frameRate);
        this.__namechildren =[];
        this.__children =[];
        this.numChildren =0;
        this.__events=[];
        for(var i =0;i<this.__mainevent.length;i++){
            var op=this.__mainevent[i];
            this.__canvas.removeEventListener(op.type,op.fun);
        }
        this.__mainevent=[]
    }
    dsStage.prototype.__render = function (ctx) {
        this.__ctx2d.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.__ctx2d.fillStyle = this.color;
        this.__ctx2d.fillRect(0, 0, this.stageWidth, this.stageHeight);
        //this.__recall("__render", [ctx], dsStage.__super);
        for (var i = 0; i < this.__children.length; i++) {
            ctx.save();
            this.__children[i].__render(ctx);
            ctx.restore();
        }
    }
//��ʾ����
    $s.dsSprite =dsSprite
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
        this.__drag = {"lock": lockCenter, 'rect': rectangle.clone()};
    }
    dsSprite.prototype.stopDrag = function () {
        this.__drag = null;
    }
    dsSprite.prototype.__frame = function () {
        if(this.__call(dsDisplayObjectContainer,"__frame")){
            if (this.__drag) {
                if (this.__drag['lock']) {
                    this.x = this.mouseX - this.width * 0.5;
                    this.y = this.mouseY - this.height * 0.5;
                } else {
                    this.x = this.mouseX;
                    this.y = this.mouseY;
                }
                if (this.__drag['rect']) {
                    var r = this.__drag['rect'];
                    if (this.x < r.x)this.x = r.x;
                    if (this.x > r.topLeft.x)this.x = r.topLeft.x;
                    if (this.y < r.y)this.y = r.y;
                    if (this.y > r.bottomRight.y) this.y = r.buttonDown.y;
                }
                if (this.dropTarget) {
                    if (this.hitTestObject(this.dropTarget)) {
                        this.dropTarget.addChild(this);
                    }
                }
            }
        }
    }
    $s.dsBitmap=dsBitmap;
    function dsBitmap(bitmapData, pixelSnapping, smoothing) {
        dsExtend(dsBitmap, dsDisplayObject);
        return new dsBitmap.prototype.__init(bitmapData, pixelSnapping, smoothing);
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

    $s.dsBitmapData = dsBitmapData;
    function BitmapData(w, h, transparent, fillcolor) {
        var obj = new dsBitmapData(w, h, transparent, fillcolor);
        Object.defineProperties(obj, {
            width: {
                get: function () {
                    return this._width
                }
            },
            height: {
                get: function () {
                    return this._height
                }
            },
            rect: {
                get: function () {
                    return this.__rect
                }
            }
        })
        return obj;
    }

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
        this._imgdata = $s.stage.__ctx2d.createImageData(w, h);
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
//alphaBitmapData, alphaPoint, mergeAlpha ������ĸ�������ʱ��ʵ��
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
//secondBitmapDataPoint,secondAlphaThreshold,secondObject ��ֵ�� BitmapData ����ʱʹ�ô˲�����
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
//�˺�����Դ�� createjs.BitmapData;
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

    $s.dsTextField=dsTextField;
    function dsTextField() {
        dsExtend(dsTextField, dsInteractiveObject);
        var text = new dsTextField.prototype.__init();
        Object.defineProperties(text, {
            "text": {
                set: function (v) {
                    this._text = this.maxChars ? v.substr(0, this.maxChars) : v;
                    this._length = this._text.length;
                    this._chapters = [];
                    if (this.displayAsPassword) {
                        this._chapters.push(new dsTextChapter(this, '******'));
                    } else {
                        if (this.multiline) {
                            this.textWidth = 0;
                            var a = this._text.split('\n');//���з���
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
                    //    this.addEventListener(dsMouseEvent.CLICK, this._sproxy)
                    //} else {
                    //    this.removeEventListener(dsMouseEvent.CLICK, this._sproxy);
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
        //�������Ϊ true ���ı��ֶ�û�н��㣬Flash Player ���Ի�ɫͻ����ʾ�ı��ֶ��е���ѡ���ݡ�
        //antiAliasType : String
        //���ڴ��ı��ֶε�����������͡�
        this.autoSize = 'none';//left,right,center
        //�����ı��ֶε��Զ���С�����Ͷ��롣
        this.background = false;
        //ָ���ı��ֶ��Ƿ���б�����䡣
        this.backgroundColor = "#00ffff"
        //�ı��ֶα�������ɫ��
        this.border=false;//: Boolean
        //ָ���ı��ֶ��Ƿ���б߿�
        this.borderColor="#ff0000" //: uint
        //�ı��ֶα߿����ɫ��
        //bottomScrollV : int
        //	[ֻ��] һ���������� 1 ��ʼ������������ʾָ���ı��ֶ��е�ǰ���Կ��������һ�С�
        //caretIndex : int
        //	[ֻ��] ����㣨��ţ�λ�õ�������
        //condenseWhite : Boolean
        //һ������ֵ��ָ���Ƿ�ɾ������ HTML �ı����ı��ֶ��еĶ���հף��ո񡢻��з��ȵȣ���
        this.defaultTextFormat = new dsTextFormat();
        //ָ��Ӧ�����²����ı������磬�û�������ı���ʹ�� replaceSelectedText() ����������ı����ĸ�ʽ��
        this.displayAsPassword = false;
        //ָ���ı��ֶ��Ƿ��������ı��ֶΡ�
        //embedFonts : Boolean
        //ָ���Ƿ�ʹ��Ƕ�������������г��֡�
        //gridFitType : String
        //���ڴ��ı��ֶε�����̶����͡�
        this._htmlText = '';
        //�����ı��ֶ����ݵ� HTML ��ʾ��ʽ��
        this._length = 0;
        //	[ֻ��] �ı��ֶ��е��ַ�����
        this.maxChars = 0;
        //�ı��ֶ������ɰ������ַ��������û�������ַ�������
        //maxScrollH : int
        //	[ֻ��] scrollH �����ֵ��
        //maxScrollV : int
        //	[ֻ��] scrollV �����ֵ��
        //mouseWheelEnabled : Boolean
        //һ������ֵ����ʾ���û�����ĳ���ı��ֶβ�����������ʱ��Flash Player �Ƿ��Զ����������ı��ֶΡ�
        this.multiline = false;
        //��ʾ�ֶ��Ƿ�Ϊ�����ı��ֶΡ�
        this.numLines = 0;
        //	[ֻ��] ��������ı��ֶ��е��ı�������
        this.restrict = '';
        //��ʾ�û������뵽�ı��ֶ��е��ַ�����
        //scrollH : int
        //��ǰˮƽ����λ�á�
        //scrollV : int
        //�ı����ı��ֶ��еĴ�ֱλ�á�
        this.selectable = true;
        //һ������ֵ����ʾ�ı��ֶ��Ƿ��ѡ��
        this._selectionBeginIndex = 0;
        //	[ֻ��] ��ǰ��ѡ�����е�һ���ַ����㿪ʼ���ַ�����ֵ��
        this._selectionEndIndex = 0;
        //	[ֻ��] ��ǰ��ѡ���������һ���ַ����㿪ʼ���ַ�����ֵ��
        //sharpness : Number
        //���ı��ֶ������ͱ�Ե�������ȡ�
        //styleSheet : StyleSheet
        //����ʽ�����ӵ��ı��ֶΡ�
        this._text = "";
        //��Ϊ�ı��ֶ��е�ǰ�ı����ַ�����
        this.textColor = "#000";
        //�ı��ֶ����ı�����ɫ������ʮ�����Ƹ�ʽ����
        this.textHeight = 0;
        //	[ֻ��] �ı��ĸ߶ȣ�������Ϊ��λ��
        //textInteractionMode : String
        //	[ֻ��] ����ģʽ���ԣ�Ĭ��ֵΪ TextInteractionMode.NORMAL��
        this.textWidth = 0;
        //	[ֻ��] �ı��Ŀ��ȣ�������Ϊ��λ��
        //thickness : Number
        //���ı��ֶ������ͱ�Ե�Ĵ�ϸ��
        this._type = '';//dynamic,input
        //�ı��ֶε����͡�
        //useRichTextClipboard : Boolean
        //ָ���ڸ��ƺ�ճ���ı�ʱ�Ƿ�ͬʱ���ƺ�ճ�����ʽ��
        this.wordWrap = false;
        //һ������ֵ����ʾ�ı��ֶ��Ƿ��Զ����С�
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
        this.__call(dsInteractiveObject,'__render',[ctx]);
        if (this.background) {
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, 0, this.width+4, this.height+4);//����,���¸�2���صĿ���
        }
        if(this.border){
            ctx.strokeStyle=this.borderColor;
            ctx.strokeRect(0, 0, this.width+4, this.height+4);
        }
        this.defaultTextFormat.toformat(ctx);
        var format = this.defaultTextFormat;
        var h = format.size;//�ı�����
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
    $s.dsTextFormat=dsTextFormat;
    function dsTextFormat() {
        this.align = "left";
        //��ʾ����Ķ��뷽ʽ��
        this.blockIndent = 0;
        //��ʾ��������������Ϊ��λ��
        this.bold = false;
        //ָ���ı��Ƿ�Ϊ�����֡�
        this.bullet = false;
        //��ʾ�ı�Ϊ����Ŀ���ŵ��б���һ���֡�
        this.color = "#000";
        //��ʾ�ı�����ɫ��
        this.font = "Arial";//���� Mac OS X �ϣ�Ĭ������Ϊ Times��
        //ʹ�ô��ı���ʽ���ı����������ƣ����ַ�����ʽ��ʾ��
        this.indent = 0;
        //��ʾ����߾ൽ�����е�һ���ַ���������
        this.italic = false;
        //��ʾʹ�ô��ı���ʽ���ı��Ƿ�Ϊб�塣
        this.kerning = false;
        //һ������ֵ����ʾ������ (true) ���ǽ��� (false) �־������
        this.leading = 0;
        //һ����������ʾ������֮��Ĵ�ֱ��ࣨ��Ϊǰ��������
        this.leftMargin = 0;
        //�������߾࣬������Ϊ��λ��
        this.letterSpacing = 0;
        //һ�����֣���ʾ�������ַ�֮����ȷ���Ŀռ�����
        this.rightMargin = 0;
        //������ұ߾࣬������Ϊ��λ��
        this.size = 12;
        //ʹ�ô��ı���ʽ���ı��Ĵ�С��������Ϊ��λ����
        this.tabStops = [];
        //���Զ��� Tab ͣ��λָ��Ϊһ���Ǹ����������顣
        this.target = "";
        //��ʾ��ʾ�����ӵ�Ŀ�괰�ڡ�
        this.underline = false;
        //��ʾʹ�ô��ı���ʽ���ı��Ǵ��»��� (true) ���ǲ����»��� (false)��
        this.url = "";
        //��ʾʹ�ô��ı���ʽ���ı���Ŀ�� URL��
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
//��
    function dsTextLine(text) {
        this.text = text;
        this.words = this.text.split('');
    }

    $s.dsMovieClip=dsMovieClip;
    function dsMovieClip(source) {
        dsExtend(dsMovieClip, dsSprite, ["__render"]);
        var m = new dsMovieClip.prototype.__init(source);
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
    p.__init=function(source){
        this.__et = 0;
        this.__bt = 0;
        this._frameRate = 24;
        this.__pt = parseInt(1000 /this._frameRate);
        this.currentFrame = 0;
        this.enabled = false;
        this.isPlaying = true;
        this._totalFrames = 0;
        this._sheet = null;
        if(source){
            this.name=source?source:this.name;
            source = config.baseURI+source+"."+config.file;
            this.__load(source);
        }
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
    p.__load=function(source){
        if(typeof source == 'string'){
            var res=new dsURLLoader(new dsURLRequest(source));
            var self = this;
            var fun =function(e){
                res.removeEventListener('complete',fun);
                var d = JSON.parse(res.data);
                if(!d)return
                var img = new Image();
                img.src = config.baseURI+d.meta.image;
                img.onerror = function(e){
                    throw e;
                }
                img.onload = function(e){
                    $s.fdds.width = d.meta.size.w;
                    $s.fdds.height = d.meta.size.h;
                    var xt = $s.fdds.getContext("2d");
                    xt.drawImage(img, 0, 0);
                    self._sheet = new SpriteSheet(d).prase(xt);
                    self.width = self._sheet.width;
                    self.height = self._sheet.height;
                    self._totalFrames = self._sheet.imgs.length;
                    $s.stage.invalidate();
                    self.dispatchEvent(new dsEvent(dsEvent.COMPLETE));
                }
            }
            res.addEventListener('complete',fun);
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
    function SpriteSheet(data){
        this.data = data;
        this.imgs = [];
        this.width =0;
        this.height =0;
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

    $s.dsURLRequest=dsURLRequest;
    function dsURLRequest(url){
        this.contentType ='application/x-www-form-urlencoded';// multipart/form-data
        this.data=null;
        this.digest='';
        this.method ='get';//post
        this.requestHeaders=[];//HTTP �����ͷ������ ��ֵ��
        this.url = url;
        this.userAgent=navigator.userAgent;
        //Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/526.9+ (KHTML, like Gecko) AdobeAIR/1.5"
        //"Mozilla/5.0 (Windows; U; en) AppleWebKit/526.9+ (KHTML, like Gecko) AdobeAIR/1.5"
        //"Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/526.9+ (KHTML, like Gecko) AdobeAIR/1.5"
    }

    $s.dsURLLoader=dsURLLoader;
    function dsURLLoader(request){
        dsExtend(dsURLLoader, dsEventDispatcher);
        return new dsURLLoader.prototype.__init(request);
    }
    dsURLLoader.prototype.load = function (request) {
        this.request = request||this.request;
        this.http.open(this.request.method, this.request.url, true);
        //this.http.responseType = this.request.contentType;
        for(var i = 0;i<this.request.requestHeaders.length;i++){
            var h = this.request.requestHeaders[i];
            this.http.setRequestHeader(h.head.h.value);
        }
        var self = this;
        this.http.onload = function (event){
            self.data = event.target.response;
        }
        this.http.send(null);
    }
    dsURLLoader.prototype.close = function(){
        this.http.abort();
    }
//ͼ�μ���
    dsURLLoader.prototype.__init=function(request) {
        this.request = request;
        //this.dataFormat = "text";//"arraybuffer""blob""document""json""text"
        this.data = null;
        this.bytesLoaded = 0;
        this.bytesTotal = 0;
        var self = this;
        var http = new XMLHttpRequest();
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
            //console.log("error");
            //this.dispatchEvent()
        });
        http.addEventListener("abort", function () {
            //console.log("abort");
        });
        http.addEventListener("loadend", function () {
            //console.log("loadend");
            self.dispatchEvent(new dsEvent(dsEvent.COMPLETE))
        });
        http.addEventListener('readystatechange',function(e){
            //http.readyState;
            //http.status;
            //console.log(http.readyState,http.status);
        })
        this.http=http;
        this.http.timeout = 2000;
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
    $s.dsLoader=dsLoader;
    function dsLoader() {
        dsExtend(dsLoader, dsInteractiveObject);
        return new dsLoader.prototype.__init();
    }
    dsLoader.prototype.__init=function(){}
    dsLoader.prototype.load = function (url) {
        var self = this;
        var mm = new Image();
        mm.onload = function () {
            mm.onload = null;
            self.data = mm;
            self.width = self.width == 0 ? mm.width : self.width;
            self.height = self.height == 0 ? mm.height : self.height;
            //stage.invalidate();
            self.dispatchEvent(new dsEvent(dsEvent.COMPLETE));
        }
        mm.src = url;
        return this;
    }
    dsLoader.prototype.__render = function (ctx) {
        if (this.data == null)return;
        ctx.transform(this._mat.a,this._mat.b,this._mat.c,this._mat.d,this._mat.tx,this._mat.ty);
        ctx.drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
    }
    $s.dsBlurFilter=dsBlurFilter
    function dsBlurFilter(blurX, blurY, quality) {
        this.blurX = blurX | 4;
        this.blurY = blurY | 4;
        this.quality = quality | 1;
    }

//б��
    function BevelFilter() {

    }
//����
    function GlowFilter() {

    }

    $s.dsDropShadowFilter=dsDropShadowFilter;
//ͶӰ
    function dsDropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
        this.distance = distance//:Number (default = 4.0) �� ��Ӱ��ƫ�ƾ��룬������Ϊ��λ��
        this.angle = Math.PI / 180 * (angle != null ? angle : 0);//:Number (default = 45) �� ��Ӱ�ĽǶȣ�0 �� 360 �ȣ����㣩��
        this.color = color || 0//:uint (default = 0) �� ��Ӱ��ɫ������ʮ�����Ƹ�ʽ 0xRRGGBB��Ĭ��ֵΪ 0x000000��
        this.alpha = alpha || 1//:Number (default = 1.0) �� ��Ӱ��ɫ�� Alpha ͸����ֵ����ЧֵΪ 0.0 �� 1.0�����磬0.25 ����͸����ֵΪ 25%��
        this.blurX = blurX || 4//:Number (default = 4.0) �� ˮƽģ��������ЧֵΪ 0 �� 255.0�����㣩��
        this.strength = strength || 1//:Number (default = 1.0) �� ӡ�ǻ��ҳ��ǿ�ȡ���ֵԽ�ߣ�ѹӡ����ɫԽ�������Ӱ�뱳��֮��ĶԱȶ�ҲԽǿ����ЧֵΪ 0 �� 255.0��
        this.quality = quality || 1//:int (default = 1) �� Ӧ���˾��Ĵ�����ʹ�� BitmapFilterQuality ������
        this.inner = inner//:Boolean (default = false) �� ��ʾ��Ӱ�Ƿ�Ϊ�ڲ���Ӱ��ֵ true ָ���ڲ���Ӱ��ֵ false ָ�������Ӱ��������Ե��Χ����Ӱ����
        this.knockout = knockout//:Boolean (default = false) �� Ӧ���ڿ�Ч�� (true)���⽫��Ч��ʹ�������ɫ��Ϊ͸��������ʾ�ĵ��ı�����ɫ��
        this.hideObject = hideObject//:Boolean (default = false) �� ��ʾ�Ƿ����ض������ֵΪ true�����ʾû�л��ƶ�������ֻ����Ӱ�ǿɼ��ġ�
    }
    dsDropShadowFilter.prototype.__render = function (ctx) {
        ctx.shadowBlur = this.strength;
        ctx.shadowColor = this.color;
        ctx.shadowOffsetX = this.blurX * Math.cos(this.angle);
        ctx.shadowOffsetY = this.blurY * Math.sin(this.angle);
    }
    $s.dsSound=dsSound;
    function dsSound(stream, context) {
        dsExtend(dsSound, dsEventDispatcher, ["__render"]);
        return new dsSound.prototype.__init(stream, context);
    }
    /*
     stream:URLRequest = null, context:SoundLoaderContext = null
     */
    dsSound.prototype.__init=function(stream, context) {
        //bytesLoaded : uint
        //	[ֻ��] ���ش����������е�ǰ���õ��ֽ�����
        //bytesTotal : int
        //	[ֻ��] ���ش������������ܵ��ֽ�����
        //Inherited	constructor : Object
        //���������������ʵ���Ĺ��캯�������á�
        //id3 : ID3Info
        //	[ֻ��] �ṩ����Ϊ MP3 �ļ�һ���ֵ�Ԫ���ݵķ��ʡ�
        //isBuffering : Boolean
        //	[ֻ��] �����ⲿ MP3 �ļ��Ļ���״̬��
        //isURLInaccessible : Boolean
        //	[ֻ��] ��ʾ Sound.url �����Ƿ��ѽضϡ�
        //length : Number
        //	[ֻ��] ��ǰ�����ĳ��ȣ��Ժ���Ϊ��λ����
        //url : String
        //	[ֻ��] ���м��ش������� URL��
    }
    dsSound.prototype.close = function () {

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

    }
    /*
     bytes:ByteArray, bytesLength:uint
     */
    dsSound.prototype.loadCompressedDataFromByteArray = function (bytes, bytesLength) {

    }
    /*
     �� ByteArray �����е� PCM 32 λ�����������ݼ��ص� Sound �����С�
     bytes:ByteArray, samples:uint, format:String = "float", stereo:Boolean = true, sampleRate:Number = 44100.0
     */
    dsSound.prototype.loadPCMFromByteArray = function (bytes, samples, format, stereo, sampleRate) {

    }
    /*
     startTime:Number = 0, loops:int = 0, sndTransform:flash.media:SoundTransform = null
     */
    dsSound.prototype.play = function (startTime, loops, sndTransform) {

    }
    //exports('dsGraphics',function(global){
    //
    //})
    $s.dsGraphics=dsGraphics;
    function dsGraphics() {
        this.__aabb = new dsAABB();
        this._code = [];
        this._codeindex = 0;
        this.__drawline = false;
        this.__drawfill = false;
        this._AABB = new dsAABB();
        this._to=[];
    }
    dsGraphics.prototype.settarget = function (v) {
        //if (v == null) {
        //    this._target = {width: this._target.width, height: this._target.height};
        //} else {
        //    v.width = this._target.width;
        //    v.height = this._target.height;
        //    this._target = v;
        //}
    }
    dsGraphics.prototype.__render = function (ctx) {
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
                    //if (fstyle != 'style') ctx.strokeStyle = this._gradient(ctx, fill[1], draw[1]);
                    //var d =draw[1];
                    //ctx.moveTo(d[0],d[1]);
                    //ctx.lineTo(d[0]+d[2],d[1]);
                    //ctx.lineTo(d[0]+d[2],d[1]+d[3]);
                    //ctx.lineTo(d[0],d[1]+d[3]);
                    //ctx.lineTo(d[0],d[1]);
                    if (this.__drawline){
                        ctx.strokeRect.apply(ctx, draw[1]);
                        //ctx.stroke();
                    }
                    if (this.__drawfill){
                        //ctx.fill();
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
     color ֻ����8λ��ɫֵ
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
//��������������
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
        //console.log('lineTo',x, y);
    }
    dsGraphics.prototype.moveTo = function (x, y) {
        this.__aabb.setXY(x,y);
        this.__drawline = true;
        //this._target.width = Math.max(this._AABB.width(), this._target.width);
        //this._target.height = Math.max(this._AABB.height(), this._target.height);
        this._to.push(['moveTo',[x, y]]);
        //console.log('graphics.moveTo('+ x.toFixed(2)+","+y.toFixed(2)+")");
    }
    dsGraphics.prototype.clear = function () {
        //this._addCode("clearRect",[0,0,this._target.width,this._target.height]);
        //this._proxy["fun"].push(['clearRect', [0, 0, this._target.width, this._target.height]])
        if(this._to==null)this._to =[];
        this._to.push(['clear',[]]);
    }
    dsGraphics.prototype.endFill = function () {

    };
    dsGraphics.prototype.drawCircle = function (x, y, r) {
        this.__aabb.add(new dsAABB(x-r,y-r,x+r,y+r));
        //this._target.width = Math.max(this._AABB.width(), this._target.width);
        //this._target.height = Math.max(this._AABB.height(), this._target.height);
        this._addCode("draw", ['circle', [x, y, r, 0, 2 * Math.PI]]);
        this._codeindex++;
    };

    dsGraphics.prototype.drawEllipse = function (x, y, w, h) {
        var hw = w*0.5;
        var hh = h*0.5;
        //this._AABB.setXY(x-hw,y-hh,x+hw,y+hh);
        //this._target.width = Math.max(this._AABB.width(), this._target.width);
        //this._target.height = Math.max(this._AABB.height(), this._target.height);
        this._addCode("draw", ['ellipse', [x, y, w, h]]);
        this._codeindex++;
    };
    dsGraphics.prototype.drawRect = function (x, y, w, h) {
        this.__aabb.add(new dsAABB(x,y,x+w,y+h));
        //this._target.width = Math.max(this._AABB.width(), this._target.width);
        //this._target.height = Math.max(this._AABB.height(), this._target.height);
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

})