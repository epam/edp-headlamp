import { React } from '../../../plugin.globals';
import {
    Beego,
    Codenarc,
    Container,
    Docker,
    DotNet,
    DotNetCore,
    Fastapi,
    Flask,
    Go,
    Gradle,
    Groovy,
    Helm,
    Java,
    JavaScript,
    Kaniko,
    Kustomize,
    Maven,
    Npm,
    Opa,
    OperatorSDK,
    Other,
    Python,
    ReactSymbol,
    Terraform,
    Yaml,
} from './symbols';

export const Resources = (): React.ReactElement => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            display={'none'}
        >
            <Beego />
            <Codenarc />
            <Container />
            <Docker />
            <DotNetCore />
            <DotNet />
            <Go />
            <Groovy />
            <Helm />
            <Gradle />
            <Maven />
            <Npm />
            <Kaniko />
            <Java />
            <JavaScript />
            <Kustomize />
            <Opa />
            <OperatorSDK />
            <Other />
            <Python />
            <ReactSymbol />
            <Terraform />
            <Yaml />
            <Fastapi />
            <Flask />
        </svg>
    );
};
