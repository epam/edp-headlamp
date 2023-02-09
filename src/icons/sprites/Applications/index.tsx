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
    Java,
    JavaScript,
    Kaniko,
    Kustomize,
    Maven,
    Npm,
    Opa,
    OperatorSDK,
    OtherApps,
    Python,
    ReactSymbol,
    Terraform,
} from './symbols';

export const Applications = (): React.ReactElement => {
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
            <Gradle />
            <Maven />
            <Npm />
            <Kaniko />
            <Java />
            <JavaScript />
            <Kustomize />
            <Opa />
            <OperatorSDK />
            <OtherApps />
            <Python />
            <ReactSymbol />
            <Terraform />
            <Fastapi />
            <Flask />
        </svg>
    );
};
