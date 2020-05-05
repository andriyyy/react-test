import React, { Component } from "react";
import { View, Picker, Text, TextInput, StyleSheet } from "react-native";

class SearchPanel extends Component {
  state = {
    term: "",
    sort: "",
    event: "",
  };

  onSearchChange = (term) => {
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  onSortChange = (sort) => {
    this.setState({ sort });
    this.props.onSortChange(sort);
  };

  render() {
    const { term } = this.state;

    return (
      <View>
        <View style={styles.container1}>
          <View>
            <Text htmlFor="event">Sort by:</Text>
            <View style={styles.border}>
              <Picker
                selectedValue={this.state.event}
                style={styles.input}
                onValueChange={(itemValue) => {
                  this.onSortChange(itemValue);
                  this.setState({ event: itemValue });
                }}
              >
                <Picker.Item label="All events" value="1" />
                <Picker.Item label="My events" value="2" />
                <Picker.Item label="Assigned to me" value="3" />
              </Picker>
            </View>
          </View>
          <View>
            <Text htmlFor="event">Filter by:</Text>
            <View style={styles.border}>
              <TextInput
                data-field-name={"term"}
                label="Filter by:"
                name="term"
                style={styles.input}
                onChangeText={(text) => this.onSearchChange(text)}
                value={term}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    padding: 10,
  },
  block: { height: 50, width: 100, backgroundColor: "#E7E6E1", padding: 5 },
  input: {
    height: 50,
    width: 150,
    backgroundColor: "#F8F8F8",
    paddingLeft: 4,
  },
  border: {
    borderBottomColor: "#A9A9A9",
    borderBottomWidth: 1,
    marginRight: 10,
  },
});

export default SearchPanel;
