import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ItemItem from './ItemItem';

const ItemList = (props) => {
  const { items, onEditItem, onRemoveItem} = props;
  return <List >
    {items.map(item => (
        <ItemItem
          key={item.uid}
          item={item}
          onEditItem={onEditItem}
          onRemoveItem={onRemoveItem}
        />
    ))}
  </List>;
};

export default ItemList;