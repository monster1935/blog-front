<!-- Copyright (c) 2018 by monster1935. All Rights Reserved. -->
<!-- 关于信息管理组件 -->
<template>
  <div class="about-manage">
    <h2>关于信息</h2>
    <markdown-editor
        v-model="content"
        ref="markdownEditor"
        preview-class="markdown-body"
        :highlight="true">
    </markdown-editor>
    <div class="btn-article">
        <el-button type="primary" @click="onBtnSubmit">发布</el-button>
        <el-button @click="onBtnReset">重置</el-button>
    </div>
  </div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor';
export default {
  data() {
    return {
      content: '',
      id: '',
    };
  },
  mounted() {
    // 获取关于信息
    this.getAboutInfo();

  },
  components: {
    markdownEditor
  },
  methods: {

    getAboutInfo() {
      this.$http.post('/v2/aboutInfo').then(res => {
        if (res.data.resCode === 100) {
          // store the about info
          if (res.data.dataList && res.data.dataList.length) {
            this.id = res.data.dataList[0]._id;
            this.content = res.data.dataList[0].content;
          } else {
            // todo
          }
        }
      }).catch(e => {
        console.log(e);
      });
    },

    onBtnSubmit() {
      const content = this.content;
      const url = this.id ? '/v2/updateAbout' : '/v2/addAbout';
      const params = {
        content,
      };
      if (this.id) {
        params.id = this.id;
      }
      this.$http.post(url, params).then(res => {
        if (res.data.resCode === 100) {
          this.$message({
            type: 'success',
            message: this.id ? '更新成功！' : '添加成功！',
          });
        }
      });
    },

    onBtnReset() {
      this.content = '';
      this.$notify({
        title: '提示',
        type: 'warning',
        message: '请为网站添加关于信息！',
      });
    },


  },
}
</script>

<style lang="css">
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
@import '~highlight.js/styles/atom-one-dark.css';
</style>
