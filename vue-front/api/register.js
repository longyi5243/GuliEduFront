import request from '@/utils/request'

export default {

  //注册
  registerMember(formItem) {
    return request({
      url: '/educenter/member/register',
      method: 'post',
      data: formItem
    })
  },

  //发送验证码
  sendCode(phone) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  }


}
