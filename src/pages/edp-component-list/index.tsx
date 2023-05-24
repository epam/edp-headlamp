import { useForm } from 'react-hook-form';
import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { FormSelect } from '../../components/FormComponents';
import { codebaseTypeSelectOptions } from '../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { MuiCore, pluginLib, React } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';
import { ComponentList } from './components/ComponentList';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

const { Box, Grid } = MuiCore;
export const EDPComponentList = (): React.ReactElement => {
    const [type, setType] = React.useState<CODEBASE_TYPES>(CODEBASE_TYPES.ALL);
    const [items, error] = EDPCodebaseKubeObject.useList();
    const [components, setComponents] = React.useState<EDPCodebaseKubeObjectInterface[]>(items);

    const {
        register,
        control,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        if (type === CODEBASE_TYPES.ALL) {
            setComponents(items);
            return;
        }

        setComponents(items.filter(el => el.spec.type === type));
    }, [items, type]);

    return (
        <>
            <SectionBox
                title={
                    <SectionFilterHeader
                        title={'Components'}
                        headerStyle={'label'}
                        actions={[
                            <Box>
                                <Grid container spacing={1}>
                                    <Grid item style={{ minWidth: rem(200), marginBottom: rem(6) }}>
                                        <FormSelect
                                            {...register('type', {
                                                onChange: ({ target: { value } }) => setType(value),
                                            })}
                                            control={control}
                                            errors={errors}
                                            name={'type'}
                                            label={'Type'}
                                            options={codebaseTypeSelectOptions}
                                            defaultValue={CODEBASE_TYPES.ALL}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>,
                        ]}
                    />
                }
            >
                <ComponentList components={components} error={error} />
                <CreateKubeObject>
                    <CreateCodebase />
                </CreateKubeObject>
            </SectionBox>
        </>
    );
};
