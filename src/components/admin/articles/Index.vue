<!-- 文章管理页 -->
<template>
    <div class="article-wrap">
        <h2>文章管理</h2>
        <div class="article-table">
            <common-table
                :table-data="tableData"
                :table-column="tableColumn"
                :operation-label="operationLabel"
                :place-holder="placeHolder"
                :is-paging="true"
                @btnAdd="handleBtnAdd"
                @refreshTable="handleRefreshTable"
            >
                <el-table-column label="标签" slot="tags">
                    <template slot-scope="scope">
                        <el-tag
                            v-for="(tag,index) in scope.row.tags" :key="index"
                            class="td-tag"
                            type="primary"
                        >
                            {{tag}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" slot="opera">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleBtnDel(scope.row)">删除</el-button>
                      <el-button type="text" @click="handleBtnEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </common-table>
        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" :visible.sync="postVis" size="full">
          <post-detail
              :article-info="articleInfo"
              :is-edit="isEdit"
              @dialogClose="postVis = false;"
              @refreshList="getAllArticles();"
          >
          </post-detail>
        </el-dialog>
    </div>
</template>

<script>
    import CommonTable from '@/components/common/CommonTable';
    import PostDetail from './PostDetail';
    import markdownEditor from 'vue-simplemde/src/markdown-editor';
    import hljs from 'highlight.js';
    window.hljs = hljs;
    export default {
        data () {
            return {
                name: '',
                tableData: [],
                tableColumn: [
                    {
                        type: 'index',
                        width: 60,
                    },
                    {
                        prop: 'title',
                        label: '标题',
                        width: 400,
                    },
                    {
                        prop: 'categories',
                        label: '分类',
                        width: 100
                    },
                    {
                        slot: 'tags',
                    },
                    {
                        prop: 'createTime',
                        label: '创建时间',
                    },
                    {
                        prop: 'lastEditTime',
                        label: '更新时间',
                    },
                    {
                        slot: 'opera',
                    },
                ],
                placeHolder: '请输入文章标题',
                operationLabel: '新增文章',
                postVis: false,
                articleInfo: {},
                isEdit: false
            };
        },
        components: {
            markdownEditor,
            CommonTable,
            PostDetail,
        },
        mounted() {
            this.getAllArticles();
        },
        methods: {
            // 获取所有文章
            getAllArticles (title) {
                this.$http.post('/v2/articleList', {title}).then(res => {
                    if (res.data.resCode == 100) {
                        this.tableData = res.data.dataList;
                    } else {
                        this.$message.error(res.data.resDesc);
                    }
                });
            },

            // 删除
            handleBtnDel (row) {
                this.$confirm('是否删除该文章？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/v2/delArticle', {id: row._id}).then(res => {
                        if (res.data.resCode == 100) {
                            this.getAllArticles();
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                        }else {
                            this.$message.error(res.data.resDesc);
                        }
                    });
                }).catch(()=>{});
            },
            // 编辑
            handleBtnEdit ({id, title,content, tags, categories}) {
                this.articleInfo = {
                  id,
                  title,
                  content,
                  categories,
                  tags: tags.slice(),
                };
                this.isEdit = true;
                this.postVis = true;
            },
            // 添加
            handleBtnAdd() {
              // 清空
              this.articleInfo = {};
              this.isEdit = false;
              this.postVis = true;
            },
            // 查询
            handleRefreshTable(params) {
              this.getAllArticles(params.inputText);
            },

        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss">
 @import '~simplemde/dist/simplemde.min.css';
 @import '~github-markdown-css';
 @import '~highlight.js/styles/atom-one-dark.css';
</style>
<style lang="scss" scoped>
    .article-wrap {
      .td-tag {
        margin-right: 6px;
      }
    }
</style>
