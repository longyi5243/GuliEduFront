import request from '@/utils/request'

export default {

  //生成顶单
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
  }


}
