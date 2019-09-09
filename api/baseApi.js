"use strict";
import config from "../config/config.js";
import interfaces from "../config/interfaces.js";
var md5 = require("../utils/md5.js");
var uuid = require("../utils/uuidv4.js");
let request = (url, data) =>
  new Promise((resolve, reject) => {
    let params = {};
    let hzUserInfo = wx.getStorageSync("userInfo");
    let timestamp = new Date().valueOf();
    let skey = config.SKEY;
    let mac = wx.getStorageSync("mac");
    if (mac) {
    } else {
      mac = uuid();
      wx.setStorageSync("mac", mac);
    }
    params = { ...params, ...data };
    wx.request({
      url: url,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      data: params,
      success: res => {
        console.log("request，成功", res);
        if (res.data.code === 0) {
          resolve(res.data);
        } else {
          let type = typeof res.data;
          if (type == "string") {
            let temp = res.data;
            res.data = {
              code: -1,
              data: temp,
              msg: "服务器异常！"
            };
          } else {
            res.data.msg = res.data.notice ? res.data.notice : res.data.msg;
            if (res.data.code === 1009) {
              wx.showToast({
                title: "登录失效",
                icon: "none"
              });
              setTimeout(() => {
                wx.redirectTo({
                  url: "/pages/login/index"
                });
              }, 2000);
            } else if (res.data.code !== 1004) {
              
            }
          }
          reject(res.data);
        }
      },
      fail: err => {
        reject({
          msg: err.errMsg,
        });
        wx.showToast({
          title: err.errMsg,
          icon: "none"
        });
      }
    });
  });

module.exports = {
  request
};
