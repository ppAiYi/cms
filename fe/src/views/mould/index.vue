<template>
  <el-container class="mould">
    <el-header>
      <h1>模板管理页</h1>
    </el-header>
    <el-main>
      <el-button class="mould-add" @click="add" type="primary">新增</el-button>
      <el-table class="mould-table" :data="mould" style="width: 1510px" height="620">
        <el-table-column fixed prop="id" label="模板id" width="100"></el-table-column>
        <el-table-column prop="name" label="模板名称"></el-table-column>
        <el-table-column prop="description" label="模板描述"></el-table-column>
        <el-table-column prop="struct" label="模板数据结构"></el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.utime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="eidtRow(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              size="mini"
              type="danger"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="mould-footer">这是cms管理平台</el-footer>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="模板名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in form.struct"
          :label="'字段名' + (index + 1)"
          :label-width="formLabelWidth"
          :key="index"
        >
          <el-select v-model="domain.type" placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input placeholder="请填写key名称" v-model="domain.value"></el-input>
          <el-input v-if="domain.type==='selected'" placeholder="请填写列表数据" v-model="domain.selected"></el-input>
          <el-button v-show="index !== 0" @click.prevent="removeKey(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="addKey">新增字段名</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<style lang="less" scoped>
.mould {
  height: 100%;

  .mould-add {
    margin-bottom: 20px;
  }

  .mould-table {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
  }

  .mould-footer {
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
      mould: [],
      form: {
        id: '',
        name: '',
        description: '',
        struct: [{
          value: ''
        }]
      },
      options: [{
        value: 'text',
        label: '文本'
      }, {
        value: 'image',
        label: '图片'
      }, {
        value: 'selected',
        label: '选择列表'
      }],
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
        this.mould = result.data || []
      } else {
        this.$message.error('数据异常')
      }
    }).catch(err => {
      console.log(err)
      this.mould = []
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
      this.$set(this.form, 'struct', [{ value: '', type: '' }])
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
      this.$set(this.form, 'struct', JSON.parse(row.struct))
      this.dialogFormVisible = true
    },
    // 删除
    deleteRow (index, row) {
      this.$axios.get(`/mould/delete?id=${row.id}`).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.mould.splice(index, 1)
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
      obj.name = form.name
      obj.description = form.description
      obj.struct = JSON.stringify(form.struct)
      this.$axios.post('/mould/add', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.mould.push(result.data)
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
      obj.name = form.name
      obj.description = form.description
      obj.struct = JSON.stringify(form.struct)
      this.$axios.post('/mould/update', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          this.mould.splice(this.activeIndex, 1, result.data)
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
    },
    // 添加一个key
    addKey () {
      this.form.struct.push({
        value: '',
        type: ''
      })
    },
    // 删除一个key
    removeKey (item) {
      const index = this.form.struct.indexOf(item)
      if (index !== -1) {
        this.form.struct.splice(index, 1)
      }
    }
  }
}
</script>
