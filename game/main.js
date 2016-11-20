/**
 * Created by Administrator on 2016/11/4.
 */

(function($s){
    $s.ready(function(){
        if($s.platform.moblie)$s.stage.screenOrientation('h')
        changeScene('login');

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
    if(sec != 'login'){
        var pa = new figure();
        pa.name ='figure';
        pa.x= $s.stage.stageWidth-200;
        $s.stage.addChild(pa);
    }
    $s.stage.dispatchEvent($s.Event('scene'))
}

