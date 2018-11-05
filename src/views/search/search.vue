<template>
	<div>
		<div class="search-panel">
			<div class="search-input">
				<span class="search-icon"></span>
				<input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
			</div>
			<a href="javascript:;" @click="search" class="search-btn">搜索</a>
	    </div>
	    <div v-if="!isloading">
	    	<loading />
	    </div>
	    <div v-else>
	    	<div class="search-list" v-show="!togglePanel">
				<div class="search-list-title">最近热门</div>
				<cell 
					v-for="item,index in list" 
					:key="item.keyword"
					:title="item.keyword"
					class="search-hot"
					@click.native='onClick(item.keyword)'
				>
				</cell>
			</div>
			<div class="songs-list" v-show="togglePanel">
				<div class="search-total" v-show='total'>
					共有{{total}}条搜索结果
				</div>
				<div class="search-total" v-show='!total'>
					没有搜到相关内容
				</div>
				<song />
			</div>
	    </div>
	</div>
</template>
<script>
import { Loading,Cell} from 'vux';
import Song from '@/components/song';
export default {
	data () {
	    return {
		    isloading:false,
			keyword:'',
			togglePanel:false,
			list:[],
			total:null
	    }
	},
  components: {
  	Loading,Cell,Song
  },
  created(){
  	this.$store.commit('changeNavTitle','搜索')
  	this.getData()
  },
  methods: {
    search(){
    	if(this.keyword){
	    	let url = 'http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp';
	        let s =document.createElement('script');
	        let callback = `p${Date.now()}`;
	        s.src = `${url}&callback=${callback}`
	    	s.src=`${url}&keyword=${this.keyword}&pagesize=30&callback=${callback}`;
	        document.head.appendChild(s);
	        s.remove();
	        window[callback]= (data)=>{
				this.$store.commit('changelist',data.data.info);
	            this.togglePanel=true;
	            this.total = data.data.total;
	            window[ callback ] = undefined;
	        }
        }
    },
    getData(){
    	let url = 'http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp';
        let s =document.createElement('script');
        let callback = `p${Date.now()}`;
        s.src = `${url}&callback=${callback}`
        if(this.keyword){
    		s.src=`${url}&keyword=${keyword}&pagesize=30&callback=${callback}`;
    	}
        document.head.appendChild(s);
        s.remove();
        window[callback]= (data)=>{
            this.list=data.data.info;
            this.isloading=true;
            window[ callback ] = undefined;
        }
    },
    onClick(keyword){
		this.keyword=keyword;
		this.search();
    }
  },
}
</script>