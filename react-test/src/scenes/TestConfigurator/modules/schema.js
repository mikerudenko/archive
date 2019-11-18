import { schema } from 'normalizr';

export const option = new schema.Entity('options');
export const question = new schema.Entity('questions', {
    options: [option]
});

export const TestConfigurator = new schema.Object('TestConfigurator', {
    questions : [question],
});
