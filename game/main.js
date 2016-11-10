/**
 * Created by Administrator on 2016/11/4.
 */
(function(){
    DS(function(){
        MovieClip.baseURI = "/ds/movie/";
        changeScene('login')
    });

})();

function changeScene(sec){
    switch(sec){
        case "road":
            stage.reset();
            road();
            break;
        case "room":
            stage.reset();
            room();
            break;
        case 'login':
            login();
            break;
    }
}
function g_Event(type,data){
    this.type = type;
    this.data = data;
}
function gEvent(type, data){
    tc_extends(g_Event,tcEvent);
    return new g_Event(type,data);
}

