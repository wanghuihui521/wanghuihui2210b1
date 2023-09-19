import axios,{AxiosInstance} from "axios";
import { ElLoading } from "element-plus";
class Http {
    http: AxiosInstance;
    constructor() {
        this.http=axios.create({
            baseURL: "http://shiyansong.cn:8888/api/private/v1",
            timeout: 10000
         })
     }

    requestInstance(){
        this.http.interceptors.request.use(config => {
            const token=localStorage.getItem("token")
            if(token){
                config.headers.Authorization=token
            }
            return config
         })
    }
    responseInstance() {
        this.http.interceptors.response.use(result => {
            return result
         })
     }
     AllInstance(){
        this.requestInstance()
        this.responseInstance()
     }
    async postRequest(method:'post',url: string,data?: any):Promise<any> {
        let res=await this.http({
            method:method,
            url:url,
            data: data

        })
        return res
      }
    async getResponse(method:'get',url: string,params?: any):Promise<any> {
        let res=await this.http({
            method:method,
            url:url,
            params: params
        })
        return res
      }
    async deleteResponse(method:'delete',url: string,params?: any):Promise<any> {
        let res=await this.http({
            method:method,
            url:url,
            params: params
        })
        return res
      }
    async putRequest(method:'put',url: string,params?: any):Promise<any> {
        let res=await this.http({
            method:method,
            url:url,
            params: params
        })
        return res
      }
 }

 export default new Http()