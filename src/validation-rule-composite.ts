import { ValidationRule } from './protocols/validation-rule';
import { Validation } from './protocols/validation';

export default class ValidationRuleComposite implements ValidationRule {
  private readonly rules: ValidationRule[];

  constructor(rules: ValidationRule[] = []) {
    this.rules = rules;
  }

  passes(name: string, value: string): Validation {
    const validation: Validation = {
      name,
      passed: true,
      messages: [],
      value,
    };

    this.rules.forEach((rule) => {
      const validationResponse = rule.passes(name, value);

      if (!validationResponse.passed) {
        validation.passed = false;

        validation.messages = validation.messages.concat(validationResponse.messages);
      }
    });

    return validation;
  }
}
