type Builder<T> = {
    // eslint-disable-next-line no-unused-vars
    with: (t: Partial<T>) => Builder<T>,
    build: () => T
}

// A generic builder that works for *ALL* object types
export function builder<T>(options: { defaultValues: T }): Builder<T> {
    return {
        with: _with,
        build: () => ({...options.defaultValues})
    };
    function _with(t1: Partial<T>): Builder<T> {
        return {
            with: t2 => _with({...t1, ...t2}),
            build: () => ({...options.defaultValues, ...t1})
        };
    }
}
