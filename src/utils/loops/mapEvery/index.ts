export const mapEvery = <Key, Value>(
    map: Map<Key, Value>,
    callback: (value: Value, key: Key, map: Map<Key, Value>) => boolean
): boolean => {
    for (const [key, value] of map) {
        if (!callback(value, key, map)) {
            return false;
        }
    }
    return true;
};
