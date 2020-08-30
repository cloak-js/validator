import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorEqualsValidationRule implements ValidationRule {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  passes(name: string, value: string): Validation {
    const passed = validator.equals(value, this.value);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} is invalid.`],
      value,
    };
  }
}

export default ValidatorEqualsValidationRule;
