import { request } from '../../request/index';
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  //接口返回数据
  Cates: [],

  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  async getCates() {
    // request({
    //   url: '/categories'
    // })
    //   .then(res => {
    //     this.Cates = res.data.message;
    //     wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    //async语法
    const res = await request({ url: '/categories' });
    this.Cates = res;
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧菜单点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;//解构赋值
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})