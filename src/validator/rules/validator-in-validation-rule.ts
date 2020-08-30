import { Validation } from '@/protocols/validation';
import validator from 'validator';
import { ValidationRule } from '@/protocols/validation-rule';

class ValidatorInValidationRule implements ValidationRule {
  private readonly options: string[];

  constructor(options: string[]) {
    this.options = options;
  }

  passes(name: string, value: string): Validation {
    const passed = validator.isIn(value, this.options);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} is invalid.`],
      value,
    };
  }
}

export default ValidatorInValidationRule;
