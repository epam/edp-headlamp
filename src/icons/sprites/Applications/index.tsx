import { React } from '../../../plugin.globals';
import {
    Beego,
    Codenarc,
    Container,
    Docker,
    DotNet,
    DotNetCore,
    Go,
    Groovy,
    Java,
    JavaScript,
    Kustomize,
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
            <Java />
            <JavaScript />
            <Kustomize />
            <Opa />
            <OperatorSDK />
            <OtherApps />
            <Python />
            <ReactSymbol />
            <Terraform />
        </svg>
    );
};
