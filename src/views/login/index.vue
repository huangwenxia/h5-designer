<template>
  <div class="login-container">
    <div class="wrapper">
      <h2 class="title">欢迎登录</h2>
      <div class="login-form">
        <a-form :model="formState">
          <a-form-item>
            <a-input placeholder="请输入账号" v-model:value="formState.name">
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value="formState.password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <lock-outlined />
              </template>
              <template #suffix>
                <div @click="onShowPassword">
                  <eye-invisible-outlined v-if="!formState.isShowPwd" />
                  <eye-outlined v-if="formState.isShowPwd" />
                </div>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block @click="onSubmit">登录</a-button>
          </a-form-item>
          <a-form-item class="footer">
            <a-button type="link" class="btn1 color-gray" @click="onSubmit"
              >立即注册
            </a-button>
            <a-button type="link" class="btn2 color-blue">忘记密码 </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef } from "vue";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";

interface FormState {
  name: string;
  password: string;
  // region: string | undefined;
  isShowPwd: boolean;
  // type: string[];
  // resource: string;
  // desc: string;
}

export default defineComponent({
  components: {
    UserOutlined,
    EyeOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
  },
  setup: function () {
    const formState: UnwrapRef<FormState> = reactive({
      name: "",
      password: "",
      isShowPwd: true,
    });
    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
    };
    const onShowPassword = () => {
      formState.isShowPwd = !formState.isShowPwd;
    };
    return {
      // labelCol: { span: 4 },
      // wrapperCol: { span: 14 },
      formState,
      onSubmit,
      onShowPassword,
    };
  },
});
</script>
<style scoped lang="scss">
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: url(../../assets/images/login-bg.png) center no-repeat;
  background-size: cover;
  overflow: auto;
}

.login-container .wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 384px;
  padding: 20px;
}

.login-container .wrapper {
  background: #fff;
  border-radius: 4px;

  .title {
    width: 100%;
    text-align: center;
    font-weight: 700;
  }

  .login-form {
    width: 100%;

    .footer {
      .btn1 {
        float: left;
        margin-left: -14px;
        &.ant-btn-link {
          color: #333;
        }
      }

      .btn2 {
        float: right;
        margin-right: -14px;
      }
    }
  }
}
</style>
