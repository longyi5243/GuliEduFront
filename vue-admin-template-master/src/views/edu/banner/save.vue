<template>
  <div class="app-container">
    <el-form label-width="120px">

      <el-form-item label="标题">
        <el-input v-model="banner.title"/>
      </el-form-item>

      <el-form-item label="排序">
        <el-input-number v-model="banner.sort" controls-position="right"/>
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss/upload'"
          class="avatar-uploader">
          <img :src="banner.imageUrl">
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>

  import banner from '@/api/edu/banner.js'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {ImageCropper, PanThumb},
    data() {
      return {
        banner: {
          id: '',
          title: '',
          sort: 1,
          imageUrl: 'https://edu-client.oss-cn-beijing.aliyuncs.com/default.jpg'
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
    // watch: {
    //   $route(to, from) {// 路由变化的方式，每一次路由发生变化，该方法就会执行
    //     this.init()
    //   }
    // },
    methods: {
      handleAvatarSuccess(res, file) {
        this.banner.imageUrl = res.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      init() {
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getInfo(id)
        } else {
          this.banner = {
            sort: 1,
            imageUrl: 'https://edu-client.oss-cn-beijing.aliyuncs.com/default.jpg'
          }
        }
      },
      saveOrUpdate() {
        if (this.banner.id) {
          this.updateBanner()
        } else {
          this.addBanner()
        }
      },
      addBanner() {
        banner.save(this.banner).then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          // 回到列表页面  路由跳转
          this.$router.push({path: '/banner/table'})
        })
      },
      updateBanner() {
        banner.update(this.banner).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          // 回到列表页面  路由跳转
          this.$router.push({path: '/banner/table'})
        })
      },
      getInfo(id) {
        banner.getBannerById(id).then(response => {
          this.banner = response.data.item
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
