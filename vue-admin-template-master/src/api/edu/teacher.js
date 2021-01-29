import request from '@/utils/request'

export default {
  // 1.讲师列表（条件查询分页）
  // current当前页  limit每页记录数  teacherQuery查询条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    // getTeacherListPage(current, limit, name, level, begin, end) {
    return request({
      // url: '/eduservice/teacher/pageTeacherCondition/' + current + '/' + limit,  直接凭借
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`, //   //用``符号，在其中使用 ${} 占位符
      method: 'post',
      // 后端不使用RequestBody获取数据，可以使用下面两种方式传参
      // data: {}
      // params: {}
      // 后端使用RequestBody获取数据，使用teacherQuery条件对象传参
      // data表示把对象转换成json传递到接口中
      data: teacherQuery
      // params: {
      //   name:name,
      //   level:level,
      //   begin:begin,
      //   end:end
      // }
    })
  },
  //删除讲师
  removeDataById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  //添加讲师
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  //数据回显
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  //修改讲师
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}

