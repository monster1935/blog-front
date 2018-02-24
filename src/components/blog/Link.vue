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
          <a target="_blank" :href="nav.link">{{nav.label}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        linkList: [
          { label: 'SegmentFault', link: 'https://segmentfault.com/' },
          { label: '掘金', link: 'https://juejin.im/' },
          { label: '众成翻译', link: 'http://www.zcfy.cc/' },
        ]
      };
    },
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
    }
  }
</style>
