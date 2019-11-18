import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { OptionItem } from '../OptionItem/OptionItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIconBox from '@material-ui/icons/AddBox';

import { autobind } from 'core-decorators';

import './QuestionItem.css';

export class QuestionItem extends Component {

    mapOptions() {
        let {question: {options, selectedAnswer}, deleteOption, changeOption} = this.props;

        return options.map((option, index) => {
            let showDeleteOptionButton = options.length > 2;
            return (
                <OptionItem
                    selectedAnswer={ selectedAnswer }
                    option={ option }
                    changeOption={ changeOption }
                    index={ index }
                    key={ index }
                    deleteOption={ deleteOption }
                    showDeleteOptionButton={ showDeleteOptionButton }/>
            );
        });
    }

    @autobind
    addOption() {
        let {question: {id}, addOption} = this.props;
        addOption(id);
    }

    @autobind
    onChangeQuestion(event) {
        let {changeQuestion, question: {id}} = this.props;
        changeQuestion({name: event.target.value, id})
    }

    renderAddOptionButton() {
        let {question: {options}} = this.props;
        let showAddOptionButton = options.length < 4;

        return showAddOptionButton && (
            <Tooltip title={ 'Add Option' }>
                <IconButton onClick={ this.addOption } className={ 'add-option-button' }>
                    <AddIconBox/>
                </IconButton>
            </Tooltip>
        );
    }

    @autobind
    deleteQuestion() {
        let {question: {id}, deleteQuestion} = this.props;
        deleteQuestion(id);
    }

    render() {
        let {question: {name}} = this.props;

        return (
            <fieldset className={ 'question-item' }>
                <TextField
                    name={ "question-item-name" }
                    className={ "question-item-name" }
                    label={ "Question name" }
                    onChange={ this.onChangeQuestion }
                    value={ name }
                    margin={ 'normal' }
                />
                <div className="question-options-block">
                    { this.mapOptions() }
                </div>

                <div className="question-controls-block">
                    { this.renderAddOptionButton() }
                    <Tooltip title={ 'Delete question' }>
                        <IconButton onClick={ this.deleteQuestion } className={ 'delete-question-button' }>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </fieldset>
        );
    }
}

QuestionItem.propTypes = {
    deleteOption: PropTypes.func,
    changeQuestion: PropTypes.func,
    deleteQuestion: PropTypes.func,
    changeOption: PropTypes.func,
    addOption: PropTypes.func,
    question: PropTypes.object,
    id: PropTypes.string
};

QuestionItem.defaultProps = {};
