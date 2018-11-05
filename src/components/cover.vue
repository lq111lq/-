<template>
	<div>
		<cell :title='name'>
			<x-icon slot="icon" type="ios-arrow-left" size="30" @click.native="$emit('close')"></x-icon>
		</cell>
		<div>
			<img :src="picture" alt="">
		</div>
		<div>
			<p v-for="item,index in krc" :key='index' v-show="currentKrc.includes(index)" :class="{'current':index===currentKrc[1]}">{{item[1]}}</p>
		</div>
		<group>
			<cell primary="content">
				<span slot='icon'>{{min}}</span>
		        <range 
		        	:step=1
		        	class='range'
		         	:value="value"
		         	:min="0"
		         	:max="large"
		         	@on-touchend="onTouchend"
		         	style="width: 80%"
		         	@on-touchstart='onTouchstart'
		         	>
		        </range>
		        <span slot class="right">{{most}}</span>
		    </cell>
		</group>
		<div class="control">
			<span class="cover-PlayPrev icon-red" @click="$emit('prev')"></span>
			<span class="icon-red" :class="isPlay?'cover-Pause':'cover-Play'" @click="$emit('playOrStop')"></span>
			<span class="cover-PlayNext icon-red" @click="$emit('next')"></span>
		</div>
	</div>
</template>
<script>
import {Cell,Group,Range} from 'vux';
import { sToM } from '@/assets/utils'
	export default{
		props:{
			name:{
				type:String,
				default:''
			},
			picture:{
				type:String,
				default:''
			},
			isPlay:{
				type:Boolean,
				default:''
			},
			max:{
				type:Number,
				default:0
			},
			duration:{
				type:Number,
				default:0
			},
			currentTime:{
				type:Number,
				default:0
			},
			krc:{
				type:Array,
				default:()=>{([])}
			},
			currentRcIndex:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
			}
		},
		computed:{
			currentKrc(){
				let currentIndex=0;
				for (let i = this.currentRcIndex; i < this.krc.length; i++){
			        if (this.krc[i][0] > this.currentTime){
			          currentIndex = i-1 < 0 ? 0 : i-1;
			          break;
			        }else{
			        	currentIndex=this.krc.length-1
			        }
			     }
			     if(currentIndex===0){
			     	return [currentIndex+2,currentIndex,currentIndex+1]
			     }else if(currentIndex===this.krc.length-1){
			     	return [currentIndex-1,currentIndex,currentIndex-2]
			     }
			     return [currentIndex-1,currentIndex,currentIndex+1]
			},
			min(){
				return sToM(this.currentTime)
			},
			most(){
				return sToM(this.duration)
			},
			value(){
				return parseInt(this.currentTime)
			},
			large(){
				return parseInt(this.duration)
			}
		},
		components:{
			Cell,Group,Range
		},
		methods:{
			onTouchstart(e){
				this.$emit('control')
			},
			onTouchend(e){
				var offset = parseInt(e.target.style.left)*this.large/225
		        if(!isNaN(offset)){
		        this.$emit('changeCurrentTime',offset)
		        }
			}
		}
	}
</script>