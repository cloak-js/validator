import ValidationRuleBuilderFactory from './validation-rule-builder-factory';
import ValidatorValidationRuleBuilder from './validator/validator-validation-rule-builder';

describe('Validation rule builder factory', () => {
  it('returns an instance of ValidatorValidationRuleBuilder', () => {
    const rule = ValidationRuleBuilderFactory.make();

    expect(rule).toBeInstanceOf(ValidatorValidationRuleBuilder);
  });
});
