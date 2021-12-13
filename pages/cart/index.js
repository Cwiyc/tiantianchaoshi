// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync('cart') || [];
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    this.setData({ address });
    this.setCart(cart);
  },
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync('address', result)
      }
    })
  },
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '是否删除该商品',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          } else if (res.cancel) {
            console.log("quxiao");
          }
        }
      })
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '请填写收货地址',
        icon:'error'
      })
      return;
    }
    if(totalNum===0){
      wx.showToast({
        title: '请选购商品',
        icon:'error'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})