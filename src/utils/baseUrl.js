let baseUrl = '';
let fileUrl = '';
/*第一层if判断生产环境和开发环境*/
if(process.env.NODE_ENV === 'production'){
    /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        baseUrl = 'http://192.168.71.12/';
        fileUrl = 'http://192.168.71.12/';
    }
    // else {
    //     //     //test 测试环境  在package script里加test命令 设置--mode test
    //     }
}else{
    //dev 开发环境
    baseUrl = 'http://api.test.chuangfeigu.com/';
    fileUrl = 'http://www.test.chuangfeigu.com/';
}
export {
    baseUrl,
    fileUrl
}