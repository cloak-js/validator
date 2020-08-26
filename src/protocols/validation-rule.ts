import { Validation } from './validation';

export interface ValidationRule {
  passes(name: string, value: string): Validation;
}
