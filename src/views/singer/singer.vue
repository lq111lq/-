<template>
	<div class="singer">
		<loading :show='!isloading'/>
		<div v-if='isloading'>
			<group v-for="item,index in list" :key='index'>
				<cell v-for="i,key in item" :key='item.id'  is-link :title='i.classname' @click.native='onClick(i.classid,i.classname)'>
				</cell>
			</group>
		</div>
	</div>
</template>
<script>
import {Cell,Group,Loading} from 'vux'
	export default{
		data(){
			return {
				isloading:false,
			}
		},
		created(){
			let option={
				method:'Singer'
			}
			this.$store.dispatch('getdataAction',option).then(() => {this.isloading = true;})
		},
		computed:{
			list(){
				let arr =[];
				let i =1;
				arr.push([this.$store.state.data.list[0]]);
			  	while(i<this.$store.state.data.list.length){
			  		arr.push(this.$store.state.data.list.slice(i,i+3));
			  		i+=3;
			  	}
				return arr
			}
		},
		components:{
			Cell,
			Group,
			Loading
		},
		methods:{
			onClick(id,classname){
				this.$store.commit('changeNavTitle',classname)
				this.$router.push({name:'SingerList',params:{
					classid:id
				}})
			}
		}
	}
</script>
<style>
	
</style>