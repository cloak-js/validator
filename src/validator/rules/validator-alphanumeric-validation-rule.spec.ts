import faker from 'faker';
import validator from 'validator';
import makeValidationParams, { ValidationParams } from '@/tests/make-validation-params';
import { ValidatorAlphanumericValidationRule } from '.';

jest.mock('validator');

type SutTypes = {
  sut: ValidatorAlphanumericValidationRule;
  params: ValidationParams;
}

const makeSut = (): SutTypes => ({
  sut: new ValidatorAlphanumericValidationRule(),
  params: makeValidationParams(),
});

describe('Validator alphanumeric validation rule', () => {
  it('calls isAlphanumeric with the correct values', () => {
    const { sut, params } = makeSut();

    const isAlphanumericSpy = jest.spyOn(validator, 'isAlphanumeric');

    sut.passes(faker.lorem.word(), params.value);

    expect(isAlphanumericSpy).toHaveBeenCalledWith(params.value);
  });

  it('passes if isAlphanumeric returns true', () => {
    const { sut, params } = makeSut();

    jest.spyOn(validator, 'isAlphanumeric').mockReturnValue(true);

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages.length).toBe(0);
    expect(validation.value).toBe(params.value);
  });

  it('fails if isAlphanumeric returns false', () => {
    const { sut, params } = makeSut();

    jest.spyOn(validator, 'isAlphanumeric').mockReturnValue(false);

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages[0]).toBe(`The ${params.name} may only contain letters and numbers.`);
    expect(validation.value).toBe(params.value);
  });
});
