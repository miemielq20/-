<template>
    <div>
        <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="40%"
        :draggable="true"
        :before-close="handleClose"
        @close="resetForm(ruleFormRef)"
        >
            <el-form :model="form"  ref="ruleFormRef" :rules="rules">
                <el-form-item label="书名" prop="BookName">
                  <el-input v-model="form.BookName" />
                </el-form-item>
                <el-form-item label="作者" prop="Author">
                  <el-input v-model="form.Author" />
                </el-form-item>
                <el-form-item label="类别" prop="TypeName">
                  <el-input v-model="form.TypeName" />
                </el-form-item>
                <el-form-item label="备注" prop="Remarks">
                  <el-input v-model="form.Remarks" />
                </el-form-item>
                <el-form-item label-width="59.5%" label-position='right'>
                  <el-button type="primary"  @click="submitForm(ruleFormRef)">确定</el-button>
                  <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                </el-form-item>
          </el-form>
      
        </el-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref,computed,reactive,defineEmits,watch } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'

  const emit = defineEmits(['handClose','handleAddEdit'])
  
  const props=defineProps({
      isShow:{
        type:Boolean,
      },
      info:{
        type:Object
      }
  })
  let form = reactive({
      id:0,
      BookName: '',
      Author: '',
      TypeName:'',
      Remarks:''
  })

  const oldForm = reactive({
      id:0,
      BookName: '',
      Author: '',
      TypeName:'',
      Remarks:''
  })

  const ruleFormRef = ref<FormInstance>()

    const rules = reactive<FormRules>({
        BookName:{ required: true, message: '请输入书名', trigger: 'blur' },
        Author:{ required: true, message: '请输入作者', trigger: 'blur' },
        TypeName:{ required: true, message: '请输入类别', trigger: 'blur' },
        Remarks:{ required: true,  message: '请输入备注', trigger: 'blur' },
    })

  const dialogVisible = computed({
    get(){
      return props.isShow
    },
    set(newVal){
      /* console.log(newVal) */
    }
  })
 
  
  /* 确定 */
  const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      emit('handleAddEdit',form)
      emit('handClose',false)
    } else {
      console.log('error submit!', fields)
    }
  })
}

/* 取消 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
  {
    return
  }else{
    formEl.resetFields()
  }

  
}

/* 关闭 */
const handleClose=(formEl: FormInstance | undefined)=>{
  form=oldForm
  emit('handClose',false)
}


  //监听
watch(()=>props.info,(newInfo)=>{
  if(newInfo){
      form.id=newInfo.id,
      form.BookName= newInfo.BookName,
      form.Author= newInfo.Author,
      form.TypeName=newInfo.TypeName,
      form.Remarks=newInfo.Remarks
  }
})
  
  </script>
  <style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>
  