import { useDrag } from 'react-dnd';

import ItemTypes from '../types';

const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  cursor: 'move',
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
      /**
       * 拖拽元素放下时，获取 drop 结果
       * 获取到的内容是 drop 元素在 drop 回调时返回的内容
       */
      const dropResult = monitor.getDropResult();

      // 如果 drop 结果存在，就弹出 alert 提示
      if (dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
  }));

  const opacity = isDragging ? 0.4 : 1;

  /**
   * 将 drag 赋值给对应元素的 ref，即可支持拖拽
   */
  return (
    <div style={{ ...style, opacity }} ref={drag}>
      {name}
    </div>
  );
};

export default Box;
