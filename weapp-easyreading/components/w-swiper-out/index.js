/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei]
 * @Date: 2018-09-06 16:23:23
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-03-14 10:01:02
 */
import WussComponent from "../common/extends/baseComponent";
const SYSTEM_INFO = wx.getSystemInfoSync();

WussComponent({
  /**
   * 组件的属性列表
   * @param {array} swiperOutBtns 侧滑菜单按钮列表 参数有 text, color, background, disabled
   * @param {number} buttonWidth 按钮的宽度
   * @param {boolean} close 是否展开
   * @param {string} backgroundColor 背景颜色
   * @param {number} height  容器的高度
   * @param {number} threshold 侧滑触发的阀值
   * @param {boolean} autoClose 点击按钮自动收起
   * @param {boolean} disabled 禁用侧滑菜单
   */
  properties: {
    swiperOutBtns: {
      type: Array,
      value: []
    },
    backgroundColor: {
      type: String,
      value: "#ffffff"
    },
    buttonWidth: {
      type: Number,
      value: 0
    },
    height: {
      type: Number,
      value: 48
    },
    threshold: {
      type: Number,
      value: 0.35
    },
    close: {
      type: Boolean,
      value: false,
      observer(val) {
        val ? this.open() : this.close();
      }
    },
    autoClose: {
      type: Boolean,
      value: true
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    _scrollX: 0,
    _startX: 0,
    _slideWidth: 0,
    out: true,
    _width: SYSTEM_INFO.windowWidth,
    _threshold: 0
  },
  methods: {
    /**
     * movable-view 移动回调
     */
    handleChange(e) {
      const { out, _threshold, disabled } = this.data;
      const { x } = e.detail;
      if (disabled) return false;
      if (!out && x < -_threshold) {
        this.setData({
          out: true
        });
      } else if (out && x >= -_threshold) {
        this.setData({
          out: false
        });
      }
    },
    /**
     * movable-view 鼠标按下回调
     */
    handleTouchStart(e) {
      const { pageX, pageY } = e.changedTouches["0"];
      this.setData({ _startX: pageX, _startY: pageY });
    },
    /**
     * movable-view 鼠标松开回调
     */
    handleTouchEnd(e) {
      const { pageX, pageY } = e.changedTouches["0"];
      const {
        _startX,
        _startY,
        _slideWidth,
        _threshold,
        disabled,
        height
      } = this.data;
      if (disabled) return false;
      if (_startX - pageX >= _threshold && Math.abs(_startY - pageY) <= height) { // X轴移动距离大于等于阀值并且Y轴移动距离在Cell内
        this.setData({
          _scrollX: -_slideWidth
        });
      } else if(_startX - pageX >= _threshold && Math.abs(_startY - pageY) > height) { // X轴移动距离大于等于阀值并且Y轴移动距离超出W-cell高度时
        this.setData({
          _scrollX: 0,
        });
      } else if (pageX - _startX >= _threshold) { // 终点X轴大于起点X轴时让他收起
        this.setData({
          _scrollX: 0
        });
      } else if (pageX - _startX < _threshold && pageX - _startX > 0) { // 终点X轴大于起点X轴并且小于阀值收起
        this.setData({
          _scrollX: 0
        });
      } else if (pageX === _startX || pageY === _startY) { // 鼠标原地点击时,达到autoClose效果 自动收回
        this.setData({
          _scrollX: 0
        });
      }
    },
    /**
     * 菜单列表按钮被按下
     */
    handleBtnClick(e) {
      const { key } = e.currentTarget.dataset;
      const { swiperOutBtns, autoClose } = this.data;
      const item = swiperOutBtns[key];
      if (item.disabled) return false;
      this.triggerEvent(item.type);
      autoClose ? this.close() : "";
    },
    /**
     * left内容区被点击
     */
    handleLeftClick() {
      const { autoClose, _scrollX, _slideWidth } = this.data;
      if (_scrollX === -_slideWidth) {
        // 展开状态
        autoClose ? this.close() : "";
      } else {
        this.triggerEvent("onClick");
      }
    },
    open() {
      const { _slideWidth } = this.data;
      this.setData({
        _scrollX: -_slideWidth
      });
    },
    close() {
      this.setData({
        _scrollX: 0
      });
    }
  },
  ready: function() {
    const { threshold, buttonWidth, swiperOutBtns, close } = this.data;
    let _slideWidth =
      swiperOutBtns.length *
      (buttonWidth
        ? buttonWidth
        : (SYSTEM_INFO.windowWidth * 0.45) / swiperOutBtns.length);
    this.setData({
      _slideWidth,
      _threshold: _slideWidth * threshold
    });
    close ? this.open() : "";
  }
});
