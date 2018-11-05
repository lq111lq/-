<template>
  <div>
    <tab v-if='initIndex!==-1'>
      <tab-item v-for='item,index in navData' :key='item.path' :selected="index===initIndex" @on-item-click="onItemClick(item.name)">{{item.title}}</tab-item>
    </tab>
    <x-header v-else :title="title"></x-header>
  </div>
</template>
<script>
import { Tab, TabItem,XHeader } from 'vux'
import {navData} from '@/router/config' 
export default {
  data(){
    return {
      navData:navData
    }
  },
  components: {
    Tab,
    TabItem,
    XHeader
  },
  computed:{
    initIndex(){
      let name=this.$route.name
      let initIndex = navData.findIndex(item => item.name === name)
      let index = 0;
      if (initIndex !== -1) {
        index = initIndex;
      }
      return initIndex
    },
    title(){
      return this.$store.state.nav.title
    }
  },
  methods:{
    onItemClick (name) {
      this.$router.push({name:name})
    },
  }
}
</script>
