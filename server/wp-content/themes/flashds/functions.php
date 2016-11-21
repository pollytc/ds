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
    $arr = array('k'=>1,'l'=>2);
    wp_send_json_success($arr);
}