import Vue from 'vue'
import Router from 'vue-router'
import { navData, other } from './config.js'

Vue.use(Router)

export default new Router({
	mode:'history',
	  routes: [
	  	...other,
	  	...navData,
	    {
	      path: '*',
	      redirect:{name:'NewSong'}
	    }
	  ]
})
