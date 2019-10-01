<template>
  <el-container class="record">
    <el-header>
      <h1>模板管理页</h1>
    </el-header>
    <el-main>
      <el-button class="record-add" @click="add" type="primary">新增</el-button>
      <el-table class="record-table" :data="record" style="width: 1510px" height="700">
        <el-table-column fixed prop="id" label="项目id" width="100"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="280"></el-table-column>
        <el-table-column prop="description" label="项目描述" width="250"></el-table-column>
        <el-table-column prop="uids" label="参与人员" width="200"></el-table-column>
        <el-table-column label="更新时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.utime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click.native.prevent="eidtRow(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button @click.native.prevent="recordRow(scope.$index, scope.row)" size="mini">模板</el-button>
            <el-button
              @click.native.prevent="manageRow(scope.$index, scope.row)"
              size="mini"
              type="primary"
            >管理</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              size="mini"
              type="danger"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="record-footer">这是cms管理平台</el-footer>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与人员" :label-width="formLabelWidth">
          <el-input v-model="form.uids" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<style lang="less" scoped>
.record {
  height: 100%;

  .record-add {
    margin-bottom: 20px;
  }

  .record-table {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
  }

  .record-footer {
    font-size: 12px;
  }
}
</style>

<script>
export default {
  data () {
    return {
      pid: '',
      dialogTitle: '', // 弹窗标题
      dialogFormVisible: false, // 弹窗显示隐藏
      formLabelWidth: '120px', // 弹窗内部表达宽度
      record: [],
      form: {
        id: '',
        name: '',
        description: '',
        uids: ''
      },
      activeIndex: '', // 现在操作的行数
      operateType: '' // 操作类型 add新增 edit修改
    }
  },
  created () {
    const pid = this.$route.params.id
    this.pid = pid
    this.$axios.get(`/record?pid=${pid}`).then(res => {
      const result = res.data || {}
      if (result.code === 0) {
        this.record = result.data || []
      } else {
        this.$message.error('数据异常')
      }
    }).catch(err => {
      console.log(err)
      this.record = []
      this.$message.error('接口异常')
    })
  },
  methods: {
    // 增加
    add () {
      this.operateType = 'add'
      this.dialogTitle = '新增'
      this.$set(this.form, 'id', '')
      this.$set(this.form, 'name', '')
      this.$set(this.form, 'description', '')
      this.$set(this.form, 'uids', '')
      this.dialogFormVisible = true
    },
    // 编辑
    eidtRow (index, row) {
      this.activeIndex = index
      this.operateType = 'edit'
      this.dialogTitle = '编辑'
      this.$set(this.form, 'id', row.id)
      this.$set(this.form, 'name', row.name)
      this.$set(this.form, 'description', row.description)
      this.$set(this.form, 'uids', row.uids)
      this.dialogFormVisible = true
    },
    // 进入模板页面
    recordRow (index, row) {
      this.$router.push({
        name: 'record',
        params: {
          id: row.id
        }
      })
    },
    // 进入管理页面
    manageRow (index, row) {
      this.$router.push({
        name: 'record',
        params: {
          id: row.id
        }
      })
    },
    // 删除
    deleteRow (index, row) {
      this.$axios.get(`/project/delete?id=${row.id}`).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.project.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('数据异常')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('接口异常')
      })
    },
    // 提交
    submit () {
      this.dialogFormVisible = false
      if (this.operateType === 'add') {
        // 新增提交
        this.submitAdd()
      } else {
        // 编辑提交
        this.submitEdit()
      }
    },
    // 新增提交
    submitAdd () {
      this.$axios.post('/project/add', this.form).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.project.push(result.data)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message.error('数据异常')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('接口异常')
      })
    },
    // 编辑提交
    submitEdit () {
      this.$axios.post('/project/update', this.form).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.project.splice(this.activeIndex, 1, result.data)
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        } else {
          this.$message.error('数据异常')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('接口异常')
      })
    }
  }
}
</script>
