import React from 'react';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';

import { autobind } from 'core-decorators';

import { Quiz } from './components/Quiz/';
import { DataUploader } from './components/DataUploader/';
import { Results } from './components/Results/';
import { connect } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../Alerts/modules';

import './AppStepper.css';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    showErrorAlert,
    showSuccessAlert
};

const getInitialState = () => ({
    activeStep: 0,
    data: null,
    answers: []
});

@connect(mapStateToProps, mapDispatchToProps)
export class AppStepper extends React.Component {
    state = getInitialState();

    steps = ['Setup', 'Quiz time!', 'See the results'];

    mapSteps() {
        return this.steps.map(label => {
            return (
                <Step key={ label }>
                    <StepLabel>{ label }</StepLabel>
                </Step>
            );
        });
    }

    @autobind
    finishTest() {
        this.handleNext();
    }

    @autobind
    setQuizData(data) {
        this.setState({
            data
        })
    }

    @autobind
    answerQuestion(answers) {
        this.setState({answers});
    }

    @autobind
    handleNext() {
        const {activeStep} = this.state;
        if (activeStep === 2) {
            this.setState(getInitialState());
        } else {
            this.setState({activeStep: activeStep + 1});
        }
    };

    @autobind
    getStepContent() {
        const {activeStep, answers} = this.state;
        const {showErrorAlert, showSuccessAlert} = this.props;
        switch (activeStep) {
            case 0:
                return <DataUploader
                    showErrorAlert={ showErrorAlert }
                    showSuccessAlert={ showSuccessAlert }
                    setQuizData={ this.setQuizData }
                    handleNext={ this.handleNext }/>;
            case 1:
                return <Quiz
                    data={ this.state.data }
                    answers={ answers }
                    answerQuestion={ this.answerQuestion }
                    finishTest={ this.finishTest }/>;
            case 2:
                return <Results
                    handleNext={ this.handleNext }
                    data={ this.state.data }
                    answers={ answers }/>;
            default:
                return 'The end';
        }
    }

    render() {
        const {activeStep} = this.state;
        return (
            <Paper className={ 'app-stepper' }>
                <Stepper activeStep={ activeStep }>
                    { this.mapSteps() }
                </Stepper>
                { this.getStepContent() }
            </Paper>
        );
    }
}

AppStepper.propTypes = {
    classes: PropTypes.object
};
