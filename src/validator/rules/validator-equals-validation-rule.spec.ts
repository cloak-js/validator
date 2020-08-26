import makeValidationParams from '@/tests/make-validation-params';
import validator from 'validator';
import faker from 'faker';
import { ValidatorEqualsValidationRule } from '.';

jest.mock('validator');

describe('Validator equals validation rule', () => {
  it('calls equals with the correct value', () => {
    const matchingValue = faker.lorem.word();
    const rule = new ValidatorEqualsValidationRule(matchingValue);
    const fieldValue = faker.lorem.sentence();

    const equalsSpy = jest.spyOn(validator, 'equals');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(equalsSpy).toHaveBeenCalledWith(fieldValue, matchingValue);
  });

  it('sets the field name and value correctly', () => {
    const matchingValue = faker.lorem.word();
    const rule = new ValidatorEqualsValidationRule(matchingValue);
    const params = makeValidationParams();

    jest.spyOn(validator, 'equals');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.received).toBe(params.value);
  });

  it('passes if equals returns true', () => {
    const matchingValue = faker.lorem.word();
    const rule = new ValidatorEqualsValidationRule(matchingValue);
    const params = makeValidationParams();

    jest.spyOn(validator, 'equals').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if equals returns false', () => {
    const matchingValue = faker.lorem.word();
    const rule = new ValidatorEqualsValidationRule(matchingValue);
    const params = makeValidationParams();

    jest.spyOn(validator, 'equals').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} is invalid.`);
  });
});
