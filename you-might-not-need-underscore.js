//使用js原生的API代替underscore中的方法
_.each(array, iteratee);
//ES5.1array.foreach(iteratee);

_.map(array, iteratee)
//ES5.1
array.map(iteratee)

_.reduce(array, iteratee, memo)
//ES5.1
array.reduce(iteratee, memo)

_.reduceRight(array, iteratee, memo)
//ES5.1
array.reduceRight(iteratee, memo)

_.every(array, predicate)
//ES5.1
array.every(predicate)

_.some(array, predicate)
//ES5.1
array.some(predicate)

_.find(array, predicate)
array.find(predicate)

_.pluck(array, propertyName)
array.map(value => value[propertyName])

_.includes(array, element)
array.includes(element)

_.toArray(arguments)
[...arguments]

_.object(array)
array.reduce((result, [key, val]) => Object.assign(result, {[key]: val}), {})

_.compact(array)
array.filter(Boolean)

_.uniq(array)
[...new Set(array)]

_.indexOf(array, value)
array.indexOf(value)

_.findIndex([4, 6, 7, 12], isPrime)
[4, 6, 7, 12].findIndex(isPrime)

_.range(x, x + n)
Array.from(Array(n), (_, i) => x + i)

_.keys(object)
Object.keys(object)

_.size(object)
Object.keys(object).length

_.allKeys(object)
[...Reflect.enumerate(object)]

_.values(object)
Object.keys(object).map(key => object[key])

_.create(proto, properties)
Object.assign(Object.create(proto), properties)

_.assign({}, source, { a: false })
Object.assign({}, source, { a: false })

_.extendOwn({}, object)
{ ...object }

_.isArray(object)
Array.isArray(object)

_.isNumber(object) && _.isFinite(object)
Number.isFinite(object)

foo(_.bind(function () {  this.bar();}, this));
foo(_.bind(object.fun, object));
//ES6
foo(() => {  this.bar();});
foo(() => object.fun());

_.identity
value => value

_.constant(value)
() => value

_.noop()
=> {}

_.now()
Date.now()

//templatevar 
greeting = _.template("hello <%= name %>");
greeting({ name: 'moe' });
//ES2015
const greeting = ({ name }) => `hello ${name}`;
greeting({ name: 'moe' });
