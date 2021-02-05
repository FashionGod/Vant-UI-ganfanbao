// miniprogram/pages/merchantPages/sign-up/sign-up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    frontInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/front_side.png',
      name: '商家法人身份证正面',
      deletable: false,
    },],
    reverseInstance: [{
      url: 'cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/IDinstance/reverse_side.png',
      name: '商家法人身份证反面',
      deletable: false,
    },],
  },
  // 上传图片
uploadToCloud(e) {
  wx.cloud.init();
  console.log(e);
  const { fileList } = this.data;
  if (!fileList.length) {
    wx.showToast({ title: '请选择图片', icon: 'none' });
  } else {
    const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = data.map(item => { url: item.fileID });
        this.setData({ cloudPath: data, fileList: newFileList });
      })
      .catch(e => {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(e);
      });
  }
},

uploadFilePromise(fileName, chooseResult) {
  return wx.cloud.uploadFile({
    cloudPath: fileName,
    filePath: chooseResult.url
  });
}
})