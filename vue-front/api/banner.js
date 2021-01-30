import request from '@/utils/request'
export default {
  //查询轮播图数据
  getListBanner() {
    return request({
      url: `/educms/bannerfront/getAllBanner`,
      method: 'get'
    })
  }
}
