import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { autobind } from 'core-decorators';

import { Timer } from '../Timer/';
import FormOptions from '../FormOptions/FormOptions';

import './Quiz.css';

export class Quiz extends Component {

    state = {
        selected: 0
    };

    @autobind
    onSelectOption(event) {
        let {answers, answerQuestion} = this.props;
        let {selected} = this.state;
        answers[selected] = event.target.value;

        answerQuestion(answers);
    };

    @autobind
    onAnswerClick() {
        let {selected} = this.state;
        this.clickAnswerSkip(selected);
    }

    @autobind
    changeQuestion(selected) {
        this.setState({selected});
    }

    @autobind
    onSkipClick() {
        let {answers, answerQuestion} = this.props;
        let {selected} = this.state;
        answers[selected] = null;

        answerQuestion(answers);
        this.clickAnswerSkip(selected + 1);
    }

    needToShowResults() {
        let {answers, data: {questions}} = this.props;
        return answers.length === questions.length && answers.every(answer => answer);
    }

    getSelectedIndex(selected) {
        let {data: {questions}, answers} = this.props;

        if (answers[selected]) {
            return this.getSelectedIndex(selected + 1);
        }

        if (selected >= questions.length) {
            return this.getSelectedIndex(0);
        }

        if (!answers[selected]) {
            return selected;
        }

    }

    clickAnswerSkip(selected) {
        let {finishTest} = this.props;

        let needToShowResults = this.needToShowResults();
        if (needToShowResults) {
            return finishTest();
        }

        let newIndex = this.getSelectedIndex(selected);

        this.changeQuestion(newIndex);
    }

    isAnswerDisabled() {
        let {answers} = this.props;
        let {selected} = this.state;
        return !answers[selected];
    }

    getQuestionByIndex() {
        let {selected} = this.state;
        let {data: {questions}} = this.props;
        return questions[selected];
    }

    render() {
        let question = this.getQuestionByIndex();
        let {data: {questions, time}, answers, finishTest} = this.props;
        let {name, options} = question;
        let {selected} = this.state;
        let value = answers[selected] || '';

        return (
            <div className={ 'app-test-form' }>
                <Typography
                    className={ 'app-test-form-question-title' }
                    variant="headline"
                    component="h3">
                    { name }
                </Typography>
                <div className="app-test-form__main-content">
                    <FormOptions
                        onChange={ this.onSelectOption }
                        value={ value }
                        options={ options }/>
                </div>

                <div className="app-form-buttons-block">
                    <Button variant="contained"
                            className={ 'answer-btn' }
                            disabled={ this.isAnswerDisabled() }
                            onClick={ this.onAnswerClick }
                            color="primary">
                        Answer
                    </Button>
                    <Button variant="contained"
                            color="secondary"
                            className={ 'skip-btn' }
                            onClick={ this.onSkipClick }>
                        Skip
                    </Button>
                    <Button variant="contained"
                            className={'finish-btn'}
                            color="secondary"
                            onClick={ finishTest }>
                        Finish
                    </Button>
                </div>
                <div className="app-test-form__bottom-content">
                    <Typography variant="subheading">
                        Question { selected + 1 } from { questions.length }
                    </Typography>
                    <Timer time={ time } finishTest={ finishTest }/>
                </div>
            </div>
        );
    }
}

Quiz.propTypes = {
    data: PropTypes.any,
    finishTest: PropTypes.func,
    answerQuestion: PropTypes.func
};
Quiz.defaultProps = {};
