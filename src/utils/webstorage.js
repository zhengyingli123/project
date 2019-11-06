export default {
    getItem(key){
        let value=window.localStorage.getItem(key);
        return JSON.parse(value);
    },
    setItem(key,value){
        let str=JSON.stringify(value);
        window.localStorage.setItem(key,str);
    }
}