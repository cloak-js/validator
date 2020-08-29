import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';

class ValidatorSlugValidationRule implements ValidationRule {
  passes(name: string, value: string): Validation {
    throw new Error('Method not implemented.');
  }
}

export default ValidatorSlugValidationRule;
