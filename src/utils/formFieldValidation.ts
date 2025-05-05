interface ValidationRule {
  pattern: RegExp;
  message: string;
}

export const validationRules: Record<string, ValidationRule[]> = {
  // TODO: to extend
  GIT_URL_PATH: [
    {
      pattern: /^[^/].*[^/]$/, // same: no leading/trailing slash
      message: 'String cannot start or end with a slash symbol',
    },
    {
      pattern: /^[a-zA-Z0-9]/, // must start with alphanumeric
      message: 'String has to start with an alphabet letter or a number',
    },
    {
      pattern: /^(?!.*[.]{2})(?!.*[\/]{2})[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)*$/,
      message:
        'Only alphanumeric characters, dot, dash, underscore and slashes are allowed. Consecutive slashes or dots are not allowed.',
    },
  ],
};

export const validateField = (value: string, rules: ValidationRule[]) => {
  const ruleViolation = rules.find((rule) => !rule.pattern.test(value));
  return ruleViolation ? ruleViolation.message : true;
};
