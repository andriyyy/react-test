import React, { Component } from "react";

import ItemItem from "./ItemItem";

class ItemList extends Component {
  render() {
    const { items, onRemoveItem } = this.props;
    return items.map(item => (
      <ItemItem
        key={item.uid}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ));
  }
}

export default ItemList;
