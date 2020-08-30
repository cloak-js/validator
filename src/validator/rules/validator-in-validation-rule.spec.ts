import faker from 'faker';
import validator from 'validator';
import makeValidationParams from '@/tests/make-validation-params';
import { ValidatorInValidationRule } from '.';

jest.mock('validator');

describe('Validator in validation rule', () => {
  it('calls isIn with the correct values', () => {
    const options = [faker.random.word(), faker.random.word()];
    const fieldValue = faker.random.word();
    const rule = new ValidatorInValidationRule(options);

    const isInSpy = jest.spyOn(validator, 'isIn');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(isInSpy).toHaveBeenCalledWith(fieldValue, options);
  });

  it('sets the field name and value correctly', () => {
    const options = [faker.random.word(), faker.random.word()];
    const rule = new ValidatorInValidationRule(options);
    const params = makeValidationParams();

    jest.spyOn(validator, 'isIn');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.value).toBe(params.value);
  });

  it('passes if isIn returns true', () => {
    const options = [faker.random.word(), faker.random.word()];
    const rule = new ValidatorInValidationRule(options);
    const params = makeValidationParams();

    jest.spyOn(validator, 'isIn').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isIn returns false', () => {
    const options = [faker.random.word(), faker.random.word()];
    const rule = new ValidatorInValidationRule(options);
    const params = makeValidationParams();

    jest.spyOn(validator, 'isIn').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} is invalid.`);
  });
});
