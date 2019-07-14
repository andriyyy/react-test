import React, { Component } from "react";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
});

class ItemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.item.title,
      dense: false,
      secondary: false
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title
    }));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onView = key => {
    this.props.history.push(`detailed/${key}`);
  };

  render() {
    const { item, onRemoveItem } = this.props;
    const createdAt = (
      <Moment format="YYYY/MM/DD HH:mm:ss">{item.createdAt}</Moment>
    );
    return  (
      <TableRow key={item.uid}>
        <TableCell component="th" scope="row">
          <Avatar alt={item.user.username} src={item.pictureUrl} />
        </TableCell>
        <TableCell align="left">
          {item.user.username || item.user.userId}
        </TableCell>
        <TableCell align="left">{item.title} </TableCell>
        <TableCell align="left">{item.description} </TableCell>
        <TableCell align="left">{createdAt} </TableCell>
        <TableCell align="left">
          <IconButton
            onClick={() => onRemoveItem(item.uid)}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => this.onView(item.uid)} aria-label="Info">
            <InfoIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(withRouter(ItemItem));
