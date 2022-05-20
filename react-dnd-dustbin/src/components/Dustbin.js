import { useDrop } from 'react-dnd';
import ItemTypes from '../types';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop: () => ({ name: 'Dustbin' }),
  }));

  const isActive = canDrop && isOver;

  let backgroundColor = '#222';
  // 拖拽组件此时正处于 drag target 区域时，当前组件背景色变为 darkgreen
  if (isActive) {
    backgroundColor = 'darkgreen';
  }
  // 当前组件可以放置 drag source 时，背景色变为 pink
  else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  // 使用 connectDropTarget 包裹住 DOM 节点，使其可以接收对应的 drag source 组件
  // connectDropTarget 包裹住的 DOM 节点才能接收 drag source 组件
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};

export default Dustbin;
