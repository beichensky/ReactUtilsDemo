import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import ItemTypes from '../types';

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left'
}

const boxSource = {
	/**
	 * 开始拖拽时触发当前函数
	 * @param {*} props 组件的 props
	 */
	beginDrag(props) {
		// 返回的对象可以在 monitor.getItem() 中获取到
		return {
			name: props.name
		}
	},

	/**
	 * 拖拽结束时触发当前函数
	 * @param {*} props 当前组件的 props
	 * @param {*} monitor DragSourceMonitor 对象
	 */
	endDrag(props, monitor) {
		// 当前拖拽的 item 组件
		const item = monitor.getItem();
		// 拖拽元素放下时，drop 结果
		const dropResult = monitor.getDropResult();

		// 如果 drop 结果存在，就弹出 alert 提示
		if (dropResult) {
			alert(`You dropped ${item.name} into ${dropResult.name}!`);
		}
	},
}

@DragSource(
	// type 标识，这里是字符串 'box'
	ItemTypes.BOX,
	// 拖拽事件对象
	boxSource,
	// 收集功能函数，包含 connect 和 monitor 参数
	// connect 里面的函数用来将 DOM 节点与 react-dnd 的 backend 建立联系
	(connect, monitor) => ({
		// 包裹住 DOM 节点，使其可以进行拖拽操作
		connectDragSource: connect.dragSource(),
		// 是否处于拖拽状态
		isDragging: monitor.isDragging()
	}),
)
class Box extends React.Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		isDragging: PropTypes.bool.isRequired,
		connectDragSource: PropTypes.func.isRequired
	}

	render() {
		const { isDragging, connectDragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

		// 使用 connectDragSource 包裹住 DOM 节点，使其可以接受各种拖动 API
		// connectDragSource 包裹住的 DOM 节点才可以被拖动
		return connectDragSource && connectDragSource(
				<div style={{ ...style, opacity }}>
					{name}
				</div>
			);
	}
}

export default Box;