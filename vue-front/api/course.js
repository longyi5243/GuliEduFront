import request from '@/utils/request'

const api_name = '/edu/teacher'

export default {
  //条件分页查询课程列表
  getCourseList(page, limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //查询课程详情
  getAllSubject() {
    return request({
      url: '/eduservice/subject/treeList/',
      method: 'get'
    })
  },
  //查询课程详情
  getCourseInfo(courseId){
    return request({
      url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
      method: 'post'
    })
  }

}
