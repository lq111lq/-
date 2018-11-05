<template>
	<div class="plistinfo">
		<loading :show='!isloading'/>
		<div v-if='isloading'>
			<div class="picture">
				<img :src="list.imgurl.replace('{size}',400)" alt="">
				<group>
					<cell
				      :title="list.intro.slice(0,17)"
				      is-link
				      :border-intent="false"
				      :arrow-direction="isshow ? 'up' : 'down'"
				      @click.native="isshow = !isshow"></cell>

				      <template v-if="isshow">
				        <cell-box :border-intent="false" class="sub-item">{{list.intro.slice(17)}}</cell-box>
				      </template>
				</group>
			</div>
			<song />
		</div>
	</div>
</template>
<script>
import { Loading,Group,Cell,CellBox} from 'vux';
import Song from '@/components/song'
	export default{
		data(){
			return {
				isloading:false,
				isshow:false
			}
		},
		created(){
			let option={
				method:'PlistInfo',
				params:{specialid:this.$route.params.specialid}
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
			Song,
			Group,
			Cell,
			CellBox
		},
		methods:{

		}
	}
</script>