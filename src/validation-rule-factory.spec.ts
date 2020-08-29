import faker from 'faker';
import ValidationBuilderSpy from './tests/validation-builder-spy';
import ValidationRuleFactory from './validation-rule-factory';
import ValidationRuleBuilderFactory from './validation-rule-builder-factory';

jest.mock('./validation-rule-builder-factory');

describe('Validation rule factory', () => {
  it('works without any rule specifications', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const rule = ValidationRuleFactory.make('');

    expect(rule).toBeDefined();
    expect(builderSpy.rules.length).toBe(0);
  });

  it('throws an error if the rule is undefined', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    expect(() => {
      ValidationRuleFactory.make('invalid-rule');
    }).toThrow();
  });

  it('builds a RequiredValidationRule', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const requiredSpy = jest.spyOn(builderSpy, 'required');

    ValidationRuleFactory.make('required');

    expect(requiredSpy).toHaveBeenCalled();
  });

  it('builds an EmailValidationRule', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const emailSpy = jest.spyOn(builderSpy, 'email');

    ValidationRuleFactory.make('email');

    expect(emailSpy).toHaveBeenCalled();
  });

  it('builds an IntegerValidationRule', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const integerSpy = jest.spyOn(builderSpy, 'integer');

    ValidationRuleFactory.make('integer');

    expect(integerSpy).toHaveBeenCalled();
  });

  it('builds a MinLengthValidationRule with the correct values', () => {
    const minLength = faker.random.number();
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const minLengthSpy = jest.spyOn(builderSpy, 'minLength');

    ValidationRuleFactory.make(`minLength:${minLength}`);

    expect(minLengthSpy).toHaveBeenCalledWith(minLength.toString());
  });

  it('builds an InValidationRule with the correct values', () => {
    const options = `${faker.lorem.word()},${faker.lorem.word()}`;
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const inSpy = jest.spyOn(builderSpy, 'in');

    ValidationRuleFactory.make(`in:${options}`);

    expect(inSpy).toHaveBeenCalledWith(options);
  });

  it('builds an JsonValidationRule with the correct values', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const jsonSpy = jest.spyOn(builderSpy, 'json');

    ValidationRuleFactory.make('json');

    expect(jsonSpy).toHaveBeenCalled();
  });

  it('builds an UrlValidationRule with the correct values', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const urlSpy = jest.spyOn(builderSpy, 'url');

    ValidationRuleFactory.make('url');

    expect(urlSpy).toHaveBeenCalled();
  });

  it('builds an NumericValidationRule with the correct values', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const numericSpy = jest.spyOn(builderSpy, 'numeric');

    ValidationRuleFactory.make('numeric');

    expect(numericSpy).toHaveBeenCalled();
  });

  it('builds an EqualsValidationRule with the correct values', () => {
    const param = faker.lorem.word();
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const equalsSpy = jest.spyOn(builderSpy, 'equals');

    ValidationRuleFactory.make(`equals:${param}`);

    expect(equalsSpy).toHaveBeenCalledWith(param);
  });

  it('builds an RegexValidationRule with the correct values', () => {
    const pattern = faker.random.word();
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const regexSpy = jest.spyOn(builderSpy, 'regex');

    ValidationRuleFactory.make(`regex:${pattern}`);

    expect(regexSpy).toHaveBeenCalledWith(pattern);
  });

  it('builds an AlphanumericValidationRule with the correct values', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const alphanumericSpy = jest.spyOn(builderSpy, 'alphanumeric');

    ValidationRuleFactory.make('alphanumeric');

    expect(alphanumericSpy).toHaveBeenCalled();
  });

  it('builds a BooleanValidationRule with the correct values', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const booleanSpy = jest.spyOn(builderSpy, 'boolean');

    ValidationRuleFactory.make('boolean');

    expect(booleanSpy).toHaveBeenCalled();
  });

  it('builds a SlugValidationRule with the correct values', () => {
    const builderSpy = new ValidationBuilderSpy();

    jest.spyOn(ValidationRuleBuilderFactory, 'make').mockReturnValue(builderSpy);

    const slugSpy = jest.spyOn(builderSpy, 'slug');

    ValidationRuleFactory.make('slug');

    expect(slugSpy).toHaveBeenCalled();
  });
});
