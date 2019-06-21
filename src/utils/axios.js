import axios from 'axios'
import Router from '../router'
import qs from 'qs'
import md5 from 'js-md5';
import store from '../store'
import { Loading } from 'element-ui'
import {baseUrl} from './baseUrl'

let instance=axios.create({
    baseURL:baseUrl+'teamapi',
    // baseURL:'http://192.168.71.12/teamapi',
    // baseURL:'http://api.test.chuangfeigu.com/teamapi',
    // headers:{"acc-token": store.state.userInfo.token},
    headers:{"appId": 'innovate-v2'},
    // headers:{'Access-Control-Allow-Origin':'*',"Authorization": s},
    transformRequest: [function (data,headers) {
        if (headers['Content-Type'] == 'multipart/form-data') {
            return data;
        } else if (headers['Content-Type'] == 'application/json') {
            return data;
        }else {
            data = qs.stringify(data);
            return data;
        }
    }],
    timeout:15000
});
let loading ;
instance.interceptors.request.use(
    config => {
        loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        config.headers.token = store.state.user.token;
        config.headers.t=Math.round(new Date().getTime()/1000);
        let data = qs.parse(config.data);
        let str = new String();
        for(let i of Object.keys(data).sort()){
            str += i + '=' +data[i]+'&';
        }
        str += 't='+config.headers.t + '&appId='+config.headers.appId+'a6e1f81461204ae8b64665fe04d4eef1';
        config.headers.sign = md5(str);
        return config
    },
    error => {
        loading.close();
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    response => {
        loading.close();
        // 检测某种状态进行重定向
        if (response.data.code === 403) {
            Router.push({
                name: 'devLogin.vue'
            })
        }
        return response
    },
    error => {
        loading.close();
        return Promise.resolve(error.response)
    }
)
export default instance