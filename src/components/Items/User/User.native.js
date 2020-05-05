import React, { Component } from "react";
import {
  Colors,
  ActivityIndicator,
  Subheading,
  Surface,
  Chip,
} from "react-native-paper";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import moment from "moment";

import {
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
    const id = this.props.route.params.id;
    this.props.fetchItemsIds(id);
  }

  componentWillUnmount() {
    this.props.onItemsOff();
  }

  onView = (id, navigation) => {
    navigation.navigate("Detailed", { id: id });
  };

  render() {
    if (
      this.props.isItemsLoading === true ||
      this.props.isItemsEnrolmentsAllLoading === true ||
      this.props.isItemsIdsLoading
    ) {
      return <ActivityIndicator animating={true} color={Colors.red800} />;
    }

    if (this.props.isItemsIdsErrored === true) {
      return <Text>Can not load Items</Text>;
    }

    const { itemsIds, sortedItems, navigation, route } = this.props;
    const id = route.params.id;
    const { uid, username, email } = this.props.user(id);
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
                      key={itemId}
                      style={styles.chip}
                      icon="information"
                      onPress={() => this.onView(itemId, navigation)}
                    >
                      {sortedItems(id).itemsTemporary[itemId]}
                    </Chip>
                  ))}
                </View>
              )}
            </View>
            <View>
              <Text>
                <Subheading>User created events:&nbsp;</Subheading>
              </Text>
              <View style={styles.chipOver}>
                {sortedItems(id).itemsResult.map((item) => (
                  <Chip
                    key={item.key}
                    style={styles.chip}
                    icon="information"
                    onPress={() => this.onView(item.key, navigation)}
                  >
                    {item.value}
                  </Chip>
                ))}
              </View>
            </View>
          </View>
        </Surface>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  itemsIds: getItemsIds(state),
  isItemsLoading: getItemsIsLoading(state),
  isItemsEnrolmentsAllLoading: getItemsEnrolmentsAllIsLoading(state),
  isItemsIdsErrored: getItemsIdsHasErrored(state),
  isItemsIdsLoading: getItemsIdsIsLoading(state),

  user: (id) => {
    return getUser(state, id, getUsersKey(state));
  },

  sortedItems: (id) => {
    return getSortedItems(
      state,
      getItems(state),
      getUser(state, id, getUsersKey(state))
    );
  },
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemsIds: (id) => dispatch(itemsIdsFetchData(id)),
  onItemsOff: () => dispatch(itemsOff()),
});
const styles = StyleSheet.create({
  surface: {
    padding: 15,
    margin: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 4,
  },

  chipOver: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  chip: { margin: 4 },
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
