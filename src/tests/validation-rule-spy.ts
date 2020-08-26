import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';

export default class ValidationRuleSpy implements ValidationRule {
  validation: Validation;

  constructor() {
    this.validation = {
      name: '',
      passed: true,
      messages: [],
      received: '',
    };
  }

  passes(name: string, value: string): Validation {
    return Object.assign(this.validation, { name, received: value });
  }
}
