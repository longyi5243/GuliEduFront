import request from '@/utils/request'

export default {
  //获取所有章节、小节的数据
  getAllChapterVideo(courseId) {
    return request({
      url: '/eduservice/chapter/getChapterVideo',
      method: 'get',
      params: {
        courseId: courseId
      }
    })
  },
  //添加
  addChapter(eduChapter) {
    return request({
      url: '/eduservice/chapter/addChapter',
      method: 'post',
      data: eduChapter
    })
  },
  //更新章节
  updateChapter(chapter) {
    return request({
      url: '/eduservice/chapter/updateChapter',
      method: 'post',
      data: chapter
    })
  },
  //根据id查询
  getChapterInfo(chapterId) {
    return request({
      url: '/eduservice/chapter/getChapterInfo',
      method: 'get',
      params: {
        chapterId: chapterId
      }
    })
  },
  //删除章节
  deleteChapter(chapterId) {
    return request({
      url: '/eduservice/chapter/deleteChapter',
      method: 'delete',
      params: {
        chapterId: chapterId
      }
    })
  },
  //添加小节
  addVideo(eduVideo) {
    return request({
      url: '/eduservice/video/addVideo',
      method: 'post',
      data: eduVideo
    })
  },
  //更新小节
  updateVideo(eduVideo) {
    return request({
      url: '/eduservice/video/updateVideo',
      method: 'post',
      data: eduVideo
    })
  },
  //删除小节
  deleteVideo(videoId) {
    return request({
      url: '/eduservice/video/deleteVideo/' + videoId,
      // url: `/eduservice/video/deleteVideo/${videoId}`,
      method: 'delete'
    })
  },
  //小节数据回显
  getVideoById(videoId) {
    return request({
      url: '/eduservice/video/getVideoById',
      // url: `/eduservice/video/deleteVideo/${videoId}`,
      method: 'get',
      params: {
        videoId: videoId
      }
    })
  }
}

