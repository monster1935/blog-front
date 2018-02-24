<template>
    <div class="app-blog">
        <div class="blog-header">
          <div class="header-wrapper">
            <a href="/" class="logo">{{blogTitle}}</a>
            <ul class="blog-nav">
                <li v-for="(nav,index) in navs">
                  <router-link class="nav" :to="nav.link">
                    {{nav.title}}
                  </router-link>
                </li>
            </ul>
          </div>
        </div>
        <div class="blog-content">
            <div class="main">
                <router-view></router-view>
            </div>
            <div class="footer">
                <p>
                  © {{currYear}} -  monster1935的博客  -
                  <a target="_blank" href="http://www.miitbeian.gov.cn/">
                    京ICP备15048708号-1
                  </a>
                </p>
                <p>Powered by Vue & Koa2</p>
            </div>
        </div>
        <div class="btn-backtop" v-if="btnVis" @click="onBtnTopClick">
            <i class="iconfont icon-top"></i>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                btnVis: false,
                blogTitle: 'Yuebin的博客',
                navs: [
                  { title: '归档', link: '/archives' },
                  { title: '友链', link: '/link' },
                  { title: '关于', link: '/about' },
                ],
                _content: {}
            };
        },
        components: {},
        mounted() {
            // 判断是否显示置顶按钮
            let _content = document.querySelector('.blog-content');
            this._content = _content;
            var that = this;
            _content.addEventListener('scroll', function (){
                if (_content.scrollTop > 0) {
                    that.btnVis = true;
                } else {
                    that.btnVis = false;
                }
            });
        },
        methods: {
            // 置顶
            onBtnTopClick () {
                this._content.scrollTop = 0;
            }
        },
        computed: {
          currYear() {
            return new Date().getFullYear();
          }
        },
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .app-blog {
        font-family: "Roboto","Segoe UI","Microsoft Yahei","WenQuanYi Micro Hei","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Source Han Sans CN",sans-serif;
        height: 100%;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .blog-header {
            flex: 0 0 60px;
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            z-index: 100;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px;
            .header-wrapper {
              width: 1000px;
              padding: 0 16px;
              margin: 0 auto;
            }
            .blog-nav {
                float: right;
                list-style: none;
                text-decoration: none;
                margin: 0;
                padding: 0;
                li {
                    float: left;
                }
            }
            a.logo {
                text-decoration: none;
                font-size: 22px;
                color: #333;
                &:hover {
                    color: #000;
                }
            }
            a.nav {
                text-decoration: none;
                font-size: 16px;
                color: #444;
                margin: 0 20px;
                &:hover {
                    color: #333;
                    border-bottom: 2px solid #333;
                }
            }
            a.nav.router-link-exact-active.router-link-active {
                color: #333;
                border-bottom: 2px solid #333;
            }

        }
        .blog-content {
            flex: 1;
            overflow: auto;
            padding: 20px 36px;
            display: flex;
            flex-flow: column;
            .main {
                width: 1000px;
                padding: 0 16px;
                margin: 0 auto;
                flex: 1;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 14px;
                color: #636465;
            }
        }
        .btn-backtop {
            position: fixed;
            bottom: 20px;
            right: 40px;
            height: 40px;
            width: 40px;
            border: 1px solid #ccc;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
            transition: display 2s;
            &:hover {
                background: #ddd;
            }
            .iconfont.icon-top {
                margin-right: 0;
            }
        }
    }
</style>

<style>

</style>
