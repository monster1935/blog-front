<!-- 用户管理组件 -->
<template>
    <div class="user-wrap">
        <h2>用户列表</h2>
        <div class="user-table">
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
        <el-dialog
            :title="isEdit? '编辑' : '新增'"
            :visible.sync="userAddVis"
            size="tiny">
            <user-add
                v-if="userAddVis"
                @dialogClose="refreshList"
                :is-edit="isEdit"
                :user-info="userInfo">
            </user-add>
        </el-dialog>
    </div>
</template>

<script>
    import CommonTable from '@/components/common/CommonTable';
    import UserAdd from './UserAdd';
    export default {
        data () {
            return {
                username: '',
                userInfo: {},
                isEdit: false,
                userAddVis: false,
                tableData: [],
                tableColumn: [
                    { prop: 'name' , label: '姓名' },
                    { prop: 'username' , label: '用户名' },
                    { prop: 'avatar' , label: '备注' },
                    { prop: 'createTime' , label: '创建时间' },
                    { slot: 'opera' }
                ],
                operationLabel: '新增用户',
                placeHolder: '请输入用户名',
            };
        },
        components: {
            UserAdd,
            CommonTable
        },
        methods: {
            // 获取表格数据
            getTableData (params) {
                this.$http.post('/v1/users',params).then(res => {
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
            // 新增用户
            handleBtnAdd () {
                this.isEdit = false;
                this.userAddVis = true;
            },
            refreshList () {
                this.userAddVis = false;
                this.getTableData();
            },
            handleBtnDel (user) {
                this.$confirm('是否删除该用户？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/v1/delUser', {id: user._id}).then(res => {
                        if (res.data.resCode == 100) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getTableData();
                        }else {
                            this.$message.error(res.data.resDesc);
                        }
                    });
                }).catch(()=>{});
            },
            // 用户编辑
            handleBtnEdit (user) {
                this.isEdit = true;
                this.userAddVis = true;
                this.userInfo = user;
            },
            // 用户查询
            handleRefreshTable (params) {
                this.getTableData({username: params.inputText});
            },
        },
        mounted() {
            this.getTableData();
        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .user-wrap {
        .border {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 20px;
        }
        .user-table {
            .btn-table {
                margin-bottom: 20px;
                overflow: hidden;
                .user-query {
                    float: right;
                    width: auto;
                }
            }
        }
    }
</style>
<style lang="scss">
    .el-form-item.inline {
        display: inline-block;
    }
</style>
