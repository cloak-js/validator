import makeValidationParams from '@/tests/make-validation-params';
import validator from 'validator';
import faker from 'faker';
import { ValidatorRegexValidationRule } from '.';

jest.mock('validator');

describe('Validator regex validation rule', () => {
  it('calls matches with the correct value', () => {
    const pattern = faker.lorem.word();
    const rule = new ValidatorRegexValidationRule(pattern);
    const fieldValue = faker.lorem.sentence();

    const matchesSpy = jest.spyOn(validator, 'matches');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(matchesSpy).toHaveBeenCalledWith(fieldValue, pattern);
  });

  it('sets the field name and value correctly', () => {
    const pattern = faker.lorem.word();
    const rule = new ValidatorRegexValidationRule(pattern);
    const params = makeValidationParams();

    jest.spyOn(validator, 'matches');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.value).toBe(params.value);
  });

  it('passes if matches returns true', () => {
    const pattern = faker.lorem.word();
    const rule = new ValidatorRegexValidationRule(pattern);
    const params = makeValidationParams();

    jest.spyOn(validator, 'matches').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if matches returns false', () => {
    const pattern = faker.lorem.word();
    const rule = new ValidatorRegexValidationRule(pattern);
    const params = makeValidationParams();

    jest.spyOn(validator, 'matches').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} format is invalid.`);
  });
});
