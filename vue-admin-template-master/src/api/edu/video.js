import request from '@/utils/request'

export default {
  //删除视频
  removeVideoById(id) {
    return request({
      url: `/eduvod/video/removeAlyVideo/${id}`,
      method: 'delete'
    })
  }
}

