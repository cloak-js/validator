import faker from 'faker';

export type ValidationParams = {
  name: string;
  value: string;
}

const makeValidationParams = (): ValidationParams => ({
  name: faker.lorem.word(),
  value: faker.lorem.sentence(),
});

export default makeValidationParams;
