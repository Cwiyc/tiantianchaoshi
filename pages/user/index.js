// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0,
    latitude: 0,
    longitude: 0,
    markers:[]
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        const { userInfo } = res;
        wx.setStorageSync('userinfo', userInfo);
        this.onReady()
      }
    })
  },
  onReady() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({ userinfo, collectNums: collect.length });
    this.handleLocation();
  },
  handleScan() {
    wx.scanCode({
      onlyFromCamera: false,
    })
  },
  handleLocation() {
    wx.getLocation({
      isHighAccuracy:true,
      accuracy:1,
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        this.setData({
          latitude,
          longitude
        })
        wx.showToast({
          title: '获取位置成功',
        })
      }
    })
  },
  handleMap(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    })
  },
  handleLocationChange(e){
    let latitude=e.detail.latitude;
    let longitude=e.detail.longitude;
    let markers=[
      {
        latitude,
        longitude,
        iconPath:"/icons/home-o.png",
        width:20,
        heigth:5,
        callout:{
          content:"我是传奇",
          padding:4,
          display:'ALWAYS'
        }
      },
    ]
    this.setData({
      markers
    })
  }
})