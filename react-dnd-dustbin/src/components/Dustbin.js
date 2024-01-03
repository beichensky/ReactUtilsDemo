import { useDrop } from 'react-dnd';
import ItemTypes from '../types';

const style = {
  height: '16rem',
  width: '16rem',
  marginTop: '3rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
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

  /**
   * 将 drop 赋值给对应元素的 ref，即可支持放置 drag 元素
   */
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};

export default Dustbin;
