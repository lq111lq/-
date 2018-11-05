<template>
	<div class='newsong'>
		<loading :show='!isloading'/>
		<div v-if='isloading'>
			<swiper auto loop dots-class="custom-bottom" dots-position="center">
		      <swiper-item v-for="item,index in banner" :key="item.id" class="black">
		      	<img :src="item.imgurl" alt="">
		      </swiper-item>
		    </swiper>
			<song />
		</div>
	</div>
</template>
<script >
import { Loading,Swiper,SwiperItem } from 'vux';
import Song from '@/components/song' 
export default{
	data(){
		return {
			isloading:false
		}
	},
	created(){
		let option={
			method:'NewSong'
		}
		this.$store.dispatch('getdataAction',option).then(() => {this.isloading = true;})
	},
	computed:{
		banner(){
			return this.$store.state.data.banner
		}
	},
	components:{
		Loading,
		Swiper,
		SwiperItem,
		Song
	}
}
</script>
