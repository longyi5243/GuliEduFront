import request from '@/utils/request'
const api_name = '/edu/teacher'

export default {
  //分页查询教师列表
  getPageList(page, limit) {
    return request({
      url: `/eduservice/teacherfront/pageList/${page}/${limit}`,
      method: 'get'
    })
  },
  //查询教师详情
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }

}
