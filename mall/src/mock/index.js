import Mock from 'mockjs'

//将mock数据文件引入
import index from './data/index.js';
import catalogList from './data/catalogList.js';


Mock.mock('/index',index);
Mock.mock('/catalogList',catalogList);

export default Mock;
