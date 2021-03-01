Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    userName: '',
    phoneNumber: null,
    password: '',
    IDNumber: null,
    IdFront: [],
    IdReverse: [],
    businessLicense: [],
    foodLicense: [],
    merchantDoor: [],
    merchantEnvironment: [],
    merchantSignUpImages: [],
    IdFrontInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/front_side.png',
      name: '商家法人身份证正面',
      deletable: false,
    }, ],
    IdReverseInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/reverse_side.png',
      name: '商家法人身份证反面',
      deletable: false,
    }, ],
    businessLicenseInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/merchant_business_license.png',
      name: '商家营业执照',
      deletable: false,
    }, ],
    foodLicenseInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/merchant_food_license.png',
      name: '商家食品经营许可证',
      deletable: false,
    }, ],
    merchantDoorInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/merchant_door.png',
      name: '商家门店照片',
      deletable: false,
    }, ],
    merchantEnvironmentInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/merchant_environment.png',
      name: '商家环境照片',
      deletable: false,
    }, ],
  },
  // 上传and删除身份证正面
  chooseIdFront(event) {
    const {
      file
    } = event.detail;
    this.setData({
      IdFront: [{
        url: file.url,
        name: '商家法人身份证正面',
        deletable: true,
      }]
    })
  },
  deleteIdFront() {
    this.setData({
      IdFront: []
    })
  },
  // 上传and删除身份证反面
  chooseIdReverse(event) {
    const {
      file
    } = event.detail;
    this.setData({
      IdReverse: [{
        url: file.url,
        name: '商家法人身份证反面',
        deletable: true,
      }]
    })
  },
  deleteIdReverse() {
    this.setData({
      IdReverse: []
    })
  },
  // 上传and删除营业执照
  chooseBusinessLicense(event) {
    const {
      file
    } = event.detail;
    this.setData({
      businessLicense: [{
        url: file.url,
        name: '商家营业执照',
        deletable: true,
      }]
    })
  },
  deleteBusinessLicense() {
    this.setData({
      businessLicense: []
    })
  },
  // 上传and删除食品许可：
  chooseFoodLicense(event) {
    const {
      file
    } = event.detail;
    this.setData({
      foodLicense: [{
        url: file.url,
        name: '商家食品经营许可证',
        deletable: true,
      }]
    })
  },
  deleteFoodLicense() {
    this.setData({
      foodLicense: []
    })
  },
  // 上传and删除商家门面：
  chooseMerchantDoor(event) {
    const {
      file
    } = event.detail;
    this.setData({
      merchantDoor: [{
        url: file.url,
        name: '商家门店照片',
        deletable: true,
      }]
    })
  },
  deleteMerchantDoor() {
    this.setData({
      merchantDoor: []
    })
  },
  // 上传and删除店内环境：
  chooseMerchantEnvironment(event) {
    const {
      file
    } = event.detail;
    this.setData({
      merchantEnvironment: [{
        url: file.url,
        name: '商家环境照片',
        deletable: true,
      }]
    })
  },
  deleteMerchantEnvironment() {
    this.setData({
      merchantEnvironment: []
    })
  },
  // 表单提交
  async formSubmit(e) {
    // 参数校验
    const formValue = e.detail.value
    for (const obj in formValue) {
      if (formValue[obj].trim() === null || formValue[obj].trim() === '') {
        wx.showModal({
          title: '信息填写有误',
          content: '信息不能为空，请正确填写',
          showCancel: false,
        })
        return
      }
    }

    if (this.data.IdFront.length === 0) {
      wx.showModal({
        content: '法人身份证正面未上传，请先上传再提交',
        showCancel: false,
      })
      return;
    } else if (this.data.IdReverse.length === 0) {
      wx.showModal({
        content: '法人身份证反面未上传，请先上传再提交',
        showCancel: false,
      })
      return;
    } else if (this.data.businessLicense.length === 0) {
      wx.showModal({
        content: '营业执照未上传，请先上传再提交',
        showCancel: false,
      })
      return;
    } else if (this.data.foodLicense.length === 0) {
      wx.showModal({
        content: '食品经营许可证未上传，请先上传再提交',
        showCancel: false,
      })
      return;
    } else if (this.data.merchantDoor.length === 0) {
      wx.showModal({
        content: '门店照片未上传，请先上传再提交',
        showCancel: false,
      })
      return;
    } else if (this.data.merchantEnvironment.length === 0) {
      wx.showModal({
        content: '环境照片未上传，请先上传再提交',
        showCancel: false,
      })
      return;
    }


    // 将所有图片上传至云存储
    setTimeout(() => {
      wx.showLoading({
        title: '上传图片中',
        mask: true,
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (res) => {
          console.log(res)
        },
      })
    }, 100);
    let uploadSuccessFlag = true
    // 调用云函数参数处理
    const params = {};
    for (const obj in formValue) {
      params[obj] = formValue[obj].trim()
    }
      let tmpMerchantSignUpImages = []
      console.log(this.data.IdFront)
      // 上传-身份证正面
      await wx.cloud.uploadFile({
        cloudPath: 'merchantInfo/IdFront/' + params.IDNumber + "/" + new Date().getTime() + '.png',
        filePath: this.data.IdFront[0].url, // 文件路径
        success: res => {
          console.log(res)
          tmpMerchantSignUpImages.push(res.fileID)
        },
        fail: err => {
          console.log(err)
          uploadSuccessFlag = false
        }
      })
      // 上传-身份证反面
      await wx.cloud.uploadFile({
        cloudPath: 'merchantInfo/IdReverse/' + params.IDNumber + "/" + new Date().getTime() + '.png',
        filePath: this.data.IdReverse[0].url, // 文件路径
        success: res => {
          console.log(res)
          tmpMerchantSignUpImages.push(res.fileID)
        },
        fail: err => {
          console.log(err)
          uploadSuccessFlag = false
        }
      })
      // 上传-营业执照
      await wx.cloud.uploadFile({
        cloudPath: 'merchantInfo/businessLicense/' + params.IDNumber + "/" + new Date().getTime() + '.png',
        filePath: this.data.businessLicense[0].url, // 文件路径
        success: res => {
          console.log(res)
          tmpMerchantSignUpImages.push(res.fileID)
        },
        fail: err => {
          console.log(err)
          uploadSuccessFlag = false
        }
      })
      // 
      // 上传-食品许可：
      await wx.cloud.uploadFile({
        cloudPath: 'merchantInfo/foodLicense/' + params.IDNumber + "/" + new Date().getTime() + '.png',
        filePath: this.data.foodLicense[0].url, // 文件路径
        success: res => {
          console.log(res)
          tmpMerchantSignUpImages.push(res.fileID)
        },
        fail: err => {
          console.log(err)
          uploadSuccessFlag = false
        }
      })
      // 上传-商家门面：
      await wx.cloud.uploadFile({
        cloudPath: 'merchantInfo/merchantDoor/' + params.IDNumber + "/" + new Date().getTime() + '.png',
        filePath: this.data.merchantDoor[0].url, // 文件路径
        success: res => {
          console.log(res)
          tmpMerchantSignUpImages.push(res.fileID)
        },
        fail: err => {
          console.log(err)
          uploadSuccessFlag = false
        }
      })
      // 上传-店内环境：
      await wx.cloud.uploadFile({
        cloudPath: 'merchantInfo/merchantEnvironment/' + params.IDNumber + "/" + new Date().getTime() + '.png',
        filePath: this.data.merchantEnvironment[0].url, // 文件路径
        success: res => {
          console.log(res)
          tmpMerchantSignUpImages.push(res.fileID)
        },
        fail: err => {
          console.log(err)
          uploadSuccessFlag = false
        }
      })
      this.setData({
        merchantSignUpImages: tmpMerchantSignUpImages
      })
    // 调用云函数参数处理  增加图片信息参数
    params.merchantSignUpImages = this.data.merchantSignUpImages
    // 此处的setTimeout是防止hideloading不隐藏的bug
    setTimeout(() => {
      if (!uploadSuccessFlag) {
        wx.hideLoading({})
        wx.showToast({
          title: '图片未完全上传成功,请重试',
          icon: 'none'
        })
        return
      }
      wx.cloud.callFunction({
        name: 'merchantSignUp',
        data: {
          merchantSignUpInfo: params
        },
        success: res => {
          const data = res.result
          // 注册成功
          if (data.mess.code == 1) {
            wx.hideLoading({})
            wx.showToast({
              title: data.mess.message,
              icon: 'none'
            })
          }
          // 注册失败
          else {
            wx.hideLoading({})
            wx.showToast({
              title: data.mess.message,
              icon: 'none'
            })
          }
        },
        fail: err => {
          wx.showToast({
            title: '小程序端未成功调用云函数',
            icon: 'none'
          })
        }
      })
    }, 500);
  },
})