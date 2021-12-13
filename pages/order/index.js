import { request } from '../../request/index';
Page({
  data: {
    // orders:{},
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
  },
  onShow(){
    // const token=wx.getStorageSync('token');
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   });
    //   return;
    // }

    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1];
    const {type}=currentPage.options;
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },
  async getOrders(type){
    const res=await request({url:"/my/orders/all",data:{type}});
    this.setData({
      // orders:res.orders
    })
  },
  changeTitleByIndex(index){
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },
})