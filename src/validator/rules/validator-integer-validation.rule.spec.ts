import faker from 'faker';
import validator from 'validator';
import makeValidationParams from '@/tests/make-validation-params';
import { ValidatorIntegerValidationRule } from '.';

jest.mock('validator');

describe('[Validator] integer validation rule', () => {
  it('calls isInt with the correct values', () => {
    const rule = new ValidatorIntegerValidationRule();
    const params = makeValidationParams();

    const isIntSpy = jest.spyOn(validator, 'isInt');

    rule.passes(faker.lorem.word(), params.value);

    expect(isIntSpy).toHaveBeenCalledWith(params.value);
  });

  it('passes if isInt returns true', () => {
    const rule = new ValidatorIntegerValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isInt').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages.length).toBe(0);
    expect(validation.received).toBe(params.value);
  });

  it('fails if isInt returns false', () => {
    const rule = new ValidatorIntegerValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isInt').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages[0]).toBe(`The ${params.name} must be an integer.`);
    expect(validation.received).toBe(params.value);
  });
});
