import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorBooleanValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isBoolean(value);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} field must be true or false.`],
      received: value,
    };
  }
}

export default ValidatorBooleanValidationRule;
