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
  BRANCH_NAME: [
    {
      pattern: /^.{1,}$/, // minimum 1 character
      message: 'Branch name must be at least 1 character long',
    },
    {
      pattern: /^[^\/\.\-]/, // cannot start with slash, dot, or dash
      message: 'Branch name cannot start with a slash (/), dot (.), or dash (-)',
    },
    {
      pattern: /[^\/\.\-]$/, // cannot end with slash, dot, or dash
      message: 'Branch name cannot end with a slash (/), dot (.), or dash (-)',
    },
    {
      pattern: /^(?!.*[\/\.\-]{2})/, // no consecutive slashes, dots, or dashes
      message: 'Branch name cannot contain consecutive slashes (/), dots (.), or dashes (-)',
    },
    {
      pattern:
        /^[a-zA-Z0-9\/\._\-а-яА-Я\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\uff00-\uffef@#$%!]+$/, // allows alphanumeric, slashes, dots, underscores, dashes, Cyrillic, CJK characters, and special characters @#$%!
      message: 'Branch name contains unsupported characters',
    },
  ],
};

export const validateField = (value: string, rules: ValidationRule[]) => {
  const ruleViolation = rules.find((rule) => !rule.pattern.test(value));
  return ruleViolation ? ruleViolation.message : true;
};
