Page({
  getUserProfile(e){
    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        const {userInfo}=res;
        wx.setStorageSync('userinfo', userInfo);
        wx.navigateBack({
          delta: 1,
        });
      }
    })
  }
})