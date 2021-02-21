import request from '@/utils/request'

export default {
  //生成统计数据
  createStaData(day) {
    return request({
      url: `/staservice/sta/registerCount/${day}`,
      method: 'post'
    })
  },
  //图表显示  返回两部分数组
  getDataSta(searchObj) {
    return request({
      url: `/staservice/sta/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }
}
