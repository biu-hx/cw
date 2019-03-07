<template>	
	<div class="card_management_right">				
		<!--无卡卷-->
		<div v-if="datad==0" class="card_management_right_nodata">
			<img src="../static/images/nodata.png" alt="" width="100%" height="200px" />
			<div>您还未创建任何奖品</div>
			<button @click="madecard">新建奖品</button>
		</div>
		<!--列表-->
		<div v-if="datad==1" class="card_management_right_list">
			<div class="card_management_right_list_top">
				<div>奖品管理</div>
				<button @click="madecard">新建奖品</button>
			</div>
			<div class="active_type" style="clear:both;background-color: #ECEEF8;border: 1px solid #E1E4E8;margin-bottom:20px;box-sizing: border-box;line-height: 37px;font-size: 14px;color: #333;">
				<div style="width: 280px;display: flex;justify-content: space-between;float: left;">
					<span style="line-height: 50px;margin-left: 10px;">奖品状态</span>
					<div>
						<el-select v-model="activity" placeholder="全部" @change="prizetype" style="width: 160px;height: 37px;color: #333;position: relative;top: 6px;">
							<el-option v-for="item in activity_ed" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</div>
				<!--<div class="prizeman_top" style="width: 190px;margin-left: 116px;line-height: 58px;display: flex;justify-content: space-between;float: left;">
					<span>奖品分类</span>
					<el-checkbox v-model="checked_ed" >卡</el-checkbox>
					<el-checkbox v-model="checked" @change="change_checkbox(2)">卷</el-checkbox>
				</div>-->
			</div>
			<div>
				<table class="card_table" cellspacing="1" cellpadding="0" style="table-layout:fixed;">
					<tr>
						<th>奖品ID</th>
						<th style="width: 234px;">奖品名称</th>
						<th>奖品分类</th>
						<th>可用时间</th>
						<th>创建时间</th>
						<th>库存总量</th>
						<th>库存余量</th>
						<th>奖品状态</th>
					</tr>
					<tr v-for="(item,index) in table" :key="item.id" v-if="source_data==1">
						<td class="table_name" @click="check_activity(item.id)">{{item.id}}</td>
						<td class="table_name" @click="check_activity(item.id)" style="width: 234px;padding: 0 10px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;color: #9582F2;cursor: pointer;">{{item.name}}</td>
						<td v-if="item.type==1">优惠券</td>						
						<td>{{item.valid_start_time.replace(/-/g,'/')}} -{{item.valid_end_time.replace(/-/g,'/')}}</td>
						<td>{{item.add_time.replace(/-/g,'/')}}</td>
						<td>{{item.total}}</td>
						<td>{{item.surplus}}</td>
						<td v-if="item.situation==1">正在使用</td>
						<td v-if="item.situation==2">可使用</td>
						<td v-if="item.situation==3">不可用</td>
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
		<div v-if="made_card==1" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.3);z-index: 11;"></div>
		<div v-if="made_card==1" style="display: table-cell; vertical-align: middle;max-width: 1000px;height: 71%;max-height: 780px;width: 90%;z-index:12;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);background-color: #fff;">
			<addprizeman @closeadd="closeadd"  @addprizeman="addprizeman" :prizeman_typed="prizeman_typed" :prizeman_id="prizeman_id"></addprizeman>
		</div>		
		
		<login @close="close" v-show="isLogin" style="z-index: 9999;"></login>
	</div>
</template>

<script>
	import login from '../component/login.vue';
	import addprizeman from '../component/addprizeman.vue';
	import {clearAccessToken} from '../static/js/auth';
	import {getAccessToken} from '../static/js/auth';
	export default {
		name: 'prizeman',
		data() {
			return {
				isLogin: false, //登录弹窗
				datad: -1, //是否存在卡卷
				source_data:-1,
				made_card: 0, //制作卡卷
				checked: true,
				checked_ed:false,
				//活动类型
				activity_ed: [{
					value: '1',
					label: '全部'
				},{
					value: '2',
					label: '不可用'
				},{
					value: '3',
					label: '可使用'
				},{
					value: '4',
					label: '正在使用'
				}
				],
				activity: '全部',
				//初始化标题
				type1: 0,type2: 0,type3: 0,type4: 0,type5: 0,type6: 0,type7: 0,type9: 0,type_ed: -1,type2_ed: -1,				
				//判断新增 编辑
				prizeman_typed:0,
				page:1,
				pagenumber:1,
				table:[],
				prizeman_id:0,
				prize_type:''
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
			addprizeman,
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
				this.getdata(1,this.page,'','');
			},
			change_checkbox(index){
				if(index==2){
					this.type=1;
				}
			},
			prizetype(){
				console.log(this.activity)
				if(this.activity==1){
					this.prize_type='';
				}else if(this.activity==2){
					this.prize_type=3;
				}else if(this.activity==3){
					this.prize_type=2;
				}else if(this.activity==4){
					this.prize_type=1;
				}
				this.getdata(1,this.page,this.prize_type,1);
			},
			//获取数据
			getdata(type,page,prize_type,source){
				if(getAccessToken()){				
					this.$http.post({
						url: '/gift/list',
						data: {
							type:type,
							page_flag:1,
							per_page:20,
							current_page:page,
							situation:prize_type
						}
					}).then((res) => {
						console.log(res)						
						if(res.items.length==0){
							if(!source){
								this.datad=0
							}else{
								this.datad=1
								this.source_data=0
							}								
						}else{
							this.table = res.items
							this.pagenumber=res.paging.last_page;
							this.datad=1
							this.source_data=1
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
					if(this.page<1){
						this.page=1;
					}else{
						this.getdata(1,this.page,this.prize_type,1);
					}
				}else if(index==2){
					this.page++
					if(this.page>this.pagenumber){
						this.page=this.pagenumber;
					}else{
						this.getdata(1,this.page,this.prize_type,1);
					}					
				}else if(index==3){
					if(this.page>this.pagenumber){
						this.$message.error('请输入正确页码');
					}else{
						this.getdata(1,this.page,this.prize_type,1);
					}
				}
				
			},
			//制作卡卷
			madecard() {
				if(getAccessToken()){
					this.made_card = 1;
					this.prizeman_typed=0;
					this.prizeman_id=0;
				}else{
					//新增活动弹框显示
					this.made_card = 0;
					//新增状态变更
					this.prizeman_typed=0;
					this.prizeman_id=0;
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}	
				
			},
			//查看
	      	check_activity(id){
	      		if(getAccessToken()){
					this.made_card = 1;
					this.prizeman_typed=1;
					this.prizeman_id=id;
				}else{
					//新增活动弹框显示
					this.made_card = 0;
					//新增状态变更
					this.prizeman_typed=0;
					this.prizeman_id=0;
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}	
				
	      	},
	      	closeadd(closeadd){
//	      		console.log(closeadd)
	      		if(!closeadd){
	      			this.made_card=0;
					this.data=0
	      		}
			},
	      	addprizeman(addprizeman){
	      		if(addprizeman==true){
	      			this.init()
	      		}else{
	      			
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