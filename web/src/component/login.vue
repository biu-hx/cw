<template>
	<div class="popup-mask">
		<div class="login-wrap">
			<div class="popup-content">
				<div class="popup-close" @click="close"><img src="../static/images/login_icon_close.png" alt="">
				</div>
				<h1 class="login-title">策玩</h1>
				<div class="login-form">
					<div class="form-row">
						<div class="login-icon-wrap">
							<img style="height: 25px;" src="../static/images/login_icon_1.png" alt="">
						</div>
						<input placeholder="请输入手机号" type="number" v-model="tel" maxlength="11" oninput="if(value.length > 11)value = value.slice(0, 11)">
					</div>
					<div class="form-row" style="margin-bottom: 20px;">
						<div class="login-icon-wrap">
							<img style="height: 21px;" src="../static/images/login_icon_2.png" alt="">
						</div>
						<input class="code-text" placeholder="请输入验证码" type="number" v-model="code">
						<span v-show="show" @click="getCode" class="send-code">发送验证码</span>
						<span v-show="!show" class="send-code">{{count}} s</span>
						<!--
                        <span class="send-code" @click="send_cord" v-if="send==0">发送验证码</span>
                        <span class="send-code" v-if="send==1">{{num}}</span>-->
					</div>
				</div>
				<div v-if="error" class="error">
					<div>
						<img src="../static/images/caveat.png" alt="" width="18px" height="18px" /> 手机号或验证码错误
					</div>
				</div>
				<button class="login-btn" @click="login">登录</button>

			</div>
		</div>
	</div>
</template>

<script>
	import {clearAccessToken} from '../static/js/auth';
	import {getAccessToken} from '../static/js/auth';
	export default {
		name: "login",
		data() {
			return {
				tel: "",       //13678129699
				//          	倒计时
				show: true,
				count: '',
				timer: null,
				//验证码手机号错误
				error: false,
				code:"",				
			}
		},
		props:["isLogin","login_type"],	
		mounted() {       
			this.show=true;
		},
		methods: {
			close() {
				this.$emit('close', false)
			},
			getCode() {
				clearInterval(this.timer);
				this.timer=null;
				let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;//手机号码正则
				if(TEL_REGEXP.test(this.tel)){
					this.$http.post({
						url: '/captcha/get/',
						data: {
							mobile: this.tel
						}
					}).then((res) => {
						console.log(res)
						const TIME_COUNT = 60;
						if(!this.timer) {
							this.count = TIME_COUNT;
							this.show = false;
							this.timer = setInterval(() => {
								if(this.count > 0 && this.count <= TIME_COUNT) {
									this.count--;
								} else {
									this.show = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						}
					}).catch((err) => {
						console.log(err)
						this.$message.error(err.msg);
					})
				}else {
					this.$message.error('请输入正确的手机格式')
				}

			},
			login() {	
				this.$http.post({
					url: '/user/login',
					data: {
						mobile: this.tel,
						captcha: this.code
					}
				}).then((res) => {
					console.log(res.user)
					this.error = false;
					// 存用户信息
					this.$store.commit("userinfo", res.user)
					this.show=true;
					this.code='';
					
					if(this.login_type){
						if(this.login_type==1){
							window.location.href=process.env.VUE_APP_EDITOR;
						}else{
							window.location.href=process.env.VUE_APP_EDITOR+'/#/?templateId='+this.login_type+'&type=temp';						
						}
					}
					
				}).catch((err) => {
					console.log(err)
					this.error = true;
				})
			}
		},
	}
</script>

<style scoped>
	.hide {
		display: none !important;
	}
	
	.popup-mask {
		display: table;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		text-align: center;
	}
	
	.login-wrap {
		display: table-cell;
		vertical-align: middle;
	}
	
	.popup-content {
		position: relative;
		text-align: center;
		box-sizing: border-box;
		padding: 30px 90px 0;
		display: inline-block;
		background: #FFFFFF;
		border-radius: 4px;
		width: 531px;
		height: 420px;
	}
	
	.login-btn {
		width: 100%;
		height: 47px;
		cursor: pointer;
		border-radius: 2px;
		font-size: 16px;
		color: #ffffff;
		background: #9380F2;
		margin-bottom: 15px;
		margin-top: 15px;
	}
	
	.login-title {
		font-weight: normal;
		color: #333333;
		font-size: 36px;
		height: 115px;
	}
	
	.login-hint {
		font-size: 14px;
		color: #EC4C29;
	}
	
	.popup-close {
		position: absolute;
		width: 13px;
		height: 20px;
		right: 20px;
		top: 20px;
		cursor: pointer;
	}
	
	.form-row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 1px solid #DDDDDD;
		padding: 12px 0;
		font-size: 16px;
	}
	
	.form-row input {
		box-sizing: border-box;
		padding-right: 3px;
		height: 30px;
		line-height: 30px;
		width: 320px;
		padding-top: 6px;
	}
	
	.form-row input::placeholder {
		font-size: 16px;
		color: #CCCCCC;
	}
	
	.form-row .code-text {
		border-right: 1px solid #DDDDDD;
		margin-right: 13px;
		width: 210px;
	}
	
	.login-icon-wrap {
		text-align: left;
		width: 30px;
	}
	
	.send-code {
		cursor: pointer;
		color: #9380F2;
		font-size: 16px;
	}
	
	.error {
		width: 100%;
		height: 30px;
	}
	
	.error>div {
		width: 220px;
		height: 100%;
		margin: auto;
		color: #FF4C25;
		font-size: 14px;
		box-sizing: border-box;
		background: rgba(236, 76, 41, 0.3);
		border-radius: 15px;
		padding: 0 10px;
		line-height: 30px;
		margin: auto;
		text-align: center;
		position: relative;
	}
	
	.error img {
		margin-right: 14px;
		margin-top: -2px;
	}
</style>