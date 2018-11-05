<template>
	<div class="singerList">
		<div>
		<loading :show='!isloading'/>
		<group v-if='isloading'>
			<cell v-for="item,index in list" :key='item.id' :title='item.singername' @click.native='onClick(item.singerid,item.singername)'>
				<img slot='icon' :src="item.imgurl.replace('{size}',100)" alt="">
			</cell>
		</group>
	</div>
	</div>
</template>
<script>
import { Loading,Group,Cell} from 'vux';
import Song from '@/components/song'
	export default{
		data(){
			return {
				isloading:false
			}
		},
		created(){
			let option={
				method:'SingerList',
				params:{classid:this.$route.params.classid}
			}
			this.$store.dispatch('getdataAction',option).then(() => {this.isloading = true;})
		},
		computed:{
			list(){
				return this.$store.state.data.list
			}
		},
		components:{
			Loading,
			Song,
			Group,
			Cell,
		},
		methods:{
			onClick(id,name){
				this.$store.commit('changeNavTitle',name)
				this.$router.push({name:'SingerInfo',params:{
					singerid:id
				}})
			}
		}
	}
</script>
