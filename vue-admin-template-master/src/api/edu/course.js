import request from '@/utils/request'

export default {
  //添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //讲师下拉列表
  getListTeacher() {
    return request({
      url: '/eduservice/teacher/findAll',
      method: 'get'
    })
  },
  //根据id查询课程信息  用于上一步数据回显
  getCourseById(courseId) {
    return request({
      url: '/eduservice/course/getCourseById',
      method: 'get',
      params: {
        courseId: courseId
      }
    })
  },
  //更新数据
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //课程确认信息查询
  getPublishCourseInfo(courseId) {
    return request({
      url: '/eduservice/course/getPublishCourseInfo',
      method: 'post',
      params: {
        courseId: courseId
      }
    })
  },
  //发布
  publishCourseById(courseId) {
    return request({
      url: '/eduservice/course/publishCourse/' + courseId,
      method: 'post'
    })
  },
  //课程列表
  getPageList(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/getCourseList/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  //课程全部信息删除
  deleteCourse(id) {
    return request({
      url: '/eduservice/course/deleteCourse',
      method: 'delete',
      params: {
        courseId: id
      }
    })
  }
}

