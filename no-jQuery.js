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
//获取输入框的值
document.querySelector('#my-input').value;

//获取css样式
// 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题（不直接使用window对象）
const win = el.ownerDocument.defaultView;
// null 的意思是不返回伪类元素
win.getComputedStyle(el, null).color;
// 设置样式.style可读可写 .getComputedStyle只可读；
el.style.color = '#ff0011';

