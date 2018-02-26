<!-- Copyright (c) 2018 by monster1935. All Rights Reserved. -->
<!-- 友链组件 -->
<template>
  <div class="link">
    <div class="title">
        <p>友情链接</p>
    </div>
    <div class="link-list">
      <ul>
        <li v-for="(nav,index) in linkList">
          <a target="_blank" :href="nav.link">{{nav.name}}</a>
          <span class="link-info">({{nav.info}})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        linkList: []
      };
    },
    mounted() {
      // 获取友链配置信息
      this.getLinkInfo();
    },
    methods: {
      // 获取友链信息
      getLinkInfo() {
        this.$http.post('/v2/links').then(res => {
          if (res.data.resCode === 100) {
            this.linkList = res.data.dataList;
          } else {
            this.$message.error(res.data.resDesc);
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .link {
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }
    .link-list {
      li {
        margin-bottom: 6px;
      }
      a {
        color: #2479CC;
        text-decoration: none;
      }
      .link-info {
        margin-left: 10px;
        color: #999;
        font-size: 14px;
      }
    }
  }
</style>
