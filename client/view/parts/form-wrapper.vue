	<template>
	<div id="form-wrapper">
		<slot></slot>
	</div>
</template>

<script>
export default {
  data () {
    return {

    };
  }
};
</script>

<style lang="sass">
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
@import '../variables';
#form-wrapper {
	@media screen and(max-width: 550px){
		max-width: 100%;
		margin:0;
		padding:0;
	}
	max-width: 60%;
	margin: 0 auto;
	padding: 50px;
	form {
		@media screen and(max-width: 550px){
			margin:0 auto;
		}
		max-width: 300px;
		margin: inherit;
		.input-control{
			text-align: left;
			label, input {
				display: block;
			}
			label{
				font-size: 1.8rem;
				padding: 20px;
				transform: translateX(-15%);
				@media screen and(max-width: 550px){
					transform: translateX(0);
				}
			}
			input{
				@media screen and(max-width: 550px){
					height:50px;
					font-size:1.2rem;
					width: 100%;
				}
				font-family: "Roboto", sans-serif;
				padding: 10px;
				height: 100px;
				text-align: inherit;
				width: 120%;
				font-size: 2rem;
				font-weight: normal;
				border:none;
				&:focus,
				&:active {
					outline: 1px solid grey;
				}
			}
		}
		button{
			border:0;
			padding:10px;
			font-size: 1.2rem;
			display: inline-block;
			position: relative;
			margin-left: 50%;
			margin-top: 10px;
			height: 50px;
			width: 100px;
			&:focus,
			&:active{
				box-shadow: none;
				outline: none;
			}
			&:hover{
				font-size: 1.3rem;
				outline: 1px solid lighten(grey,20%);
				box-shadow: none;
				cursor: pointer;
			}
		}
	}
}

</style>