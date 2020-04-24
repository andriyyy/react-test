import React, { Component } from "react";

import ItemItem from "./ItemItem";

class ItemList extends Component {
  render() {
    const { items, onRemoveItem } = this.props;
    return items.map((item) => <ItemItem item={item} {...this.props} />);
  }
}

export default ItemList;
