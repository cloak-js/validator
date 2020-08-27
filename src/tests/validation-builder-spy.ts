/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ValidationRuleBuilder from '@/protocols/validation-rule-builder';
import { ValidationRule } from '@/protocols/validation-rule';

export default class ValidationBuilderSpy implements ValidationRuleBuilder {
  public readonly rules: ValidationRule[];

  constructor() {
    this.rules = [];
  }

  required(): ValidationBuilderSpy {
    return {} as any;
  }

  email(): ValidationBuilderSpy {
    return {} as any;
  }

  integer(): ValidationBuilderSpy {
    return {} as any;
  }

  minLength(min: string): ValidationBuilderSpy {
    return {} as any;
  }

  in(options: string): ValidationBuilderSpy {
    return {} as any;
  }

  json(): ValidationBuilderSpy {
    return {} as any;
  }

  url(): ValidationBuilderSpy {
    return {} as any;
  }

  numeric(): ValidationBuilderSpy {
    return {} as any;
  }

  equals(value: string): ValidationBuilderSpy {
    return {} as any;
  }

  regex(pattern: string): ValidationBuilderSpy {
    return {} as any;
  }

  alphanumeric(): ValidationBuilderSpy {
    return {} as any;
  }

  boolean(): ValidationBuilderSpy {
    return {} as any;
  }

  build(): ValidationRule[] {
    return this.rules;
  }
}
