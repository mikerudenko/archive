import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionBar } from './ActionBar';
import { DataGrid } from './DataGrid';
import { EditModalContainer } from './EditModal';
import { DeleteModalContainer } from './DeleteModal';
import './Dashboard.css';

import {
  countSelector,
  filtersSelector,
  GetWordsRequest,
  pageSelector,
  ToggleDeleteModal,
  ToggleEditModal,
  FiltersChanged,
  wordSelector,
  CreateWordRequest,
  selectLoading,
  SetWordId,
} from './store';

const Dashboard = ({
  GetWordsRequest,
  filters,
  count,
  FiltersChanged,
  ToggleDeleteModal,
  ToggleEditModal,
  CreateWordRequest,
  page,
  loading,
  SetWordId,
  words,
}) => {
  return (
    <Fragment>
      <ActionBar {...{ filters, CreateWordRequest }} />
      <DataGrid
        {...{
          SetWordId,
          loading,
          GetWordsRequest,
          words,
          page,
          FiltersChanged,
          count,
          filters,
          ToggleDeleteModal,
          ToggleEditModal,
        }}
      />
      <EditModalContainer />
      <DeleteModalContainer />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  filters: filtersSelector(state),
  words: wordSelector(state),
  page: pageSelector(state),
  count: countSelector(state),
  loading: selectLoading(state),
});

const mapDispatchToProps = {
  CreateWordRequest,
  GetWordsRequest,
  FiltersChanged,
  ToggleDeleteModal,
  ToggleEditModal,
  SetWordId,
};

export const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
