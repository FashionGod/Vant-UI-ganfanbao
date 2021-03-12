// miniprogram/merchantPackage/pages/merchantPages/food-menu-manage/food-menu-manage.js
Page({
  data: {
    activeName: '',
    collapseList: [{
        name: 0,
        title: '肉类',
        foodList: [{
            title: '羊肉串',
            price: 2.0,
            desc: '正品羊肉，新西兰空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '牛肉串',
            price: 5.0,
            desc: '正品牛肉，阿拉斯加空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '猪肉串',
            price: 2.0,
            desc: '正品猪肉，高老庄空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
      {
        name: 1,
        title: '菜类',
        foodList: [{
            title: '羊肉串',
            price: 2.0,
            desc: '正品羊肉，新西兰空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '牛肉串',
            price: 5.0,
            desc: '正品牛肉，阿拉斯加空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '猪肉串',
            price: 2.0,
            desc: '正品猪肉，高老庄空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
      {
        name: 2,
        title: '饮料类',
        foodList: [{
            title: '羊肉串',
            price: 2.0,
            desc: '正品羊肉，新西兰空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '牛肉串',
            price: 5.0,
            desc: '正品牛肉，阿拉斯加空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '猪肉串',
            price: 2.0,
            desc: '正品猪肉，高老庄空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
      {
        name: 3,
        title: '必选类',
        foodList: [{
            title: '羊肉串',
            price: 2.0,
            desc: '正品羊肉，新西兰空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '牛肉串',
            price: 5.0,
            desc: '正品牛肉，阿拉斯加空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            title: '猪肉串',
            price: 2.0,
            desc: '正品猪肉，高老庄空运',
            thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
    ],
    dialogShow: false,
  },
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '最后记得一定要点保存！',
      confirmText: '会的',
      showCancel: false,
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
  addCategory() {
    wx.showModal({
      title: '分类名',
      content: '',
      placeholderText: '请输入分类名',
      confirmText: '添加',
      editable: true,
      success: res=> {
        console.log(res)
        let tmpCategory = {
          name: this.data.collapseList.length,
          title: res.content,
          foodList: [],
        }
        let tmpList = [...this.data.collapseList]
        tmpList.push(tmpCategory)
        this.setData({
          collapseList: tmpList
        })
      }
    })
  },
  deleteCategory() {
    if (this.data.collapseList.length == 0) {
      wx.showToast({
        title: '请先添加一个分类',
        icon: 'none'
      })
    }
    else {
      console.log(this.data.activeName)
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
              console.log(delIndex)
              tmpList.splice(delIndex, 1)
              console.log(tmpList)
              that.setData({
                collapseList: tmpList,
                activeName: ''
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  editCategory() {
    if (this.data.collapseList.length == 0) {
      wx.showToast({
        title: '请先添加一个分类',
        icon: 'none'
      })
    }
    else {
      if (this.data.activeName == '' || this.data.activeName == null) {
        wx.showToast({
          title: '请先展开一个分类',
          icon: 'none'
        })
      }
      else {
        wx.showModal({
          title: '分类名',
          content: '',
          placeholderText: '请输入分类名',
          confirmText: '保存',
          editable: true,
          success: res=> {
            console.log(res)
            let tmpList = [...this.data.collapseList]
            tmpList[this.data.activeName].title = res.content
            this.setData({
              collapseList: tmpList
            })
          }
        })
      }
    }
  },
  // 商品增删改
  showAddDialog() {

  },
  onConfirm(e) {
    console.log(e)
  },
  onClose(e) {
    console.log(e)
    this.setData({ show: false })
  }
})