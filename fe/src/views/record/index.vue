<template>
  <el-container class="record">
    <el-header>
      <h1>项目 & 模板组合页</h1>
    </el-header>
    <el-main>
      <el-button class="record-add" @click="add" type="primary">新增</el-button>
      <el-table class="record-table" :data="record" style="width: 1510px" height="620">
        <el-table-column fixed prop="id" label="项目id" width="100"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="description" label="项目描述"></el-table-column>
        <el-table-column prop="mid" label="模板类型"></el-table-column>
        <el-table-column prop="uri" label="访问路径"></el-table-column>
        <el-table-column prop="uid" label="创建人员"></el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.utime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template slot-scope="scope">
            <el-button @click.native.prevent="eidtRow(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="manageRow(scope.$index, scope.row)"
              size="mini"
              type="primary"
            >数据</el-button>
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
        <el-form-item label="模板类型" :label-width="formLabelWidth">
          <el-select v-model="form.mid" placeholder="请选择类型">
            <el-option
              v-for="item in selected"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="访问路径" :label-width="formLabelWidth">
          <el-input v-model="form.uri" autocomplete="off"></el-input>
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
      uid: 1,
      pid: '',
      dialogTitle: '', // 弹窗标题
      dialogFormVisible: false, // 弹窗显示隐藏
      formLabelWidth: '120px', // 弹窗内部表达宽度
      record: [],
      selected: [],
      form: {
        id: '',
        name: '',
        description: '',
        mid: '',
        uri: ''
      },
      activeIndex: '', // 现在操作的行数
      operateType: '' // 操作类型 add新增 edit修改
    }
  },
  created () {
    const pid = this.$route.params.id
    this.pid = pid
    this.$axios.get(`/mould?pid=${pid}`).then(res => {
      const result = res.data || {}
      if (result.code === 0) {
        this.selected = result.data || []
      } else {
        this.$message.error('数据异常')
      }
    }).catch(err => {
      console.log(err)
      this.selected = []
      this.$message.error('接口异常')
    })
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
      this.$set(this.form, 'mid', '')
      this.$set(this.form, 'uri', '')
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
      this.$set(this.form, 'mid', row.mid)
      this.$set(this.form, 'uri', row.uri)
      this.dialogFormVisible = true
    },
    // 进入管理页面
    manageRow (index, row) {
      this.$router.push({
        name: 'record-data',
        params: {
          id: this.pid,
          rid: row.id,
          mid: row.mid
        }
      })
    },
    // 删除
    deleteRow (index, row) {
      this.$axios.get(`/record/delete?id=${row.id}`).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.record.splice(index, 1)
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
      const form = this.form
      const obj = {}
      obj.pid = this.pid
      obj.uid = this.uid
      obj.name = form.name
      obj.description = form.description
      obj.mid = form.mid
      obj.uri = form.uri

      this.$axios.post('/record/add', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.record.push(result.data)
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
      const form = this.form
      const obj = {}
      obj.id = form.id
      obj.pid = this.pid
      obj.uid = this.uid
      obj.name = form.name
      obj.description = form.description
      obj.mid = form.mid
      obj.uri = form.uri

      this.$axios.post('/record/update', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.record.splice(this.activeIndex, 1, result.data)
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
