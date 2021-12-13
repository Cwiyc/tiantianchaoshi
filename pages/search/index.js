import { request } from "../../request/index";
Page({
  data: {
    goods: [],
    isFocus:false,
    inputValue:""
  },
  TimeId: -1,
  handleInput(e) {
    const { value } = e.detail;
    //检测合法性
    if (!value.trim()) { //去掉两边空格
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    }),
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({ url: "/goods/search", data: { query } });
    this.setData({
      goods: res.goods
    })
  },
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })
  }
})