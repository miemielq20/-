<template>
  <div class="main">
    <el-row>
      <el-col :span="12">
        <el-input v-model="obj.search" size="default" placeholder="Type to search" :span="12" />
      </el-col>
      <el-col :span="6" class="bt">
        <el-button type="warning" @click="handleSelect">查询</el-button>
        <el-button type="success" @click="handAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="obj.tableData" style="width: 65%" max-height="500">
      <el-table-column type="index" prop="index" width="50" />
      <el-table-column prop="BookName" label="名称" width="120" sortable />
      <el-table-column prop="Author" label="作者" width="150" sortable/>
      <el-table-column prop="TypeName" label="类别" width="120" sortable />
      <el-table-column prop="Remarks" label="备注" width="150"  />
      <el-table-column  label="操作"  width="150">
      <template #default="scope">
        <el-button  type="danger" size="small" @click="handleDetail(scope.$index,scope.row)"
          >删除</el-button>
        <el-button  type="primary" size="small" @click=handleEdit(scope.$index,scope.row)>修改</el-button>
        
      </template>
    </el-table-column>
    </el-table>

    <add :isShow="obj.isShow" @handClose="hideShow" :info="info" @handleAddEdit="isAddEdit"></add>
  </div>
</template>

<script lang="ts" setup>
import add from './components/Add.vue'
import {http} from './util/http'


import {reactive,ref,onMounted} from 'vue'

const info=ref({})


const obj=reactive({
   tableData : [
   {
   
  },
   ],
  search:'',
  isShow:false
})

const handAdd=()=>{
  obj.isShow=true
}


const hideShow=(value: any)=>{
  obj.isShow=value
  info.value={}
}

/*根据id进行增加或者修改 */
const isAddEdit=(fromList: any)=>{
  if(fromList.id){
    http({
      method:'put',
      url:`/update/${fromList.id}`,
      data:{
        BookName:fromList.BookName,
        Author:fromList.Author,
        TypeName:fromList.TypeName,
        Remarks:fromList.Remarks
      },
    }).then( res=>{
      http({
          url:'/select'
      }).then(res=>{
        obj.tableData=res.data.data
      })
    })
  }else{
    http({
      method:'post',
      url:`/add`,
      data:{
        BookName:fromList.BookName,
        Author:fromList.Author,
        TypeName:fromList.TypeName,
        Remarks:fromList.Remarks
      },
    }).then(res=>{
      http({
          url:'/select'
      }).then(res=>{
        obj.tableData=res.data.data
      })
    })
  }
}

const handleDetail=(index:number,row:any)=>{
  http({
      method:`delete`,
      url:`/del/${row.id}`,
  }).then(res=>{
      http({
          url:'/select'
      }).then(res=>{
        obj.tableData=res.data.data
      })
    })
}

const handleSelect=()=>{
  http({
    url:`/select?Search=${obj.search}`
  }).then(res=>{
  obj.tableData=res.data.data
})
}

const handleEdit=(index:number,row:any)=>{
  obj.isShow=true
  info.value=row
}


onMounted(() => {
  /* 渲染页面 */
  http({
     url:'/select'
  }).then(res=>{
     obj.tableData=res.data.data
  })
})

</script>

<style>
  .main{
    width: 60%;
    margin: 100px auto;
  }

  .el-col{
    line-height:32px ;
  }
  .bt .el-button{
    margin-left: 10px;
  }
  .el-table .cell {
    text-align: center;
  }
</style>
