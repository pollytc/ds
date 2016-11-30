/**
 * Created by Administrator on 2016/11/4.
 */
var _static ={
    ser:'http://flashds.com/server/wp-admin/admin-ajax.php'
};
(function($s){
    $s.ready(function(){
        if($s.platform.moblie)$s.stage.screenOrientation('h');
        changeScene('login');
        $s.stage.color=0x00ff00;
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

function dsserver(param,back){
    $s.busy.tojquery().show();
    var url = new $s.dsURLRequest(_static.ser);
    url.method ='get';
    param.action = 'ds';
    url.data = param;
    var load = $s.dsURLLoader(url);
    load.addEventListener('complete',function(){
        $s.busy.tojquery().hide();
        var d = load.data?JSON.parse(load.data):'';
        if(back)back.call(null,d);

    })
}

function saveserver(param,back){
    $s.busy.tojquery().show();
    var url = new $s.dsURLRequest(_static.ser);
    url.method ='post';
    param.action = 'dssave';
    url.data = param;
    var load = $s.dsURLLoader(url);
    load.addEventListener('complete',function(){
        $s.busy.tojquery().hide();
        var d = load.data?JSON.parse(load.data):'';
        if(back)back.call(null,d);

    })
}


function localData(data){
    var local = $s.dsSharedObject.getLocal('person');
    if(data)
    {
        function ins(sour,dest){
            for(var s in sour){
                if(typeof sour[s] =='object')
                {
                    dest[s]={};
                    ins(sour[s],dest[s])
                }else{
                    dest[s] = sour[s];
                }
            }
        }
        if(local.data){
            ins(data,local.data);
        }else{
            local.data  =data;
        }
        local.flush();
    }
    return local.data;
}

