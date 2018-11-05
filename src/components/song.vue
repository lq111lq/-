<template>
	<div>
		<group>
			<cell v-for="item,index in list" :key='item.id' :title='item.filename' is-link @click.native='onClick(item.hash)'>
			</cell>
		</group>
		<div v-transfer-dom>
	      <popup v-model="listen" :show-mask="false">
	        <div>
	          <Audio :hash='hash'/>
	        </div>
	     </popup>
    	</div>
	</div>
</template>
<script>
import {Cell,Group,TransferDom, Popup} from 'vux';
import Audio from './audio.vue'
	export default{
		directives: {
			TransferDom
		},
		data(){
			return{
				listen:false,
				hash:'',
				show8: false,
			}
		},
		computed:{
			list(){
				return this.$store.state.data.list
			}
		},
		components:{
			Cell,
			Group,
			Audio,
			Popup
		},
		methods:{
			onClick(hash){
				this.listen=true;
				this.hash=hash;
			}
		}
	}
</script>