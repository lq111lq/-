<template>
	<div class="rankinfo">
		<loading :show='!isloading'/>
		<div v-if='isloading'>
			<div class="picture">
				<img :src="list.imgurl.replace('{size}',400)" alt="">
			</div>
			<song />
		</div>
	</div>
</template>
<script>
import { Loading} from 'vux';
import Song from '@/components/song'
	export default{
		data(){
			return {
				isloading:false
			}
		},
		created(){
			let option={
				method:'RankInfo',
				params:{rankid:this.$route.params.rankid}
			}
			this.$store.dispatch('getdataAction',option).then(() => {this.isloading = true;})
		},
		computed:{
			list(){
				return this.$store.state.data.data
			}
		},
		components:{
			Loading,
			Song
		}
	}
</script>