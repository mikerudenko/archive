import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

export const EditButton = ({ ToggleEditModal, SetWordId, id }) => {
  return (
    <Fab
      size="small"
      color="primary"
      className="grid-action"
      onClick={() => {
        SetWordId({id});
        ToggleEditModal();
      }}
    >
      <EditIcon />
    </Fab>
  );
};

EditButton.propTypes = {
  ToggleEditModal: PropTypes.func,
};
