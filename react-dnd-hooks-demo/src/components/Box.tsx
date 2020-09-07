/**
 * filename: Box
 * overview: 用来承载界面最上方水果类型的 Box 组件
 */

import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import IListData from '../interface/ListData';
import ItemType from '../ItemTypes';
import { IListProps } from './List';

let id = 1;

const Box: React.FC<IListData & IListProps> = ({bg, category, cardList, changeCardList}) => {

    const style: React.CSSProperties = {
        background: bg,
        display: 'inline-block',
        margin: 20,
        padding: '16px 30px',
        width: 100,
        cursor: 'move'
    }
    
    const box = {
        bg,
        category,
        type: ItemType.Card,
    };
    const [, drag] = useDrag({
        item: box,
        begin(monitor: DragSourceMonitor) {
            const useless = cardList.find((item: IListData) => item.id === -1);
            // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
            if (!useless) {
                changeCardList([{ bg: "aqua", category: '放这里', id: -1 }, ...cardList]);
            }
            return box;
        },
        end(_: unknown, monitor: DragSourceMonitor) {
            const uselessIndex = cardList.findIndex((item: IListData) => item.id === -1);

            /**
             * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
             *  1、如果是，则使用真正传入的 box 元素代替占位元素
             *  2、如果否，则将占位元素删除
             */

            if (monitor.didDrop()) {
                cardList.splice(uselessIndex, 1, { ...monitor.getItem(), id: id++ });
            } else {
                cardList.splice(uselessIndex, 1);
            }
            // 更新 cardList 数据源
            changeCardList(cardList);
        },
        
    });
    return (
        <div ref={ drag } style={ style }>{ category }</div>
    )
};

export default Box;
