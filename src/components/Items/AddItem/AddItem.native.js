import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersKey, getAuthUser } from "../../../selectors/Selectors";
import { updateItemsInState } from "../../../actions/firebase";
import { addItemFetchData, addOpenPopUp } from "../../../actions/forms";

import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button, Dialog, TextInput, Portal } from "react-native-paper";
import renderTextField from "./Field";
import ErrorMessage from "./ErrorMessage";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import MultiSelect from "react-native-multiple-select";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title field is required"),
  description: yup.string().required("Description field is required"),
});

class AddItem extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    image: null,
    user: "",
    selectedItems: [],
  };

  handleClosePopUp = () => {
    this.props.onOpenPopUp(true);
  };

  render() {
    const {
      open,
      handleCloseAddTab,
      onSubmitForm,
      updateItemsCallBack,
      authUser,
    } = this.props;

    handleOnSubmit = (values, actions) => {
      this.props.handleCloseAddTab();
      actions.setSubmitting(true);

      onSubmitForm(
        {
          image: this.state.image,
          title: values.title,
          description: values.description,
          user: this.state.selectedItems,
        },
        { authUser: authUser },
        updateItemsCallBack
      );
      values.title = "";
      values.description = "";
      this.setState({ image: null, user: "", selectedItems: [] });
    };

    ////////////////////////////////
    let { image } = this.state;
    onSelectedItemsChange = (selectedItems) => {
      console.log("selectedItems", selectedItems);
      this.setState({ selectedItems });
    };

    return (
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={(values, actions) => {
          handleOnSubmit(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setSubmitting,
          } = props;

          updateUser = (user) => {
            this.setState({ user: user });
          };

          onChooseImagePress = async () => {
            try {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                //allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
              if (!result.cancelled) {
                this.setState({ image: result.uri });
              }

              console.log(result);
            } catch (E) {
              console.log(E);
            }
          };

          const items = [];
          this.props.users.length > 0 &&
            this.props.users.map((user) =>
              items.push({ id: user.uid, name: user.username })
            );

          const { selectedItems } = this.state;

          return (
            <Portal>
              <Dialog visible={open} onDismiss={this.handleClose}>
                <Dialog.Title>
                  <Text>Add event</Text>
                </Dialog.Title>

                <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                  <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                    <TextInput
                      data-field-name={"title"}
                      label="Title"
                      component={renderTextField}
                      name="title"
                      style={styles.textinput}
                      placeholder={"Title"}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      value={values.title}
                    />
                    <ErrorMessage errorValue={touched.title && errors.title} />
                    <TextInput
                      data-field-name={"description"}
                      label="Description"
                      component={renderTextField}
                      name="description"
                      style={styles.textinput}
                      placeholder={"Description"}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      value={values.description}
                    />
                    <ErrorMessage
                      errorValue={touched.description && errors.description}
                    />

                    <Button
                      icon="camera"
                      mode="contained"
                      title="Choose image..."
                      onPress={onChooseImagePress}
                    >
                      Choose image...
                    </Button>
                    <View style={styles.image}>
                      {image && (
                        <Image
                          source={{ uri: image }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    </View>

                    <View style={styles.select}>
                      <MultiSelect
                        //hideSubmitButton
                        hideTags
                        items={items}
                        uniqueKey="id"
                        ref={(component) => {
                          this.multiSelect = component;
                        }}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Pick Users"
                        searchInputPlaceholderText="Search Users..."
                        onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: "#CCC" }}
                        submitButtonColor="#5373ab"
                        submitButtonText="Submit Users"
                      />
                      {this.multiSelect &&
                        this.multiSelect.getSelectedItemsExt(selectedItems)}
                    </View>
                  </ScrollView>
                </Dialog.ScrollArea>

                <Dialog.Actions>
                  <Button
                    style={styles.button}
                    mode="outlined"
                    onPress={handleCloseAddTab}
                    disabled={
                      !isValid ||
                      !this.state.image ||
                      this.state.selectedItems.length === 0
                    }
                    onPress={handleSubmit}
                  >
                    SEND
                  </Button>
                  <Button mode="outlined" onPress={handleCloseAddTab}>
                    CANCEL
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          );
        }}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  textinput: {
    marginTop: 20,
  },
  select: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  authUser: getAuthUser(state),
  users: getUsersKey(state),
  // openPopUp: getOpenPopUp(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateItemsCallBack: () => dispatch(updateItemsInState()),
  onOpenPopUp: (bool) => dispatch(addOpenPopUp(bool)),
  onSubmitForm: (values, props, updateItemsCallBack) =>
    dispatch(addItemFetchData(values, props, updateItemsCallBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
