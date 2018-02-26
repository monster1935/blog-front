<!-- Copyright (c) 2018 by monster1935. All Rights Reserved. -->
<!-- 文章添加、编辑组件 -->

<template>
  <div class="post-detail">
    <div class="post-info">
      <el-form :model="articleModel" ref="articleForm">
        <el-form-item prop="title">
          <el-input
            v-model="articleModel.title"
            placeholder="请输入文章标题">
          </el-input>
        </el-form-item>
        <el-form-item prop="tags">
          <el-input
            v-model="tags"
            placeholder="请输入文章标签，Enter添加"
            @keyup.enter.native="handleTagsAdd">
          </el-input>
        </el-form-item>
        <el-form-item v-show="articleModel.tags.length > 0">
          <el-tag
            v-for="(tag,index) in articleModel.tags"
            :key="tag"
            :closable="true"
            @close="handleTagsRemove(index)"
            type="gray">
            {{tag}}
          </el-tag>
        </el-form-item>
        <el-form-item  prop="categories">
          <el-input v-model="articleModel.categories" placeholder="请输入文章分类"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <markdown-editor
      v-model="content"
      ref="markdownEditor"
      preview-class="markdown-body"
      :highlight="true">
    </markdown-editor>
    <div class="btn-article">
        <el-button type="primary" @click="handleBtnSubmit">提交</el-button>
        <el-button @click="handleBtnReset">取消</el-button>
    </div>
  </div>
</template>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor';
  import hljs from 'highlight.js';
  window.hljs = hljs;
  export default {
    props: {
      articleInfo: {
        type: Object,
        default() {
          return {};
        },
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        content: '',
        tags: '',
        articleModel: {
          title: '',
          tags: [],
          categories: ''
        },
      };
    },
    mounted() {

    },
    components: {
      markdownEditor
    },
    methods: {
      // 标签添加
      handleTagsAdd() {
        if (this.tags) {
          this.articleModel.tags.push(this.tags);
          this.tags = '';
        }
      },
      // 标签删除
      handleTagsRemove(index) {
        this.articleModel.tags.splice(index,1);
      },
      // 提交
      handleBtnSubmit() {
        const url = this.isEdit ? '/v2/updateArticle' : '/v2/addArticle';
        const params = {
          content: this.content,
          title: this.articleModel.title,
          tags: this.articleModel.tags.slice(),
          categories: this.articleModel.categories,
        };
        if (this.isEdit) {
          params.id = this.articleModel.id;
        }
        this.$http.post(url,params).then(res => {
          if (res.data.resCode === 100) {
            this.$emit('refreshList');
            this.$message({
              type: 'success',
              message: this.isEdit ? '更新成功！' : '添加成功！',
            });
          } else {
            // todo
          }
        }).catch(e => {console.log(e)});
        this.$emit('dialogClose');
      },
      handleBtnReset() {
        this.$emit('dialogClose');
      },
    },
    watch: {
      articleInfo: {
        handler(val) {
          this.articleModel = {tags: [], title: '', categories: '', ...val };
          this.content = val.content || '';
        },
        immediate: true,
      }
    }
  }
</script>


<style scoped>

</style>
