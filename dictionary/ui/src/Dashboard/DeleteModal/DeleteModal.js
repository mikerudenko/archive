import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import {
  selectWordId,
  DeleteWordRequest,
  selectDeleteModalShown,
  ToggleDeleteModal,
} from '../store';

export class DeleteModal extends PureComponent {
  onDeleteCLick = () => {
    const { DeleteWordRequest, id } = this.props;
    DeleteWordRequest({ id });
  };

  render() {
    const { deleteModalShown, ToggleDeleteModal } = this.props;

    return (
      <Dialog open={deleteModalShown} onClose={ToggleDeleteModal}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this word ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={ToggleDeleteModal}>
            Cancel
          </Button>
          <Button color="secondary" onClick={this.onDeleteCLick}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteModal.propTypes = {
  wordId: PropTypes.any,
  changeModalsData: PropTypes.func,
  deleteModalShown: PropTypes.bool,
};

const mapStateToProps = state => ({
  id: selectWordId(state),
  deleteModalShown: selectDeleteModalShown(state),
});

const mapDispatchToProps = {
  DeleteWordRequest,
  ToggleDeleteModal,
};

export const DeleteModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteModal);
