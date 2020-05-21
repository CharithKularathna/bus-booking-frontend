export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const stringCapitalize = (name) => (
    name.charAt(0).toUpperCase() + name.slice(1)
)