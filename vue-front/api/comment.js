import request from '@/utils/request'

export default {

  //添加评论
  addComment(eduComment) {
    return request({
      url: '/eduservice/comment/addComment',
      method: 'post',
      data: eduComment
    })
  },

  //获取评论列表
  getCommentListPage(current, limit, courseId) {
    return request({
      url: `/eduservice/comment/getCommentListPage/${current}/${limit}/${courseId}`,
      method: 'get',
      // params: {
      //   courseId: courseId
      // }
    })
  }

}
