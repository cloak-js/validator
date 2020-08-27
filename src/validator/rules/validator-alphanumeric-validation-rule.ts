import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';

class ValidatorAlphanumericValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    throw new Error('Method not implemented.');
  }
}

export default ValidatorAlphanumericValidationRule;
