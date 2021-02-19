import request from '@/utils/request'

export default {

  //生成订单
  createOrders(courseId) {
    return request({
      url: '/eduorder/order/createOrder/' + courseId,
      method: 'post'
    })
  },

  //根据订单编号查询订单
  getOrdersInfo(orderNo) {
    return request({
      url: '/eduorder/order/getOrderInfo/' + orderNo,
      method: 'get'
    })
  },

  //生成二维码
  createNative(orderNo) {
    return request({
      url: '/eduorder/paylog/createNative/' + orderNo,
      method: 'get'
    })
  },

  //查询订单状态
  queryPayStatus(orderNo) {
    return request({
      url: '/eduorder/paylog/queryPayStatus/' + orderNo,
      method: 'get'
    })
  }

}
