import React from 'react';
import PropTypes from 'prop-types';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { DeleteButton } from '../DeleteButton';
import { EditButton } from '../EditButton';
import { SpeechSynthesis } from '../SpeechSynthesis';

export const TableRows = ({ words, ToggleDeleteModal, ToggleEditModal, SetWordId }) => {
  return words.map(({ word, transcription, translation, id }, index) => (
    <TableRow key={index}>
      <TableCell>{word}</TableCell>
      <TableCell>[ {transcription} ]</TableCell>
      <TableCell>{translation}</TableCell>
      <TableCell>
        <SpeechSynthesis {...{ word }} />
        <EditButton {...{ ToggleEditModal, SetWordId, id }} />
        <DeleteButton {...{ ToggleDeleteModal, SetWordId, id }} />
      </TableCell>
    </TableRow>
  ));
};

TableRows.propTypes = {
  ToggleDeleteModal: PropTypes.func,
  ToggleEditModal: PropTypes.func,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      word: PropTypes.string,
      transcription: PropTypes.string,
      translation: PropTypes.string,
    }),
  ),
};
