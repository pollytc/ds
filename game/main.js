/**
 * Created by Administrator on 2016/11/4.
 */
var _static ={
    ser:'http://flashds.com/server/wp-admin/admin-ajax.php?action=ds'
};
(function($s){
    $s.ready(function(){
        if($s.platform.moblie)$s.stage.screenOrientation('h');
        //var per=$s.dsSharedObject.getLocal('person');
        //if(!per)
        //{
        //    changeScene('resigter');
        //}else{
            changeScene('login');
        //}
        server({XDEBUG_SESSION_START:18753})
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
            login(1);
            break;
        case 'resigter':
            login(0);
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
        pa.x= $s.stage.stageWidth-300;
        $s.stage.addChild(pa);
    }
    var e =$s.dsEvent('scene');
    e.scene =sec;
    $s.stage.dispatchEvent(e);
}

function server(param){
    var ser = 'http://flashds.com/server/wp-admin/admin-ajax.php';
    var url = new $s.dsURLRequest(ser);
    url.method ='get';
    param.action = 'ds';
    url.data = param;
    var load = $s.dsURLLoader(url);
    load.addEventListener('complete',function(){
        console.log(load);
    })
}


