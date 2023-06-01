import { React, ReactRouter } from '../../plugin.globals';
import { CDPipelinePageDataProvider } from './provider';
import { EDPCDPipelineDetails } from './view';

const { useParams } = ReactRouter;

export const EDPCDPipelineDetailsPage = () => {
    const { namespace, name } = useParams();

    return (
        <CDPipelinePageDataProvider name={name} namespace={namespace}>
            <EDPCDPipelineDetails />
        </CDPipelinePageDataProvider>
    );
};
