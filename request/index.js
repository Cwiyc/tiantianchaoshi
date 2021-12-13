let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  wx - wx.showLoading({
    title: '加载中',
    mask: true  //蒙版，用户无法再进行其他操作
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, rejects) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        rejects(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}