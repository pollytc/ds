/**
 * Created by Administrator on 2016/11/4.
 */

function login(bool){
    var logo = new $s.dsLoader().load('img/logo.png');
    logo.addEventListener('complete',function(){
        logo.x = $s.stage.stageWidth*0.1;
        logo.y = ($s.stage.stageHeight-logo.height)*0.5;
    })
    $s.stage.addChild(logo);

    var btn = new $s.dsLoader().load('img/btn.png');
    btn.name = 'btn'
    btn.x = $s.stage.stageWidth*0.7;
    btn.y = 100;
    var panel = null
    btn.addEventListener('mousedown',function(){
        //var sd = $s.dsSharedObject.getLocal('person');
        //if(sd.data){
        //    changeScene('room');
        //    return;
        //}
        //if(!panel)panel = new $.uiLogin();
        //$.uibody.show(panel);
        //panel.x = ($s.stage.stageWidth-panel.width)*0.5;
        //panel.y = ($s.stage.stageHeight-panel.height)*0.5;
        //panel.addEventListener('submit',function(){
        //    $.uibody.hide(panel);
        //    changeScene('room');
        //})
        if(!panel){
            var panel = new $.uiTabPanel();
            $.uibody.addChild(panel);
            $.uibody.ele.show();
            panel.model();
            panel.ele.css('position','inherit')
            panel.addtab('login', new $.uiLogin());
            panel.addtab('Resitger', new $.uiResitger());
            panel.x = ($.uibody.width-panel.width)*0.5;
            panel.y = ($.uibody.height-panel.height)*0.5;
        }
    })
    $s.stage.addChild(btn);
    var btn1 = new $s.dsLoader().load('img/shuoming.png');
    btn1.x = $s.stage.stageWidth*0.7;
    btn1.y = 200;
    btn1.addEventListener('mousedown',function(){

    })
    $s.stage.addChild(btn1);

}
