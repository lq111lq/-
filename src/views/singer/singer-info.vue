<template>
	<div class="singerinfo">
		<div>
		<loading :show='!isloading'/>
		<div v-if='isloading'>
			<div class="picture">
				<img :src="list.imgurl.replace('{size}',400)" alt="">
			</div>
			<song />
		</div>
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
				method:'SingerInfo',
				params:{singerid:this.$route.params.singerid}
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