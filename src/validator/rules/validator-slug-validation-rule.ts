import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

class ValidatorSlugValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    const passed = validator.isSlug(value);

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} format is invalid.`],
      value,
    };
  }
}

export default ValidatorSlugValidationRule;
