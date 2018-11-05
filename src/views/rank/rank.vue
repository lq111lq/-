<template>
	<div class="rank">
		<loading :show='!isloading'/>
		<group v-if='isloading'>
			<cell v-for="item,index in list" :key='item.id' :title='item.rankname' is-link @click.native='onClick(item.rankid)'>
				<img slot='icon' :src="item.imgurl.replace('{size}',400)" alt="">
			</cell>
		</group>
	</div>
</template>
<script>
import {Cell,Group,Loading} from 'vux'
	export default{
		data(){
			return {
				isloading:false
			}
		},
		created(){
			let option={
				method:'Rank'
			}
			this.$store.dispatch('getdataAction',option).then(() => {this.isloading = true;})
		},
		computed:{
			list(){
				return this.$store.state.data.list
			}
		},
		components:{
			Cell,
			Group,
			Loading
		},
		methods:{
			onClick(id){
				this.$router.push({name:'RankInfo',params:{rankid:id}})
			}
		}
	}
</script>