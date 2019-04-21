import React, { Component } from "react";

import ItemItem from "./ItemItem";

class ItemList extends Component {
  render() {
    const { items, onEditItem, onRemoveItem } = this.props;
    return items.map(item => (
      <ItemItem
        key={item.uid}
        item={item}
        onEditItem={onEditItem}
        onRemoveItem={onRemoveItem}
      />
    ));
  }
}

export default ItemList;
