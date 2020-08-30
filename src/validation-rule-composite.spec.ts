import faker from 'faker';
import ValidationRuleComposite from './validation-rule-composite';
import makeValidationParams from './tests/make-validation-params';
import ValidationRuleSpy from './tests/validation-rule-spy';

describe('Validation rule composite', () => {
  it('sets the name and value of the field correctly', () => {
    const sut = new ValidationRuleComposite();
    const params = makeValidationParams();

    const validation = sut.passes(params.name, params.value);

    expect(validation.name).toBe(params.name);
    expect(validation.value).toBe(params.value);
  });

  it('passes if it has no rules', () => {
    const sut = new ValidationRuleComposite();
    const params = makeValidationParams();

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('passes if all rules pass', () => {
    const sut = new ValidationRuleComposite([
      new ValidationRuleSpy(),
    ]);
    const params = makeValidationParams();

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeTruthy();
    expect(validation.messages.length).toBe(0);
  });

  it('fails when at least one of its rules fail', () => {
    const validationRuleSpy = new ValidationRuleSpy();
    const sut = new ValidationRuleComposite([
      validationRuleSpy,
    ]);
    const params = makeValidationParams();

    validationRuleSpy.validation.passed = false;
    validationRuleSpy.validation.messages = [faker.lorem.sentence()];

    const validation = sut.passes(params.name, params.value);

    expect(validation.passed).toBeFalsy();
    expect(validation.messages.length).toBe(1);
  });
});
