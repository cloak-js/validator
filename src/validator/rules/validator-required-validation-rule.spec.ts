import faker from 'faker';
import validator from 'validator';
import makeValidationParams from '@/tests/make-validation-params';
import { ValidatorRequiredValidationRule } from '.';

jest.mock('validator');

describe('[Validator] required validation rule', () => {
  it('calls isEmpty with the correct value', () => {
    const rule = new ValidatorRequiredValidationRule();
    const fieldValue = faker.lorem.sentence();

    const isEmptySpy = jest.spyOn(validator, 'isEmpty');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(isEmptySpy).toHaveBeenCalledWith(fieldValue);
  });

  it('sets the field name and value correctly', () => {
    const rule = new ValidatorRequiredValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isEmpty');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.received).toBe(params.value);
  });

  it('passes if isEmpty returns false', () => {
    const rule = new ValidatorRequiredValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isEmpty').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isEmpty returns true', () => {
    const rule = new ValidatorRequiredValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isEmpty').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} field is required.`);
  });
});
