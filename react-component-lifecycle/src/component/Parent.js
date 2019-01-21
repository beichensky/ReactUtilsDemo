import React, { Component } from 'react';

import Child from './Child.js';

const parentStyle = {
    padding: 40,
    margin: 20,
    border: '1px solid pink'
};

const TAG = "Parent 组件：";

export default class Parent extends Component {

    constructor(props) {
        super(props);
        console.log(TAG, 'constructor()');
        this.state = {
            num: 0,
            mountChild: true
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(TAG, 'getDerivedStateFromProps()');
        return null;
    }

    componentDidMount() {
        console.log(TAG, 'componentDidMount()');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(TAG, 'shouldComponentUpdate()');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(TAG, 'getSnapshotBeforeUpdate()');
        return null;
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(TAG, 'componentDidUpdate()');
    }

    componentWillUnmount() {
        console.log(TAG, 'componentWillUnmount()');
    }


    /**
     * 修改传给子组件属性 num 的方法
     */
    changeNum = () => {
        let { num } = this.state;
        this.setState({
            num: ++ num
        });
    }

    /**
     * 切换子组件挂载和卸载的方法
     */
    toggleMountChild = () => {
        let { mountChild } = this.state;
        this.setState({
            mountChild: !mountChild
        });
    }

    render() {
        console.log(TAG, 'render()');
        const { num, mountChild } = this.state;
        return (
            <div style={ parentStyle }>
                <div>
                    <p>父组件</p>
                    <button onClick={ this.changeNum }>改变传给子组件的属性 num</button>
                    <br />
                    <br />
                    <button onClick={ this.toggleMountChild }>卸载 / 挂载子组件</button>
                </div>
                {
                    mountChild ? <Child num={ num } /> : null
                }
            </div>
        );
    }
}