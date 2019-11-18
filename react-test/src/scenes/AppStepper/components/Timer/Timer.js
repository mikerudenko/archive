import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { autobind } from 'core-decorators';
import ClockIcon from '@material-ui/icons/AccessTime';

import './Timer.css';

export class Timer extends Component {

    state = {
        time: {
            minutes: null,
            seconds: null
        },
        timer: null
    };

    startTimer() {
        let timer = setInterval(this.timerLogic, 1000);
        this.setState({timer});
    }

    finishTimer() {
        let {timer} = this.state;
        clearInterval(timer);
    }

    @autobind
    timerLogic() {
        let {finishTest} = this.props;
        let {minutes, seconds} = this.state.time;
        seconds--;

        if (seconds === -1) {
            minutes--;
            seconds = 59;
        }

        if (minutes === 0 && seconds === 0) {
            return finishTest();
        }

        this.setState({
            time: {
                minutes,
                seconds
            }
        });
    }

    componentDidMount() {
        let {time} = this.props;
        this.setState({time});
        this.startTimer();
    }

    componentWillUnmount() {
        this.finishTimer();
    }

    mapTimer() {
        let {minutes, seconds} = this.state.time;

        return (
            <Fragment>
                { minutes < 10 ? '0' + minutes : minutes }
                :
                { seconds < 10 ? '0' + seconds : seconds }
            </Fragment>
        )
    }

    render() {

        return (
            <Typography
                className="app-test-form-timer"
                variant="subheading">
                <ClockIcon/>
                <span>
                    { this.mapTimer() }
                </span>
            </Typography>
        );
    }
}

Timer.propTypes = {
    time: PropTypes.shape({
        minutes: PropTypes.number,
        seconds: PropTypes.number
    }),
    finishTest: PropTypes.func
};

Timer.defaultProps = {
    time: {
        minutes: 10,
        seconds: 0
    }
};
