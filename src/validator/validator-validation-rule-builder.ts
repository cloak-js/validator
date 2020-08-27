import ValidationRuleBuilder from '@/protocols/validation-rule-builder';
import {
  ValidatorRequiredValidationRule,
  ValidatorEmailValidationRule,
  ValidatorIntegerValidationRule,
  ValidatorMinLengthValidationRule,
  ValidatorInValidationRule,
  ValidatorJsonValidationRule,
  ValidatorUrlValidationRule,
  ValidatorNumericValidationRule,
  ValidatorEqualsValidationRule,
  ValidatorRegexValidationRule,
  ValidatorAlphanumericValidationRule,
  ValidatorBooleanValidationRule,
} from '@/validator/rules';
import { ValidationRule } from '@/protocols/validation-rule';

class ValidatorValidationRuleBuilder implements ValidationRuleBuilder {
  public readonly rules: ValidationRule[];

  constructor() {
    this.rules = [];
  }

  required(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorRequiredValidationRule());

    return this;
  }

  email(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorEmailValidationRule());

    return this;
  }

  integer(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorIntegerValidationRule());

    return this;
  }

  minLength(min: string): ValidatorValidationRuleBuilder {
    const rule = new ValidatorMinLengthValidationRule(Number(min));

    this.rules.push(rule);

    return this;
  }

  in(options: string): ValidatorValidationRuleBuilder {
    const rule = new ValidatorInValidationRule(options.split(','));

    this.rules.push(rule);

    return this;
  }

  json(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorJsonValidationRule());

    return this;
  }

  url(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorUrlValidationRule());

    return this;
  }

  numeric(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorNumericValidationRule());

    return this;
  }

  alphanumeric(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorAlphanumericValidationRule());

    return this;
  }

  equals(value: string): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorEqualsValidationRule(value));

    return this;
  }

  regex(pattern: string): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorRegexValidationRule(pattern));

    return this;
  }

  boolean(): ValidatorValidationRuleBuilder {
    this.rules.push(new ValidatorBooleanValidationRule());

    return this;
  }

  build(): ValidationRule[] {
    return this.rules;
  }
}

export default ValidatorValidationRuleBuilder;
