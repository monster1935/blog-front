<!-- Copyright (c) 2018 by monster1935. All Rights Reserved. -->
<!-- 关于组件 -->
<template>
  <div class="about">
    <div class="title">
        <p>关于我</p>
    </div>
    <div class="about-list">
      <ul>
        <li v-for="(nav,index) in aboutList">
          <a target="_blank" :href="nav.about">{{nav.label}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aboutList: [
          { label: 'SegmentFault', about: 'https://segmentfault.com/' },
          { label: '掘金', about: 'https://juejin.im/' },
          { label: '众成翻译', about: 'http://www.zcfy.cc/' },
        ]
      };
    },
    mounted() {
      // 获取关于的相关信息
      this.getAboutInfo();
    },

    methods: {
      getAboutInfo() {
        this.$http.post('/v2/aboutInfo').then(res => {
          console.log(res);
        }).catch(e => {
          console.log(e);
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .about {
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }
    .about-list {
      li {
        margin-bottom: 6px;
      }
      a {
        color: #2479CC;
        text-decoration: none;
      }
    }
  }
</style>
