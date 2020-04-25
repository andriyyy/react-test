import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import ItemList from "./ItemList";
import SearchPanel from "../SearchPanel";
import moment from "moment";
import {
  Button,
  Title,
  TextInput,
  DataTable,
  ActivityIndicator,
  Colors,
  Avatar,
  IconButton,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import { getAuthUserHasErrored } from "../../selectors/Selectors";
import renderTextField from "../Items/AddItem/Field";
import {
  getAuthUser,
  getItems,
  getUsersKey,
  getUsersHasErrored,
  getUsersIsLoading,
  getItemsHasErrored,
  getItemsIsLoading,
  getUsersMarged,
  getItemsEnrolmentsAllIsLoading,
} from "../../selectors/Selectors";
import {
  itemsOff,
  usersOff,
  removeItems,
  updateItemsInState,
} from "../../actions/firebase";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      time: "",
      picture: "",
      pictureUrl: "",
      loading: false,
      sort: "",
      term: "",
      attendee: "",
      user: [],
      open: false,
      removeId: "",
    };
  }

  componentWillUnmount() {
    this.props.onItemsOff();
    this.props.onUsersOff();
  }

  deleteItemFromStateCallback = () => {
    this.props.onDeleteItem(this.state.removeId);
  };

  onRemoveItem = (uid) => {
    console.log("ffffffffffffff", uid);
    this.setState({ removeId: uid });
    this.handleClickOpen();
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onSortChange = (sort) => {
    this.setState({ sort });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return (
        item.title.indexOf(term) > -1 ||
        item.description.indexOf(term) > -1 ||
        this.props.usersMarged[item.userId].username.indexOf(term) > -1 ||
        moment(item.createdAt).format("YYYY/MM/DD HH:mm:ss").indexOf(term) > -1
      );
    });
  };

  sorting = (items, sort) => {
    switch (sort) {
      case "1":
        return items;
      case "2":
        return items.filter((item) => item.userId === this.props.authUser.uid);
      case "3":
        return items.filter((item) =>
          item.attendees.hasOwnProperty(this.props.authUser.uid)
        );
      default:
        return items;
    }
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeItem = () => {
    this.props.onRemoveItems(
      this.state.removeId,
      this.deleteItemFromStateCallback
    );
    this.handleClose();
  };

  render() {
    if (
      this.props.isUsersLoading === true ||
      this.props.isItemsLoading === true ||
      this.props.isItemsEnrolmentsAllLoading === true
    ) {
      return <ActivityIndicator animating={true} color={Colors.red800} />;
    }

    if (this.props.isUsersErrored === true) {
      return <Text>Can not load Users</Text>;
    }
    if (this.props.isItemsErrored === true) {
      return <Text>Can not load Events</Text>;
    }

    const { items, usersMarged, navigation } = this.props;

    console.log("items", items);

    const { term, sort } = this.state;
    const visibleItems = this.sorting(this.search(items, term), sort);

    return (
      <View style={styles.container}>
        <Portal>
          <Dialog visible={this.state.open} onDismiss={this.handleClose}>
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.handleClose}>No</Button>
              <Button onPress={this.removeItem}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View>
          <ScrollView horizontal={true}>
            <View>
              <SearchPanel
                onSearchChange={this.onSearchChange}
                onSortChange={this.onSortChange}
              />
              <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                <Row
                  data={tableHead}
                  style={styles.header}
                  textStyle={styles.text}
                  widthArr={widthArr}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                  {items ? (
                    <ItemList
                      navigation={this.props.navigation}
                      items={visibleItems.map((item, index) => ({
                        ...item,
                        user: usersMarged
                          ? usersMarged[item.userId]
                          : { userId: item.userId },
                        index: index,
                      }))}
                      onRemoveItem={this.onRemoveItem}
                      styles={styles}
                      widthArr={widthArr}
                    />
                  ) : null}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: getAuthUser(state),
  items: getItems(state),
  users: getUsersKey(state),
  usersMarged: getUsersMarged(state),
  isUsersLoading: getUsersIsLoading(state),
  isItemsLoading: getItemsIsLoading(state),
  isItemsEnrolmentsAllLoading: getItemsEnrolmentsAllIsLoading(state),
  isUsersErrored: getUsersHasErrored(state),
  isItemsErrored: getItemsHasErrored(state),
});

const mapDispatchToProps = (dispatch) => ({
  onItemsOff: () => dispatch(itemsOff()),
  onUsersOff: () => dispatch(usersOff()),
  onDeleteItem: () => dispatch(updateItemsInState()),
  onRemoveItems: (removeId, saveItemsToStateCallback) =>
    dispatch(removeItems(removeId, saveItemsToStateCallback)),
});

const tableHead = [
  "Image",
  "User",
  "Title",
  "Description",
  "Created at",
  "Action",
];
const widthArr = [80, 80, 80, 100, 140, 80];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  containerInner: {
    flex: 1,
    flexDirection: "column",
  },
  header: { height: 50, backgroundColor: "#E7E6E1", padding: 5 },
  text: { textAlign: "left", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 65, backgroundColor: "#ffffff", padding: 5 },
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
