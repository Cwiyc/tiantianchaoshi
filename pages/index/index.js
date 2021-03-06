import { request } from "../../request/index"
Page({
  data: {
    //轮播图数组
    swiperList: [],
    catesList: [],
    floorList: []
  },
  onLoad() {
    //   wx.request({
    //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //     success: (result) => {
    //       this.setData({
    //         swiperList:result.data.message,
    //       })
    //     }
    //   })
    // },
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result,
        })
      })
  },
  //获取分类导航数据
  getCatesList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          catesList: result,
        })
      })
  },
  //获取楼层数据
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result,
        })
      })
  }
})
