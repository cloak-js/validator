import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

export default class ValidatorRequiredValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = !validator.isEmpty(value);

    return {
      name,
      passed,
      messages: passed ? [] : [`The ${name} field is required.`],
      value,
    };
  }
}
