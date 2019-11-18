import React, { Component } from 'react';
import Noty from 'noty';
import './noty-vendor.css';
import './Alerts.css';
import { clearAlertAction, logAlertAction } from './modules/';
import { activeAlertsSelector } from './modules/selectors';
import { connect } from 'react-redux';

const notificationConfig = {
    layout: 'topRight',
    theme: 'relax',
    dismissQueue: true,
    closeWith: ['click'],
    container: '.xircl-alerts',
    progressBar: false,
    animation: {
        open: 'animated flipInX',
        close: 'animated flipOutX'
    }
};

const mapDispatchToProps = dispatch => ({
    clearNotification: () => {
        dispatch(clearAlertAction())
    },
    logNotification: (notify) => {
        dispatch(logAlertAction(notify))
    }
});

const mapStateToProps = state => ({
    notification: activeAlertsSelector(state)
});

@connect(mapStateToProps, mapDispatchToProps)
export class Alerts extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.notification.text) {
            const {
                text,
                type,
                timeout = 3000
            } = nextProps.notification;
            const notify = {
                text,
                type,
                timeout
            };
            const params = {
                ...notificationConfig,
                text: Alerts.renderNotificationWindow(text),
                type,
                timeout,
                callbacks: {
                    afterClose: this.afterCloseCallback
                }
            };

            new Noty(params).show();
            this.props.logNotification(notify);
        }
    }

    afterCloseCallback() {
        this.props.clearNotification();
    }

    static renderNotificationWindow(message) {
        return `<div class="notification">
					<div class="notification-element notification-bell">
						<span class="glyphicon glyphicon-bell"></span>
					</div>
					<div class="notification-element notification-text">
						<span>${ message }</span>
					</div>
				</div>`;
    }

    render() {
        return (
            <div className='xircl-alerts'
                 id="xircl-alerts">
                <div className="xircl-js-alerts"/>
            </div>
        )
    }
}
