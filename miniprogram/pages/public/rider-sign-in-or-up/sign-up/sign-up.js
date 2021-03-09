// miniprogram/pages/riderPages/sign-up/sign-up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IdFront: [],
    IdReverse: [],
    samePhoneNumber: '',
    IdFrontInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/front_side_rider.png',
      name: '骑手身份证正面',
      deletable: false,
    }, ],
    IdReverseInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/reverse_side_rider.png',
      name: '骑手身份证反面',
      deletable: false,
    }, ],
    IdAndPersonInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/reverse_side_rider.png',
      name: '骑手手持身份证',
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
  // 上传and删除手持身份证
  chooseIdAndPerson(event) {
    const {
      file
    } = event.detail;
    this.setData({
      IdAndPerson: [{
        url: file.url,
        name: '商家法人手持身份证',
        deletable: true,
      }]
    })
  },
  deleteIdAndPerson() {
    this.setData({
      IdAndPerson: []
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
    if (this.data.samePhoneNumber == '') {
      if (this.data.IdFront.length === 0) {
        wx.showModal({
          content: '身份证正面未上传，请先上传再提交',
          showCancel: false,
        })
        return;
      } else if (this.data.IdReverse.length === 0) {
        wx.showModal({
          content: '身份证反面未上传，请先上传再提交',
          showCancel: false,
        })
        return;
      } else if (this.data.IdAndPerson.length === 0) {
        wx.showModal({
          content: '手持身份证照片未上传，请先上传再提交',
          showCancel: false,
        })
        return;
      }


      // 将所有图片上传至云存储
      setTimeout(() => {
        wx.showLoading({
          title: '上传图片中',
          mask: true,
        })
      }, 100);
      let uploadSuccessFlag = true
      // 调用云函数参数处理
      const params = {};
      for (const obj in formValue) {
        params[obj] = formValue[obj].trim()
      }
      let tmpRiderSignUpImages = {}
      let p1 = new Promise((resolve,rejcet)=>{
        // 上传-身份证正面
        wx.cloud.uploadFile({
          cloudPath: 'riderInfo/IdFront/' + params.userName + "/" + new Date().getTime() + '.png',
          filePath: this.data.IdFront[0].url,
          success: res => {
            tmpRiderSignUpImages.IdFront = res.fileID;
            resolve()
          },
          fail: err => {
            uploadSuccessFlag = false;
            rejcet()
          }
        })
      })
      let p2 = new Promise((resolve,rejcet)=>{
        // 上传-身份证反面
        wx.cloud.uploadFile({
          cloudPath: 'riderInfo/IdReverse/' + params.userName + "/" + new Date().getTime() + '.png',
          filePath: this.data.IdReverse[0].url,
          success: res => {
            tmpRiderSignUpImages.IdReverse = res.fileID;
            resolve()
          },
          fail: err => {
            uploadSuccessFlag = false;
            rejcet()
          }
        })
      })
      let p3 = new Promise((resolve,rejcet)=>{
        // 上传-手持身份证
        wx.cloud.uploadFile({
          cloudPath: 'riderInfo/IdAndPerson/' + params.userName + "/" + new Date().getTime() + '.png',
          filePath: this.data.IdAndPerson[0].url,
          success: res => {
            tmpRiderSignUpImages.IdAndPerson = res.fileID;
            resolve()
          },
          fail: err => {
            uploadSuccessFlag = false;
            rejcet()
          }
        })
      })
      Promise.all([p1, p2, p3]).then(()=>{
        this.setData({
          riderSignUpImages: tmpRiderSignUpImages
        });
        // 调用云函数参数处理  增加图片信息参数
        params.riderSignUpImages = this.data.riderSignUpImages;
      }).then((res)=>{
        // 此处的setTimeout是防止hideloading不隐藏的bug
        setTimeout(() => {
          if (!uploadSuccessFlag) {
            wx.hideLoading({});
            wx.showToast({
              title: '图片未完全上传成功,请重试',
              icon: 'none'
            });
            return;
          }
          wx.cloud.callFunction({
            name: 'riderSignUp',
            data: {
              riderSignUpInfo: params
            },
            success: res => {
              const data = res.result;
              // 注册成功
              if (data.mess.code == 1) {
                wx.hideLoading({});
                wx.showToast({
                  title: data.mess.message,
                  icon: 'none'
                });
                setTimeout(() => {
                  wx.redirectTo({
                    url: '../../unchecked/unchecked',
                  });
                }, 500);
              }
  
              // 注册失败
              else {
                wx.hideLoading({});
                wx.showToast({
                  title: data.mess.message,
                  icon: 'none'
                });
              }
            },
            fail: err => {
              wx.showToast({
                title: '小程序端未成功调用云函数',
                icon: 'none'
              });
            }
          });
        }, 500);
        
      }).catch((error) => {
      })
    } else {
      wx.showModal({
        title: '',
        content: '手机号已存在，请更换手机号',
        showCancel: false,
      })
      return
    }

  },
  checkPhoneNumber(e) {
    wx.cloud.callFunction({
      name: 'checkSamePhoneNumber',
      data: {
        role: 2,
        phoneNumber: e.detail.value
      },
      success: res => {
        const data = res.result
        if (data.mess.code == 1) {
          this.setData({
            samePhoneNumber: ''
          })
        } else if (data.mess.code == 2) {
          this.setData({
            samePhoneNumber: '该手机号已被注册'
          })
        } else {
          this.setData({
            samePhoneNumber: '手机号查重失败'
          })
        }
      },
      fail: res => {
        this.setData({
          samePhoneNumber: '手机号查重失败'
        })
      }
    })
  }

})