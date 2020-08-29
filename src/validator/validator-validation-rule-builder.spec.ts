import faker from 'faker';
import ValidatorValidationRuleBuilder from '@/validator/validator-validation-rule-builder';
import {
  ValidatorRequiredValidationRule,
  ValidatorEmailValidationRule,
  ValidatorIntegerValidationRule,
  ValidatorMinLengthValidationRule,
  ValidatorInValidationRule,
  ValidatorJsonValidationRule,
  ValidatorUrlValidationRule,
  ValidatorNumericValidationRule,
  ValidatorEqualsValidationRule,
  ValidatorRegexValidationRule,
  ValidatorAlphanumericValidationRule,
  ValidatorBooleanValidationRule,
} from '@/validator/rules';
import ValidatorSlugValidationRule from './rules/validator-slug-validation-rule';

const makeSut = (): ValidatorValidationRuleBuilder => new ValidatorValidationRuleBuilder();

describe('Validator validation builder', () => {
  it('registers a RequiredValidationRule', () => {
    const sut = makeSut().required();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorRequiredValidationRule);
  });

  it('registers an EmailValidationRule', () => {
    const sut = makeSut().email();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorEmailValidationRule);
  });

  it('registers an IntegerValidationRule', () => {
    const sut = makeSut().integer();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorIntegerValidationRule);
  });

  it('registers a MinLengthValidationRule', () => {
    const sut = makeSut().minLength(faker.random.number().toString());

    expect(sut.rules[0]).toBeInstanceOf(ValidatorMinLengthValidationRule);
  });

  it('registers a InValidationRule', () => {
    const sut = makeSut().in('');

    expect(sut.rules[0]).toBeInstanceOf(ValidatorInValidationRule);
  });

  it('registers a ValidatorJsonValidationRule', () => {
    const sut = makeSut().json();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorJsonValidationRule);
  });

  it('registers a ValidatorUrlValidationRule', () => {
    const sut = makeSut().url();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorUrlValidationRule);
  });

  it('registers a ValidatorNumericValidationRule', () => {
    const sut = makeSut().numeric();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorNumericValidationRule);
  });

  it('registers a ValidatorEqualsValidationRule', () => {
    const sut = makeSut().equals('');

    expect(sut.rules[0]).toBeInstanceOf(ValidatorEqualsValidationRule);
  });

  it('registers a ValidatorRegexValidationRule', () => {
    const sut = makeSut().regex('');

    expect(sut.rules[0]).toBeInstanceOf(ValidatorRegexValidationRule);
  });

  it('registers a ValidatorAlphanumericValidationRule', () => {
    const sut = makeSut().alphanumeric();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorAlphanumericValidationRule);
  });

  it('registers a ValidatorBooleanValidationRule', () => {
    const sut = makeSut().boolean();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorBooleanValidationRule);
  });

  it('registers a ValidatorSlugValidationRule', () => {
    const sut = makeSut().slug();

    expect(sut.rules[0]).toBeInstanceOf(ValidatorSlugValidationRule);
  });

  it('returns all rules', () => {
    const rules = makeSut().required().build();

    expect(rules.length).toBe(1);
    expect(rules[0]).toBeInstanceOf(ValidatorRequiredValidationRule);
  });
});
