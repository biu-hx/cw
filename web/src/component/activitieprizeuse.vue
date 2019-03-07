<template>
	<div class="card_management_right">		
		<div class="card_management_right_list">
			<div class="card_management_right_list_top" >
				<div>活动及奖品使用情况</div>
			</div>
			<div class="activitieprizeuse_top">
				<div class="activitieprizeuse_top_tab">
					<div @click="tab_chose(0)" :class="tabchose == 0 ? 'tab_active' : ''">活动参与概览</div>
					<div @click="tab_chose(1)" :class="tabchose == 1 ? 'tab_active' : ''">活动奖池概览</div>
					<div @click="tab_chose(2)" :class="tabchose == 2 ? 'tab_active' : ''">各作品奖品使用概览</div>
				</div>
				<div>
					<el-date-picker class="date" v-model="value1" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>
					<span style="margin: 0 5px;position: relative;top: -9px;">-</span>
					<el-date-picker class="date" v-model="value2" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>
				</div>
			</div>
			<div v-if="tabchose == 0">
				<table class="card_table" cellspacing="1" cellpadding="0">
					<tr>
						<th>活动名称</th>
						<th>涉及作品数量</th>
						<th>活动参与人数</th>
						<th>参与总次数</th>
						<th>奖品发放总量</th>
						<th>已领取总数</th>
					</tr>
					<tr>
						<td :title="active_name">5000元助力砍价</td>
						<td>3</td>
						<td>x,xxx</td>
						<td>x,xxx</td>
						<td>x,xxx</td>
						<td>x,xxx</td>
					</tr>
				</table>
			</div>
			<div v-if="tabchose == 1">
				<table class="card_table" cellspacing="1" cellpadding="0">
					<tr>
						<th>活动名称</th>
						<th>奖品名称</th>
						<th>奖品发放量</th>
						<th>已领取数</th>
					</tr>
					<tr>
						<td>春节幸运福</td>
						<td>5000元折扣券</td>
						<td>x,xxx</td>
						<td>x,xxx</td>
					</tr>
				</table>
			</div>
			<div v-if="tabchose == 2">
				<table class="card_table" cellspacing="1" cellpadding="0">
					<tr>
						<th>活动名称</th>
						<th>作品名称</th>
						<th>上线天数</th>
						<th>奖品名称</th>
						<th>已领取数</th>
					</tr>
					<tr>
						<td>5000元助力砍价</td>
						<td>春节幸运福</td>
						<td>2</td>
						<td>5000元折扣券</td>
						<td>x,xxx</td>
					</tr>
				</table>
			</div>
			<div class="pagination">
				<div>
					<div>
						<div>
							<span style="margin-right: 20px;" @click="sublimepage(1)">上一页</span>
							<span @click="sublimepage(2)">下一页</span>
						</div>
						<div>
							<input type="number" v-model="page" style="color: #000;width: 40px;height: 28px;text-align: center;" />
							<span style="color: #000;margin: 0 10px;">/{{pagenumber}}页</span>
							<span @click="sublimepage(3)">跳转</span>
						</div>
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
				page:1,
				pagenumber:1,
				tabchose:0,
				tab_type:1,//tab切换
				active_name:'5000元助力砍价'
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
			init(){				
				//默认近一个月
				let date = new Date();
			    let seperator1 = "-";
			    let seperator2 = ":";
			    let month = date.getMonth();
			    let month_ed = date.getMonth() + 1;
			    let strDate = date.getDate();
			    let strDated = date.getDate();	            
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (month_ed >= 1 && month_ed <= 9) {
			        month_ed = "0" + month_ed;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    if (strDated >= 0 && strDated <= 9) {
			        strDated = "0" + strDated;
			    } 
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + '00' + seperator2 + '00'
			            + seperator2 + + '00';
	            
				let currentdate_end = date.getFullYear() + seperator1 + month_ed + seperator1 + strDated
			            + " " + '00' + seperator2 + '00'
			            + seperator2 + '00';
				this.value1=new Date(currentdate);
				this.value2=new Date(currentdate_end);
//				this.getdata(this.tab_type,this.page,currentdate,currentdate_end);
			},
			tab_chose(index){
				this.tabchose=index
				this.tab_type=this.tabchose+1;
				this.getdata(this.tab_type,this.page,this.value1,this.value2);
			},
			//获取数据
			getdata(tab_type,page,currentdate,currentdate_end){
				if(getAccessToken()){				
					this.$http.post({
						url: '/gift/list',
						data: {
							type:tab_type,
							page_flag:1,
							per_page:20,
							current_page:page,
							currentdate:currentdate,
							currentdate_end:currentdate_end
						}
					}).then((res) => {
						console.log(res)
						this.table = res.items
						this.pagenumber=res.paging.last_page;
					}).catch((err) => {						
					})
				}else{
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}
			},
			//分页
			sublimepage(index){
				if(index==1){						
					this.page--
					if(this.page<1){
						this.page=1;
					}else{
						this.getdata(this.tab_type,1,this.value1,this.value2);
					}
				}else if(index==2){
					this.page++
					if(this.page>this.pagenumber){
						this.page=this.pagenumber;
					}else{
						this.getdata(this.tab_type,this.page,this.value1,this.value2);
					}					
				}else if(index==3){
					if(this.page>this.pagenumber){
						this.$message.error('请输入正确页码');
					}else{
						this.getdata(this.tab_type,this.page,this.value1,this.value2);
					}
				}
				
			},
		},
		watch: {
			"userinfo" () {
				console.log("this.userinfo", getAccessToken())
				if(getAccessToken()) {
					this.isLogin = false
					this.getdata(this.tab_type,this.page,this.value1,this.value2);
				}
			}
		}
	}	
</script>

<style>
.activitieprizeuse_top{
	width: 100%;height: 50px;background-color: #ECEEF8;margin-bottom:20px;border: 1px solid #E3E6EB;padding: 9px 16px;display: flex;justify-content: space-between;box-sizing: border-box;
}
.activitieprizeuse_top_tab{
	color: #333333;font-size:14px;display: flex;justify-content: space-between;line-height: 18px;
}
.activitieprizeuse_top_tab div{
	padding: 5px 20px;box-sizing: border-box;margin-right: 20px;cursor: pointer;
}
.date span{
	top: -4px;
}
.tab_active{
	background-color: #9582F2;color: #fff;
}
</style>