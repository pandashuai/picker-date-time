
 
 Page({
  data: {
   cuDateTime: '',
   cuDateTime1: ''
  },
  onLoad(){
  },
  onDateTimeChange(e){
    this.setData({
     cuDateTime: e.detail.dateTime
    })
  },
  onDateTimeChange1(e){
    this.setData({
     cuDateTime1: e.detail.dateTime
    })
  }
})