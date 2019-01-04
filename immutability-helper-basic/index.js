const update = require('immutability-helper');
const { log, print } = require('./log');



/**
 * 初始化需要操作的四个对象
 */

const initialObject = {
    name: 'Jack',
    age: 22,
    gender: 'Man'
};
const initialArray = ['a', 'b', 'c', 'd', 'e'];
const initialSet = new Set(['2', '0', '1', '9', '猪', '年', '快', '乐']);
const initialMap = new Map([['id', '1'], ['color', 'blue'], ['alias', 'map']]);


/**
 * API: {$push: array}
 * 同数组的 push 方法，将数组 array 中包含的所有元素添加到 initialArray 的后面，作为一个新数组返回
 */
const pushArray = update(initialArray, { $push: ['f'] });
log('pushArray：', pushArray);  // => [ 'a', 'b', 'c', 'd', 'e', 'f' ]



/**
 * API: {$unshift: array}
 * 同数组的 unshift 方法，将数组 ['f'] 中包含的所有元素添加到 initialArray 的前面，作为一个新数组返回
 */
const unshiftArray = update(initialArray, { $unshift: ['f'] });
log('unshiftArray：', unshiftArray);   // => [ 'f', 'a', 'b', 'c', 'd', 'e' ]



/**
 * API: {$splice: array of arrays}
 * 同数组的 splice 方法
 *      数组 arrays 中包含的是所有需要执行的操作集合
 *      元素 array 中第一个元素代表下标，第二个元素代表需要删除的个数，第三个元素代表需要插入到 initialArray 中的的元素
 * 
 * PS:  1、可以在 arrays 中执行多个集合；
 *      2、两个操作不是同时执行，而是按顺序执行，后面的操作会在前面一个操作的执行结果上执行
 */
const spliceArray = update(initialArray, { $splice: [[1, 2], [2, 0, 'f', 'g']] });
log('spliceArray：', spliceArray);  // => [ 'a', 'd', 'f', 'g', 'e' ]



/**
 * API: {$set: any}
 * 可以将数组或者对象中某一下标或者属性的值进行修改
 */
// 将 initialArray 数组中下标为 1 的元素修改为 'f'
const setArray = update(initialArray, { 1: { $set: 'f' } });
log('setArray', setArray);  // => [ 'a', 'f', 'c', 'd', 'e' ]

// 将 initialObject 对象中 age 属性值修改为 26
const setObject = update(initialObject, { age: { $set: 26 } });
log('setObject', setObject);    // => { name: 'Jack', age: 26, gender: 'Man' }



/**
 * API: {$toggle: array of strings}
 * 可以将数组或者对象中下标集合或者属性集合的值进行切换：任何 Truthy 都会切换成 false，任何 Falsy 值都会切换成 true
 */
// 将 initialArray 中下标为 1、2 的元素值进行切换
const toggleArray = update(initialArray, { $toggle: [ 1, 2 ] });
log('toggleArray：', toggleArray);    // => [ 'a', false, false, 'd', 'e' ]

const toggleObject = update(initialObject, { $toggle: [ 'name', 'gender' ] });
log('toggleObject：', toggleObject);  // => { name: false, age: 22, gender: false }


/**
 * API: {$unset: array of strings}
 * 从目标数组或者对象中移除 array 中的下标或者属性列表
 */
// 删除数组 initialArray 中下标为 1 和 2 的两个元素，但是保留占位
const unsetArray = update(initialArray, { $unset: [1, 2] });
log('unsetArray：', unsetArray); // 5    [ 'a', <2 empty items>, 'd', 'e' ]

// 删除对象 initialObject 中 name 和 gender 属性
const unsetObject = update(initialObject, { $unset: ['name', 'gender'] });
log('unsetObject', unsetObject);    // unsetObject { age: 22 }



/**
 * API: {$merge: object}
 * 从目标数组或者对象中合并 object 中下标或者属性相同的元素，下标或属性相同时 object 中的元素会替换掉目标中的元素
 */
