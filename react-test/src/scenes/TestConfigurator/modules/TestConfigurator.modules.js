import sha1 from 'sha1';
import * as schema from './schema';
import { normalize } from 'normalizr';

export const QUIZ_CHANGE = 'test-configurator/change';

export const QUESTION_CHANGE = 'test-configurator/question/change';
export const QUESTION_ADD = 'test-configurator/question/add';
export const QUESTION_DELETE = 'test-configurator/question/delete';

export const OPTION_CHANGE = 'test-configurator/option/change';
export const OPTION_DELETE = 'test-configurator/option/delete';
export const OPTION_ADD = 'test-configurator/option/add';
export const CLEANUP = 'test-configurator/cleanup';

const getInitialState = () => (
    normalize({
        title: '',
        shareUrl: 'http://',
        time: {
            minutes: 0,
            seconds: 0
        },
        questions: []
    }, schema.TestConfigurator)
);

export function reducer(state = getInitialState(), action) {
    switch (action.type) {
        case QUESTION_DELETE : {
            return {
                ...state,
                result: {
                    ...state.result,
                    questions: state.result.questions.filter(questionId => questionId !== action.id)
                },
                entities: {
                    ...state.entities,
                    questions: {
                        ...state.entities.questions,
                        [action.id]: null
                    }
                }
            };
        }

        case OPTION_DELETE: {
            let currentQuestion = state.entities.questions[action.questionId];
            let {id, questionId} = action;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    options: {
                        ...state.entities.options,
                        [id]: null
                    },
                    questions: {
                        ...state.entities.questions,
                        [questionId]: {
                            ...currentQuestion,
                            options: currentQuestion.options.filter(option => option !== id)
                        }
                    }
                }
            };
        }

        case QUESTION_CHANGE: {
            let id = action.question.id;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    questions: {
                        ...state.entities.questions,
                        [id]: {
                            ...state.entities.questions[id],
                            ...action.question
                        }
                    }
                }
            }
        }

        case OPTION_CHANGE: {
            let id = action.option.id;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    options: {
                        ...state.entities.options,
                        [id]: {
                            ...state.entities.options[id],
                            ...action.option
                        }
                    }
                }
            }
        }

        case QUESTION_ADD: {
            let {entities: {questions, options}, result} = normalize(action.question, schema.question);
            return {
                ...state,
                result: {
                    ...state.result,
                    questions: [...state.result.questions, result]
                },
                entities: {
                    ...state.entities,
                    questions: {
                        ...state.entities.questions,
                        ...questions
                    },
                    options: {
                        ...state.entities.options,
                        ...options
                    }
                }
            };
        }

        case OPTION_ADD: {
            let {questionId, id} = action.option;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    options: {
                        ...state.entities.options,
                        [action.option.id]: action.option
                    },
                    questions: {
                        ...state.entities.questions,
                        [questionId]: {
                            ...state.entities.questions[questionId],
                            options: state.entities.questions[questionId].options.concat(id)
                        }
                    }
                }
            }
        }

        case QUIZ_CHANGE: {
            return {
                ...state,
                result: {
                    ...state.result,
                    ...action.body
                }
            };
        }

        case CLEANUP: {
            return  getInitialState();
        }

        default:
            return state;
    }
}

export function changeOption(option) {
    return {
        type: OPTION_CHANGE,
        option
    }
}

export function deleteOption({id, questionId}) {
    return {
        type: OPTION_DELETE,
        questionId,
        id
    }
}

export function addQuestion() {
    let questionId = randomHash();

    return {
        type: QUESTION_ADD,
        question: {
            id: questionId,
            name: '',
            options: [
                {
                    id: randomHash(),
                    questionId,
                    isCorrect: false,
                    name: ''
                },
                {
                    id: randomHash(),
                    questionId,
                    isCorrect: false,
                    name: ''
                }
            ]
        }
    }
}

export function deleteQuestion(id) {
    return {
        type: QUESTION_DELETE,
        id
    }
}

export function changeQuestion(question) {
    return {
        type: QUESTION_CHANGE,
        question
    }
}

export function addOption(questionId) {
    return {
        type: OPTION_ADD,
        option: {
            id: randomHash(),
            questionId,
            isCorrect: false,
            name: ''
        }
    }
}

export function changeTest(body) {
    return {
        type: QUIZ_CHANGE,
        body
    }
}

export function cleanup() {
    return {
        type: CLEANUP
    }
}

const randomHash = () => sha1(Math.random().toString());
