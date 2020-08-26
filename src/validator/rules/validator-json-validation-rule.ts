import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorJsonValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isJSON(value);

    return {
      name,
      passed,
      messages: passed ? [] : [`The ${name} must be a valid JSON string.`],
      received: value,
    };
  }
}

export default ValidatorJsonValidationRule;
