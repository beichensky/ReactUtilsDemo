import { useDrag } from 'react-dnd';

import ItemTypes from '../types';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const Box = (props) => {
  const { name } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: () => ({ name }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // 拖拽元素放下时，drop 结果
      const dropResult = monitor.getDropResult();

      // 如果 drop 结果存在，就弹出 alert 提示
      if (dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
  }));

  const opacity = isDragging ? 0.4 : 1;
  // 使用 connectDragSource 包裹住 DOM 节点，使其可以接受各种拖动 API
  // connectDragSource 包裹住的 DOM 节点才可以被拖动
  return (
    <div style={{ ...style, opacity }} ref={drag}>
      {name}
    </div>
  );
};

export default Box;
