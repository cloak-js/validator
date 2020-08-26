import makeValidationParams from '@/tests/make-validation-params';
import validator from 'validator';
import faker from 'faker';
import { ValidatorUrlValidationRule } from '.';

jest.mock('validator');

describe('Validator URL validation rule', () => {
  it('calls isURL with the correct value', () => {
    const rule = new ValidatorUrlValidationRule();
    const fieldValue = faker.lorem.sentence();

    const isUrlSpy = jest.spyOn(validator, 'isURL');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(isUrlSpy).toHaveBeenCalledWith(fieldValue);
  });

  it('sets the field name and value correctly', () => {
    const rule = new ValidatorUrlValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isURL');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.received).toBe(params.value);
  });

  it('passes if isURL returns true', () => {
    const rule = new ValidatorUrlValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isURL').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isURL returns false', () => {
    const rule = new ValidatorUrlValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isURL').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} format is invalid.`);
  });
});
