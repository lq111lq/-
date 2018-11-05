import Vuex from 'vuex';
import Vue from 'vue';
import getData from '@/server/server'
import {getNewSong} from '@/server/server'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		data:{
			banner:[],
			list:[],
			data:{},
			/*hash:''*/
		},
		nav:{
			title:''
		},
	},
	mutations:{
		changeNavTitle({nav},str){//改变nav的名字
			nav.title=str
		},
		/*changehash(state,str){
			console.log(str)
			state.data.hash= str
		},*/
		changedata({data,nav},mydata){//改变歌曲列表
			if(mydata.banner){
				data.banner=mydata.banner
				data.list=mydata.list
			}else if(mydata.info){
				data.list=mydata.info;
				data.data=mydata.list;
				nav.title=mydata.list.specialname;
			}else if(mydata.rankInfo){
				data.list=mydata.songs.list;
				data.data=mydata.rankInfo;
				nav.title=mydata.rankInfo.rankname;
			}else if(mydata.singerInfo){
				data.list=mydata.songs.list;
				data.data=mydata.singerInfo;
				nav.title=mydata.singerInfo.singername;
			}else{
				data.list=mydata.list
			}
		},
		changelist({data},list){//改变歌曲列表
			data.list=list
		}
	},
	actions:{
		getdataAction({commit},option){//异步请求
			let getdata =`get${option.method}`
			if(option.params){
				return getData[getdata](option.params).then((mydata) => {
		        commit('changedata', mydata)
		      })
			}
	      return getData[getdata]().then((mydata) => {
	        commit('changedata', mydata)
	      })
	    }
	}
})