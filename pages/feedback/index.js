import { request } from '../../request/index';
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textValue: "",
    upLoadImg: []
  },
  handleIabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //赋值到data中
    this.setData({
      tabs
    })
  },
  handleImgChoose() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      }
    })
  },
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  handleFormSubmit() {
    const { textValue, chooseImgs } = this.data;
    if (!textValue.trim()) {
      wx.showToast({
        title: '请输入有效内容',
      });
      return;
    }
    chooseImgs.forEach((v, i) => {
      wx.uploadFile({
        filePath: v,
        name: 'file',
        url: 'https://imgurl.org/',
        success: (res) => {
          // let url = JSON.parse(res.data).url;
          // this.upLoadImg.push(url);
          // console.log(this.upLoadImg);
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    })
  }
})