export const requiredField=(value)=>{
    if(value)
        return undefined;
    return 'Field is required';
};
export const isPositiveNumber=(value)=>{
    console.log(+value>0);
    if(+value>0)
        return undefined;
    return 'Incorrect value';
};

export const maxLengthCreator20=(value)=>{
    if(value.length>20){
        return `Max length is 20 symbols`;
    }
    return undefined;
};
export const maxLengthCreator180=(value)=>{
    if(value.length>180){
        return `Max length is 180 symbols`;
    }
    return undefined;
};