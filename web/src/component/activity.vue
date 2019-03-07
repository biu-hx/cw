<template>
	<div class="card_management_right">
		<!--无卡卷-->
		<div v-if="datad==0" class="card_management_right_nodata">
			<img src="../static/images/nodata.png" alt="" width="100%" height="200px" />
			<div>您还未发布任何活动</div>
			<button @click="madecard">新建活动</button>
		</div>
		<!--列表-->
		<div v-if="datad==1" class="card_management_right_list">
			<div class="card_management_right_list_top">
				<div>活动方案</div>
				<button @click="madecard">新建活动</button>
			</div>
			<div class="active_type" style="background-color: #ECEEF8;border: 1px solid #E1E4E8;margin-bottom:20px;box-sizing: border-box;line-height: 37px;font-size: 14px;color: #333;">
				<div style="width: 280px;display: flex;justify-content: space-between;">
					<span style="line-height: 50px;margin-left: 10px;">活动类型</span>
					<div>
						<el-select v-model="activity" placeholder="全部" style="width: 160px;height: 37px;color: #333;position: relative;top: 6px;">
							<el-option v-for="item in activity_ed" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</div>
			</div>
			<div>
				<table class="card_table" cellspacing="1" cellpadding="0" style="table-layout:fixed;">
					<tr>
						<th>活动ID</th>
						<th style="width: 130px;">活动名称</th>
						<th>活动方案</th>
						<th>活动时间</th>
						<th>创建时间</th>
						<th>奖品发放量</th>
						<th>已领取数</th>
						<th>活动状态</th>
					</tr>
					<tr v-for="(item,index) in table" :key="item.id">
						<td class="table_name" @click="check_activity(item.id)">{{item.id}}</td>
						<td class="table_name" @click="check_activity(item.id)" style="width: 130px;padding: 0 10px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;color: #9582F2;cursor: pointer;">{{item.name}}</td>
						<td>助力省钱</td>
						<td>{{item.start_time.replace(/-/g,'/')}}-{{item.end_time.replace(/-/g,'/')}}</td>
						<td>{{item.add_time.replace(/-/g,'/')}}</td>
						<td>{{item.total}}</td>
						<td>{{item.total-item.surplus}}</td>
						<td v-if="item.situation==1">进行中</td>
						<td v-if="item.situation==2">未开始</td>
						<td v-if="item.situation==3">已结束</td>
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
		<!--制作卡卷-->
		<div v-if="made_card==1 || isFromIframe" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.3);z-index: 11;"></div>
		<div v-if="made_card==1 || isFromIframe" class="madeCard" :style="{width:isFromIframe?'100%':'',height:isFromIframe?'100%':''}">
			<div class="card_management_made" style="position: relative;">
				<div class="card_management_navigation" style="display: flex;justify-content: space-between;">
					<div style="display: flex;justify-content: space-between;width: 375px;">
						<span>{{title}}</span>
						<div v-if="checktype==0" @click="open_addprizeman" style="width:255px;height:35px;padding:0 16px;margin-top: 15px;background:rgba(236,76,41,0.3);border-radius:2px;font-size:14px;color: #FF4C25;line-height: 35px;">
							如没有合适的奖品，请先去新建奖品
							<img src="../static/images/add_active.png" style="width: 10px;height: 8px;margin-left: 14px;cursor: pointer;"/>
						</div>
					</div>
					<img src="../static/images/close_modal.png" alt="" @click="close_modal" style="width: 18px;height: 18px;margin-top: 24px;"/>
				</div>
				<div class="card_management_navigation_content">
					<div>
						<div class="card_management_navigation_content_left" :class="{'colFF4':type1==1}">选择方案</div>
						<div class="card_management_navigation_content_right" v-if="checktype==0">
							<el-select v-model="value" placeholder="助力省钱">
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						  	</el-select>
						</div>
						<div class="card_management_navigation_content_right he50" v-if="checktype==1 || checktype==2">{{value}}</div>
					</div>		
					<moneysave ref="moneysave_chid" :checktype="checktype" :adminid="adminid" @modaltype="modaltype" @titled="titled"></moneysave>
					
				</div>				
			</div>
		</div>
		<div v-if="prizeman==1" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.3);z-index: 11;"></div>
		<div v-if="prizeman==1" style="display: table-cell; vertical-align: middle;max-width: 1000px;height: 71%;max-height: 780px;width: 90%;z-index: 12;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);background-color: #fff;">
			<addprizeman @closeadd="closeadd"></addprizeman>
		</div>

		<login @close="close" v-show="isLogin" style="z-index: 9999;"></login>
	</div>
