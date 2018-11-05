<template>
	<div class="plist">
		<loading :show='!isloading'/>
		<group v-if='isloading'>
			<cell v-for="item,index in list" :key='item.id'  is-link @click.native="onClick(item.specialid)">
				<div slot='title'>
					{{item.specialname}}
					<div class="listen">
						<x-icon type="ios-heart" size="20"></x-icon>
						<span>{{item.playcount}}</span> 
					</div>
				</div>
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
				method:'Plist'
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
				this.$router.push({name:'PlistInfo',params:{specialid:id}})
			}
		}
	}
</script>