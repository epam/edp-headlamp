import { CreationFormFieldInterface } from '../../../../types/forms';

export interface JenkinsSlaveProps extends CreationFormFieldInterface {
    jenkinsAgents: string[];
}