</template>

<script>
	import login from '../component/login.vue';
	import moneysave from '../component/moneysave.vue';
	import addprizeman from '../component/addprizeman.vue';
	import {clearAccessToken} from '../static/js/auth';
	import {getAccessToken} from '../static/js/auth';
	export default {
		name: 'activity',
		data() {
			return {
				isFromIframe:this.$route.query.isFromIframe||false,//是否是从iframe过来
				isLogin: false, //登录弹窗
				title:"新建活动",
				// 分类
				options: [{
					value: '选项1',
					label: '助力省钱'
				}],
				value: '助力省钱',
				//活动类型筛选框
				activity_ed: [
					{value: '1',label: '全部'},
					{value: '2',label: '助力省钱'}
				],
				//选择方案
				activity: '助力省钱',
				datad: -1, //是否存在活动
				made_card: 0, //制作活动
				prizeman:0,	//显示奖品组件
				//新增0 查看2 修改1
		        checktype:0,
		        //活动列表数据
		        table:[],
		        page:1,
		        pagenumber:1,
		        //活动id
				adminid:0,
				//按钮状态
				btn_once:0,
				type1: 0,
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
			moneysave,
			addprizeman,
			login
		},
		mounted() {
			this.init()
		},
		methods:{	
			//关闭登录弹窗
			close(val) {
				this.isLogin = val;
			},
			init(){				
				this.getdata(2,this.page);
			},
			titled(titled){
				console.log(titled)
				this.title=titled;
			},
			modaltype(modaltype){
				console.log(modaltype)
				if(modaltype){
					this.made_card=1;
					this.init();
				}else{					
					if(this.isFromIframe){
						this.setMessage('closeIframe');
					}
					this.made_card=0;
					this.init();
				}
			},
			//获取数据
			getdata(type,page){
				if(getAccessToken()){
					this.isLogin=false;
					this.$http.post({
						url: '/activity/list',
						data: {
							type:type,
							page_flag:1,
							per_page:20,
							current_page:page
						}
					}).then((res) => {
						console.log(res)
						if(res.items.length==0){
							this.datad=0
						}else{
							this.table = res.items
							this.pagenumber=res.paging.last_page;
							this.datad=1
						}
					}).catch((err) => {
						console.log(err)
						this.$message.error(err.msg);
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
					this.page<1 ? this.page=1 : this.getdata(2,this.page);
				}else if(index==2){
					this.page++
					this.page>this.pagenumber ? this.page=this.pagenumber : this.getdata(2,this.page)
				}else if(index==3){
					this.page>this.pagenumber ? this.$message.error('请输入正确页码') : this.getdata(2,this.page)
				}
			},
			//新增奖品
			open_addprizeman(){
				//使用iframe的window向iframe发送message。
				if(this.isFromIframe){
					this.setMessage('newAdd');
				}else {
					//新增活动弹窗隐藏，新增奖品弹窗显示
					this.made_card=0;
					this.prizeman=1;
				}
			},
			//关闭新增奖品
			closeadd(closeadd){
				//新增活动弹窗隐藏，新增奖品弹窗隐藏
				this.made_card=0;
				this.prizeman=0;
			},
			//制作活动
			madecard() {
				this.title="新建活动";
				if(getAccessToken()){
					//新增活动弹框显示
					this.made_card = 1;
					//新增状态变更
					this.checktype=0;
				}else{
					//新增活动弹框显示
					this.made_card = 0;
					//新增状态变更
					this.checktype=0;
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}									
			},
	      	//查看
	      	check_activity(id){
	      		if(getAccessToken()){
					this.title="查看活动";
		      		//查看活动详情弹框显示
					this.made_card = 1;
					//查看状态变更
					this.checktype=1;
					this.adminid=id
				}else{
		      		//查看活动详情弹框显示
					this.made_card = 0;
					//查看状态变更
					this.checktype=1;
					this.adminid=id
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}
	      		
	      	},
	      	//关闭新增活动弹窗
	      	close_modal(){
	      		this.$refs.moneysave_chid.check_sub();
	      	},			
			
//			moneydata(number,money,fixed_amount,rule_min_price,rule_max_price,gold,classification,radio,projectname,total,option){			
//				this.number=number;
//				this.money=money;
//				this.fixed_amount=fixed_amount;
//				this.rule_min_price=rule_min_price;
//				this.rule_max_price=rule_max_price;
//				this.gold=gold;
//				this.classification=classification;
//				this.radio=radio;
//				this.project_name=projectname;
//				this.total=total;
//				this.option=option;
//				if(this.value && this.input && this.value2 && this.value3 && this.textarea3) {
//					//验证成功，信息完善
//					if(this.complete&&this.errmg){
//						if(getAccessToken()){
//							this.$http.post({
//								url: '/bargain/add',
//								data: {
//									name:this.input,
//									start_time:start_time,
//									end_time:end_time,
//									exchange_start_time:exchange_start_time,
//									exchange_end_time:exchange_end_time,
//									gift_tag:this.project_name,
//									remark:this.textarea3,
//									gift_id:this.classification,
//									total:this.total,
//									show_type:this.radio,
//									rule_type:this.money,
//									rule_price:rule_priced,
//									rule_min_price:rule_min_priced,
//									rule_max_price:rule_max_priced,
//									rule_target_price:this.gold
//								}
//							}).then((res) => {
//								console.log(res);
//								if(this.isFromIframe){
//									this.setMessage('newSuccess');
//								}else {
//									this.made_card = 2;
//									this.init();
//									this.btn_once=3;
//								}
//								this.$message.success('提交成功');
//							}).catch((err) => {
//								console.log(err)
//								this.$message.error(err.msg);
//								this.made_card = 1;
//								this.btn_once=3;
//							})
//						}else{
//							this.isLogin=true;
//						}
//					}else{
//						this.btn_once=3;
//					}
//				}else{
//					this.complete=false;
//					this.errmg=true;
//					this.btn_once=3;
//				}
//			},
//			moneydata_check(radio,total,init_total){
//				this.btn_once=1;
//				this.radio=radio;
//				this.total=total;
//				let end_time=this.date_ey(this.value4);
//				let exchange_end_time=this.date_ey(this.value6);
//				if(this.value && this.input && this.value2 && this.value3 && this.textarea3) {					
//					//验证成功，信息完善
//					if(this.complete&&this.errmg){
//						if(init_total>total){
//							if(end_time<this.default_date().currentdate_end&&exchange_end_time<this.default_date().currentdate_end){
//								if(getAccessToken()){
//									this.$http.post({
//									url: '/bargain/edit',
//										data: {
//											id:this.admin_id,
//											end_time:end_time,
//											exchange_end_time:exchange_end_time,
//											remark:this.textarea3,
//											total:this.total,
//											show_type:this.radio
//										}
//									}).then((res) => {
//										console.log(res)
//										this.made_card = 2;
//										this.btn_once=3;
//										this.$message.success('提交成功');
//									}).catch((err) => {
//										console.log(err)
//										this.$message.error(err.msg);
//										this.made_card = 1;
//										this.btn_once=3;
//									})
//								}else{
//									this.isLogin=true;
//								}
//							}else{
//								this.btn_once=3;
//								this.$message.error('结束时间只能修改到当前时间+1天后的任何时候');
//							}							
//						}else{
//							this.btn_once=3;
//							this.$message.error('奖品发放量只能大于创建时填写的数字，但不能超过库存余量');
//						}
//					}else{
//						this.btn_once=3;
//					}
//				}else{
//					this.complete=false;
//					this.errmg=true;
//					this.btn_once=3;
//				}
//			},
			
			// 发送信息到iframe
			setMessage(type){
				parent.postMessage(type, process.env.VUE_APP_EDITOR);
				// parent.postMessage(type, 'http://localhost:8081/#/');
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
	.madeCard{
		display: table-cell;
        vertical-align: middle;
        max-width: 1140px;
        height: 71%;
        max-height: 780px;
        width: 90%;
        z-index: 12;
        position: absolute;
        left: 50%;
        top: 50%;
        transform:translate(-50%,-50%);
        background-color: #fff;
	}
</style>