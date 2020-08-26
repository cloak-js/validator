import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorRegexValidationRule implements ValidationRule {
  private readonly pattern: string;

  constructor(pattern: string) {
    this.pattern = pattern;
  }

  passes(name: string, value: string): Validation {
    const passed = validator.matches(value, this.pattern);

    return {
      name,
      passed,
      messages: passed ? [] : [`The ${name} format is invalid.`],
      received: value,
    };
  }
}

export default ValidatorRegexValidationRule;
