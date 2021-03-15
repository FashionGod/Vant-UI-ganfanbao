// miniprogram/merchantPackage/pages/merchantPages/food-menu-manage/food-menu-manage.js
const app = getApp()
let isEdit = false
Page({
  data: {
    foodTitle: '',
    foodPrice: '',
    foodDesc: '',
    foodImage: [],
    inputCategory: '',
    activeName: '',
    collapseList: [],
    addOrEditFoodDialog: false,
    addOrEditCategoryShow: false,
  },
  onReady: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getMerchantMenuList',
      data: {
        id: app.globalData.userInfo.id
      },
      success: res=>{
        const {mess} = res.result
        if (mess.code === 1) {
          this.setData({
            collapseList: mess.data.data.merchantMenuList ? mess.data.data.merchantMenuList : [] 
          })
          wx.showModal({
            title: '提示',
            content: '修改后一定要点保存！',
            confirmText: '好的',
            showCancel: false,
          })
        }
        else {
          wx.showToast({
            title: `${mess.message}`,
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading({})
      }
    })
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  // 滑块删除
  onClose(event) {
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  // 分类增删改
  showAddCategoryDialog() {
    this.isEdit = false
    this.setData({
      addOrEditCategoryShow: true
    })
  },
  showEditCategoryDialog() {
    this.isEdit = true
    if (this.data.collapseList.length == 0) {
      wx.showToast({
        title: '请先添加一个分类',
        icon: 'none'
      })
    } else {
      if (this.data.activeName === '' || this.data.activeName === null) {
        wx.showToast({
          title: '请先展开一个分类',
          icon: 'none'
        })
      } else {
        this.setData({
          addOrEditCategoryShow: true,
          inputCategory: this.data.collapseList[this.data.activeName].title
        })
      }
    }
  },
  deleteCategory() {
    if (this.data.collapseList.length == 0) {
      wx.showToast({
        title: '请先添加一个分类',
        icon: 'none'
      })
    } else {
      if (this.data.activeName === '' || this.data.activeName === null) {
        wx.showToast({
          title: '请先展开一个分类',
          icon: 'none'
        })
      } else {
        let that = this
        let delIndex = this.data.collapseList.findIndex(item => item.name == this.data.activeName)
        wx.showModal({
          title: '提示',
          confirmColor: '#FF0000',
          confirmText: '删除',
          content: `你确定要删除'${this.data.collapseList[delIndex].title}'分类吗`,
          success(res) {
            if (res.confirm) {
              let tmpList = [...that.data.collapseList]
              tmpList.splice(delIndex, 1)
              that.setData({
                collapseList: tmpList,
                activeName: ''
              })
            } else if (res.cancel) {
            }
          }
        })
      }
    }
  },
  onCategoryConfirm() {
    // 新增OR编辑
    let tmpinputCategory = this.data.inputCategory
    let tmpList = [...this.data.collapseList]
    let exsistIndex = tmpList.findIndex(item => item.title === tmpinputCategory)
    if(tmpinputCategory === '' || tmpinputCategory === null) {
      wx.showToast({
        title: '分类名不能为空',
        icon: 'error'
      })
    }
    else {
      if (!this.isEdit) {
        if (exsistIndex !== -1) {
          wx.showToast({
            title: '该分类已存在',
            icon: 'error'
          })
        }
         else {
          let tmpCategory = {
            name: this.data.collapseList.length,
            title: this.data.inputCategory,
            foodList: [],
          }
          tmpList.push(tmpCategory)
          this.setData({
            collapseList: tmpList,
            addOrEditCategoryShow: false,
            inputCategory: '' // 设置完置空
          })
        }
      } else {
        tmpList[this.data.activeName].title = this.data.inputCategory
        this.setData({
          collapseList: tmpList,
          addOrEditCategoryShow: false,
          inputCategory: '' // 设置完置空
        })
      }
    }
  },
  onCategoryCancel(e) {
    this.setData({
      addFoodShow: false,
      addOrEditCategoryShow: false,
      inputCategory: ''
    })
  },
  // 商品增删改
  showAddFoodDialog() {
    this.isEdit = false
    this.setData({
      addOrEditFoodDialog: true
    })
  },
  showEditFoodDialog(e) {
    this.isEdit = true
    let foodItem = e.currentTarget.dataset.fooditem
    this.setData({
      foodTitle: foodItem.title,
      foodPrice: foodItem.price,
      foodDesc: foodItem.desc,
      foodImage: [{
        url: foodItem.url,
        name: '商品图片',
        deletable: true
      }],
      addOrEditFoodDialog: true,
    })
  },
  onFoodConfirm() {
    // 新增
    if (this.data.foodTitle.trim() === '') {
      wx.showToast({
        title: '商品名不能为空',
        icon: 'none'
      })
      return
    }
    else if (this.data.foodDesc.trim() === '') {
      wx.showToast({
        title: '商品描述不能为空',
        icon: 'none'
      })
      return
    }
    else if (this.data.foodPrice.trim() === '') {
      wx.showToast({
        title: '商品价格不能为空',
        icon: 'none'
      })
      return
    }
    else if (this.data.foodImage.length == 0) {
      wx.showToast({
        title: '商品图片不能为空',
        icon: 'none'
      })
      return
    }
    else {
      let foodObj = {
        title: this.data.foodTitle,
        desc: this.data.foodDesc,
        price: this.data.foodPrice,
        url: this.data.foodImage[0].url
      }
      let tmpList = this.data.collapseList
      let i = this.data.collapseList.findIndex(item => item.name === this.data.activeName)
      let existIndex = tmpList[i].foodList.findIndex(item => item.title === foodObj.title)
      if (!this.isEdit) {
        if (existIndex !== -1) {
          wx.showToast({
            title: '该商品已存在，请勿重复添加',
            icon: 'none'
          })
          this.setData({
            addOrEditFoodDialog: false
          })
        }
        else {
          tmpList[i].foodList.push(foodObj)
          this.setData({
            collapseList: tmpList,
            foodDesc: '',
            foodPrice: '',
            foodImage: [],
            foodTitle: '',
            addOrEditFoodDialog: false
          })
        }
      }
      else {
        tmpList[i].foodList[existIndex] = foodObj
        this.setData({
          collapseList: tmpList,
          foodDesc: '',
          foodPrice: '',
          foodImage: [],
          foodTitle: '',
          addOrEditFoodDialog: false
        })
      }
    }
  },
  onFoodCancel() {
    this.setData({
      addOrEditFoodDialog: false,
      foodTitle: '',
      foodPrice: '',
      foodDesc: '',
      foodImage: [],
    })
  },
  deleteFood(e) {
    if (e.detail === 'right') {
      let { title } = e.currentTarget.dataset
      wx.showModal({
        title: '提示',
        content: `你确定要删除'${title}'吗`,
        confirmText: '删除',
        confirmColor: '#ff0000',
        success: res => {
          if (res.confirm) {
            let tmpCollapseList = this.data.collapseList
            let foodListIndex = this.data.collapseList.findIndex(item => item.name === this.data.activeName)
            let tmpFoodList = this.data.collapseList[foodListIndex].foodList
            let foodIndex = tmpFoodList.findIndex(item => item.title === title)
            tmpFoodList.splice(foodIndex, 1)
            tmpCollapseList[foodListIndex].foodList = tmpFoodList
            this.setData({
              collapseList: tmpCollapseList
            })
          }
        }
      })
    }
  },
  // 选择and删除商品图片
  chooseFoodImage(event) {
    console.log(event)
    const {
      file
    } = event.detail;
    this.setData({
      foodImage: [{
        url: file.url,
        name: '商品图片',
        deletable: true,
      }]
    })
  },
  deleteFoodImage() {
    this.setData({
      foodImage: []
    })
  },
  foodImageOversize() {
    wx.showToast({
      title: '图片大小不能超过300kb',
      icon: 'none',
      duration: 2000
    })
  },
  // 保存并上架商品
  uploadOnSale() {
    let {collapseList} = this.data
    console.log(collapseList)
    if (collapseList.length === 0) {
      wx.showToast({
        title: '请先添加一个分类',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    let p1 = new Promise(async (resolve, reject) => {
      for(let item of collapseList) {
        console.log(item)
        for(let obj of item.foodList) {
          let p2 = new Promise((resolve, reject) => {
            if (obj.url.substring(0, 5) !== 'cloud') {
              wx.cloud.uploadFile({
                cloudPath: 'merchantInfo/' + app.globalData.userInfo.id + '/menuImages/'+ item.title +'/'+ obj.title + '.png',
                filePath: obj.url,
                success: res => {
                  obj.url = res.fileID;
                  resolve()
                },
                fail: err => {
                  console.log(err)
                  wx.hideLoading({})
                  wx.showToast({
                    title: '图片上传失败',
                    icon: 'none'
                  })
                }
              })
            }
            else {
              resolve()
            }
          })
          await p2
        }
      }
    resolve()
  })
  p1.then(()=>{
    wx.cloud.callFunction({
      name: 'merchantMenuUpload',
      data: {
        menuList: collapseList,
        id: app.globalData.userInfo.id
      },
      success: ()=>{
        wx.hideLoading({})
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
      },
      fail: ()=>{
        wx.hideLoading({})
        wx.showToast({
          title: '云函数调用失败',
          icon: 'none'
        })
      }
    })
  })
  }
})