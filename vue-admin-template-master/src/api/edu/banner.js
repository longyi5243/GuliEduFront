import request from '@/utils/request'

export default {
  //分页查询轮播图
  getPageBanner(current, limit, bannerQuery) {
    return request({
      url: `/educms/banneradmin/pageBanner/${current}/${limit}`,
      method: 'post',
      data: bannerQuery
    })
  },
  save(banner) {
    return request({
      url: '/educms/banneradmin/save',
      method: 'post',
      data: banner
    })
  },
  update(banner) {
    return request({
      url: '/educms/banneradmin/update',
      method: 'put',
      data: banner
    })
  },
  getBannerById(id) {
    return request({
      url: '/educms/banneradmin/getById',
      method: 'get',
      params: {
        id: id
      }
    })
  },
  removeById(id) {
    return request({
      url: '/educms/banneradmin/remove',
      method: 'post',
      params: {
        id: id
      }
    })
  },
}
