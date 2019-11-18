import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';

import { AppFormTextField } from '../../components/AppFormTextField';

import {
  UpdateWordRequest,
  selectLoading,
  ToggleEditModal,
  selectEditModalShown,
  selectWord,
} from '../store';

import './EditModal.css';

class EditModal extends Component {
  onSubmit = event => {
    event.preventDefault();
    const {
      UpdateWordRequest,
      initialValues: { id },
      word,
      transcription,
      translation,
    } = this.props;

    UpdateWordRequest({
      user_word_id: id,
      word,
      transcription,
      translation,
    });
  };

  render() {
    const { ToggleEditModal, editModalShown } = this.props;

    return (
      <Dialog open={editModalShown} onClose={ToggleEditModal}>
        <DialogTitle id="alert-dialog-title">Edit word</DialogTitle>
        <form onSubmit={this.onSubmit} className="edit-modal">
          <DialogContent>
            <Field
              name="word"
              type="text"
              label="Word"
              component={AppFormTextField}
            />
            <Field
              name="transcription"
              type="text"
              label="Word"
              component={AppFormTextField}
            />
            <Field
              name="translation"
              type="text"
              label="Word"
              component={AppFormTextField}
            />
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={ToggleEditModal}>
              Cancel
            </Button>
            <Button color="secondary" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const formFieldsSelector = formValueSelector('EditWord');

const mapStateToProps = state => ({
  initialValues: selectWord(state),
  loading: selectLoading(state),
  word: formFieldsSelector(state, 'word'),
  transcription: formFieldsSelector(state, 'transcription'),
  translation: formFieldsSelector(state, 'translation'),
  editModalShown: selectEditModalShown(state),
});

const mapDispatchToProps = {
  UpdateWordRequest,
  ToggleEditModal,
};

export const EditModalContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'EditWord',
    enableReinitialize: true,
  }),
)(EditModal);

EditModal.propTypes = {
  UpdateWordRequest: PropTypes.func,
  loading: PropTypes.bool,
  id: PropTypes.object,
  word: PropTypes.string,
  transcription: PropTypes.string,
  translation: PropTypes.string,
};
