import React from 'react';

import ItemItem from './ItemItem';

const ItemList = ({
  items,
  onEditItem,
  onRemoveItem,
}) => (
  <ul>

    {items.map(item => (
      <ItemItem
        key={item.uid}
        item={item}
        onEditItem={onEditItem}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

export default ItemList;