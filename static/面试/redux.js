 const compose = (fns) => {
    if(fns.length === 0) {
        return arg => arg
    }
    if(fns.length === 1) {
        return fns[0]
    }
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}
 const middlewareApply = (...middleWares) => {
    return createStore => reducer => {
        const store = createStore(reducer);

        middleWares = middleWares.map(middleware => middleware({
            dispatch: (...args) => dispatch(...args),
            getState: store.getState
        }))
        const dispatch = compose(...middleWares)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}
 const createStore = (reducer, storeEnhancer) => {
    if(storeEnhancer) {
        return storeEnhancer(createStore)(reducer)
    }

    let state
    let listeners = [];

    let dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }

    const subScribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }
    const getState = () => state
    dispatch({})
    return {
        dispatch,
        subScribe,
        getState
    }
}


const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return state + 1;
        default:
            return 0;
    }
}
const thunk = ({ getState, dispatch }) => () => () => {
// next 理解为传递到下一个action处理器，其中dispatch也是一个处理器。
    // 不执行next表示中间件停止
    if(typeof action === 'function') {
        return action()
    }
    return next(action)
}
const log = ({ getState, dispatch }) => next => action => {
    console.log('start', getState())
    const result = next(action)
    console.log('end', getState());
    return result;
}
const store = createStore(reducer, middlewareApply(log, ))

store.dispatch({
    type: "ADD"
})

store.dispatch(() => {
    setTimeout(() => {
        store.dispatch('ADD');
    }, 1000)
})