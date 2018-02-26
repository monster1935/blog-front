<!-- Copyright (c) 2018 by monster1935. All Rights Reserved. -->
<!-- 友链管理组件 -->
<template>
  <div class="link-manage">
    <h2>友链管理</h2>
    <div class="link-table">
      <common-table
        :table-data="tableData"
        :table-column="tableColumn"
        :operation-label="operationLabel"
        :place-holder="placeHolder"
        :is-paging="true"
        @btnAdd="handleBtnAdd"
        @refreshTable="handleRefreshTable"
      >
        <el-table-column label="操作" slot="opera">
          <template slot-scope="scope">
            <el-button type="text" @click="handleBtnDel(scope.row)">删除</el-button>
            <el-button type="text" @click="handleBtnEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </common-table>
    </div>
    <el-dialog :visible.sync="detailVis" :title="isEdit ? '编辑' : '新增'" size="tiny">

        <el-form :model="linkForm" ref="linkForm" label-width="80px" label-position="left">
          <el-form-item label="网站名">
            <el-input v-model="linkForm.name"></el-input>
          </el-form-item>
          <el-form-item label="网站链接">
            <el-input v-model="linkForm.link"></el-input>
          </el-form-item>
          <el-form-item label="网站简介">
            <el-input type="textarea" :rows="5" v-model="linkForm.info"></el-input>
          </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
         <el-button @click="detailVis = false">取 消</el-button>
         <el-button type="primary" @click="handleBtnConfirm">确 定</el-button>
       </span>

    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/common/CommonTable';
export default {
  data() {
    return {
      id: '',
      linkForm: {
        name: '',
        link: '',
        info: '',
      },
      detailVis: false,
      isEdit: false,
      tableData: [],
      tableColumn: [
        {
          prop: 'name',
          label: '网站',
        },
        {
          prop: 'link',
          label: '链接',
        },
        {
          prop: 'info',
          label: '简介',
        },
        {
          slot: 'opera'
        }
      ],
      operationLabel: '新增友链',
      placeHolder: '请输入友链名称',
    };
  },
  mounted() {
    this.getTableData();
  },
  components: {
    CommonTable,
  },
  methods: {
    getTableData(params) {
      this.$http.post('/v2/links',{name: params}).then(res => {
        if (res.data.resCode == 100) {
            res.data.dataList.forEach(el => {
                el.createTime = this.$moment(Date.parse(el.createTime)).format('YYYY-MM-DD hh:mm:ss');
            });
            this.tableData = res.data.dataList.reverse();
        } else {
            this.$message.error(res.data.resDesc);
        }
      });
    },
    handleRefreshTable(params) {
      this.getTableData(params.inputText);
    },
    handleBtnAdd() {
      this.linkForm.name = '';
      this.linkForm.link = '';
      this.linkForm.info = '';
      this.isEdit = false;
      this.detailVis = true;
    },
    handleBtnEdit({_id, name, link, info}) {
      this.id = _id;
      this.linkForm.name = name;
      this.linkForm.link = link;
      this.linkForm.info = info;
      this.isEdit = true;
      this.detailVis = true;
    },
    handleBtnConfirm() {
      const params = {
        ...this.linkForm,
      };
      if (this.isEdit) {
        params.id = this.id;
      }
      const url = this.isEdit ? '/v2/editLink' : '/v2/addLink';
      this.$http.post(url, params).then(res => {
        if (res.data.resCode == 100) {
          this.getTableData();
          this.$message({
            type: 'success',
            message: this.isEdit ? '更新成功！' : '添加成功！',
          });
        }
      });
      this.detailVis = false;
    },
    handleBtnDel(row) {
      this.$confirm('是否删除该友链？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        this.$http.post('/v2/delLink', { id: row._id }).then(res => {
          if (res.data.resCode === 100) {
            this.getTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      })
      .catch(() => {});
    }
  }
}
</script>

<style lang="css">
</style>
