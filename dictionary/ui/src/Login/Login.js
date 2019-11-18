import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { AppFormTextField } from '../components/AppFormTextField';
import { LoginRequest, selectLoginLoading } from './store';

import './Login.scss';

class Login extends Component {
  onSubmit = event => {
    event.preventDefault();
    const { LoginRequest, email, password } = this.props;
    LoginRequest({ email, password });
  };

  render() {
    const { loading, invalid } = this.props;

    return (
      <Paper className="login-form">
        <form onSubmit={this.onSubmit}>
          <Field
            name="email"
            required
            type="email"
            className="app-input"
            label="Email"
            component={AppFormTextField}
          />
          <Field
            name="password"
            type="password"
            required
            className="app-input"
            label="Password"
            component={AppFormTextField}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || invalid}
          >
            Log in
          </Button>
        </form>
      </Paper>
    );
  }
}

const formFieldsSelector = formValueSelector('Login');

const mapStateToProps = state => ({
  email: formFieldsSelector(state, 'email'),
  password: formFieldsSelector(state, 'password'),
  loading: selectLoginLoading(state),
});

const mapDispatchToProps = {
  LoginRequest,
};

export const LoginContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'Login',
  }),
)(Login);

Login.propTypes = {
  LoginRequest: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
};
