import { request } from '../../request/index';
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
    totalPages:1
  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    const total = res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      //拼接数组
      goodsList: [...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh();
  },
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList();
  },
  //标签点击事件 从子组件传递过来
  handleIabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //赋值到data中
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页',
        duration: 1500,
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }
})