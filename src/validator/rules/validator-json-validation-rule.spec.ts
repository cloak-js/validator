import makeValidationParams from '@/tests/make-validation-params';
import validator from 'validator';
import faker from 'faker';
import { ValidatorJsonValidationRule } from '.';

jest.mock('validator');

describe('Validator JSON validation rule', () => {
  it('calls isJSON with the correct value', () => {
    const rule = new ValidatorJsonValidationRule();
    const fieldValue = faker.lorem.sentence();

    const isJsonSpy = jest.spyOn(validator, 'isJSON');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(isJsonSpy).toHaveBeenCalledWith(fieldValue);
  });

  it('sets the field name and value correctly', () => {
    const rule = new ValidatorJsonValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isJSON');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.value).toBe(params.value);
  });

  it('passes if isJSON returns true', () => {
    const rule = new ValidatorJsonValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isJSON').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isJSON returns false', () => {
    const rule = new ValidatorJsonValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isJSON').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} must be a valid JSON string.`);
  });
});
