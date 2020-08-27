import faker from 'faker';
import validator from 'validator';
import makeValidationParams, { ValidationParams } from '@/tests/make-validation-params';
import { ValidatorBooleanValidationRule } from '.';

jest.mock('validator');

type SutTypes = {
  sut: ValidatorBooleanValidationRule;
  params: ValidationParams;
}

const makeSut = (): SutTypes => ({
  sut: new ValidatorBooleanValidationRule(),
  params: makeValidationParams(),
});

describe('Validator boolean validation rule', () => {
  it('calls isBoolean with the correct values', () => {
    const { sut, params } = makeSut();

    const isBooleanSpy = jest.spyOn(validator, 'isBoolean');

    sut.passes(faker.lorem.word(), params.value);

    expect(isBooleanSpy).toHaveBeenCalledWith(params.value);
  });

  it('passes if isBoolean returns true', () => {
    const { sut, params } = makeSut();

    jest.spyOn(validator, 'isBoolean').mockReturnValue(true);

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages.length).toBe(0);
    expect(validation.received).toBe(params.value);
  });

  it('fails if isBoolean returns false', () => {
    const { sut, params } = makeSut();

    jest.spyOn(validator, 'isBoolean').mockReturnValue(false);

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.name).toBe(params.name);
    expect(validation.messages[0]).toBe(`The ${params.name} field must be true or false.`);
    expect(validation.received).toBe(params.value);
  });
});
