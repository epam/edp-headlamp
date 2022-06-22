import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { EDPCodebaseKubeObjectConfig } from '../../config';
import { EDPCodebaseKubeObjectInterface } from '../../types';
import { filterCodebasesByType } from './index';
import codebases from './mocks/codebases.json';

const libraryType = EDPCodebaseKubeObjectConfig.types.library.name.singularForm;
const applicationType = EDPCodebaseKubeObjectConfig.types.application.name.singularForm;
const autotestType = EDPCodebaseKubeObjectConfig.types.autotest.name.singularForm;
const codebaseKind = capitalizeFirstLetter(EDPCodebaseKubeObjectConfig.name.singularForm);

describe('checking filterCodebasesByType', () => {
    test(`testing type - ${applicationType}`, () => {
        const [firstFilteredCodebase] = filterCodebasesByType(
            codebases as EDPCodebaseKubeObjectInterface[],
            applicationType
        );
        expect(firstFilteredCodebase.kind).toMatch(codebaseKind);
        expect(firstFilteredCodebase.spec.type).toMatch(applicationType);
    });

    test(`testing type - ${libraryType}`, () => {
        const [firstFilteredCodebase] = filterCodebasesByType(
            codebases as EDPCodebaseKubeObjectInterface[],
            libraryType
        );
        expect(firstFilteredCodebase.kind).toMatch(codebaseKind);
        expect(firstFilteredCodebase.spec.type).toMatch(libraryType);
    });

    test(`testing type - ${autotestType}`, () => {
        const [firstFilteredCodebase] = filterCodebasesByType(
            codebases as EDPCodebaseKubeObjectInterface[],
            autotestType
        );
        expect(firstFilteredCodebase.kind).toMatch(codebaseKind);
        expect(firstFilteredCodebase.spec.type).toMatch(autotestType);
    });
});
