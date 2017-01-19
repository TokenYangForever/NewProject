function _LazyMan(_name) {
    var _this = this;
    _this.tasks = [];
    _this.tasks.push(function() {
        console.log('Hi! This is ' + _name + '!');
        // 这里的this是window，所以要缓存this
        _this.next();
    });
    setTimeout(function() {
        _this.next();
    }, 0);
}

// push函数里面的this和setTimeout函数里面的this都指向全局作用域，所以要缓存当前this指向
_LazyMan.prototype.next = function() {
    var _fn = this.tasks.shift();
    _fn && _fn();
}
_LazyMan.prototype.sleep = function(_time) {
    var _this = this;
    _this.tasks.push(function() {
        setTimeout(function() {
            console.log('Wake up after ' + _time);
            _this.next();
        }, _time);
    });
    return _this;
}
_LazyMan.prototype.sleepFirst = function(_time) {
    var _this = this;
    _this.tasks.unshift(function() {
        setTimeout(function() {
            console.log('Wake up after ' + _time);
            _this.next();
        }, _time);
    });
    return _this;
}
_LazyMan.prototype.eat = function(_eat) {
    var _this = this;
    _this.tasks.push(function() {
        console.log('Eat ' + _eat);
        _this.next();
    });
    return _this;
}

// 封装对象
var LazyMan = function(_name) {
    return new _LazyMan(_name);
}