// 将 initialArray 数组中的 'a', 'b', 'c' 替换为 1, 2, 3
const mergeArray = update(initialArray, { $merge: [1, 2, 3] });
log('mergeArray：', mergeArray);    // => [ 1, 2, 3, 'd', 'e' ]

// 将 initialObject 和 { name: 'Rose', gender: 'Woman', hobby: 'Swimming' } } 对象进行合并
const mergeObject = update(initialObject, { $merge: { name: 'Rose', gender: 'Woman', hobby: 'Swimming' } });
log('mergeObject', mergeObject);    // => { name: 'Rose', age: 22, gender: 'Woman', hobby: 'Swimming' }


 
/**
 * API: {$apply: function}
 * 为目标数组或者对象中某个下标或者属性应用 function
 */
const apply = (val) => val + '--apply'
// 为 initialArray 数组中下标为 1 的元素执行 apply 函数
const applyArray = update(initialArray, { 1: { $apply: apply } });
log('applyArray：', applyArray);    // => [ 'a', 'b--apply', 'c', 'd', 'e' ]

// 为 initialObject 对象中 name 属性执行 apply 函数
const applyObject = update(initialObject, { name: { $apply: apply } });
log('applyObject：', applyObject);  // => { name: 'Jack--apply', age: 22, gender: 'Man' }



/**
 * API: {$add: array of objects}
 * 向 Set 中添加元素时，array 是一个对象的数组，向 Map 中添加元素时， array 是一个 [key, value] 的数组
 */
// 将 ['Hello', 'World'] 中的元素添加到 initialSet 后，并返回一个新的 Set
const addSet = update(initialSet, { $add: ['Hello', 'World'] });
log('addSet：', addSet);    // => Set { '2', '0', '1', '9', '猪', '年', '快', '乐', 'Hello', 'World' }

// 将 [[3, 'Hello'], ['width', '20px']] 中的元素添加到 initialMap 中，并返回一个新的 Map
const addMap = update(initialMap, { $add: [[3, 'Hello'], ['width', '20px']] });
log('addMap：', addMap);  // => Map { 'id' => '1', 'color' => 'blue', 3 => 'Hello', 'width' => '20px' }



/**
 * API: {$remove: array of strings}
 * 从 Set 或者 Map 中移除 array 中的键列表
 */
// 删除 initialSet 中的 '猪' 和 '年' 这两个元素
const removeSet = update(initialSet, { $remove: ['猪', '年'] });
log('removeSet：', removeSet);  // => removeSet： Set { '2', '0', '1', '9', '快', '乐' }

// 删除 initialMap 中的 'color'和 'alias' 对应的两个键值对
const removeMap = update(initialMap, { $remove: ['color', 'alias'] });
log('removeMap：', removeMap);  // => Map { 'id' => '1' }




/**
 * 扩展用法：可多层结构内使用
 */
const initialConfig = {
    width: 100,
    height: 100,
    options: [
        { color: 'red', shape: 'Square' },
        { color: 'blue', shape: 'Circular' }
    ]
}
// 多层结构内使用
const multiConfig1 = update(initialConfig, { options: { color: { $set: 'pink' } } });
log('multiConfig1：', multiConfig1);
/* => 
{ width: 100,
  height: 100,
  options:
   [ { color: 'red', shape: 'Square' },
     { color: 'blue', shape: 'Circular' },
     color: 'pink' ] }
*/


/**
 * 注意用法：多种操作不要一起使用，否则只会执行最后的一个操作
 */
// 例子：只会执行最后的设置 color 属性的操作
const multiConfig2 = update(initialConfig, { options: { $push: [ { color: 'deepPink', shape: 'Triangle' } ] }, options: { color: { $set: 'pink' } } });
log('multiConfig2：', multiConfig2);
/* => 
{ width: 100,
  height: 100,
  options:
   [ { color: 'red', shape: 'Square' },
     { color: 'blue', shape: 'Circular' },
     color: 'pink' ] }
*/



print();