import { RESOURCE_ICON_NAMES } from '../../icons/sprites/Resources/names';
import { CODEBASE_ICON_PATTERNS, getIconByPattern } from './index';

describe('getIconByPattern', () => {
  describe('Language patterns', () => {
    test('should match javascript correctly (not java)', () => {
      expect(getIconByPattern('javascript')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('JavaScript')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('js')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('JS')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('node')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('Node')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
    });

    test('should match java correctly', () => {
      expect(getIconByPattern('java')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('Java')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('JAVA')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java8')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java11')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java17')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java21')).toBe(RESOURCE_ICON_NAMES.JAVA);
    });

    test('should match python correctly', () => {
      expect(getIconByPattern('python')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('Python')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('PYTHON')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('python-3.8')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('python-3.9')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('python-3.10')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('python-3.11')).toBe(RESOURCE_ICON_NAMES.PYTHON);
    });

    test('should match groovy correctly', () => {
      expect(getIconByPattern('groovy')).toBe(RESOURCE_ICON_NAMES.GROOVY_PIPELINE);
      expect(getIconByPattern('Groovy')).toBe(RESOURCE_ICON_NAMES.GROOVY_PIPELINE);
    });

    test('should match hcl and terraform correctly', () => {
      expect(getIconByPattern('hcl')).toBe(RESOURCE_ICON_NAMES.TERRAFORM);
      expect(getIconByPattern('HCL')).toBe(RESOURCE_ICON_NAMES.TERRAFORM);
      expect(getIconByPattern('terraform')).toBe(RESOURCE_ICON_NAMES.TERRAFORM);
      expect(getIconByPattern('Terraform')).toBe(RESOURCE_ICON_NAMES.TERRAFORM);
    });

    test('should match rego and opa correctly', () => {
      expect(getIconByPattern('rego')).toBe(RESOURCE_ICON_NAMES.OPA);
      expect(getIconByPattern('Rego')).toBe(RESOURCE_ICON_NAMES.OPA);
      expect(getIconByPattern('opa')).toBe(RESOURCE_ICON_NAMES.OPA);
      expect(getIconByPattern('OPA')).toBe(RESOURCE_ICON_NAMES.OPA);
    });

    test('should match container and docker correctly', () => {
      expect(getIconByPattern('container')).toBe(RESOURCE_ICON_NAMES.CONTAINER);
      expect(getIconByPattern('Container')).toBe(RESOURCE_ICON_NAMES.CONTAINER);
      expect(getIconByPattern('docker')).toBe(RESOURCE_ICON_NAMES.DOCKER);
      expect(getIconByPattern('Docker')).toBe(RESOURCE_ICON_NAMES.DOCKER);
    });

    test('should match helm correctly', () => {
      expect(getIconByPattern('helm')).toBe(RESOURCE_ICON_NAMES.HELM);
      expect(getIconByPattern('Helm')).toBe(RESOURCE_ICON_NAMES.HELM);
    });

    test('should match go correctly', () => {
      expect(getIconByPattern('go')).toBe(RESOURCE_ICON_NAMES.GO);
      expect(getIconByPattern('Go')).toBe(RESOURCE_ICON_NAMES.GO);
      expect(getIconByPattern('GO')).toBe(RESOURCE_ICON_NAMES.GO);
    });

    test('should match csharp, dotnet, and .net correctly', () => {
      expect(getIconByPattern('csharp')).toBe(RESOURCE_ICON_NAMES.C_SHARP);
      expect(getIconByPattern('CSharp')).toBe(RESOURCE_ICON_NAMES.C_SHARP);
      expect(getIconByPattern('dotnet')).toBe(RESOURCE_ICON_NAMES.DOTNET);
      expect(getIconByPattern('DotNet')).toBe(RESOURCE_ICON_NAMES.DOTNET);
      expect(getIconByPattern('.net')).toBe(RESOURCE_ICON_NAMES.C_SHARP);
      expect(getIconByPattern('.NET')).toBe(RESOURCE_ICON_NAMES.C_SHARP);
    });

    test('should match exact "c" correctly', () => {
      expect(getIconByPattern('c')).toBe(RESOURCE_ICON_NAMES.C);
      expect(getIconByPattern('C')).toBe(RESOURCE_ICON_NAMES.C);
    });

    test('should match cpp and c++ correctly', () => {
      expect(getIconByPattern('cpp')).toBe(RESOURCE_ICON_NAMES.CPP);
      expect(getIconByPattern('CPP')).toBe(RESOURCE_ICON_NAMES.CPP);
      expect(getIconByPattern('c++')).toBe(RESOURCE_ICON_NAMES.CPP);
      expect(getIconByPattern('C++')).toBe(RESOURCE_ICON_NAMES.CPP);
    });
  });

  describe('Framework patterns', () => {
    test('should match nextjs and next correctly', () => {
      expect(getIconByPattern('nextjs')).toBe(RESOURCE_ICON_NAMES.NEXTJS);
      expect(getIconByPattern('NextJS')).toBe(RESOURCE_ICON_NAMES.NEXTJS);
      expect(getIconByPattern('next')).toBe(RESOURCE_ICON_NAMES.NEXTJS);
      expect(getIconByPattern('Next')).toBe(RESOURCE_ICON_NAMES.NEXTJS);
    });

    test('should match operator-sdk correctly', () => {
      expect(getIconByPattern('operator-sdk')).toBe(RESOURCE_ICON_NAMES.OPERATOR_SDK);
      expect(getIconByPattern('Operator-SDK')).toBe(RESOURCE_ICON_NAMES.OPERATOR_SDK);
    });

    test('should match fastapi correctly', () => {
      expect(getIconByPattern('fastapi')).toBe(RESOURCE_ICON_NAMES.FASTAPI);
      expect(getIconByPattern('FastAPI')).toBe(RESOURCE_ICON_NAMES.FASTAPI);
    });

    test('should match react correctly', () => {
      expect(getIconByPattern('react')).toBe(RESOURCE_ICON_NAMES.REACT);
      expect(getIconByPattern('React')).toBe(RESOURCE_ICON_NAMES.REACT);
    });

    test('should match vue correctly', () => {
      expect(getIconByPattern('vue')).toBe(RESOURCE_ICON_NAMES.VUE);
      expect(getIconByPattern('Vue')).toBe(RESOURCE_ICON_NAMES.VUE);
    });

    test('should match express correctly', () => {
      expect(getIconByPattern('express')).toBe(RESOURCE_ICON_NAMES.EXPRESS);
      expect(getIconByPattern('Express')).toBe(RESOURCE_ICON_NAMES.EXPRESS);
    });

    test('should match angular correctly', () => {
      expect(getIconByPattern('angular')).toBe(RESOURCE_ICON_NAMES.ANGULAR);
      expect(getIconByPattern('Angular')).toBe(RESOURCE_ICON_NAMES.ANGULAR);
    });

    test('should match antora correctly', () => {
      expect(getIconByPattern('antora')).toBe(RESOURCE_ICON_NAMES.ANTORA);
      expect(getIconByPattern('Antora')).toBe(RESOURCE_ICON_NAMES.ANTORA);
    });

    test('should match codenarc correctly', () => {
      expect(getIconByPattern('codenarc')).toBe(RESOURCE_ICON_NAMES.CODENARC);
      expect(getIconByPattern('CodeNarc')).toBe(RESOURCE_ICON_NAMES.CODENARC);
    });

    test('should match terraform correctly', () => {
      expect(getIconByPattern('terraform')).toBe(RESOURCE_ICON_NAMES.TERRAFORM);
      expect(getIconByPattern('Terraform')).toBe(RESOURCE_ICON_NAMES.TERRAFORM);
    });

    test('should match opa correctly', () => {
      expect(getIconByPattern('opa')).toBe(RESOURCE_ICON_NAMES.OPA);
      expect(getIconByPattern('OPA')).toBe(RESOURCE_ICON_NAMES.OPA);
    });

    test('should match docker correctly', () => {
      expect(getIconByPattern('docker')).toBe(RESOURCE_ICON_NAMES.DOCKER);
      expect(getIconByPattern('Docker')).toBe(RESOURCE_ICON_NAMES.DOCKER);
    });

    test('should match pipeline and tekton correctly', () => {
      expect(getIconByPattern('pipeline')).toBe(RESOURCE_ICON_NAMES.TEKTON);
      expect(getIconByPattern('Pipeline')).toBe(RESOURCE_ICON_NAMES.TEKTON);
      expect(getIconByPattern('tekton')).toBe(RESOURCE_ICON_NAMES.TEKTON);
      expect(getIconByPattern('Tekton')).toBe(RESOURCE_ICON_NAMES.TEKTON);
    });

    test('should match beego correctly', () => {
      expect(getIconByPattern('beego')).toBe(RESOURCE_ICON_NAMES.BEEGO);
      expect(getIconByPattern('Beego')).toBe(RESOURCE_ICON_NAMES.BEEGO);
    });

    test('should match flask correctly', () => {
      expect(getIconByPattern('flask')).toBe(RESOURCE_ICON_NAMES.FLASK);
      expect(getIconByPattern('Flask')).toBe(RESOURCE_ICON_NAMES.FLASK);
    });

    test('should match charts correctly', () => {
      expect(getIconByPattern('charts')).toBe(RESOURCE_ICON_NAMES.HELM);
      expect(getIconByPattern('Charts')).toBe(RESOURCE_ICON_NAMES.HELM);
    });

    test('should match aws correctly', () => {
      expect(getIconByPattern('aws')).toBe(RESOURCE_ICON_NAMES.AWS);
      expect(getIconByPattern('AWS')).toBe(RESOURCE_ICON_NAMES.AWS);
    });

    test('should match gin correctly', () => {
      expect(getIconByPattern('gin')).toBe(RESOURCE_ICON_NAMES.GIN);
      expect(getIconByPattern('Gin')).toBe(RESOURCE_ICON_NAMES.GIN);
    });

    test('should match gitops correctly', () => {
      expect(getIconByPattern('gitops')).toBe(RESOURCE_ICON_NAMES.GIT_OPS);
      expect(getIconByPattern('GitOps')).toBe(RESOURCE_ICON_NAMES.GIT_OPS);
    });

    test('should match ansible correctly', () => {
      expect(getIconByPattern('ansible')).toBe(RESOURCE_ICON_NAMES.ANSIBLE);
      expect(getIconByPattern('Ansible')).toBe(RESOURCE_ICON_NAMES.ANSIBLE);
    });
  });

  describe('Build tool patterns', () => {
    test('should match cmake correctly (before make)', () => {
      expect(getIconByPattern('cmake')).toBe(RESOURCE_ICON_NAMES.C_MAKE);
      expect(getIconByPattern('CMake')).toBe(RESOURCE_ICON_NAMES.C_MAKE);
    });

    test('should match npm, yarn, and pnpm correctly', () => {
      expect(getIconByPattern('npm')).toBe(RESOURCE_ICON_NAMES.NPM);
      expect(getIconByPattern('NPM')).toBe(RESOURCE_ICON_NAMES.NPM);
      expect(getIconByPattern('yarn')).toBe(RESOURCE_ICON_NAMES.NPM);
      expect(getIconByPattern('Yarn')).toBe(RESOURCE_ICON_NAMES.NPM);
      expect(getIconByPattern('pnpm')).toBe(RESOURCE_ICON_NAMES.PNPM);
      expect(getIconByPattern('PNPM')).toBe(RESOURCE_ICON_NAMES.PNPM);
    });

    test('should match gradle correctly', () => {
      expect(getIconByPattern('gradle')).toBe(RESOURCE_ICON_NAMES.GRADLE);
      expect(getIconByPattern('Gradle')).toBe(RESOURCE_ICON_NAMES.GRADLE);
    });

    test('should match maven correctly', () => {
      expect(getIconByPattern('maven')).toBe(RESOURCE_ICON_NAMES.MAVEN);
      expect(getIconByPattern('Maven')).toBe(RESOURCE_ICON_NAMES.MAVEN);
    });

    test('should match dotnet correctly', () => {
      expect(getIconByPattern('dotnet')).toBe(RESOURCE_ICON_NAMES.DOTNET);
      expect(getIconByPattern('DotNet')).toBe(RESOURCE_ICON_NAMES.DOTNET);
      expect(getIconByPattern('dotnet-3.1')).toBe(RESOURCE_ICON_NAMES.DOTNET);
      expect(getIconByPattern('dotnet-6.0')).toBe(RESOURCE_ICON_NAMES.DOTNET);
      expect(getIconByPattern('dotnet-7.0')).toBe(RESOURCE_ICON_NAMES.DOTNET);
    });

    test('should match kaniko correctly', () => {
      expect(getIconByPattern('kaniko')).toBe(RESOURCE_ICON_NAMES.KANIKO);
      expect(getIconByPattern('Kaniko')).toBe(RESOURCE_ICON_NAMES.KANIKO);
    });

    test('should match make correctly', () => {
      expect(getIconByPattern('make')).toBe(RESOURCE_ICON_NAMES.MAKE);
      expect(getIconByPattern('Make')).toBe(RESOURCE_ICON_NAMES.MAKE);
    });
  });

  describe('Edge cases and fallbacks', () => {
    test('should return fallback icon for unknown values', () => {
      expect(getIconByPattern('unknown-language')).toBe(RESOURCE_ICON_NAMES.OTHER);
      expect(getIconByPattern('random-framework')).toBe(RESOURCE_ICON_NAMES.OTHER);
      expect(getIconByPattern('custom-tool')).toBe(RESOURCE_ICON_NAMES.OTHER);
    });

    test('should return fallback icon for null/undefined values', () => {
      expect(getIconByPattern(null)).toBe(RESOURCE_ICON_NAMES.OTHER);
      expect(getIconByPattern(undefined)).toBe(RESOURCE_ICON_NAMES.OTHER);
      expect(getIconByPattern('')).toBe(RESOURCE_ICON_NAMES.OTHER);
    });

    test('should return custom fallback icon when provided', () => {
      expect(getIconByPattern('unknown', RESOURCE_ICON_NAMES.NONE)).toBe(RESOURCE_ICON_NAMES.NONE);
      expect(getIconByPattern(null, RESOURCE_ICON_NAMES.NONE)).toBe(RESOURCE_ICON_NAMES.NONE);
    });

    test('should handle case-insensitive matching', () => {
      expect(getIconByPattern('JAVASCRIPT')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('JavaScript')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('javascript')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
    });

    test('should handle partial matches correctly', () => {
      // These should NOT match if they're not in the patterns
      expect(getIconByPattern('jav')).toBe(RESOURCE_ICON_NAMES.OTHER);
      expect(getIconByPattern('pyth')).toBe(RESOURCE_ICON_NAMES.OTHER);
      expect(getIconByPattern('reactjs')).toBe(RESOURCE_ICON_NAMES.OTHER);
    });
  });

  describe('Pattern ordering verification', () => {
    test('should have both javascript and java patterns present', () => {
      const javascriptIndex = CODEBASE_ICON_PATTERNS.findIndex((pattern) =>
        pattern.pattern.source.includes('javascript')
      );
      const javaIndex = CODEBASE_ICON_PATTERNS.findIndex((pattern) =>
        pattern.pattern.source.includes('^java')
      );
      expect(javascriptIndex).toBeGreaterThan(-1);
      expect(javaIndex).toBeGreaterThan(-1);
    });

    test('should verify cmake comes before make in patterns', () => {
      const cmakeIndex = CODEBASE_ICON_PATTERNS.findIndex(
        (pattern) => pattern.pattern.source === '^cmake$'
      );
      const makeIndex = CODEBASE_ICON_PATTERNS.findIndex(
        (pattern) => pattern.pattern.source === '^make$'
      );

      expect(cmakeIndex).toBeLessThan(makeIndex);
      expect(cmakeIndex).toBeGreaterThan(-1);
      expect(makeIndex).toBeGreaterThan(-1);
    });

    test('should verify nextjs comes before react in patterns', () => {
      const nextjsIndex = CODEBASE_ICON_PATTERNS.findIndex((pattern) =>
        pattern.pattern.source.includes('nextjs')
      );
      const reactIndex = CODEBASE_ICON_PATTERNS.findIndex(
        (pattern) => pattern.pattern.source === '^react$'
      );

      expect(nextjsIndex).toBeLessThan(reactIndex);
      expect(nextjsIndex).toBeGreaterThan(-1);
      expect(reactIndex).toBeGreaterThan(-1);
    });
  });

  describe('Real-world scenarios', () => {
    test('should handle common language variations', () => {
      // Common variations developers might use
      expect(getIconByPattern('javascript')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('js')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('node.js')).toBe(RESOURCE_ICON_NAMES.JAVASCRIPT);
      expect(getIconByPattern('typescript')).toBe(RESOURCE_ICON_NAMES.OTHER); // Not in patterns
    });

    test('should handle framework variations', () => {
      expect(getIconByPattern('react')).toBe(RESOURCE_ICON_NAMES.REACT);
      expect(getIconByPattern('reactjs')).toBe(RESOURCE_ICON_NAMES.OTHER); // Not in patterns
      expect(getIconByPattern('next')).toBe(RESOURCE_ICON_NAMES.NEXTJS);
      expect(getIconByPattern('nextjs')).toBe(RESOURCE_ICON_NAMES.NEXTJS);
    });

    test('should handle build tool variations', () => {
      expect(getIconByPattern('npm')).toBe(RESOURCE_ICON_NAMES.NPM);
      expect(getIconByPattern('yarn')).toBe(RESOURCE_ICON_NAMES.NPM);
      expect(getIconByPattern('pnpm')).toBe(RESOURCE_ICON_NAMES.PNPM);
      expect(getIconByPattern('webpack')).toBe(RESOURCE_ICON_NAMES.OTHER); // Not in patterns
    });

    test('should handle versioned frameworks correctly', () => {
      // Specific case that was failing
      expect(getIconByPattern('python-3.8')).toBe(RESOURCE_ICON_NAMES.PYTHON);

      // Other common versioned frameworks
      expect(getIconByPattern('java8')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java11')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java17')).toBe(RESOURCE_ICON_NAMES.JAVA);
      expect(getIconByPattern('java21')).toBe(RESOURCE_ICON_NAMES.JAVA);

      // Python versions
      expect(getIconByPattern('python-3.9')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('python-3.10')).toBe(RESOURCE_ICON_NAMES.PYTHON);
      expect(getIconByPattern('python-3.11')).toBe(RESOURCE_ICON_NAMES.PYTHON);
    });
  });
});
