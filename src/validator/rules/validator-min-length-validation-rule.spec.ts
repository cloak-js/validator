import faker from 'faker';
import validator from 'validator';
import makeValidationParams from '@/tests/make-validation-params';
import { ValidatorMinLengthValidationRule } from '.';

jest.mock('validator');

describe('[Validator] min length validation rule', () => {
  it('calls isLength with the correct values', () => {
    const minLength = faker.random.number();
    const rule = new ValidatorMinLengthValidationRule(minLength);
    const params = makeValidationParams();

    const isLengthSpy = jest.spyOn(validator, 'isLength');

    rule.passes(params.name, params.value);

    expect(isLengthSpy).toHaveBeenCalledWith(params.value, { min: minLength });
  });

  it('sets the field name and value correctly', () => {
    const minLength = faker.random.number();
    const rule = new ValidatorMinLengthValidationRule(minLength);
    const params = makeValidationParams();

    jest.spyOn(validator, 'isLength');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.received).toBe(params.value);
  });

  it('passes if isLength returns true', () => {
    const minLength = faker.random.number();
    const rule = new ValidatorMinLengthValidationRule(minLength);
    const params = makeValidationParams();

    jest.spyOn(validator, 'isLength').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isLength returns false', () => {
    const minLength = faker.random.number();
    const rule = new ValidatorMinLengthValidationRule(minLength);
    const params = makeValidationParams();

    jest.spyOn(validator, 'isLength').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} must be at least ${minLength} characters.`);
  });
});
