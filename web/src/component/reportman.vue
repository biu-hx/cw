<template>
	<div class="card_management_right">	
		<div class="card_management_right_list">
			<div class="card_management_right_list_top" >
				<div>报表管理</div>
			</div>
		</div>
		<div class="card_management_right_nodata" style="margin: 80px auto;width: 210px;">
			<img src="../static/images/nodata.png" alt="" width="100%" height="200px" />
			<button style="width: auto;padding: 11px 20px;margin-top: 30px;" @click="modal_">导出活动参与用户手机信息</button>
		</div>
		<div v-if="modal==1" @click="close_modal" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.3);z-index: 11;"></div>
		<div v-if="modal==1" style="display: table-cell; vertical-align: middle;max-width: 1000px;height: 71%;max-height: 350px;width: 90%;z-index:12;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);background-color: #fff;">
			<div class="card_management_made">
				<div class="card_management_navigation" style="display: flex;justify-content: space-between;">
					<div style="display: flex;justify-content: space-between;width: 375px;">
						<span>选择需要导出的时间段</span>						
					</div>
					<img src="../static/images/close_modal.png" alt="" @click="close_modal" style="width: 18px;height: 18px;margin-top: 24px;cursor: pointer;"/>
				</div>
				<div style="height: 200px;">
					<div style="margin: 70px auto 60px;width: 505px;display: flex;justify-content: space-between;line-height: 29px;">
						<div style="line-height: 38px;font-size:14px;color: #333;">时间段选择</div>
						<div>
							<el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>
							<span style="margin: 0 5px;position: relative;top: -14px;">-</span>
							<el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>
						</div>						
					</div>
					<div style="text-align: center;font-size: 12px;color: #999;">
						导出该时间段内参与用户的手机号、以及对应的活动名称、作品名称、获得的奖品名称。
					</div>
				</div>
				<div class="card_made_submit">
					<div>
						<button @click="exportd">导出</button>
					</div>
				</div>
			</div>
		</div>	
		<login @close="close" v-show="isLogin" style="z-index: 9999;"></login>
	</div>
</template>

<script>
	import login from '../component/login.vue';
	import {clearAccessToken} from '../static/js/auth';
	import {getAccessToken} from '../static/js/auth';
	export default {
		name: 'activitieprizeuse',
		data() {
			return {
				isLogin: false, //登录弹窗
				value1:'',
				value2:'',
				modal:0,
				nowYear:''
			}
		},
		computed: {
			userinfo() {
				if(getAccessToken()){
					this.isLogin=false;
				}else{
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}
				return this.$store.state.userInfo
			}
		},
		components: {
			login
		},
		mounted() {
			this.init()			
		},
		methods:{
			close(val) {
				this.isLogin = val;
			},
			modal_(){
				this.modal=1
			},
			close_modal(){
				this.modal=0
			},
			init(){				
				//默认近一个月
				let now = new Date(); //当前日期
				let nowDayOfWeek = now.getDay(); //今天本周的第几天
				let nowDay = now.getDate(); //当前日
				let nowMonth = now.getMonth(); //当前月
				this.nowYear = now.getYear(); //当前年
				this.nowYear += (this.nowYear < 2000) ? 1900 : 0; //
				let lastMonthDate = new Date(); //上月日期
				lastMonthDate.setDate(1);
				lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
				let lastYear = lastMonthDate.getYear();
				let lastMonth = lastMonthDate.getMonth();
				//获得上月开始时间
			    let lastMonthStartDate = new Date(this.nowYear, lastMonth, 1);
//			    console.log( this.formatDate(lastMonthStartDate));
				//获得上月结束时间
			    let lastMonthEndDate = new Date(this.nowYear, lastMonth, this.getMonthDays(lastMonth));
//			    console.log( this.formatDate(lastMonthEndDate));
				this.value1=new Date(this.formatDate(lastMonthStartDate));
				this.value2=new Date(this.formatDate(lastMonthEndDate,1));
				
			},
			formatDate(date,num) {
				let seperator2 = ":";
			    let myyear = date.getFullYear();
			    let mymonth = date.getMonth() + 1;
			    let myweekday = date.getDate();
			    if (mymonth < 10) {
			        mymonth = "0" + mymonth;
			    }
			    if (myweekday < 10) {
			        myweekday = "0" + myweekday;
			    }
			    if(num==1){
			    	return (myyear + "-" + mymonth + "-" + myweekday+ " " + '23' + seperator2 + '59'+ seperator2 + '59');
			    }else{
			    	return (myyear + "-" + mymonth + "-" + myweekday+ " " + '00' + seperator2 + '00'+ seperator2 + '00');
		    	}
			},
			getMonthDays(myMonth) {
			    let monthStartDate = new Date(this.nowYear, myMonth, 1);
			    let monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
			    let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
			    return days;
			},
			
			date_ey(date){							
				if(date){
					let time=new Date(date);
					let year=time.getFullYear();
				    let month= time.getMonth()+1<10 ? "0"+(time.getMonth()+1) : time.getMonth()+1;
				    let day=time.getDate()<10 ? "0"+time.getDate() : time.getDate();
				    let hours=time.getHours()<10 ? "0"+time.getHours() : time.getHours();
				    let minutes=time.getMinutes()<10 ? "0"+time.getMinutes() : time.getMinutes();
				    let seconds=time.getSeconds()<10 ? "0"+time.getSeconds() : time.getSeconds();
				    return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
				}				
			},
			//导出
			exportd(){
				if(this.value1<=this.value2){
					let token=getAccessToken();				
					let start_time=this.date_ey(this.value1);
					let end_time=this.date_ey(this.value2);
					if(getAccessToken()){
						window.location.href='https://cwapi.modelwiser.com/other/contactinfo?token='+token+'&start_time='+start_time+'&end_time='+end_time
					}else{
						this.isLogin=true;
						localStorage.removeItem('userinfo');
						localStorage.removeItem('accessToken_test');
						clearAccessToken();
					}					
				}else{
					this.$message.error('开始时间不能大于结束时间');
				}
			}
		},
		watch: {
			"userinfo" () {
				console.log("this.userinfo", getAccessToken())
				if(getAccessToken()) {
					this.isLogin = false
					this.init()
				}
			}
		}
	}	
</script>

<style>
</style>