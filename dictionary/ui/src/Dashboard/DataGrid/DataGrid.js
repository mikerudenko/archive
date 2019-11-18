import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { TableRows } from './TableRows';
import { CustomTableHead } from './CustomTableHead';
import './DataGrid.css';

export class DataGrid extends PureComponent {
  handleChangePage = (event, offset) => {
    const { FiltersChanged, GetWordsRequest, filters } = this.props;
    FiltersChanged({ offset });
    GetWordsRequest({ ...filters, offset });
  };

  handleChangeRowsPerPage = event => {
    const { FiltersChanged, filters, GetWordsRequest } = this.props;
    const limit = event.target.value;
    FiltersChanged({
      ...filters,
      limit,
    });
    GetWordsRequest({ ...filters, limit });
  };

  componentDidMount() {
    const { GetWordsRequest, filters } = this.props;
    GetWordsRequest(filters);
  }

  render() {
    const {
      count,
      words,
      ToggleDeleteModal,
      ToggleEditModal,
      SetWordId,
      filters: { limit, offset },
    } = this.props;
    return (
      <Paper className="data-grid-container">
        <Table>
          <CustomTableHead />
          <TableBody>
            <TableRows
              {...{ ToggleDeleteModal, ToggleEditModal, words, SetWordId }}
            />
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={4}
                count={count}
                rowsPerPage={limit}
                page={offset}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

DataGrid.propTypes = {
  GetWordsRequest: PropTypes.func,
  words: PropTypes.array,
  page: PropTypes.number,
  FiltersChanged: PropTypes.func,
  count: PropTypes.number,
  filters: PropTypes.object,
};
