export default function extractValue(key, obj){
    const keys = key.split(".")
    let currentVal = obj;
    keys.forEach(k => {
        currentVal = currentVal[k];
    });
    return currentVal;
}
