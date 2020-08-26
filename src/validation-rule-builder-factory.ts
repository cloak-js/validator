import ValidationRuleBuilder from './protocols/validation-rule-builder';
import ValidatorValidationRuleBuilder from './validator/validator-validation-rule-builder';

class ValidationRuleBuilderFactory {
  static make(): ValidationRuleBuilder {
    return new ValidatorValidationRuleBuilder();
  }
}

export default ValidationRuleBuilderFactory;
