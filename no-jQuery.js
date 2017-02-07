//使用原生js替代jQuery
//选择器
document.querySelectorAll('selector');
document.getElementsByClassName('classname');
document.getElementById('id');

//获得元素属性
e.getAttribute('attr');

//获取 date-**属性
e.getAttribute('date-**');
//支持dateset的情况下
e.dateset["**"];

//获取兄弟元素 先将el.parentNode.children的htmlcollection类型转换为数组
function getSibings (el){
  return Array.prototype.slice.call(el.parentNode.children,0).filter(function(i){return i!== el;});
}
//简写版
function getSibings2(el){
   return  [].filter.call(el.parentNode.children, function(child) {
              return child !== el;
            });
}

//获取下一个元素
el.nextElementSibling;
//获取上一个元素
el.previousElementSibling;
