/**
 * filename: List
 * overview: 用来存放下方 Card 列表的 List 组件
 */

import update from 'immutability-helper';
import React, { CSSProperties, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import IListData from '../interface/ListData';
import ItemTypes from '../ItemTypes';
import Card from './Card';

const style: CSSProperties = {
    backgroundColor: 'white',
    border: '1px dashed gray',
    margin: '100px auto',
    minHeight: '300px',
	padding: '0 10px',
    textAlign: 'center',
    width: 300
}

export interface IListProps {
    cardList: IListData[];
    changeCardList: (list: IListData[]) => void;
}

const List: React.FC<IListProps> = ({cardList, changeCardList}) => {

    const [, drop ] = useDrop({
        accept: ItemTypes.Card
    });

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        /**
         * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
         * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
         */
        if (dragIndex === undefined) {
            const lessIndex = cardList.findIndex((item: IListData) => item.id === -1);
            changeCardList(update(cardList, {
                $splice: [[lessIndex, 1], [hoverIndex, 0, { bg: "aqua", category: '放这里', id: -1 }]],
            }));
        } else {
            const dragCard = cardList[dragIndex];
            changeCardList(update(cardList, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            }));
        }
        // eslint-disable-next-line
    }, [cardList])

    return (
        <div style={style} ref={ drop }>
            {
                cardList.length <= 0 ? <div style={{ lineHeight: '60px' }}>请放入水果</div>
                    : cardList.map((item: IListData, index: number) => <Card index={ index } key={ item.id } moveCard={ moveCard } { ...item } />)
            }
        </div>
    )
}

export default List;
