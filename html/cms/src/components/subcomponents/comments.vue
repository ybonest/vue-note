<template>
  <div>
    <div>发表评论{{id}}</div>
    <textarea class="comment" v-model="comments" placeholder="请输入评论"></textarea>
    <mt-button type="primary" @click="publishComments" size="large">发表评论</mt-button>
    <ul class="comment-list">
      <li v-for="(item,index) in commentslist" :key="item.id">
        <p class="title">
          第{{index+1}}楼用户：{{item.user_name}} 发表时间：{{item.add_time|dateFormat}}
        </p>
        <p class="content">{{item.content}}</p>
      </li>
    </ul>
    <mt-button type="danger" size="large" plain @click="getComments">加载更多</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    props:['id'],
    data(){
      return {
        pageindex:1,
        commentslist:[],
        flag:false,
        comments:''
      }
    },
    created(){
      this.getComments();
    },
    methods:{
      async getComments(){
        if(this.flag) return;
        const {data} = await this.$http.get(`/api/getcomments/${this.id}?pageindex=${this.pageindex}`);
        if(data.status === 0){
          if(data.message.length <= 0) return this.flag=true;
          this.commentslist = this.commentslist.concat(data.message);
          this.pageindex++;
        }
      },
      async publishComments(){
        if(this.comments === ''){
          Toast({
            message: '内容不能为空',
            duration: 3000
          });
          return;
        }
        const {data} = await this.$http.post(`/api/postcomment/${this.id}`,{content:this.comments});
        if(data.status === 0){
          Toast({
            message: '发表成功',
            duration: 3000
          });
          this.commentslist.unshift({add_time:new Date(),content:this.comments,user_name:'王威'})
          this.comments = '';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment{
    margin-bottom: 0px;
    font-size: 13px;
  }
  .comment-list{
    list-style: none;
    margin: 0;
    padding: 0;
    .title{
      color: #000;
      background-color: #cccccc;
      color: #000;
    }
    .content{
      padding-left: 20px;
    }
  }
</style>
