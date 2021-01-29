<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调

    <input type="file" name="file"/>  下面的field="file"对应的是input中的name

    -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  import teacherApi from '@/api/edu/teacher.js'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {ImageCropper, PanThumb},
    data() {
      return {
        teacher: {
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: 'https://edu-client.oss-cn-beijing.aliyuncs.com/default.jpg'
        },
        saveBtnDisabled: false,  // 保存按钮是否禁用
        imagecropperShow: false,   // 上传弹框组件是否显示
        imagecropperKey: 0,
        BASE_API: process.env.BASE_API  // 获取dev.env.js中的BASE_API地址
      }
    },
    created() {  // 多次路由跳转一个页面时，created方法只会执行一次
      this.init()
    },
    //监听路由变化
    watch: {
      $route(to, from) {// 路由变化的方式，每一次路由发生变化，该方法就会执行
        this.init()
      }
    },
    methods: {
      // 关闭上传弹框的方法
      close() {
        this.imagecropperShow = false
        // 上传组件的唯一标识  使此标识每次操作产生变化，可使组件成为一个不同标识的新的上传组件，作用为清空组件上一次操作的内容
        this.imagecropperKey = this.imagecropperKey + 1
      },
      // 上传成功的方法
      cropSuccess(data) {
        this.imagecropperShow = false
        // 上传之后返回图片url
        this.teacher.avatar = data.url
        this.imagecropperKey = this.imagecropperKey + 1
      },
      init() {
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getInfo(id)
        } else {
          this.teacher = {
            level: 1,
            sort: 0,
            avatar: 'https://edu-client.oss-cn-beijing.aliyuncs.com/default.jpg'
          }
        }
      },
      // 添加
      saveOrUpdate() {
        // 判断修改还是添加操作
        if (!this.teacher.id) {
          this.saveTeacher()
        } else {
          this.updateTeacher()
        }
      },
      // 修改讲师方法
      updateTeacher() {
        teacherApi.updateTeacher(this.teacher)
          .then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            // 回到列表页面  路由跳转
            this.$router.push({path: '/teacher/table'})
          })
      },
      // 添加讲师方法
      saveTeacher() {
        teacherApi.addTeacher(this.teacher)
          .then(response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            // 回到列表页面  路由跳转
            this.$router.push({path: '/teacher/table'})
          })
      },
      // 根据id查询记录
      getInfo(id) {
        teacherApi.getTeacherInfo(id)
          .then(response => {
            this.teacher = response.data.teacher
          }).catch((response) => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
      }
    }
  }

</script>
