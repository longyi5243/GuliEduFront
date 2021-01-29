import request from '@/utils/request'

export default {
  getSubjectList(){
    return request({
      url:'/eduservice/subject/treeList',
      method:'get'
    })
  }
}

