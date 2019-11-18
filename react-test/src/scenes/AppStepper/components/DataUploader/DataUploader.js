import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SmileIcon from '@material-ui/icons/SentimentVerySatisfied';
import { autobind } from 'core-decorators';
import './DataUploader.css';

import { DefaultQuiz } from './DefaultQuiz';

const CryptoJS = require("crypto-js");

export class DataUploader extends Component {
    state = {
        disableStart: true,
        secret: 'qwjhdbwveghkuwgrj2341233refbdqwkdasxcadsf'
    };

    @autobind
    onFileSelected(evt) {
        let {setQuizData, showErrorAlert, showSuccessAlert} = this.props;
        let self = this;
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
            try {
                let quizData = JSON.parse(
                    CryptoJS
                        .AES
                        .decrypt(e.target.result, self.state.secret)
                        .toString(CryptoJS.enc.Utf8)
                );
                setQuizData(quizData);
                self.setState({disableStart: false});
                showSuccessAlert('Data was uploaded successfully!');
            } catch (e) {
                showErrorAlert('Error during file reading, please upload another file!')
            }
        };
        reader.readAsText(file);
    }

    @autobind
    onDefaultTestClick() {
        let {setQuizData, handleNext} = this.props;
        setQuizData(DefaultQuiz);
        handleNext();
    }

    render() {
        return (
            <div className={ 'data-uploader-container' }>
                <input id="raised-button-file"
                       onChange={ this.onFileSelected }
                       type="file"/>

                <div className="data-uploader-controls">
                    <label htmlFor="raised-button-file">
                        <Button
                            className={ 'upload-data-btn' }
                            letiant="contained"
                            variant="contained"
                            color="primary"
                            component="span">
                            Upload DATA&nbsp;
                            <CloudUploadIcon/>
                        </Button>
                    </label>
                    <Button
                        className={ 'start-quiz-btn' }
                        letiant="contained"
                        variant="contained"
                        component="span"
                        onClick={ this.props.handleNext }
                        disabled={ this.state.disableStart }
                    >
                        Start your quiz!
                        &nbsp;
                        <PlayArrowIcon/>
                    </Button>

                    <Button
                        className={ 'try-quiz-btn' }
                        letiant="contained"
                        variant="contained"
                        color="secondary"
                        component="span"
                        onClick={ this.onDefaultTestClick }
                    >
                        Try our quiz!
                        &nbsp;
                        <SmileIcon/>
                    </Button>
                </div>

            </div>
        );
    }
}

DataUploader.propTypes = {
    setQuizData: PropTypes.func,
    handleNext: PropTypes.func,
    showErrorAlert: PropTypes.func
};
