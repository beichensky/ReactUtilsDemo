/**
 * 增加次数的 Action 创建函数
 * @param {Number} number 需要增加的次数
 */
function increment(number) {
    return {
        type: "INCREMENT",
        number
    }
}

/**
 * 初始化 counter 数据
 */
const initCounter = 0;

/**
 * 执行数据更新的 Reducer 函数
 * @param {any} state state 数据
 * @param {Object} action 需要执行的操作指令
 */
function counters(state = initCounter, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + action.number;
        default:
            return state;
    }
}

/**
 * 引入需要使用的插件
 */
const { createStore, applyMiddleware } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
const thunk = require('redux-thunk').default;

// 通过 createStore 创建 store
const store = createStore(counters, composeWithDevTools());


// 通过 store.subscribe 为 store 注册监听事件。返回值是一个函数，执行会注销监听事件
const unsubscribe = store.subscribe(() => console.log('state：', store.getState()));


/**
 * 通过 store.dispatch 分发 Action 传递给 Reducer 进行数据更新
 */
store.dispatch(increment(1));
store.dispatch(increment(4));
store.dispatch(increment(8));

console.log('end state: ', store.getState());

/**
 * 注销监听事件
 */
unsubscribe();




/**
 * composeWithDevTools 扩展
 */

// 1、一般 Redux 会配合一些中间件进行使用，
// 此时需要用到 Redux 中的 compose 函数对 composeWithDevTools 和 composeWithDevTools 进行组合创建 Store
// 这里使用 redux-thunk 作为演示
const storeCompose = createStore(counters, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
));


// 2、一般在开发环境下才会使用到 Redux-Devtools，所以我们可以在创建 store 进行区分，这样不用来回修改代码
console.log('tag', process.env.NODE_ENV)
const enhancers = process.env.NODE_ENV === "development" ? composeWithDevTools(
        applyMiddleware(thunk)
        // other store enhancers if any
    )
    :
    applyMiddleware(thunk);
const storeEnv = createStore(counters, enhancers);

