const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index-webpack.bundle.js'
  },
  module: {
    rules: [

		//需要安装 npm install css-loader 和 npm install style-loader
		{ test: /\.css$/, use: 'style-loader' },   //顺序是从下往上，所以style-loader放上面
	  	{ test: /\.css$/, use: 'css-loader' }  //检测后缀名为.css的文件
		  
    ]
  },
};

//方法一：
	//当内容改变时，每改变一次，就在控制台运行webpack，用来打包编译

//方法二：
	// 热加载过程：
	// 	当打包的内容改变时，帮你自动打包编译
	// 	npm install webpack-dev-server -g   //安装
	// 	webpack-dev-server   //运行
	//通过这个操作来实时监听和编译整个内容
		 