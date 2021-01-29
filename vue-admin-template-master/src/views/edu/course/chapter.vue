<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>


    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" :title="chapterTitle">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" :title="videoTitle">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAlyVideo'"
            :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
                <el-button type="text" @click="openVideoDialog(chapter.id)">添加课时</el-button>
                <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                        <el-button type="text" @click="openEditVideo(video.id)">编辑</el-button>
                        <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
                    </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>

  import chapter from '@/api/edu/chapter.js'
  import video from '@/api/edu/video.js'

  export default {
    data() {
      return {
        chapterTitle: '',
        videoTitle: '',
        saveVideoBtnDisabled: false,
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseId: '',  //课程id
        chapterVideoList: [],
        dialogChapterFormVisible: false, //是否显示章节表单
        dialogVideoFormVisible: false, //是否显示小节表单
        chapter: {// 章节对象
          title: '',
          sort: 0,
          courseId: '',
          id: ''
        },
        videoId: '',
        video: {
          title: '',
          sort: 0,
          id: '',
          courseId: '',
          chapterId: '',
          isFree: 0,
          videoSourceId: '',
          videoOriginalName: ''
        },
        fileList: [], //文件列表
        BASE_API: process.env.BASE_API
      }
    },

    created() {
      //获取路由的id
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        //根据课程id查询章节与小节
        this.getAllChapterVideo()
      }
    },

    methods: {
      previous() {
        console.log('previous')
        this.$router.push({path: '/course/info/' + this.courseId})
      },
      next() {
        console.log('next')
        this.$router.push({path: '/course/publish/' + this.courseId})
      },


      saveOrUpdate() {
        if (!this.chapter.id) {
          this.addChapter()
        } else {
          this.updateChapter()
        }

      },
      //根据课程id查询章节与小节
      getAllChapterVideo() {
        chapter.getAllChapterVideo(this.courseId)
          .then(response => {
            this.chapterVideoList = response.data.allChapterVideo
          })
      },
      //添加章节
      addChapter() {
        this.chapter.courseId = this.courseId
        chapter.addChapter(this.chapter)
          .then(reponse => {
            this.$message({
              type: 'success',
              message: '添加章节成功'
            });
            this.dialogChapterFormVisible = false
            this.getAllChapterVideo()
          })
      },
      //更新章节
      updateChapter() {
        chapter.updateChapter(this.chapter).then(response => {
          this.$message({
            type: 'success',
            message: '更新章节成功'
          });
          this.dialogChapterFormVisible = false
          this.getAllChapterVideo()
        })
      },
      openEditChapter(chapterId) {
        this.chapterTitle = '修改章节'
        this.getChapterInfo(chapterId)
      },
      //根据id查询章节
      getChapterInfo(id) {
        //弹框
        this.dialogChapterFormVisible = true
        //数据回显
        chapter.getChapterInfo(id).then(response => {
          this.chapter = response.data.chapter
        })
      },
      //删除章节
      deleteChapter(id) {
        this.$confirm('此操作将删除该章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chapter.deleteChapter(id)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAllChapterVideo()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      openChapterDialog() {
        this.chapterTitle = '添加章节'
        this.dialogChapterFormVisible = true
        this.chapter = {
          sort: 0
        }
      },


      //============  小节  ===============

      openEditVideo(videoId) {
        this.videoTitle = '修改课时'
        this.getVideoById(videoId)
        this.dialogVideoFormVisible = true
      },
      openVideoDialog(chapterId) {
        this.videoTitle = '添加课时'
        this.dialogVideoFormVisible = true
        this.saveVideoBtnDisabled = false
        this.video = {
          title: '',
          sort: 0,
          isFree: 0
        }
        this.fileList = []
        this.video.chapterId = chapterId
      },
      saveOrUpdateVideo() {
        if (!this.video.id) {
          this.addVideo()
        } else {
          this.updateVideo()
        }
        this.saveVideoBtnDisabled = false
      },
      //添加小节
      addVideo() {
        this.video.courseId = this.courseId
        chapter.addVideo(this.video)
          .then(response => {
            this.$message({
              type: 'success',
              message: '添加小节成功!'
            });
            this.dialogVideoFormVisible = false
            this.getAllChapterVideo()
          })
      },
      //小节数据回显
      getVideoById(videoId) {
        chapter.getVideoById(videoId)
          .then(response => {
            this.video = response.data.video
          })
      },
      //更新小节
      updateVideo() {
        this.video.courseId = this.courseId
        this.video.chapterId = this.chapter.id
        chapter.updateVideo(this.video)
          .then(response => {
            this.$message({
              type: 'success',
              message: '更新小节成功!'
            });
            this.dialogVideoFormVisible = false
            this.getAllChapterVideo()
          })
      },
      //删除小节
      deleteVideo(videoId) {
        this.$confirm('此操作将删除该小节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chapter.deleteVideo(videoId)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAllChapterVideo()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //视频上传成功执行
      handleVodUploadSuccess(response, file, fileList) {
        this.video.videoSourceId = response.data.videoId
        this.video.videoOriginalName = file.name
      },
      //上传视频之前执行
      handleUploadExceed() {
        this.$message.warning('想要重新上传视频，请先删除已上传的视频')
      },
      //点击确认调用
      handleVodRemove() {
        //调用删除视频接口
        video.removeVideoById(this.video.videoSourceId)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除视频成功!'
            });
            //清空文件列表
            this.fileList = []
            //清空视频id
            this.video.videoSourceId = ''
            //清空视频名称
            this.video.videoOriginalName = ''
          })
      },
      //点击 × 调用
      beforeVodRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  }
</script>
<style scoped>
  .chanpterList {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .chanpterList li {
    position: relative;
  }

  .chanpterList p {
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }

  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .videoList {
    padding-left: 50px;
  }

  .videoList p {
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }

</style>
