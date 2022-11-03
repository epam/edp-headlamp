import { React } from '../../../plugin.globals';
import {
    DockerRegistry,
    Gerrit,
    Headlamp,
    Jenkins,
    Jira,
    Keycloak,
    Nexus,
    SonarQube,
    Tekton,
} from './symbols';

export const EDPComponents = (): React.ReactElement => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            display={'none'}
        >
            <Jira />
            <Gerrit />
            <Jenkins />
            <Keycloak />
            <Tekton />
            <SonarQube />
            <Headlamp />
            <Nexus />
            <DockerRegistry />
        </svg>
    );
};
