import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import Print from '@material-ui/icons/Print';

import './ActionBar.css';

export class ActionBar extends Component {
  state = {
    word: '',
  };

  setWord = ({ target: { value } }) => {
    this.setState({ word: value });
  };

  addWord = () => {
    const { word } = this.state;
    const { CreateWordRequest } = this.props;

    if (!word) {
      return;
    }

    CreateWordRequest({word});
    this.setState({ word: '' });
  };

  handleKeyDown = ({ key, keyCode }) => {
    if (key === 'Enter') {
      return this.addWord();
    }

    if ((keyCode < 65 || keyCode > 90) && keyCode !== 32) {
      return false;
    }
  };

  render() {
    const { word } = this.state;

    return (
      <div className="action-bar-container">
        <TextField
          label="Add word"
          margin="normal"
          type="text"
          value={word}
          onChange={this.setWord}
          onKeyDown={this.handleKeyDown}
        />
        <Fab color="primary" onClick={this.addWord} size="small">
          <AddIcon />
        </Fab>
        <div className="another-actions">
          <Fab
            color="secondary"
            size="small"
            title="Print"
            onClick={window.print}
          >
            <Print />
          </Fab>
        </div>
      </div>
    );
  }
}

ActionBar.propTypes = {
  CreateWordRequest: PropTypes.func,
};
