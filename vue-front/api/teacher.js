import request from '@/utils/request'
const api_name = '/edu/teacher'

export default {
  getPageList(page, limit) {
    return request({
      url: `/eduservice/teacherfront/pageList/${page}/${limit}`,
      method: 'get'
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }

}
