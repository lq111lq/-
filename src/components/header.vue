<template>
	<x-header class='header' :right-options="{showMore: true}" :left-options="{showBack: false}" @on-click-more="tosearch">
		<span>酷狗音乐</span>
	</x-header>
</template>
<script>
import { XHeader } from 'vux'
export default {
  components: {
    XHeader,
  },
  methods:{
	tosearch(){
		this.$router.push({name:'Search',params:{'title':'搜索'}})
	}
  }
}
</script>
<style >

</style>