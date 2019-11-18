import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Block from '@material-ui/icons/Block';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';

import { autobind } from 'core-decorators';

import './Results.css';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    GooglePlusIcon,
    GooglePlusShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestShareButton,
    PinterestIcon

} from 'react-share';

export class Results extends Component {

    state = {
        starResult: 0,
        results: {
            correct: 0,
            failed: 0,
            unanswered: 0
        }
    };

    componentDidMount() {
        this.getResults();
    }

    static getStarResult({correct, total}) {
        return correct * 5 / total;
    }

    getResults() {
        let {answers, data: {questions}} = this.props;
        let {correct, failed, unanswered} = this.state.results;

        questions.forEach((question, index) => {
            let selectedOption = question.options.find(option => option.id === answers[index]) || {};

            if (selectedOption.isCorrect) {
                correct++;
            } else {
                failed++;
            }

        });

        this.setState({
            starResult: Results.getStarResult({correct, total: questions.length}),
            results: {
                correct,
                failed,
                unanswered
            }
        });
    }

    getSocialShareQuote() {
        let {data: {title}} = this.props;
        let {starResult} = this.state;

        return `Congratulations! Your score in quiz "${title}" is ${starResult.toFixed(2)} of 5.`;
    }

    getQuestionIcon(index) {
        let {data: {questions}, answers} = this.props;
        let selectedOption = questions[index].options.find(option => option.id === answers[index]) || {};

        return selectedOption.isCorrect
            ? <CheckCircle className={ 'correct-icon' }/>
            : <Block className={ 'failed-icon' }/>
    }

    mapQuestions() {
        let {data: {questions}} = this.props;
        return questions.map((question, index) => {
            let {name} = question;
            let correctAnswer = question.options.find(option => option.isCorrect).name;

            return (
                <Tooltip id="tooltip-left" key={ index } title={ correctAnswer } placement="left">
                    <div className="results-question-item">
                        { this.getQuestionIcon(index) }
                        <div className="results-question-item-title">
                            { name }
                        </div>
                    </div>
                </Tooltip>
            );
        });
    }

    @autobind
    onTryAnotherClick() {
        this.props.handleNext();
    }

    render() {
        let {starResult} = this.state;
        let {data: {shareUrl}} = this.props;
        let quote = this.getSocialShareQuote();

        return (
            <div className={ 'app-results' }>
                <Typography
                    variant="headline"
                    component="h3">
                    Your result is:
                </Typography>
                <StarRatings rating={ starResult } starRatedColor="gold" starDimension="40px" starSpacing="15px"/>

                <div className="questions-block">
                    { this.mapQuestions() }
                </div>

                <div className="results-bottom-block">
                    <div className="social-share-block">
                        <FacebookShareButton
                            url={ shareUrl }
                            quote={ quote }>
                            <FacebookIcon size={ 32 } round/>
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={ shareUrl }
                            quote={ quote }>
                            <TwitterIcon size={ 32 } round/>
                        </TwitterShareButton>

                        <GooglePlusShareButton
                            url={ shareUrl }
                            quote={ quote }>
                            <GooglePlusIcon size={ 32 } round/>
                        </GooglePlusShareButton>

                        <LinkedinShareButton
                            url={ shareUrl }
                            quote={ quote }>
                            <LinkedinIcon size={ 32 } round/>
                        </LinkedinShareButton>

                        <PinterestShareButton
                            media={ 'screen' }
                            url={ shareUrl }
                            quote={ quote }>
                            <PinterestIcon size={ 32 } round/>
                        </PinterestShareButton>
                    </div>

                    <Button
                        className={ 'play-quiz-btn' }
                        letiant="contained"
                        variant="contained"
                        color="secondary"
                        component="span"
                        onClick={ this.onTryAnotherClick }
                    >
                        Try another quiz!
                        &nbsp;
                        <PlayArrowIcon/>
                    </Button>
                </div>
            </div>
        );
    }
}

Results.propTypes = {
    handleNext: PropTypes.func,
    answers: PropTypes.array,
    data: PropTypes.object
};
