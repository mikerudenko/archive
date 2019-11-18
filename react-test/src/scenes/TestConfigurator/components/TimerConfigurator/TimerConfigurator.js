import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

import './TimerConfigurator.css';

export class TimerConfigurator extends Component {

    @autobind
    changeTime(event) {
        let { changeTest, time } = this.props;

        changeTest({
            time: {
                ...time,
                minutes: event.target.valueAsNumber
            }
        });
    }

    render() {
        let {time: {minutes}} = this.props;

        return (
            <div className={ 'time-configurator-container' }>
                <TextField
                    name="minutes"
                    className={ 'minutes-control' }
                    label="Timer minutes"
                    value={ minutes }
                    type="number"
                    onChange={ this.changeTime }
                    inputProps={ {min: "0", max: "300", step: "1"} }
                    margin="normal"
                />
            </div>
        );
    }
}

TimerConfigurator.propTypes = {
    time: PropTypes.shape({
        seconds: PropTypes.number,
        minutes: PropTypes.number
    }),
    changeTest: PropTypes.func
};
TimerConfigurator.defaultProps = {};
