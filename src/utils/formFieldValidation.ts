interface ValidationRule {
  pattern: RegExp;
  message: string;
}

export const validationRules: Record<string, ValidationRule[]> = {
  // TODO: to extend
  GIT_URL_PATH: [
    {
      pattern: /^[^/].*[^/]$/, // no leading/trailing slash
      message: 'String cannot start or end with a slash symbol',
    },
    {
      pattern: /^[a-zA-Z0-9]/, // must start with alphanumeric
      message: 'String has to start with an alphabet letter or a number',
    },
    {
      pattern: /^[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)*$/, // only alphanumeric, dot, dash, underscore and slashes
      message: 'Only alphanumeric characters, dot, dash, underscore and slashes are allowed',
    },
    {
      pattern: /^(?!.*[.]{2})/, // no consecutive dots
      message: 'Consecutive dots are not allowed',
    },
    {
      pattern: /^(?!.*[\/]{2})/, // no consecutive slashes
      message: 'Consecutive slashes are not allowed',
    },
  ],
  REPOSITORY_NAME: [
    {
      pattern: /^[^/].*[^/]$/, // no leading/trailing slash
      message: 'Repository name cannot start or end with a slash symbol',
    },
    {
      pattern: /^[a-zA-Z0-9]/, // must start with alphanumeric
      message: 'Repository name has to start with an alphabet letter or a number',
    },
    {
      pattern: /^[a-zA-Z0-9._-]+$/, // only alphanumeric, dot, dash, underscore
      message: 'Only alphanumeric characters, dot, dash, and underscore are allowed',
    },
    {
      pattern: /^(?!.*[.]{2})/, // no consecutive dots
      message: 'Consecutive dots are not allowed',
    },
    {
      pattern: /^(?!.*[\/]{2})/, // no consecutive slashes
      message: 'Consecutive slashes are not allowed',
    },
  ],
};

export const validateField = (value: string, rules: ValidationRule[]) => {
  const ruleViolation = rules.find((rule) => !rule.pattern.test(value));
  return ruleViolation ? ruleViolation.message : true;
};
