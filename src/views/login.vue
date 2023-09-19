<template>
    <div class="login">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
            <h2 style="text-align: center;">电商后台管理系统</h2>
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" :prefix-icon="User" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" :prefix-icon="Unlock" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    登录
                </el-button>
                <el-button @click="resetForm(ruleFormRef)" type="info">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { Unlock, User } from "@element-plus/icons-vue"
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from "@/utils/api"
import { ElMessage } from "element-plus"
const router = useRouter()
interface RuleForm {
    username: string
    password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 5, max: 10, message: '您输入的用户名必须在5 到 10个字符之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 5, max: 10, message: '您输入的用户名必须在5 到 10个字符之间', trigger: 'blur' },

    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (ruleForm.username == "admin" && ruleForm.password == '123456') {
                loginApi(ruleForm).then(res => {
                    console.log(res);
                    localStorage.setItem('token', res.data.data.token)
                    router.push('/')
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                })
            } else {
                ElMessage({
                    message: '用户名或密码错误',
                    type: 'error',
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    background-color: #2c4b6b;
    overflow: hidden;
    position: relative;

    .el-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 300px;
        border-radius: 5px;
        background-color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;

        .el-form-item {
            margin: 20px 0;
        }

    }
}
</style>