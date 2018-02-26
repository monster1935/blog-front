<!-- Copyright (c) 2018 by monster1935. All Rights Reserved. -->
<!-- 关于组件 -->
<template>
  <div class="about">
    <div class="title">
        <p>关于</p>
    </div>
    <div class="about-list">
        <div class="about-wrap" v-html="content" v-highlight></div>
    </div>
  </div>
</template>

<script>
  import marked from '@/lib/marked';
  export default {
    data() {
      return {
        content: '',
      };
    },
    mounted() {
      // 获取关于的相关信息
      this.getAboutInfo();
    },

    methods: {
      getAboutInfo() {
        this.$http.post('/v2/aboutInfo').then(res => {
          if (res.data.resCode === 100) {
            // store the about info
            if (res.data.dataList && res.data.dataList.length) {
              this.content = marked(res.data.dataList[0].content);
            } else {
              // todo
            }
          }
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
