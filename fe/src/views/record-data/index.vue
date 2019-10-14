<template>
  <el-container class="record">
    <el-header>
      <h1>数据管理页</h1>
    </el-header>
    <el-main>
      <el-button class="record-add" @click="add" type="primary">新增</el-button>
      <el-table class="record-table" :data="recordData" style="width: 1510px" height="620">
        <el-table-column v-for="item in mould" :key="item.value" :prop="item.value" :label="item.value"></el-table-column>
        <el-table-column v-show="mould.length" label="操作" width="150">
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
    <el-footer class="record-footer">这是cms管理平台</el-footer>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-for="item in mould" :key="item.name" :label="item.value" :label-width="formLabelWidth">
          <el-input v-if="item.type === 'text'" v-model="form[item.value]" autocomplete="off"></el-input>
          <el-input v-else-if="item.type === 'image'" v-model="form[item.value]" autocomplete="off"></el-input>
          <el-select v-else-if="item.type === 'selected'" v-model="form[item.value]" placeholder="请选择类型">
            <el-option
              placeholder="请选择"
              v-for="innerItem in JSON.parse(item.selected || '[]')"
              :key="innerItem.value"
              :label="innerItem.value"
              :value="innerItem.name"
            ></el-option>
          </el-select>
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
      rid: '',
      mid: '',
      dialogTitle: '', // 弹窗标题
      dialogFormVisible: false, // 弹窗显示隐藏
      formLabelWidth: '120px', // 弹窗内部表达宽度
      recordData: [],
      mould: [],
      selected: [],
      form: {},
      activeIndex: '', // 现在操作的行数
      operateType: '' // 操作类型 add新增 edit修改
    }
  },
  created () {
    const params = this.$route.params
    const rid = params.rid
    const mid = params.mid
    this.rid = rid
    this.mid = mid
    this.$axios.get(`/mould/item?id=${mid}`).then(res => {
      const result = res.data || {}
      if (result.code === 0) {
        const item = (result.data && result.data[0]) || '[]'
        this.mould = JSON.parse(item.struct)
      } else {
        this.$message.error('数据异常')
      }
    }).catch(err => {
      console.log(err)
      this.mould = []
      this.$message.error('接口异常')
    })
    this.$axios.get(`/record/item?id=${rid}`).then(res => {
      const result = res.data || {}
      if (result.code === 0) {
        const item = (result.data && result.data[0]) || '[]'
        this.recordData = JSON.parse(item.struct)
      } else {
        this.$message.error('数据异常')
      }
    }).catch(err => {
      console.log(err)
      this.selected = []
      this.$message.error('接口异常')
    })
  },
  methods: {
    // 增加
    add () {
      this.operateType = 'add'
      this.dialogTitle = '新增'
      this.form = {}
      this.dialogFormVisible = true
    },
    // 编辑
    eidtRow (index, row) {
      this.activeIndex = index
      this.operateType = 'edit'
      this.dialogTitle = '编辑'
      this.form = Object.assign({}, {}, row)
      this.dialogFormVisible = true
    },
    // 删除
    deleteRow (index, row) {
      const rdata = [...this.recordData]
      rdata.splice(index, 1)
      const obj = {}
      obj.uid = this.uid
      obj.id = this.rid
      obj.struct = JSON.stringify(rdata)

      this.$axios.post('/record/updateStruct', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          const item = result.data || {}
          this.recordData = JSON.parse(item.struct)
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
      obj.uid = this.uid
      obj.id = this.rid
      obj.struct = JSON.stringify([...this.recordData, form])

      this.$axios.post('/record/updateStruct', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          const item = result.data || {}
          this.recordData = JSON.parse(item.struct)
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
      const rdata = this.recordData
      rdata[this.activeIndex] = this.form
      const obj = {}
      obj.uid = this.uid
      obj.id = this.rid
      obj.struct = JSON.stringify(rdata)

      this.$axios.post('/record/updateStruct', obj).then(res => {
        const result = res.data || {}
        if (result.code === 0) {
          const item = result.data || {}
          this.recordData = JSON.parse(item.struct)
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
