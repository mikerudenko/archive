import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AppStepper } from './AppStepper';
import { TestConfigurator } from './TestConfigurator';
import './AppRouter.css';

export class AppRouter extends Component {
    render() {
        return (
            <div className={ `app-container` }>
                <AppBar position="static" className={ 'app-menu-bar' }>
                    <Toolbar>
                        <Link to='/test' className={ 'app-menu-item' }>
                            <Typography variant="title" color="inherit">
                                Runner
                            </Typography>
                        </Link>

                        <Link to='/configurator' className={ 'app-menu-item' }>
                            <Typography variant="title" color="inherit">
                                Configurator
                            </Typography>
                        </Link>

                        {process.env.MINER && (
                            <Typography variant="title" color="inherit">
                                <a href="/_book/index.html">Documentation</a>
                            </Typography>
                        )}

                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path="/test" component={ AppStepper }/>
                    <Route path="/configurator" component={ TestConfigurator }/>
                    <Redirect to={{pathname: "/test"}}/>
                </Switch>
            </div>
        );
    }
}

