function notEmptyValidator({fieldName, data, logger}) {
    let valid = data.length !== 0;

    if (!valid) {
        logger(`${fieldName} field must not be empty!`);
    }

    return valid;
}

function validateUrl({fieldName, data, logger}) {
    let pattern = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})');

    let valid = pattern.test(data);

    if (!valid) {
        logger(`${fieldName} field does not correspond to url pattern!`)
    }

    return valid;
}

export class ValidationService {

    static notEmptyValidator = notEmptyValidator;

    static validateUrl = validateUrl;

    static validators = {
        title: [notEmptyValidator],
        shareUrl: [notEmptyValidator, validateUrl]
    };

    static validateData({dataToUpload, showErrorAlert}) {
        let validFormData = true;
        Object.keys(dataToUpload).forEach(fieldName => {
            if (!ValidationService.validators[fieldName]) {
                return false;
            }

            validFormData = validFormData && (
                ValidationService.validators[fieldName]
                    .every(validator => validator({
                        fieldName,
                        data: dataToUpload[fieldName],
                        logger: showErrorAlert
                    }))
            );
        });

        return validFormData;
    }
}
