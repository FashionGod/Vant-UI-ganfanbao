class UserModel {
  updateUserInfo(userInfo) {
    return wx.cloud.callFunction({
        name: 'updateUserInfo',
        data: {
          avatarUrl: userInfo.avatarUrl,
          city: userInfo.city,
          country: userInfo.country,
          gender: userInfo.gender,
          language: userInfo.language,
          nickName: userInfo.nickName,
          province: userInfo.province,
        }
      }).then(res => {
        if (res.result.success) {
          console.log('更新用户信息成功')
          return res.result
        } else {
          throw 'err'
        }
      })
      .catch(err => {
        console.error('updateUserInfo', err)
      })
  }

}

export {
  UserModel
}