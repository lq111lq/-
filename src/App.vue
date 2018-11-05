<template>
  <div id="app">
  	<div class="header">
  		<My-header />
  		<Nav />
  	</div>
    <router-view exact class='content'/>
  </div>
</template>

<script>
import MyHeader from '@/components/header';
import Nav from '@/components/nav';

export default {
  name: 'App',
  components:{
  	MyHeader,
  	Nav
  }
}
</script>