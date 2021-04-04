export type M = { [key: string]: any };

export default function only (obj: M, keys: Array<string|String>): Object {
    const result: M = new Object();

    for (const key of keys) {
        result[key.toString()] = obj[key.toString()];
    }
    
    return result;
}