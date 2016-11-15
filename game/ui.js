/**
 * Created by Administrator on 2016/11/12.
 */
$ui.dsMain(function(){
    $s.uistage.x = 0;
    $s.uistage.y=0;
    var weight = new $ui.uiTextField();
    weight.includeInLayout = true;
    weight.width = 40;
    weight.height = 30;
    weight.text='体重';
    $ui.uistage.addChild(weight)
    var wt = new $ui.uiTextInput();
    wt.width =100;
    wt.includeInLayout =true;
    wt.height=20;

    var sex = new $ui.uiTextField();
    sex.includeInLayout = true;
    sex.width = 40;
    sex.height = 30;
    sex.text='性别';
    $ui.uistage.addChild(sex)
    var st = new $ui.uiTextInput();
    st.width =100;
    st.includeInLayout =true;
    st.height=20;

    var div1 = new $ui.uiDiv();
    //div1.includeInLayout = true;
    div1.addChild(weight);
    div1.addChild(wt);
    var div2 = new $ui.uiDiv();
    //div2.includeInLayout = true;
    div2.addChild(sex);
    div2.addChild(st);
    $s.uistage.addChild(div1);
    $s.uistage.addChild(div2);
},{body:'#ui',width:200,height:300});