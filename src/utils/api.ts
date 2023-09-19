import http from "./http";

interface Ilogin{
    username:string
    password: string
}
interface Iadd {
    cat_pid: number
    cat_level: number
    cat_name: string
    cat_id?:number
}
interface Idel {
    id: number
   
}

http.AllInstance()
export  const loginApi=(data:Ilogin)=>http.postRequest("post",'/login',data)
export  const addApi=(data:Iadd)=>http.postRequest("post",'/categories',data)
export  const menusApi=(params:any)=>http.getResponse("get",'/menus',{params})
export  const categoriesApi=(params:any)=>http.getResponse("get",'/categories',{params})
export  const delApi=(params:Idel)=>http.deleteResponse('delete',`/categories/${params.id}`,{params})
export  const emitApi=(data:Iadd)=>http.putRequest('put',`/categories/${data.cat_id}`,data)