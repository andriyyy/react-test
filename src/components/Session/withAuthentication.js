import React from "react";
import { connect } from "react-redux";
import {
  getSignUpSubmitted,
  getRetriaved,
  getItemsIsLoading,
  getItemsEnrolmentsAllIsLoading,
} from "../../selectors/Selectors";
import { onAuthUserListener } from "../../actions/firebase";
import { itemsFetchData } from "../../actions/items";
import { usersFetchData } from "../../actions/users";

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      this.props.authUserListener();
      this.props.fetchUsers();
      this.props.fetchItems();
    }

    render() {
      console.log("this.props.isItemsLoading", this.props.isItemsLoading);
      console.log(
        "this.props.isItemsEnrolmentsAllLoading",
        this.props.isItemsEnrolmentsAllLoading
      );
      if (
        this.props.isItemsLoading === true ||
        this.props.isItemsEnrolmentsAllLoading === true
      ) {
        return (
          <div>
            <p
              style={{ display: "block", margin: "0 auto" }}
              className="lds-dual-ring"
            />
          </div>
        );
      }

      console.log("this.props.onGetRetriaved", this.props.onGetRetriaved);
      return (
        this.props.onGetRetriaved !== null && <Component {...this.props} />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    authUserListener: () => dispatch(onAuthUserListener()),
    fetchUsers: () => dispatch(usersFetchData()),
    fetchItems: () => dispatch(itemsFetchData()),
  });


  const mapStateToProps = (state) => ({
    signUpSubmitted: getSignUpSubmitted(state),
    onGetRetriaved: getRetriaved(state),
    isItemsLoading: getItemsIsLoading(state),
    isItemsEnrolmentsAllLoading: getItemsEnrolmentsAllIsLoading(state),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
