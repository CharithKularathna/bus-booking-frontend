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

export const secondsToDateTime = (seconds) => {
    const data = new Date(seconds * 1000);
    return (data.toDateString() + ' ' + data.toLocaleTimeString())
}

export const phoneNumberFormatter = (number) => {
    let newNumber = null
    if(number.length === 10){
        newNumber = '+94' + number.slice(1)
    }
    else if(number.length === 9){
        newNumber = '+94' + number
    }
    else if(number.length === 12){
        newNumber = number
    }
    return newNumber
}

export const multiWordCapitalize = (string) => {
    const strArray = string.split(" ")
    const newArray = strArray.map(str => (
        stringCapitalize(str)
    ))
    return newArray.join(" ")
}

export const getDateFromJson = (string) => {
    return string.slice(0,10)
}

export const getTimeFromJson = (string) => {
    return string.slice(11,19)
}