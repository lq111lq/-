<template>
	<div>
		<audio 
		    ref='audio'
			controls 
			autoPlay 
			:src='songInfo.url'
			hidden
			>
		</audio>
		<cell class='fixed-bottom' v-if='songInfo.imgUrl'>
			<img slot='icon' :src="songInfo.imgUrl.replace('{size}',400)" alt=""
			@click="isCover=true"
			>
			<div slot= 'title'>
				<div class="songname">{{songInfo.fileName.substr(songInfo.choricSinger.length+3)}}</div>
				<div class="name">
					{{songInfo.choricSinger}}
				</div>
			</div>
			<div slot>
				<span class="icon-red" :class="isPlay?'player-Pause':'player-Play'" @click="playOrStop"></span>
				<span class="player-nextSong icon-red" @click="next"></span>
			</div>
		</cell>
		<div v-transfer-dom>
	      <popup v-model="isCover" :popup-style="{zIndex: 502}" height='93%' :show-mask="false" position="bottom" v-if='isCover'>
	          <Cover 
	          	class='cover'
	          	:name="songInfo.fileName.substr(songInfo.choricSinger.length+3)"
				:picture ="songInfo.imgUrl.replace('{size}',200)"
				:isPlay='isPlay'
				:max='this.max'
				:duration='duration'
				:currentTime='currentTime'
				:krc='rcArr'
				:currentRcIndex='currentRcIndex'
				@close='close'
				@changeCurrentTime='changeCurrentTime'
				@prev='prev'
				@next='next'
				@playOrStop='playOrStop'
				@control='control'
	          />
	     </popup>
    	</div>
	</div>
</template>
<script>
import {getSongInfo,getSongKrc}from '@/server/server';
import {Group,Cell,TransferDom, Popup} from 'vux'
import { parseLyric } from '@/assets/utils';
import Cover from './cover.vue'
export default{
		directives: {
			TransferDom
		},
		props:{
			hash:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				songInfo:{},
				isPlay:true,
				isCover:false,
				currentTime:0,
				duration:0,
				rcArr:[],
				index:-1,
			    isMount:false,
			    starttime:0,
			    max:0,
			    currentRcIndex : 0
			}
		},
		computed:{
			list(){
				return this.$store.state.data.list
			}
		},
		watch:{
			hash(){
				this.getSongInfoMethod(this.hash,this.list)
			}
		},
		created(){
			this.getSongInfoMethod(this.hash,this.list)
		},
		mounted(){
			let audio = this.$refs.audio;
	  	 audio.addEventListener('loadedmetadata', () => {
	        this.duration=audio.duration
	      })
	      audio.addEventListener('timeupdate',() => {
		       this.currentTime= audio.currentTime
	    	})
	  	  audio.addEventListener('ended', () => {
	  	  	this.currentRcIndex = 0;
		      this.next()
		    })
		},
		methods:{
			getSongInfoMethod:async function (hash,list){
			  	let data=await getSongInfo({ hash });
			    let krc =await getSongKrc({hash,keyword:data.fileName})
				let arr = [];
				if (krc){
					arr = parseLyric(krc);
				}
				this.songInfo= data,
				this.isPlay=true,
				this.rcArr= arr,
				this.currentTime=0,
				this.max=data.timeLength
				this.index = list.findIndex(item =>item.hash === hash);
				this.currentRcIndex = 0;
			},
			playOrStop(){
				let audio = this.$refs.audio;
				if(audio.paused){
					audio.play();
					this.isPlay=true
				}else{
					audio.pause();
					this.isPlay=false
				}
			},
			next(){
				let { hash,list } = this;
				this.index++;
				if(this.index>list.length-1){
					this.index=0;
				}
				let now = list[this.index];
				hash = now.hash;
				this.getSongInfoMethod(hash,list)
			},
			prev(){
				let { hash,list } = this;
				this.index--;
				if(this.index<0){
					this.index=list.length-1;
				}
				let now = list[this.index];
				hash = now.hash;
				this.getSongInfoMethod(hash,list)
			},
			close(){
				this.isCover=false
			},
			changeCurrentTime(a){
				this.$refs.audio.currentTime=a
				this.currentTime=a
				this.$refs.audio.play();
				this.isPlay=true
			},
			control(){
				let audio = this.$refs.audio;
				audio.pause();
				this.isPlay=false
				
			}
		},
		components:{
			Group,Cell,Cover, Popup
		}
	}
</script>