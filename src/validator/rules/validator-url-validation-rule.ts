import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorUrlValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isURL(value);

    return {
      name,
      passed,
      messages: passed ? [] : [`The ${name} format is invalid.`],
      value,
    };
  }
}

export default ValidatorUrlValidationRule;
