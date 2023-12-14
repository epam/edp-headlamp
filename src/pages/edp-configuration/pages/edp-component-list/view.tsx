import { Grid } from '@material-ui/core';
import React from 'react';
import { SvgBase64Icon } from '../../../../components/SvgBase64Icon';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageEDPComponent } from '../../../../widgets/ManageEDPComponent';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { EDP_COMPONENT_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [items] = EDPComponentKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const itemsArray = React.useMemo(() => (items ? items.filter(Boolean) : []), [items]);

    const configurationItemList = React.useMemo(
        () =>
            itemsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: (
                        <Grid container alignItems={'center'} spacing={2}>
                            <Grid item>
                                <SvgBase64Icon width={40} height={40} icon={el?.spec.icon} />
                            </Grid>
                            <Grid item>{el?.metadata.name}</Grid>
                        </Grid>
                    ),
                    ownerReference,
                    component: (
                        <ManageEDPComponent
                            formData={{
                                currentElement: el?.jsonData,
                            }}
                        />
                    ),
                };
            }),
        [itemsArray]
    );

    return (
        <ConfigurationBody
            pageData={{
                label: EDP_COMPONENT_LIST_PAGE_DESCRIPTION.label,
                description: EDP_COMPONENT_LIST_PAGE_DESCRIPTION.description,
                docUrl: EDP_COMPONENT_LIST_PAGE_DESCRIPTION.docLink,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create Component',
                component: (
                    <ManageEDPComponent
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={items === null ? null : configurationItemList}
            emptyMessage={'No Components found'}
        />
    );
};
