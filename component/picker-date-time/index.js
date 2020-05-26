// component/picker-date-time/index.js
import dateTimePicker from './dateTimePicker';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sYear: {
      type: Number,
      value: 0,
    },
    eYear: {
      type: Number,
      value: 0,
    },
    cuDateTime: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      // value: 'yyyy-mm-dd hh:mm'
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateTimeArray: null,
    dateTime: null
  },
  ready() {
    this.onInit()
  },
  observers: {
    'cuDateTime': function () {
      this.onInit()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInit() {
      const _date = new Date();
      const _year = _date.getFullYear();
      if(this.data.sYear === 0 && this.data.eYear === 0){
        this.data.sYear = _year - 5;
        this.data.eYear = _year + 5;
      }else if(this.data.sYear === 0){
        this.data.sYear = this.data.eYear - 5;
      }else if(this.data.eYear === 0){
        this.data.eYear = this.data.sYear + 5;
      }
      var obj1 = dateTimePicker.dateTimePicker(this.data.sYear, this.data.eYear, this.data.cuDateTime);
      if (this.data.type === 'yyyy-mm-dd hh:mm') {
        // 精确到分的处理，将数组的秒去掉
        obj1.dateTimeArray.pop();
        obj1.dateTime.pop();
      }
      this.setData({
        dateTimeArray: obj1.dateTimeArray,
        dateTime: obj1.dateTime
      });
    },
    changeDateTime(e) {
      const value = e.detail.value;
      const dateTime = `${this.data.dateTimeArray[0][value[0]]}-${this.data.dateTimeArray[1][value[1]]}-${this.data.dateTimeArray[2][value[2]]} ${this.data.dateTimeArray[3][value[3]]}:${this.data.dateTimeArray[4][value[4]]}`;
      this.setData({
        dateTime: value
      });
      this.triggerEvent('change', {
        dateTime
      })
    },
    changeDateTimeColumn(e) {
      var arr = this.data.dateTime,
        dateArr = this.data.dateTimeArray;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        dateTimeArray: dateArr,
        dateTime: arr
      });
    }
  }
})