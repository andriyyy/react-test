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
  getAttendeesIds,
  getAttendeesHasErrored,
  getAttendeesIsLoading,
  getItem,
  getItems,
  getUsersKey,
  getAttendeeFormatted,
  getAuthUser,
} from "../../../selectors/Selectors";
import { attendeesIdsFetchData } from "../../../actions/users";
import {
  itemsOff,
  usersOff,
  usersEnrolmentsListOff,
  reject,
  notReject,
  updateItemsInState,
} from "../../../actions/firebase";

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  componentDidMount() {
    const id = this.props.route.params.id;
    this.props.fetchAttendeesIds(id);
  }

  componentWillUnmount() {
    this.props.onItemsOff();
    this.props.onUsersOff();
    this.props.onUsersEnrolmentsListOff();
  }

  onView = (id, navigation) => {
    navigation.navigate("User", { id: id });
  };

  onReject = (uid, iid) => {
    this.props.onReject(uid, iid, this.addActiveToState);
  };

  addActiveToState = () => {
    this.setState({ active: true });
    this.props.onDeleteAttendee();
  };

  onNotReject = (uid, iid) => {
    this.props.onNotReject(uid, iid, this.addNotActiveToState);
  };

  addNotActiveToState = () => {
    this.setState({ active: false });
    this.props.onAddAttendee();
  };

  render() {
    if (this.props.isAttendeesLoading === true) {
      return <ActivityIndicator animating={true} color={Colors.red800} />;
    }
    if (this.props.isAttendeesErrored === true) {
      return <Text>Can not load Attendees</Text>;
    }
    const { attendeesIds, route, navigation } = this.props;
    const id = route.params.id;

    const {
      title,
      description,
      pictureUrl,
      createdAt,
      userId,
    } = this.props.item(id);

    return (
      <ScrollView>
        <Surface style={styles.surface}>
          <View>
            <View>
              <Text>
                <Subheading>Event title: &nbsp; </Subheading>
                {title}
              </Text>
            </View>
            <View>
              <Text>
                <Subheading>Event Description:&nbsp;</Subheading>
                {description}
              </Text>
            </View>
            <View>
              <Subheading>Event Image:&nbsp;</Subheading>
            </View>
            <View>
              <Image
                source={{ uri: pictureUrl }}
                style={{ width: 120, height: 120, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text>
                <Subheading>Event created at:&nbsp;</Subheading>
              </Text>
              <Text>{moment(createdAt).format("YYYY/MM/DD HH:mm:ss")}</Text>
            </View>
            <View>
              <Text>
                <Subheading>Event created by:&nbsp;</Subheading>
              </Text>
              <View style={styles.chipOver}>
                <Chip
                  icon="information"
                  onPress={() => this.onView(userId, navigation)}
                >
                  {this.props.attendeeFormatted[userId]}
                </Chip>
              </View>
            </View>
            <View>
              <Text>
                <Subheading>Users assigned to event:&nbsp;</Subheading>
              </Text>
            </View>
            <View>
              {attendeesIds.length > 0 && (
                <View style={styles.chipOver}>
                  {attendeesIds.map((attenId) => (
                    <Chip
                      key={attenId}
                      style={styles.chip}
                      icon="information"
                      onPress={() => this.onView(attenId, navigation)}
                    >
                      {this.props.attendeeFormatted[attenId]}
                    </Chip>
                  ))}
                </View>
              )}
            </View>
            {
              /*attendeesIds.includes(this.props.authUser.uid) && (*/
              <View style={styles.buttonOver}>
                <Button
                  style={styles.button}
                  mode="contained"
                  color="primary"
                  // onClick={() => this.onNotReject(this.props.authUser.uid, id)}
                  disabled={!this.state.active}
                >
                  Accept
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  // color="secondary"
                  //onClick={() => this.onReject(this.props.authUser.uid, id)}
                  disabled={this.state.active}
                >
                  Reject
                </Button>
              </View>
              /* )*/
            }
          </View>
        </Surface>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  item: (id) => {
    return getItem(state, id, getItems(state));
  },
  attendeeFormatted: getAttendeeFormatted(state, getUsersKey(state)),
  attendeesIds: getAttendeesIds(state),
  isAttendeesErrored: getAttendeesHasErrored(state),
  isAttendeesLoading: getAttendeesIsLoading(state),
  authUser: getAuthUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAttendeesIds: (id) => dispatch(attendeesIdsFetchData(id)),
  onItemsOff: () => dispatch(itemsOff()),
  onUsersOff: () => dispatch(usersOff()),
  onUsersEnrolmentsListOff: () => dispatch(usersEnrolmentsListOff()),
  onReject: (uid, iid, saveActiveToStateCallback) =>
    dispatch(reject(uid, iid, saveActiveToStateCallback)),
  onNotReject: (uid, iid, saveNotActiveToStateCallback) =>
    dispatch(notReject(uid, iid, saveNotActiveToStateCallback)),
  onDeleteAttendee: () => dispatch(updateItemsInState()),
  onAddAttendee: () => dispatch(updateItemsInState()),
});

const styles = StyleSheet.create({
  surface: {
    padding: 15,
    margin: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 4,
  },
  buttonOver: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    margin: 10,
  },
  chipOver: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  chip: { margin: 4 },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedItem);
