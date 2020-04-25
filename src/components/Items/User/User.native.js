import React, { Component } from "react";
import {
  Colors,
  Button,
  ActivityIndicator,
  Subheading,
  Surface,
  Chip,
} from "react-native-paper";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import moment from "moment";

import {
  getId,
  getItems,
  getUsersKey,
  getItemsIds,
  getItemsIdsHasErrored,
  getItemsIdsIsLoading,
  getUser,
  getSortedItems,
  getItemsIsLoading,
  getItemsEnrolmentsAllIsLoading,
} from "../../../selectors/Selectors";
import { itemsIdsFetchData } from "../../../actions/items";
import { itemsOff } from "../../../actions/firebase";

class User extends Component {
  componentDidMount() {
    const id = this.props.getId();
    this.props.fetchItemsIds(id);
  }

  componentWillUnmount() {
    this.props.onItemsOff();
  }

  onView = (id) => {
    this.props.history.push(`/detailed/${id}`);
  };

  render() {
    if (
      this.props.isItemsLoading === true ||
      this.props.isItemsEnrolmentsAllLoading === true
    ) {
      return <ActivityIndicator animating={true} color={Colors.red800} />;
    }

    if (this.props.isItemsIdsErrored === true) {
      return <Text>Can not load Items</Text>;
    }
    const { uid, username, email } = this.props.user;
    const { classes, itemsIds, sortedItems } = this.props;
    return (
      <ScrollView>
        <Surface style={styles.surface}>
          <View>
            <View>
              <Text>
                <Subheading>User id: &nbsp; </Subheading>
                {uid}
              </Text>
            </View>
            <View>
              <Text>
                <Subheading>User name:&nbsp;</Subheading> {username}
              </Text>
            </View>
            <View>
              <Text>
                <Subheading>User e-mail:&nbsp;</Subheading> {email}
              </Text>
            </View>
            <View>
              <Text>
                <Subheading>User assigned to events:&nbsp;</Subheading>
              </Text>
              {itemsIds.length > 0 && (
                <View style={styles.chipOver}>
                  {itemsIds.map((itemId) => (
                    <Chip
                      icon="information"
                      onPress={() => this.onView(itemId)}
                    >
                      {sortedItems.itemsTemporary[itemId]}
                    </Chip>
                  ))}
                </View>
              )}
            </View>
            <View>
              <b>User created events:&nbsp;</b>
              <div>
                {sortedItems.itemsResult.map((item) => (
                  <Link
                    data-user-id={item.key}
                    onClick={() => this.onView(item.key)}
                    key={item.key}
                  >
                    {item.value}
                  </Link>
                ))}
              </div>
            </View>
          </View>
        </Surface>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  getId: () => {
    return getId(ownProps);
  },
  itemsIds: getItemsIds(state),
  isItemsLoading: getItemsIsLoading(state),
  isItemsEnrolmentsAllLoading: getItemsEnrolmentsAllIsLoading(state),
  isItemsIdsErrored: getItemsIdsHasErrored(state),
  isItemsIdsLoading: getItemsIdsIsLoading(state),
  user: getUser(state, ownProps, getUsersKey(state)),
  sortedItems: getSortedItems(
    state,
    getItems(state),
    getUser(state, ownProps, getUsersKey(state))
  ),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemsIds: (id) => dispatch(itemsIdsFetchData(id)),
  onItemsOff: () => dispatch(itemsOff()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
