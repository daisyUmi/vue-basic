# mall

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


功能列表：
*首页
*分类首页、分类商品、新品首发、人气推荐商品页面
*商品详情页面，包括加入购物车、收藏商品、商品评论功能
*搜索功能
*专题功能
*品牌功能
*完整的购物流程，商品的加入、编辑、删除、批量选择，收货地址的选择，下单支付
*会员中心（订单，收藏，足迹，收货地址，意见反馈）
...

步骤：
一个页面分为一个view组件
一个view组件分配一个路由

每个页面的步骤：
1.每个页面需要的数据先获取
2.再根据功能和内容将UI组件导入
3.将数据渲染到UI组件
4.加上交互和跳转
