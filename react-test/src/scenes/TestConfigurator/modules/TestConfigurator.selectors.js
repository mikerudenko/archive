import { createSelector } from 'reselect';

export const TestConfiguratorSelector = state => state.TestConfigurator;

export const optionsSelector = state => TestConfiguratorSelector(state).entities.options || [];
export const questionsSelector = state => TestConfiguratorSelector(state).entities.questions || [];
export const questionIdsSelector = state => TestConfiguratorSelector(state).result.questions || [];

export const questionsDataSelector = createSelector(questionsSelector, optionsSelector, questionIdsSelector,
    (questions, options, questionIds) => {
        return questionIds.map(questionId => {
            const question = questions[questionId];
            const questionOptions = question.options.map(optionId => options[optionId]);
            const selectedAnswer = questionOptions.some(option => option.isCorrect);
            return {...question, options: questionOptions, selectedAnswer}
        })
    });
