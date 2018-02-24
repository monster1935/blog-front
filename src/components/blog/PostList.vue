<template>
    <div class="post-list">
        <post-block
            v-for="article in articles"
            :key="article._id"
            :id="article._id"
            :title="article.title"
            :time="article.createTime"
            :tags="article.tags"
            :viewCounts="article.viewCounts"
            :categories="article.categories"
            :content="article.content">
        </post-block>
        <div class="loading-wrapper" v-if="isLoading">
          <i class="iconfont icon-loading"></i>
        </div>
        <div class="info-wrapper" v-else>
          <p>已显示全部数据</p>
        </div>
    </div>
</template>

<script>
    import PostBlock from './PostBlock.vue';
    export default {
        data () {
            return {
                articles: [],
                isLoading: true,
                curPage: 0,
                pageSize: 6,
                isLastPage: false
            };
        },
        components: {
            PostBlock
        },
        mounted() {
            this.getAllArticles();
            let _content = document.querySelector('.blog-content');
            let _main = document.querySelector('.main');
            let _footer = document.querySelector('.footer');

            // 下拉无限加载
            var that = this;
            _content.addEventListener('scroll', function () {
                if ((_content.scrollTop + _content.clientHeight) >= (_main.offsetHeight + _footer.offsetHeight + 60)) {
                    // 触发加载数据
                    if (!that.isLastPage) {
                        that.isLoading = true;
                        that.getAllArticles();
                    }

                }
            });
        },
        methods: {
            // get all articles
            getAllArticles (){
                this.$http.post('/v2/articles',{
                    curPage: this.curPage + 1,
                    pageSize: this.pageSize,
                }).then(res => {
                    this.isLoading = false;
                    if (res.data.resCode == 100) {
                        if (res.data.dataList && res.data.dataList.length) {
                            this.articles = this.articles.concat(res.data.dataList.filter(el => {
                                return el.categories != 'about';
                            }));
                            this.curPage = res.data.data.curPage;
                            this.pageSize = res.data.data.pageSize;
                        } else {
                            // 已经到了最后一页
                            this.isLastPage = true;
                        }

                    } else {
                        console.error(res.data.resDesc);
                    }
                })
            }
        },
        computed: {},
        watch: {}
    };
</script>

<style scope>
  .loading-wrapper,
  .info-wrapper {
      margin: 0 auto;
      text-align: center;
  }
  .info-wrapper {
    color: #999;
    font-size: 14px;
  }
  .loading-wrapper .iconfont.icon-loading {
      font-size: 30px;
      display: inline-block;
      animation: loading-rotate 1s linear infinite;
  }
  @keyframes loading-rotate {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }
</style>
