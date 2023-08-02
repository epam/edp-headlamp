import { RootState } from '@kinvolk/headlamp-plugin/lib/redux/stores/store';
import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// START: This code is a direct copy from headlamp origin
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSettings = (settingName?: string) => {
    const storeSettingEntries = useTypedSelector(state =>
        settingName ? state.config.settings[settingName] : state.config.settings
    );
    const [settingEntries, setSettingEntries] = React.useState(storeSettingEntries);

    React.useEffect(() => {
        setSettingEntries(settingEntries);
    }, [settingEntries, storeSettingEntries]);

    return settingEntries;
};
// END: This code is a direct copy from headlamp origin
