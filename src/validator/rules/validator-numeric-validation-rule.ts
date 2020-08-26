import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorNumericValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isNumeric(value);

    return {
      name,
      passed,
      messages: passed ? [] : [`The ${name} must be a number.`],
      received: value,
    };
  }
}

export default ValidatorNumericValidationRule;
