export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const stringCapitalize = (name) => (
    name.charAt(0).toUpperCase() + name.slice(1)
)

export const secondsToDate = (miliseconds) => {
    var t = new Date(1970, 0, 1);
    t.setTime(miliseconds);
    return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
}

