const State={
    tokenModal:true
}
export default (preState=State,action)=>{
    let newData=JSON.parse(JSON.stringify(preState));
    let {type,params}=action;
    switch (type){
        case 'CHANGE_TOKENMODAL':
            newData.tokenModal=params;
            break;
        default:
            break;
    }
    return newData
}