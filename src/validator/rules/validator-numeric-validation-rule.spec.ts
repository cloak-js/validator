import makeValidationParams from '@/tests/make-validation-params';
import validator from 'validator';
import faker from 'faker';
import { ValidatorNumericValidationRule } from '.';

jest.mock('validator');

describe('Validator numeric validation rule', () => {
  it('calls isNumeric with the correct value', () => {
    const rule = new ValidatorNumericValidationRule();
    const fieldValue = faker.lorem.sentence();

    const isNumericSpy = jest.spyOn(validator, 'isNumeric');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(isNumericSpy).toHaveBeenCalledWith(fieldValue);
  });

  it('sets the field name and value correctly', () => {
    const rule = new ValidatorNumericValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isNumeric');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.received).toBe(params.value);
  });

  it('passes if isNumeric returns true', () => {
    const rule = new ValidatorNumericValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isNumeric').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isNumeric returns false', () => {
    const rule = new ValidatorNumericValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isNumeric').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} must be a number.`);
  });
});
