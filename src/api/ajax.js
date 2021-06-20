import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, method = 'GET') {
    return new Promise(function (resolve, reject) {
        // 执行异步ajax 请求
        let promise
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data // 配置对象，params指定的是query参数 
            })
        }
        else {
            promise = axios.post(url, data)
        }
        // 如果成功了, 调用resolve(response.data)暴露返回结果
        promise.then(response => {
            resolve(response.data)
            // 如果失败了, 提示请求后端出错
        }).catch(error => {
            //弹出提示框提示请求出错和错误信息
            message.error('请求错误: ' + error.message)
        })
    })
}