interface ValidationRule {
  pattern: RegExp;
  message: string;
}

export const validationRules: Record<string, ValidationRule[]> = {
  // TODO: to extend
  GIT_URL_PATH: [
    {
      pattern: /^[^\/].*[^\/]$/,
      message: 'String cannot start or end with a slash symbol',
    },
    {
      pattern: /^[a-zA-Z0-9].*$/,
      message: 'String has to start with an alphabet letter or a number',
    },
    {
      pattern: /^[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/,
      message: 'String can only contain alphanumeric characters, dash, and slash',
    },
  ],
};

export const validateField = (value: string, rules: ValidationRule[]) => {
  const ruleViolation = rules.find((rule) => !rule.pattern.test(value));
  return ruleViolation ? ruleViolation.message : true;
};
