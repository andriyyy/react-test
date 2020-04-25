import React, { Component } from "react";
import { Avatar, IconButton } from "react-native-paper";
import { Row } from "react-native-table-component";
import { View, Text } from "react-native";
import moment from "moment";

class ItemItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editTitle: this.props.item.title,
      dense: false,
      secondary: false,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title,
    }));
  };

  onChangeEditTitle = (event) => {
    this.setState({ editTitle: event.target.value });
  };

  onView = (key, navigation) => {
    navigation.navigate("Detailed", { id: key });
  };

  render() {
    const { item, onRemoveItem, styles, widthArr, navigation } = this.props;
    const createdAt = (createdAt) => {
      return <Text>{moment(createdAt).format("YYYY/MM/DD HH:mm:ss")}</Text>;
    };

    const addIcons = (uid) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            icon="delete"
            color={"#5373ab"}
            size={20}
            onPress={() => onRemoveItem(uid)}
          />

          <IconButton
            icon="information-outline"
            color={"#5373ab"}
            size={20}
            onPress={() => this.onView(uid, navigation)}
          />
        </View>
      );
    };
    const addAvatar = (url) => {
      return (
        <Avatar.Image
          source={{
            uri: url,
          }}
          size={50}
        />
      );
    };
    const rowData = [];
    for (const [key, value] of Object.entries(item)) {
      key === "pictureUrl" ? (rowData[0] = addAvatar(value)) : null;
      key === "user" ? (rowData[1] = value.username) : null;
      key === "title" ? (rowData[2] = value) : null;
      key === "description" ? (rowData[3] = value) : null;
      key === "createdAt" ? (rowData[4] = createdAt(value)) : null;
    }
    rowData.push(addIcons(item.uid));
    return (
      <Row
        key={item.index}
        data={rowData}
        widthArr={widthArr}
        style={[styles.row, item.id % 2 && { backgroundColor: "#F7F6E7" }]}
        textStyle={styles.text}
      />
    );
  }
}

export default ItemItem;
