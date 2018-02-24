<!--
    通用table组件，包含搜索，新建，表格列表，表格内按钮等

    @prop {Object} tableData 表格数据 默认为空
    @prop {Object} tableColumn 表格列配置项 默认为空
    @prop {String} placeHolder 搜索框placeholder文本 默认为"请输入"
    @prop {String} operationLabel 新增条目按钮文本 默认为"新增"
    @prop {String} isPaging 是否需要前端分页 默认为false，这种情况下需要提供pageInfo即分页信息
    @prop {Object} pageInfo 分页信息 默认为 pageSize: 10, currPage: 1, totalRecord: 0

    @event sortChange 列设置了排序的情况下监听排序动作并通知父组件进行排序
    @event filterChange 列设置了表头过滤的情况下监听表头过滤动作并通知父组件进行数据过滤
    @event refreshTable 开启后端分页的情况下分页动作发生时重新获取table数据
    @event btnAdd 新增按钮动作发生时通知父组件
    @event inputQuery 搜索时通知父组件进行数据获取

    @example

    <common-table
        :page-info="pageInfo"
        :table-data="tableData"
        :table-column="tableColumn"
        :operation-label="operationLabel"
        :place-holder="placeHolder"
        @sortChange="handleSortChange"
        @refreshTable="handleRefreshTable"
        @filterChange="handleFilterChange"
        @btnAdd="handleBtnAdd">
        <el-table-column label="自定义列" slot="opera">
            <template scope="scope">
                <el-button>{{scope.row.btnText}}</el-button>
            </template>
        </el-table-column>
    </common-table>

    table列配置项：

    tableColumn: [
        {
            prop: 'eventName',
            label: '事件名'
        },
        ...
        {
            slot: 'opera'
        }
    ]
    需注意： 列配置项中的slot的名需与业务组件中自定义列的slot名称相同。
-->
<template>
    <div class="common-table">
        <div class="table-operation clearfix">
            <el-input
                icon="search"
                :placeholder="placeHolder"
                class="input-search"
                v-model="inputText"
                @click="onQueryClick"
                @keyup.enter.native="onQueryClick">
            </el-input>
            <el-button
                type="primary"
                class="btn-add"
                @click="onBtnAddClick">
                {{operationLabel}}
            </el-button>
        </div>
        <el-table
            :data="tableDataCopy"
            @filter-change="filterChange"
            @sort-change="sortChange">
            <template v-for="(column,index) in tableColumn">
                <!-- 自定义插槽，用于不同业务的自定义列展示 -->
                <slot v-if="column.slot" :name="column.slot"></slot>
                <el-table-column
                    v-else
                    v-bind="column">
                </el-table-column>
            </template>
        </el-table>
        <div class="clearfix">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="pagination.currPage"
                :total="pagination.totalRecord"
                :page-size="pagination.pageSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            },
            tableColumn: {
                type: Array,
                default () {
                    return [];
                }
            },
            placeHolder: {
                type: String,
                default: '请输入'
            },
            operationLabel: {
                type: String,
                default: '新增'
            },
            isPaging: {
                type: Boolean,
                default: false
            },
            pageInfo: {
                type: Object,
                default () {
                    return {
                        pageSize: 10,
                        currPage: 1,
                        totalRecord: 0
                    };
                }
            }
        },
        data () {
            return {
                inputText: '',
                filterType: '',
                order: {},
                pagination: {
                    pageSize: 10,
                    currPage: 1,
                    totalRecord: 0
                },
                tableDataCopy: []
            };
        },
        components: {},
        mounted() {},
        methods: {
            /**
             * 分页动作监听
             */
            handleCurrentChange (val) {
                this.pagination.currPage = val;
                if (this.isPaging) {
                    // 表格内部自动分页（前端分页）
                    this.tableDataCopy = this.tableData.slice(this.start, this.end);
                } else {
                    // 后台分页
                    this.$emit('refreshTable', {
                        'inputText': this.inputText,
                        'pagination': this.pagination,
                        'order': this.orderInfo,
                        'filterType': this.filterType
                    });
                }

            },
            /**
             * 表格搜索动作
             */
            onQueryClick () {
                this.$emit('refreshTable', {
                    'inputText': this.inputText,
                    'pagination': this.pagination,
                    'order': this.orderInfo,
                    'filterType': this.filterType
                });
            },
            /**
             * 表格外部新增条目
             */
            onBtnAddClick () {
                this.$emit('btnAdd');
            },
            /**
             * 表格表头过滤事件监听
             * @param {Object} val {columnKey, value(Array)} 见element文档
             */
            filterChange (val) {
                let key = Object.keys(val)[0];
                let status = val[key][0];
                this.filterType = status;
                this.$emit('refreshTable', {
                    'inputText': this.inputText,
                    'pagination': this.pagination,
                    'order': this.orderInfo,
                    'filterType': this.filterType
                });
                this.$emit('filterChange', val);
            },
            /**
             * 表格排序事件监听
             * @param {Object} params {column, prop, order} 排序回调传参
             */
            sortChange (params) {
                this.order = params;
                this.$emit('refreshTable', {
                    'inputText': this.inputText,
                    'pagination': this.pagination,
                    'order': this.orderInfo,
                    'filterType': this.filterType
                });
                this.$emit('sortChange', params);
            }
        },
        computed: {
            start () {
                return (this.pagination.currPage - 1) * this.pagination.pageSize;
            },
            end () {
                return this.start + this.pagination.pageSize;
            }
        },
        watch: {
            tableData: {
                handler(val) {
                    this.pagination.totalRecord = val.length;
                    if (this.isPaging) {
                        this.tableDataCopy = this.tableData.slice(this.start, this.end);
                    } else {
                        this.tableDataCopy = this.tableData.slice();
                        this.pagination = Object.assign({}, this.pageInfo);
                    }
                },
                immediate: true,
            }
        }
    };
</script>

<style media="screen">
  .clearfix {
    display: block;
    zoom: 1;
    &:after {
      content: "";
      display: block;
      font-size: 0;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  .el-pagination {
    display: inline-block;
    padding: 20px 0;
    float: right;
  }
</style>

<style lang="scss" scoped>
    .common-table {
        .table-operation {
            .input-search {
                width: 360px;
                margin-bottom: 20px;
            }
            .btn-add {
                float: right;
            }
        }
    }
</style>
