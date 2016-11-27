<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/22
 * Time: 1:58
 */

add_action('wp_ajax_nopriv_ds',dsAjax);
add_action('wp_ajax_ds',dsAjax);
function dsAjax(){
    if(!empty($_REQUEST['act']))
    {
        $_REQUEST['act']();
//        @call_user_func($_REQUEST['act']);
    }
}

function login(){
    if($_GET['user']=='123') wp_send_json_success();
     wp_send_json_error('id 不匹配');
}

function register(){

}

function person(){

}

function movielist(){
    $list = array();
    $list[]=array(name=>'tilte1',content=>"content1",read=>true,id=>'1',img=>'');
    $list[]=array(name=>'tilte2',content=>"content2",read=>false,id=>'2',img=>'');
    $list[]=array(name=>'tilte3',content=>"content3",read=>false,id=>'3',img=>'');
    $list[]=array(name=>'tilte4',content=>"content4",read=>true,id=>'4',img=>'');
    $list[]=array(name=>'tilte5',content=>"content5",read=>false,id=>'5',img=>'');
    $list[]=array(name=>'tilte6',content=>"content6",read=>false,id=>'6',img=>'');
    wp_send_json_success($list);
}

function menulist(){
    $storeid =$_REQUEST['storeid'];
    $list = array();
    $list[]=array(name=>'tilte1',content=>"content1",price=>2,id=>'1',img=>'');
    $list[]=array(name=>'tilte2',content=>"content2",price=>4,id=>'2',img=>'');
    $list[]=array(name=>'tilte3',content=>"content3",price=>5,id=>'3',img=>'');
    $list[]=array(name=>'tilte4',content=>"content4",price=>43,id=>'4',img=>'');
    $list[]=array(name=>'tilte5',content=>"content5",price=>2,id=>'5',img=>'');
    $list[]=array(name=>'tilte6',content=>"content6",price=>1,id=>'6',img=>'');
    wp_send_json_success($list);
}