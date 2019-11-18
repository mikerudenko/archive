import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import { autobind } from 'core-decorators';

import './OptionItem.css';

export class OptionItem extends Component {

    @autobind
    onChangeQuestionOptionName(event) {
        let {option, changeOption} = this.props;
        changeOption({...option, name: event.target.value});
    }

    @autobind
    onChangeQuestionOptionCorrect() {
        let {option, changeOption} = this.props;
        changeOption({...option, isCorrect: !option.isCorrect});
    }

    @autobind
    deleteOption() {
        let {option: {id, questionId}, deleteOption} = this.props;
        deleteOption({id, questionId});
    }

    renderDeleteOptionButton() {
        let {showDeleteOptionButton} = this.props;

        return showDeleteOptionButton && (
            <Tooltip title={ 'Delete option' }>
                <IconButton onClick={ this.deleteOption }>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        );
    }

    getCheckboxControl() {
        let {
            selectedAnswer,
            option: {isCorrect}
        } = this.props;
        return (
            <Checkbox color="default"
                      name={ 'isCorrect' }
                      checked={ isCorrect }
                      onChange={ this.onChangeQuestionOptionCorrect }
                      disabled={ selectedAnswer && !isCorrect }/>
        )
    }

    getCheckbox() {
        let {option: {isCorrect}, selectedAnswer} = this.props;

        if (isCorrect && selectedAnswer) {
            return (
                <Tooltip title={ 'Correct answer' }>
                    { this.getCheckboxControl() }
                </Tooltip>
            )
        }

        if (!isCorrect) {
            return selectedAnswer
                ? this.getCheckboxControl()
                : (
                    <Tooltip title={ 'Select this option to mark it correct' }>
                        { this.getCheckboxControl() }
                    </Tooltip>
                );
        }
    }

    render() {
        let {
            index,
            option: {name}
        } = this.props;

        return (
            <div className={ 'option-item' }>
                <TextField
                    label={ `Option ${index + 1}` }
                    value={ name }
                    onChange={ this.onChangeQuestionOptionName }
                    margin="normal"
                />
                { this.getCheckbox() }
                { this.renderDeleteOptionButton() }
            </div>
        );
    }
}

OptionItem.propTypes = {
    option: PropTypes.object,
    selectedAnswer: PropTypes.bool,
    index: PropTypes.number,
    deleteOption: PropTypes.func,
    showDeleteOptionButton: PropTypes.bool,
    changeOption: PropTypes.func
};
OptionItem.defaultProps = {};
