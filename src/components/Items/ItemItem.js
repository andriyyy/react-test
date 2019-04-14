import React, { Component } from 'react';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
});

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
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title,
    }));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onView = (key) => {
    this.props.history.push(`detailed/${key}`)

  };

  render() {
    const { item, onRemoveItem } = this.props;
    const { editMode, editTitle } = this.state;
    const { dense, secondary } = this.state;
    const createdAt = <Moment format='YYYY/MM/DD HH:mm:ss' >{item.createdAt}</Moment>;
    return (
      <ListItem >
        <ListItemAvatar>
          <Avatar
            alt={item.user.username}
            src={item.pictureUrl}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<strong>
            {item.user.username || item.user.userId}
          </strong>} secondary={secondary ? 'Secondary text' : null}

        />
        <ListItemText
          primary={item.title} secondary={secondary ? 'Secondary text' : null}

        />
        <ListItemText
          primary={item.description} secondary={secondary ? 'Secondary text' : null}

        />
        <ListItemText
          primary={createdAt} secondary={secondary ? 'Secondary text' : null}

        />
        <IconButton onClick={() => onRemoveItem(item.uid)} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => this.onView(item.uid)} aria-label="Info">
          <InfoIcon />
        </IconButton>
     
      </ListItem>

    );
  }
}

export default withStyles(styles)(withRouter(ItemItem));