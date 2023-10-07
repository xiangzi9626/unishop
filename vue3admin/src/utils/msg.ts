import {ElMessage} from "element-plus"
const ElWarning=(msg:string,offset:number=document.documentElement.clientHeight/2)=>{
    ElMessage({
        message:msg,
        type:"warning",
        offset:offset
    })
}
const ElSuccess=(msg:string,offset:number=document.documentElement.clientHeight/2)=>{
    ElMessage({
        message:msg,
        type:"success",
        offset:offset
    })
}
const ElError=(msg:string,offset:number=document.documentElement.clientHeight/2)=>{
    ElMessage({
        message:msg,
        type:"error",
        offset:offset
    })
}
export {ElError,ElWarning,ElSuccess}
