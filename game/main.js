/**
 * Created by Administrator on 2016/11/4.
 */
(function($s){
    $s.ready(function(){
        changeScene('road')
    },{baseURI:'movie/'});

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
            try{login();}catch(e){throw e}
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

