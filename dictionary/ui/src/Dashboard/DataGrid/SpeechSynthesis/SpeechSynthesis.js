import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import VolumeUp from '@material-ui/icons/VolumeUp';

export class SpeechSynthesis extends PureComponent {
  pronounceWord = () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.word));
  };

  render() {
    return (
      <Fab
        size="small"
        color="secondary"
        className="grid-action"
        onClick={this.pronounceWord}
      >
        <VolumeUp />
      </Fab>
    );
  }
}

SpeechSynthesis.propTypes = {
  word: PropTypes.string,
};
