import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorAlphanumericValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isAlphanumeric(value);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} may only contain letters and numbers.`],
      received: value,
    };
  }
}

export default ValidatorAlphanumericValidationRule;
