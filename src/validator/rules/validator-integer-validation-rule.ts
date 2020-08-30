import validator from 'validator';
import { Validation } from '@/protocols/validation';
import { ValidationRule } from '@/protocols/validation-rule';

export default class ValidatorIntegerValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isInt(value);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} must be an integer.`],
      value,
    };
  }
}
