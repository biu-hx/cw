<template>	
	<div style="height: 100%;min-width: 1110px;">		
		<div class="home_top">
			<!--首页头部-->    
			<div class="home" :class="{'index_ed':!list}">
				<div>
					<img src="../static/images/logo.png" alt="" @click="index"/>
					<!--<span>策玩</span>-->
					<div class="home_top_title">
						<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="display: flex;justify-content: space-between;">
							<el-menu-item index="1" v-if="list">模板超市</el-menu-item>
							<div style="outline: none;" v-if="!list" @click="top_checktype">模板超市</div>
							<el-menu-item index="2">新建页面</el-menu-item>
						</el-menu>
					</div>
					<button @click="login" v-if="!mobile">登录</button>
					<el-dropdown class="home_top_admin" @command="handleCommand" v-if="mobile">
						<span class="el-dropdown-link" @click="herf_prize">
					    	<font style="text-decoration: underline;">{{mobile}}</font><i class="el-icon-arrow-down el-icon--right"></i>
					  	</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="a">活动管理</el-dropdown-item>
							<el-dropdown-item command="b">奖品管理</el-dropdown-item>
							<el-dropdown-item command="c">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>			
			<!--二级菜单-->
			<div class="home_top_secondary" v-if="checkf_type==0"  >
				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="bannerSelect">
					<el-menu-item class="el-dropdown-link" index="1" @click="chose_tab('','')">全部</el-menu-item>
					<el-menu-item :index="''+(index+2)" v-for="(item,index) in last" :key="item.id" @click="chose_tab(item.id,'')">
						{{item.name}}
						<i class="el-icon-arrow-up el-icon--right" v-if="item.children" style="font-weight: bold !important;width: 20px !important;font-size: 11px !important;"></i>
						<i class="el-icon-arrow-down el-icon--right" v-if="item.children" style="font-weight: bold !important;width: 20px !important;font-size: 11px !important;"></i>
					</el-menu-item>
				</el-menu>
			</div>
			<!--三级菜单-->
			<!--<div class="home_top_third" v-if="(index+2) == tab && checkfed==1" v-for="(item,index) in last" :key="item.id">
				<el-menu :default-active="activeIndex3" class="el-menu-demo" mode="horizontal" @select="thirdSelect">
					<el-menu-item :index="''+(y+1)" v-for="(i,y) in item.child_list" :key="i.id" class="el-dropdown-link" @click="chose_tab(item.id,i.id)">{{i.name}}</el-menu-item>
				</el-menu>
			</div>-->
		</div>
		<!--模板列表-->
		<div class="home_content" v-if="list" @scroll="checkscroll">
			<div class="home_template">
				<div v-for="(item,index) in template" :key="item.id" @mouseenter="enter(index)" @mouseleave="leave()" @click="use(item.id)">
					<img :src="item.logo" alt="" />
					<div v-if="con==index" class="home_content_modal"></div>
					<button v-if="con==index" class="home_content_modal_btn">立即使用</button>
					<div class="home_content_bottom">{{item.name}}</div>
				</div>
			</div>
		</div>
		<!--立即使用弹框-->
		<div class="modal" v-if="modal==1"></div>
		<div class="modal_content" v-if="modal==1">
			<div class="modal_content_left">
				<div class="modal_content_frame">
					<iframe name="preview" v-if="template_detail.template.preview_url" :src="template_detail.template.preview_url" frameborder="0" width="375px" height="603px" @load="iframeOnLoad"></iframe>
					<iframe name="preview" v-if="!template_detail.template.preview_url" src="" frameborder="0" width="375px" height="603px" @load="iframeOnLoad"></iframe>
				</div>

				<img src="../static/images/vip.png" class="modal_content_left_label" alt="" />
				<!--<div class="modal_content_left_label">VIP免费使用</div>-->
				<div class="modal_content_left_page">
					<div class="modal_content_left_page_back" @click="togglePage(-1)">
						<div></div>
					</div>
					<div class="modal_content_left_page_go" @click="togglePage(1)">
						<div></div>
					</div>
				</div>
			</div>
			<div class="modal_content_right">
				<div class="modal_content_right_close" @click="close_use">×</div>
				<div class="modal_content_right_title">{{template_detail.template.name}}</div>
				<div class="modal_content_right_tab">
					<div v-for="(i,y) in template_detail_label" :key="y.id">{{i}}</div>
				</div>
				<div class="modal_content_right_con">{{template_detail.template.remark}}</div>
				<div class="modal_content_right_mes">
					<div v-if="already==0" style="width: 100%;">
						<div class="modal_content_right_money" v-if="template_detail.template.pay_type==0">
							<span style="text-decoration:inherit">￥0.00</span>
						</div>
						<div class="modal_content_right_money" v-if="template_detail.template.pay_type==1">
							<span>￥0.00</span>
							<span>￥{{template_detail.template.price}}</span>
						</div>
						<div class="modal_content_right_money" v-if="template_detail.template.pay_type==2">
							<span style="text-decoration:inherit">￥{{template_detail.template.price}}</span>
						</div>
					</div>
					<div style="width: 100%;" v-else>
						<div class="modal_content_right_money" >
							<span style="text-decoration:inherit">￥{{template_detail.template.price}}</span>
						</div>
					</div>
				</div>
				<div class="modal_content_right_time" v-if="template_detail.template.pay_type==1 && already==0 && this.currentdate<template_detail.template.limit_start_time">
					<div class="modal_content_right_time_title" >
						<div>限免</div>
						<div>仅剩</div>
					</div>
					<div class="modal_content_right_time_num">{{time_differ}}</div>
				</div>
				<div class="modal_content_right_time" v-if="this.currentdate>template_detail.template.limit_start_time && template_detail.template.pay_type==1">
					<div class="modal_content_right_time_title">
						<span>距离限</span>
						<span>免开启</span>
					</div>
					<div class="modal_content_right_time_num">{{time_differ}}</div>
				</div>
				<button class="modal_content_right_btn" @click="inedit()">进入模板编辑</button>
			</div>
		</div>	
		<div v-if="!list" class="card_management" @click="close_toplist">
			<div class="card_management_left">
				<div class="card_management_left_list">
					<div @click="list_chang(1)" v-if="listchang1">
						<img src="../static/images/mes.png" />
						<span>基本信息</span>
					</div>
					<div @click="list_chang(1)" style="background-color: #fff;border-radius: 2px;" v-else>
						<img src="../static/images/mes_active.png" />
						<span style="color: #9684F3;">基本信息</span>
					</div>			
					<div @click="list_chang(3)" v-if="listchang3">
						<img src="../static/images/card.png" />
						<span>奖品管理</span>
					</div>		
					<div @click="list_chang(3)" style="background-color: #fff;border-radius: 2px;" v-else>
						<img src="../static/images/card_active.png" />
						<span style="color: #9684F3;">奖品管理</span>
					</div>	
					<div @click="list_chang(2)" v-if="listchang2">
						<img src="../static/images/lottery.png" />
						<span>活动管理</span>
					</div>
					<div @click="list_chang(2)" style="background-color: #fff;border-radius: 2px;" v-else>
						<img src="../static/images/lottery_active.png" />
						<span style="color: #9684F3;">活动管理</span>
					</div>
					<!--<div @click="list_chang(4)" v-if="listchang4">
						<img src="../static/images/data.png" />
						<span>营销数据</span>
					</div>
					<div @click="list_chang(4)" style="background-color: #fff;" v-else>
						<img src="../static/images/data_active.png" />
						<span style="color: #9684F3;">营销数据</span>
					</div>-->
					<div v-if="left_list" style="height: 120px;padding: 0;background-color: #7663ED;text-align: center;">
						<div @click="check_left_list(0)" :class="left_list_o == 0 ? 'left_list_active' : ''">用户数据</div>
						<div @click="check_left_list(1)" :class="left_list_o == 1 ? 'left_list_active' : ''">作品数据</div>
						<div @click="check_left_list(2)" :class="left_list_o == 2 ? 'left_list_active' : ''">活动及奖品使用情况</div>
					</div>
					<div @click="list_chang(5)" v-if="listchang5">
						<img src="../static/images/report.png" />
						<span>报表管理</span>
					</div>
					<div @click="list_chang(5)" style="background-color: #fff;border-radius: 2px;" v-else>
						<img src="../static/images/report_active.png" />
						<span style="color: #9684F3;">报表管理</span>
					</div>
					<div @click="list_chang(6)" v-if="listchang6">
						<img src="../static/images/works.png" />
						<span>作品管理</span>
					</div>
					<div @click="list_chang(6)" style="background-color: #fff;border-radius: 2px;" v-else>
						<img src="../static/images/works_active.png" />
						<span style="color: #9684F3;">作品管理</span>
					</div>
				</div>
			</div>
			<div class="card_management_right" v-if="!listchang1 ||  left_list_o==0 || left_list_o==1"></div>
			<activity v-if="!listchang2"></activity>
			<prizeman v-if="!listchang3"></prizeman>
			<activitieprizeuse v-if="left_list&&left_list_o==2"></activitieprizeuse>
			<reportman v-if="!listchang5"></reportman>
			<workman v-if="!listchang6"></workman>
		</div>
		
		<login @close="close" v-show="isLogin" :login_type="login_type" style="z-index: 9999;"></login>
	</div>
