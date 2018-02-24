<template>
  <div class="photo-container">
    <h3 class="title">{{ photoinfo.title }}</h3>
    <p class="time"><span>发表时间：{{ photoinfo.add_time|dateFormat }}</span><span>点击：{{ photoinfo.click }}次</span></p>
    <hr>
    <ul class="suoluetu">
      <li v-for="(item,index) in photolist" :key="item.src">
        <img class="preview-img" @click="$preview.open(index, photolist)" :src="item.src" alt="">
      </li>
    </ul>
    <p class="content" v-html="photoinfo.content"></p>
    
    <comments :id="id"></comments>
  </div>   
</template>

<script>
  import comments from '../../components/subcomponents/comments.vue'
  export default {
    props:['id'],
    data(){
      return {
        photoinfo:[],
        photolist:[]
      }
    },
    created(){
      this.getPhotos();
      this.getImgs();
    },
    methods:{
      async getPhotos(){
        const {data} = await this.$http.get(`/api/getimageInfo/${this.id}`);
        if(data.status === 0){
          this.photoinfo = data.message[0];
        }
      },
      async getImgs(){
        const {data} = await this.$http.get(`/api/getthumimages/${this.id}`)
        if(data.status === 0){
          data.message.forEach(element => {
            element.w = 600;
            element.h = 600;
          });
          this.photolist = data.message;
        }
      }
    },
    components:{
      comments
    }
  }
</script>

<style lang="scss" scoped>
  .photo-container{
    padding: 0 3px;
    .title{
      color: red;
      font-size: 15px;
      margin: 20px;
      color: #26a2ff;
    }
    .time{
      display: flex;
      justify-content: space-between;
      color: #cccccc;
      font-size: 13px;
    }
    .content{
      color: #666;
      font-size: 13px;
      line-height: 30px;
    }
    .suoluetu{
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      li{
        float: left;
        width: 33.3333%;
        padding: 10px;
      }
      img{
        width: 100%;
        vertical-align: middle;
        box-shadow: 0 0 7px #cccccc;
      }
    }
  }
</style>
