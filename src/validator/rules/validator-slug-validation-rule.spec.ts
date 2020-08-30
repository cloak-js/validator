import makeValidationParams from '@/tests/make-validation-params';
import validator from 'validator';
import faker from 'faker';
import { ValidatorSlugValidationRule } from '.';

jest.mock('validator');

describe('Validator isSlug validation rule', () => {
  it('calls isSlug with the correct value', () => {
    const rule = new ValidatorSlugValidationRule();
    const fieldValue = faker.lorem.sentence();

    const isSlug = jest.spyOn(validator, 'isSlug');

    rule.passes(faker.lorem.word(), fieldValue);

    expect(isSlug).toHaveBeenCalledWith(fieldValue);
  });

  it('sets the field name and value correctly', () => {
    const rule = new ValidatorSlugValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isSlug');

    const validation = rule.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.value).toBe(params.value);
  });

  it('passes if isSlug returns true', () => {
    const rule = new ValidatorSlugValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isSlug').mockReturnValue(true);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails if isSlug returns false', () => {
    const rule = new ValidatorSlugValidationRule();
    const params = makeValidationParams();

    jest.spyOn(validator, 'isSlug').mockReturnValue(false);

    const validation = rule.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages[0]).toBe(`The ${params.name} format is invalid.`);
  });
});
