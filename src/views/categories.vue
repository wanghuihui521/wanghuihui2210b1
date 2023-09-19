<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="add">添加分类</el-button>

            <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
                <el-table-column fixed prop="date" label="索引" width="100" type="index" />
                <el-table-column prop="cat_name" label="分类名称" width="200" />
                <el-table-column label="是否有效" width="220">
                    <template #default="scoped">
                        <el-icon color="#67c23a" v-if="scoped.row.cat_deleted === true">
                            <SuccessFilled />
                        </el-icon>
                        <el-icon color="#ff0000" v-else>
                            <CircleCloseFilled />
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="排序" width="220">
                    <template #default="scoped">
                        <el-tag>{{ State[scoped.row.cat_level] }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template #default="scoped">
                        <el-button type="primary" size="small" @click="handleClick(scoped.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="del(scoped.row.cat_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
        <el-dialog v-model="dialogVisible" :title="title" width="60%">
            <el-form ref="ruleFormRef" :model="ruleForm" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item prop="cat_name" label="分类名称">
                    <el-input v-model="ruleForm.cat_name" />

                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader v-model="val" :options="tableData" :props="{ label: 'cat_name', value: 'cat_id' }"
                        @change="handleChange" />
                    <!-- <el-select v-model="ruleForm.cat_pid" placeholder="请选择">
                            <el-option  label="0" value="0"></el-option>
                            <el-option  label="1" value="1"></el-option>
                    </el-select> -->

                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addList">
                        确定
                    </el-button>
                    <!-- <el-button type="primary" @click="submitForm(ruleFormRef)">
                        确定
                    </el-button> -->
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { SuccessFilled, CircleCloseFilled } from "@element-plus/icons-vue"
import { ref, reactive } from "vue"
import { categoriesApi, addApi, delApi, emitApi } from "@/utils/api"
import { useRouter, useRoute } from "vue-router"
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus"
const router = useRouter()
const route = useRoute()
const val = ref()
enum State {
    "一级",
    "二级",
    "三级"
}
var obj = {
    cat_name: "",
    cat_pid: 0,
    cat_level: 0
}
const cat_name = ref('')
const handleChange = async () => {
    obj = {
        cat_name: cat_name.value,
        cat_pid: val.value[val.value.length - 1],
        cat_level: val.value.length
    }
}
interface RuleForm {
    cat_pid: number
    cat_level: number
    cat_name: string
    cat_id?: number

}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    cat_pid: 0,
    cat_level: 0,
    cat_name: "",
    cat_id: 0
})
const tableData = ref([])

const categoriesList = () => {
    categoriesApi({ pagenum: 1, pagesize: 10 }).then(res => {
        console.log(res);
        tableData.value = res.data.data
    })
}
categoriesList()
const title = ref('添加分类')
const handleClick = (val: any) => {
    console.log(val);
    ruleForm.cat_id = val.cat_id
    ruleForm.cat_name = val.cat_name
    title.value = "修改分类"
    dialogVisible.value = true

}
const dialogVisible = ref(false)
const add = () => {
    title.value = "添加分类"

    dialogVisible.value = true
}
// const submitForm = async (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             if (title.value == "添加分类") {

//                 addApi(ruleForm).then(res => {
//                     console.log(res);
//                     dialogVisible.value = false
//                     categoriesList()
//                     ElMessage({
//                         message: '添加成功',
//                         type: 'success',
//                     })
//                 })
//             } else {
//                 emitApi(ruleForm).then(res => {
//                     console.log(res);
//                     dialogVisible.value = false
//                     categoriesList()
//                     ElMessage({
//                         message: '编辑成功',
//                         type: 'success',
//                     })
//                 })
//             }


//         } else {
//             console.log('error submit!', fields)
//         }
//     })
// }

const addList = async () => {
    obj.cat_name = cat_name.value
    let res = await addApi(obj)
    obj = {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0
    }
    dialogVisible.value = false


}

const del = (cat_id: number) => {
    // console.log(val.cat_id);

    delApi({ id: cat_id }).then((res: any) => {
        console.log(res);
        categoriesList()
        ElMessage({
            message: '删除成功',
            type: 'success',
        })

    })
}

</script>

<style lang="scss" scoped>
.box-card {
    padding: 20px;
}
</style>