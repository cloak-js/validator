import { ValidationRule } from './validation-rule';

interface ValidationRuleBuilder {
  required(): ValidationRuleBuilder;
  email(): ValidationRuleBuilder;
  integer(): ValidationRuleBuilder;
  minLength(min: string): ValidationRuleBuilder;
  in(values: string): ValidationRuleBuilder;
  json(): ValidationRuleBuilder;
  url(): ValidationRuleBuilder;
  numeric(): ValidationRuleBuilder;
  equals(value: string): ValidationRuleBuilder;
  regex(pattern: string): ValidationRuleBuilder;
  build(): ValidationRule[];
}

export default ValidationRuleBuilder;
