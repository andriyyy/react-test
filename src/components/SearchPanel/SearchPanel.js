import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SearchPanel extends Component {

  state = {
    term: '',
    sort: '',
    event: '',
  };

  onSearchChange = event => {
    const term = event.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  onSortChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    const sort = event.target.value;
    this.setState({ sort });
    this.props.onSortChange(sort);
  };

  render() {
    const { term } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="event">Sort by:</InputLabel>
          <Select
            value={this.state.event}
            onChange={this.onSortChange}
            inputProps={{
              name: 'event',
              id: 'event',
            }}
          >
            <MenuItem value='1'>All events</MenuItem>
            <MenuItem value='2'>My events</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="term">Filter by: </InputLabel>
          <Input id="term"
            name="term"
            autoFocus
            value={term}
            onChange={this.onSearchChange}
          />
        </FormControl>
      </div>

    );
  }
}


export default withStyles(styles)(SearchPanel);