import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    }
});

class RadioButtonsGroup extends React.Component {

    mapOptions() {
        let {options} = this.props;

        return options.map((option, index) => {
            let {name, id} = option;
            return (
                <FormControlLabel
                    key={ index }
                    value={ id }
                    control={ <Radio/> }
                    label={ name }/>
            )
        });
    }

    render() {
        const {classes, value, onChange} = this.props;

        return (
            <div className={ classes.root }>
                <FormControl component="fieldset" className={ classes.formControl }>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        className={ classes.group }
                        value={ value }
                        onChange={ onChange }>
                        { this.mapOptions() }
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    options: PropTypes.array,
    value: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default withStyles(styles)(RadioButtonsGroup);
