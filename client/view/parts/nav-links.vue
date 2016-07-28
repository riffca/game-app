<template>
	<div id="nav-links">
		<span class="title">{{ title }}</span>
		<slot></slot>
	</div>
</template>

<script>

export default {
	props: ['title']
};
</script>

<style lang="sass">
#nav-links {
	position: absolute;
	top:0;
	right:0;
	padding: 10px;
	background: rgba(black,.2);
	span {
		font-weight: bold;
		font-size: 1.2rem;
	}
	.title {
		
	}
	a{
		margin: 10px;
		text-decoration: none;
		font-size: 1.2rem;
	}
}
</style>