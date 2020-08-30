import validator from 'validator';
import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';

export default class ValidatorEmailValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isEmail(value);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} must be a valid email address.`],
      value,
    };
  }
}