</template>

<script>
	import login from '../component/login.vue';
	import activity from '../component/activity.vue';
	import prizeman from '../component/prizeman.vue';
	import activitieprizeuse from '../component/activitieprizeuse.vue';
	import reportman from '../component/reportman.vue';
	import workman from '../component/workman.vue';
	import {clearAccessToken} from '../static/js/auth';
	import {getAccessToken} from '../static/js/auth';	
	let frameWindow = ''
	export default {
		name: 'home',
		data() {
			return {				
				isLogin: false, //登录弹窗
				mobile:'',
				page:1,
		        pagenumber:1,
				//菜单
				activeIndex: '1', //1级菜单
				activeIndex2: '1', //2级菜单
				activeIndex3: '1', //3级菜单
				checkf: 0, //选择模板超市
				checkf_type:1,
				checkfed:0,//3级菜单显示
				last: [], //菜单数据
				tab: '', //箭头活动
				tab_id1: '', //1级菜单选中id
				tab_id2: '', //2级菜单选中id
				//模板
				con: -1, //选中模块框
				template: [], //模板列表数据
				template_detail: [], //模板详情数据
				template_detail_label: [], //模板标签
				time_differ: '', //相差时间
				//模板使用
				modal: 0, //立即使用弹框阴影                
				//左侧菜单
				list: true, //左侧菜单显示状态,
				//左侧菜单切换
				listchang1:true,listchang2:true,listchang3:true,listchang4:true,listchang5:true,listchang6:true,
				//左侧菜单对应页面
				list_num:0,
				
				iframe:"",
				login_type:'',
				already:0,
				//左边二级菜单
				left_list:false,
				left_list_o:-1,
				currentdate:''
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
		created(){
		},
		mounted() {
			this.init();
		},
		props:["path"],		
		methods: {
			top_checktype(){
				this.list=true;
			},
			login(){
				this.isLogin=true;
				this.login_type='';
			},
			index(){
				this.list = true;
				window.location.href='https://cwweb.modelwiser.com/#/'
			},
			//首页分页
			checkscroll(e){
       			if(e.srcElement.scrollTop+e.srcElement.offsetHeight==e.srcElement.scrollHeight){ 
		          this.page++   //加载更多
		          this.source(this.page,this.tab_id1,this.tab_id2)
		        }
		    },
		    herf_prize(){
		    	this.checkf=0;
				this.checkf_type=1;	
		    	this.listchang3=false;
				this.listchang1=true;
				this.listchang2=true;
				this.listchang4=true;
				this.listchang5=true;
				this.listchang6=true;
				this.list = false;			 
				window.location.href='https://cwweb.modelwiser.com/#/gift'
		    },
			//右上菜单
			handleCommand(command) {
				//this.list = false;
				this.checkf=0;
				this.checkf_type=1;			
				
				if(command == 'a') {					
					this.listchang2=false;
					this.listchang1=true;
					this.listchang3=true;
					this.listchang4=true;
					this.listchang5=true;
					this.listchang6=true;
					this.list = false;
					window.location.href='https://cwweb.modelwiser.com/#/activity'
				}else if(command == 'b'){
					this.listchang3=false;
					this.listchang1=true;
					this.listchang2=true;
					this.listchang4=true;
					this.listchang5=true;
					this.listchang6=true;
					this.list = false;
					window.location.href='https://cwweb.modelwiser.com/#/gift'
				}else{
					this.$http.post({
						url: '/user/logout',
					}).then((res) => {
						console.log(res)	
						localStorage.removeItem('userinfo');
						localStorage.removeItem('accessToken_test');
						clearAccessToken();
						this.mobile='';
					}).catch((err) => {
						console.log(err)
//						this.$message.error(err.msg);
					})
				}
			},	
			list_chang(index){
				if(index==1){
					this.listchang1=false;
					this.listchang2=true;
					this.listchang3=true;
					this.listchang4=true;
					this.listchang5=true;
					this.listchang6=true;
					this.left_list=false;
					this.left_list_o=2;
				}else if(index==2){
					this.listchang2=false;
					this.listchang1=true;
					this.listchang3=true;
					this.listchang4=true;
					this.listchang5=true;
					this.listchang6=true;
					this.left_list=false;
					this.left_list_o=2;
					window.location.href='https://cwweb.modelwiser.com/#/activity'
				}else if(index==3){
					this.listchang3=false;
					this.listchang1=true;
					this.listchang2=true;
					this.listchang4=true;
					this.listchang5=true;
					this.listchang6=true;
					this.left_list=false;
					this.left_list_o=2;
					window.location.href='https://cwweb.modelwiser.com/#/gift'
				}else if(index==4){
					this.listchang4=false;
					this.listchang1=true;
					this.listchang2=true;
					this.listchang3=true;
					this.listchang5=true;
					this.listchang6=true;					
					this.left_list=true;
					this.left_list_o=2;
					
				}else if(index==5){
					this.listchang5=false;
					this.listchang1=true;
					this.listchang2=true;
					this.listchang3=true;
					this.listchang4=true;
					this.listchang6=true;
					this.left_list=false;
					this.left_list_o=2;
					window.location.href='https://cwweb.modelwiser.com/#/reportman'
				}else if(index==6){
					this.listchang6=false;
					this.listchang1=true;
					this.listchang2=true;
					this.listchang3=true;
					this.listchang4=true;
					this.listchang5=true;
					this.left_list=false;
					this.left_list_o=2;
					window.location.href='https://cwweb.modelwiser.com/#/workman'
				}
			},
			//选中二级菜单
			check_left_list(index){
				this.left_list_o=index
			},
			init() {	
				this.checkf = 1;
				this.checkf_type=0;
				
				let date = new Date();
			    let seperator1 = "-";
			    let seperator2 = ":";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes()
			            + seperator2 + date.getSeconds();
	            
	            this.currentdate=currentdate;
				
				
				if(this.path){
					this.list = false;
					this.checkf=0;
					this.checkf_type=1;
					if(this.path=='activity'){
						this.listchang2=false;
						this.listchang1=true;
						this.listchang3=true;
						this.listchang4=true;
						this.listchang5=true;
						this.listchang6=true;
					}else if(this.path=='gift'){
						this.listchang3=false;
						this.listchang1=true;
						this.listchang2=true;
						this.listchang4=true;
						this.listchang5=true;
						this.listchang6=true;
					}else if(this.path=='reportman'){
						this.listchang5=false;
						this.listchang1=true;
						this.listchang2=true;
						this.listchang3=true;
						this.listchang4=true;
						this.listchang6=true;
						this.left_list=false;
					}else if(this.path=='workman'){
						this.listchang6=false;
						this.listchang1=true;
						this.listchang2=true;
						this.listchang3=true;
						this.listchang4=true;
						this.listchang5=true;
						this.left_list=false;
					}
				}				
				
				if(getAccessToken()){
					let use=JSON.parse(window.localStorage.getItem("userinfo"));
					if(use){
						let mobiled=`${use.mobile.substring(0,3)}*****${use.mobile.substring(use.mobile.length-3)}`
						this.mobile= mobiled;
					}else{
						this.isLogin=false;
						clearAccessToken();
					}
				}
				
				//菜单
				this.$http.post({
					url: '/template/category'
				}).then((res) => {
					console.log(res)
					this.last = res.items
				}).catch((err) => {
					console.log(err)
					this.$message.error(err.msg);
				})
				//加载模板
				this.chose_tab('','')
			},
			close(val) {
				this.isLogin = val;
			},
			leave_secondary(){
				this.checkf=0;
				this.checkf_type=1;
			},
			close_toplist(){
				this.checkf_type=1;
			},
			//一级菜单分类
			handleSelect(key, keyPath) {
				if(key == 1) {			
					if(!getAccessToken()){
						this.activeIndex=1;
					}
//					if(this.tab){
//						this.checkfed=1;
//					}
				} else {
					this.checkf = 0;
					this.checkfed=0;
					if(getAccessToken()){
						window.location.href=process.env.VUE_APP_EDITOR;
					}else{
						this.isLogin=true;
						localStorage.removeItem('userinfo');
						localStorage.removeItem('accessToken_test');
						clearAccessToken();
						this.login_type=1
						this.activeIndex=1;
					}					
				}
			},
			//二级菜单分类
			bannerSelect(key, keyPath) {
				console.log(key, keyPath)
				this.tab = key;
				this.checkfed=1;
				this.list = true;
			},
			//三级菜单分类
			thirdSelect(key, keyPath) {
				console.log(key, keyPath)
			},
			//选择各级菜单对应显示模板
			chose_tab(id1,id2) {
				id1?this.tab_id1=id1:this.tab_id1='';
				id2?this.tab_id2=id2:this.tab_id2='';
				this.page=1;
				this.template=[];
				//加载模板	
				this.source(this.page,this.tab_id1,this.tab_id2)
			},
			source(page,tab_id1,tab_id2){
				this.$http.post({
					url: '/template/list',
					data: {
						parent_id: tab_id1,
						child_id: tab_id2,
						page_flag:1,
						per_page:8,
						current_page:page
					}
				}).then((res) => {
					console.log(res)
					this.template = [...this.template, ...res.items];
				}).catch((err) => {
					console.log(err)
					this.$message.error(err.msg);
				})
			},
			//图片移入移出
			enter(index) {
				this.con = index;
			},
			leave() {
				this.con = -1;
			},
			//立即使用
			use(id) {
				this.template_detail=[]; //模板详情数据
				this.template_detail_label=[]; //模板标签
				this.time_differ=''; //相差时间
				this.$http.post({
					url: '/template/detail',
					data: {
						id: id
					}
				}).then((res) => {
					this.template_detail = res
					this.template_detail_label = this.template_detail.template.label.split(",");
					
					
					let date = new Date();
				    let seperator1 = "-";
				    let seperator2 = ":";
				    let month = date.getMonth() + 1;
				    let strDate = date.getDate();
				    if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				    if (strDate >= 0 && strDate <= 9) {
				        strDate = "0" + strDate;
				    }
				    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				            + " " + date.getHours() + seperator2 + date.getMinutes()
				            + seperator2 + date.getSeconds();
				    if(currentdate>this.template_detail.template.limit_start_time && this.template_detail.template.pay_type==1){
				    	this.timeDifc(this.template_detail.template.limit_start_time,currentdate);
						this.already=0;
				    }else{
				    	if(currentdate>this.template_detail.template.limit_end_time){
							this.time_differ = "0天 0小时0分钟";
							this.already=1;
						}else{
							this.timeDifc(currentdate,this.template_detail.template.limit_end_time);
							this.already=0;
						}
				    }
					
					if(this.template_detail.template.preview_url){
						this.iframe=this.template_detail.template.preview_url
					}else{
						this.iframe=''
					}
					
				}).catch((err) => {
//					console.log(err)
//					this.$message.error(err.msg);
				})
				this.modal = 1;
			},
			//控制插件
			togglePage (value) {
                if (frameWindow.$swiper) {
                    if (value > 0) {
                        frameWindow.$swiper.slideNext()
                    } else {
                        frameWindow.$swiper.slidePrev()
                    }
                }
            },
            iframeOnLoad () {
                frameWindow = window.frames["preview"].window
            },
            //进入模板编辑
            inedit(){
				if(getAccessToken()){
					window.location.href=process.env.VUE_APP_EDITOR+'/#/?templateId='+this.template_detail.template.id+'&type=temp';
				}else{
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
					this.login_type=this.template_detail.template.id;
				}            	
            },
			close_use() {
				this.modal = 0;
			},
			//限时时间
			timeDifc(d1, d2) {
				let dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
				let dateEnd = new Date(d2.replace(/-/g, "/")); //获取当前时间
				let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
				let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
				let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				let hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
				//计算相差分钟数
				let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				let minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
				//计算相差秒数
				let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				let seconds = Math.round(leave3 / 1000)
				console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
				this.time_differ = dayDiff + "天 " + hours + "小时 " + minutes + " 分钟";
			},					
		},
		components: {
			login,
			activity,
			prizeman,
			activitieprizeuse,
			reportman,
			workman
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
<style rel="stylesheet">
	@import "../static/css/home.css";
	@import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");
	.el-menu-item.is-active{
	    background-color: #fff !important;
	}
</style>