/**
 * Created by Administrator on 2016/11/4.
 */

(function($s){
    $s.ready(function(){
        if($s.platform.moblie)$s.stage.screenOrientation('h')
        changeScene('sport');
        $s.stage.color=0xff0000;
    },{baseURI:'movie/',canvas:'#can',width:800,height:600});

})(window.$s);

function changeScene(sec){
    switch(sec){
        case "road":
            $s.stage.reset();
            road();
            break;
        case "room":
            $s.stage.reset();
            room();
            break;
        case 'login':
            $s.stage.reset();
            try{login();}catch(e){throw e}
            break;
        case 'square':
            $s.stage.reset();
            square();
            break;
        case 'sport':
            sport();
            break;
    }
}

function gEvent(type, data){
    $s.dsExtend(gEvent,$s.dsEvent);
    return new gEvent.prototype.__init(type,data);
}
gEvent.prototype.__init=function(type,data){
    this.type = type;
    this.data = data;
}

