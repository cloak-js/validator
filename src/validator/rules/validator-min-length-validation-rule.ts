import { ValidationRule } from '@/protocols/validation-rule';
import { Validation } from '@/protocols/validation';
import validator from 'validator';

export default class ValidatorMinLengthValidationRule implements ValidationRule {
  private readonly min: number;

  constructor(min: number) {
    this.min = min;
  }

  passes(name: string, value: string): Validation {
    const passed = validator.isLength(value, { min: this.min });

    return {
      passed,
      name,
      messages: passed ? [] : [`The ${name} must be at least ${this.min} characters.`],
      received: value,
    };
  }
}
