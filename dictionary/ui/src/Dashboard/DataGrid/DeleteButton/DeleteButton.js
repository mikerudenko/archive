import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

export const DeleteButton = ({ ToggleDeleteModal, SetWordId, id }) => {
  return (
    <Fab
      size="small"
      color="primary"
      className="grid-action"
      onClick={() => {
        SetWordId({id});
        ToggleDeleteModal();
      }}
    >
      <DeleteIcon />
    </Fab>
  );
};

DeleteButton.propTypes = {
  ToggleDeleteModal: PropTypes.func,
};
