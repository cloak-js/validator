/* eslint-disable @typescript-eslint/no-explicit-any */
import ValidationRuleComposite from './validation-rule-composite';
import ValidationRuleBuilderFactory from './validation-rule-builder-factory';

export default class ValidationRuleFactory {
  static make(rulesSpecification: string): ValidationRuleComposite {
    const builder = ValidationRuleBuilderFactory.make();

    rulesSpecification.split('|')
      .filter((ruleSpecification) => ruleSpecification)
      .forEach((ruleSpecification) => {
        const [rule, optionalParam] = ruleSpecification.split(':');

        if (rule && (builder as any)[rule] === undefined) {
          throw new Error(`Undefined validation rule ${rule}.`);
        }

        (builder as any)[rule](optionalParam);
      });

    return new ValidationRuleComposite(builder.build());
  }
}
