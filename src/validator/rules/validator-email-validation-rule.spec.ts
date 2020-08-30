import faker from 'faker';
import validator from 'validator';
import makeValidationParams, { ValidationParams } from '@/tests/make-validation-params';
import { ValidatorEmailValidationRule } from '.';

jest.mock('validator');

type SutTypes = {
  sut: ValidatorEmailValidationRule;
  params: ValidationParams;
}

const makeSut = (): SutTypes => ({
  sut: new ValidatorEmailValidationRule(),
  params: makeValidationParams(),
});

describe('[Validator] email validation rule', () => {
  it('calls isEmail with the correct values', () => {
    const { sut, params } = makeSut();

    const isEmailSpy = jest.spyOn(validator, 'isEmail');

    sut.passes(faker.lorem.word(), params.value);

    expect(isEmailSpy).toHaveBeenCalledWith(params.value);
  });

  it('passes if isEmail returns true', () => {
    const { sut, params } = makeSut();

    jest.spyOn(validator, 'isEmail').mockReturnValue(true);

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages.length).toBe(0);
    expect(validation.value).toBe(params.value);
  });

  it('fails if isEmail returns false', () => {
    const { sut, params } = makeSut();

    jest.spyOn(validator, 'isEmail').mockReturnValue(false);

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages[0]).toBe(`The ${params.name} must be a valid email address.`);
    expect(validation.value).toBe(params.value);
  });
});
