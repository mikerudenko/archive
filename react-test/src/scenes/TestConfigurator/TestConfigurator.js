import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { autobind } from 'core-decorators';
import { QuestionItem } from './components/QuestionItem';
import AddIconCircle from '@material-ui/icons/AddCircle';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { TimerConfigurator } from './components/TimerConfigurator';
import sha1 from 'sha1';
import { connect } from 'react-redux';
import { ValidationService } from './services/ValidationService';
import { TestConfiguratorSelector, questionsDataSelector } from './modules/TestConfigurator.selectors';
import { showErrorAlert } from '../Alerts/modules';
import {
    addQuestion,
    changeTest,
    changeOption,
    deleteOption,
    changeQuestion,
    deleteQuestion,
    cleanup,
    addOption
} from './modules/TestConfigurator.modules';
import './TestConfigurator.css';

const CryptoJS = require("crypto-js");

const mapStateToProps = state => ({
    TestConfigurator: TestConfiguratorSelector(state),
    questions: questionsDataSelector(state)
});

const secret = 'qwjhdbwveghkuwgrj2341233refbdqwkdasxcadsf';

const mapDispatchToProps = {
    addQuestion,
    changeQuestion,
    changeTest,
    changeOption,
    deleteOption,
    deleteQuestion,
    addOption,
    showErrorAlert,
    cleanup
};

@connect(mapStateToProps, mapDispatchToProps)
export class TestConfigurator extends Component {
    @autobind
    onChangeTest(event) {
        let {changeTest} = this.props;

        changeTest({
            [event.target.name]: event.target.value
        });
    }

    mapQuestions() {
        let {
            questions,
            changeOption,
            deleteOption,
            changeQuestion,
            deleteQuestion,
            addOption
        } = this.props;

        return questions.map((question, index) => {
            return <QuestionItem
                addOption={ addOption }
                question={ question }
                deleteOption={ deleteOption }
                changeQuestion={ changeQuestion }
                deleteQuestion={ deleteQuestion }
                changeOption={ changeOption }
                key={ index }/>
        });
    }

    validateQuiz(dataToUpload) {
        let {showErrorAlert, questions} = this.props;
        let valid = ValidationService.validateData({dataToUpload, showErrorAlert});
        if (!valid) {
            return false
        }

        if (!dataToUpload.time.minutes) {
            showErrorAlert(`In your quiz ${dataToUpload.title} must be at set timer minutes!`);
            return false;
        }

        if (!questions.length) {
            showErrorAlert(`In your quiz ${dataToUpload.title} must be at least one question!`);
            return false;
        }

        let fullQuestions = questions.every(question => {
            return Boolean(question.name.length) && question.options.every(option => Boolean(option.name.length))
        });

        if (!fullQuestions) {
            showErrorAlert('All your question must have no empty fields');
            return false;
        }

        let hasAllQuestionsMarkedAnswer = questions.every(question => {
            return question.options.some(option => option.isCorrect);
        });

        if (!hasAllQuestionsMarkedAnswer) {
            showErrorAlert('Please, mark in all your questions correct answer!');
            return false;
        }

        let hasUniqueOptions = questions.every(question => {
            let optionNames = question.options.map(option => option.name);
            return optionNames.every((option, index) => index === optionNames.indexOf(option));
        });

        if (!hasUniqueOptions) {
            showErrorAlert('One question must must unique option name!');
            return false;
        }

        return true;
    }

    @autobind
    generateDataFile() {
        let {
            TestConfigurator: {
                result: {
                    title,
                    shareUrl,
                    time
                }
            },
            questions
        } = this.props;

        let dataToUpload = {
            title,
            time,
            shareUrl,
            questions
        };

        if (!this.validateQuiz(dataToUpload)) {
            return false;
        }

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = 'display: none';
        a.classList.add('downloadLink');
        const data = CryptoJS.AES.encrypt(JSON.stringify(dataToUpload), secret);
        const blob = new Blob([data], {type: "text/plain"});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${title} [${sha1(new Date().getTime())}].json`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.querySelector('.downloadLink').remove();
    }

    componentWillUnmount() {
        let {cleanup} = this.props;
        cleanup();
    }

    render() {
        let {
            TestConfigurator: {
                result: {
                    title,
                    shareUrl,
                    time
                }
            },
            addQuestion,
            changeTest
        } = this.props;

        return (
            <Paper className={ 'app-test-configurator' }>
                <TextField
                    name="title"
                    className={ 'quiz-title' }
                    label="Quiz title"
                    value={ title }
                    onChange={ this.onChangeTest }
                    margin="normal"
                />

                <TextField
                    name="shareUrl"
                    className={ 'quiz-share-url' }
                    label="Shared url"
                    placeholder={ 'http://your-site.com' }
                    value={ shareUrl }
                    onChange={ this.onChangeTest }
                    margin="normal"
                />
                <TimerConfigurator changeTest={ changeTest } time={ time }/>
                { this.mapQuestions() }

                <div className="controls-container">
                    <Tooltip title="Add question">
                        <IconButton aria-label="Add"
                                    onClick={ addQuestion }>
                            <AddIconCircle/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Generate data source">
                        <IconButton aria-label="Add" onClick={ this.generateDataFile }>
                            <DownloadIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Paper>
        );
    }
}

TestConfigurator.propTypes = {};
TestConfigurator.defaultProps = {};
