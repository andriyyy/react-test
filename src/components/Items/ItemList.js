import React, { Component } from "react";

import ItemItem from "./ItemItem";

class ItemList extends Component {
  render() {
    const { items, index } = this.props;
    return items.map((item, key) => (
      <ItemItem key={key} item={item} {...this.props} />
    ));
  }
}

export default ItemList;
