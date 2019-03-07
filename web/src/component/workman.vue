<template>
	<div class="card_management_right">		
		<div class="card_management_right_list">
			<div class="card_management_right_list_top" style="display: flex;justify-content: space-between;">
				<div>作品管理</div>
				<el-input placeholder="输入要搜索的内容" prefix-icon="el-icon-search" v-model="work_name" maxlength="16" @change="workname_change" style="width: 200px;height: 40px !important;font-size: 14px;"></el-input>
			</div>
			<div class="activitieprizeuse_top">				
				<div style="display: flex;justify-content: space-between;line-height: 28px;font-size: 14px;">
					<div style="display: flex;justify-content: space-between;width: 500px;margin-right: 20px;">
						<div>保存时间</div>
						<div class="time">
							<el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" style="width: 200px;" @change="chang_time"></el-date-picker>
							<span style="margin: 0 5px;position: relative;top: -9px;">-</span>
							<el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" style="width: 200px;" @change="chang_time"></el-date-picker>
						</div>						
					</div>
					<div style="display: flex;justify-content: space-between;width: 265px;margin-right: 20px;">
						<div>关联活动名称</div>
						<div>
							<el-select v-model="option_value" placeholder="调用该用户的活动" class="option_select"  @change="change_prize" style="height: 30px;width: 160px;">
						    	<el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.id"></el-option>
						  	</el-select>
						</div>
					</div>
					<div style="display: flex;justify-content: space-between;width: 305px;">
						<div>使用渠道</div>
						<div class="use_type">
							<el-checkbox v-model="checked_o" fill="#1aad19" class="top_right" disabled="disabled">小程序</el-checkbox>
							<el-checkbox v-model="checked_t" fill="#1aad19" class="top_right" disabled="disabled">公众号</el-checkbox>
							<el-checkbox v-model="checked_f" fill="#1aad19" class="top_right" disabled="disabled">网页</el-checkbox>
						</div>
					</div>
				</div>
			</div>
			<div>
				<table class="card_table" cellspacing="1" cellpadding="0" style="table-layout: fixed;">
					<tr>
						<th style="width: 110px;">作品名称</th>
						<th>使用渠道</th>
						<th>保存时间</th>
						<th>发布时间</th>
						<th>关联活动名称<img src="../static/images/sort.png" @click="association"/></th>
						<th>作品标签</th>
						<th>状态<img src="../static/images/sort.png" @click="status"/></th>
						<th>操作</th>
					</tr>
					<tr v-if="datad==1" v-for="(item,index) in table" :key="item.id">
						<td :title="item.name" style="width: 110px;padding: 0 10px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;color: #9582F2;cursor: pointer;" v-if="item.name!=''" @click="preview(item.id,item.status)">{{item.name}}</td>
						<td :title="item.name" style="width: 110px;padding: 0 10px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;color: #9582F2;cursor: pointer;" v-if="item.name==''" @click="preview(item.id,item.status)">-</td>
						<td>小程序</td>
						<td v-if="item.edit_time">{{item.edit_time.replace(/-/g,'/')}}</td>
						<td v-else>-</td>
						<td v-if="item.publish_time">{{item.publish_time.replace(/-/g,'/')}}</td>
						<td v-else>-</td>
						<td v-if="item.activity.name">{{item.activity.name}}</td>
						<td v-else>-</td>
						<td>-</td>
						<td v-if="item.status==0 || item.status==1 || item.status==2 || item.status==4">未发布</td>
						<td v-if="item.status==3">发布</td>
						<td>
							<span @click="edit(item.id)">编辑</span>
							<span @click="modal_dely(item.id)" v-if="item.status==0 || item.status==1 || item.status==2 || item.status==4">删除</span>
						</td>
					</tr>					
				</table>
				<div style="margin-top: 20px;text-align: center;" v-if="datad==2">					
					未找到相应作品信息
				</div>
				<div style="margin-top: 20px;text-align: center;" v-if="datad==0">					
					还未创建作品，你可以去<font @click="create" style="text-decoration: underline;color: #9684F3;cursor: pointer;">创建</font>哦
				</div>
				
			</div>
			
			<div class="pagination" v-if="datad==1">
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
		<div v-if="modal==1" @click="close_modal" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.3);z-index: 11;"></div>
		<div v-if="modal==1" style="display: table-cell; vertical-align: middle;max-width: 1000px;height: 70%;max-height: 780px;width: 90%;z-index:12;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);background-color: #fff;">
			<div class="card_management_made" style="padding: 50px 70px;box-sizing: border-box;display: flex;justify-content: space-between;">
				<img src="../static/images/close_modal.png" @click="close_modal" alt="" style="width: 18px;height: 18px;cursor: pointer;position: absolute;right: 20px;top:20px"/> <!--@click="close_modal"--> 
				<div class="modal_content_left">
					<div class="modal_content_frame" >
						<iframe name="preview" :src="iframe" frameborder="0" width="410px" height="682px" @load="iframeOnLoad"></iframe>
					</div>
					<img src="../static/images/vip.png" class="modal_content_left_label" alt="" />
					<div class="modal_content_left_page">
						<div class="modal_content_left_page_back" @click="togglePage(-1)">
							<div></div>
						</div>
						<div class="modal_content_left_page_go" @click="togglePage(1)">
							<div></div>
						</div>
					</div>
				</div>
				<div style="width: 400px;text-align: left;padding: 200px 0px 0;" v-if="status_ed">
															    <!--<button type="button" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>-->	
					<div style="font-size: 14px;">URL：{{url}} <font style="color: #8A7CCF;text-decoration: underline;" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</font></div>
					<div style="font-size: 12px;margin-top: 20px;">1、该链接适用环境为小程序 </div>
					<div style="font-size: 12px;">2、该链接无法在普通浏览器运行</div>
				</div>
				<div style="width: 400px;text-align: center;padding: 200px 0px 0;font-size: 14px;" v-else>					
					<div style="font-size: 14px;">URL：暂无发布信息</div>
					<div style="font-size: 12px;margin-top: 20px;">1、该链接适用环境为小程序 </div>
					<div style="font-size: 12px;">2、该链接无法在普通浏览器运行</div>
				</div>
			</div>
		</div>	
		<div v-if="modal_del==1" @click="close_modal" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.3);z-index: 11;"></div>
		<div v-if="modal_del==1" style="width:300px;height:200px;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);z-index:20;background-color: #fff;vertical-align: middle;">
			<img src="../static/images/close_modal.png" @click="close_modal" alt="" style="width: 12px;height: 12px;cursor: pointer;position: absolute;right: 15px;top:15px"/>
			<div style="font-size:14px;color: #333;text-align: center;margin: 80px 0 48px;">确认删除</div>
			<div style="display: flex;justify-content: space-between;" class="del">
				<button @click="remove">确定</button>
				<button @click="remove_modal">取消</button>
			</div>
		</div>
		
		<login @close="close" v-show="isLogin" style="z-index: 9999;"></login>
	</div>
</template>

<script>
	import login from '../component/login.vue';
	import {clearAccessToken} from '../static/js/auth';
	import {getAccessToken} from '../static/js/auth';
	let frameWindow = ''
	export default {
		name: 'activitieprizeuse',
		data() {
			return {
				isLogin: false, //登录弹窗
				id:'',
				iframe:'',
				work_name:'',//作品名称
				value1:'',
				value2:'',
				option: [],
		        option_value: '',
		        option_id:'',
		        workman_name:'隐藏在周末的惊喜',
		        table:[],
				page:1,
				pagenumber:1,
				checked_o:true,	//使用渠道
				checked_t:false,
				checked_f:false,
				modal:0,
				modal_del:0,
				datad:0,		//数据显示状态  0初始  1有数据  2未筛选出符合条件的数据
				association_type:false, //关联状态切换
				status_type:false, //关联状态切换
				sort_type:1,		//切换状态排序
				url:'',
				status_ed:true
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
		props:["path"],
		methods:{
		 	onCopy(e){
		 		this.$message.success('复制成功');
		    },
		    onError(e){
		    	this.$message.error('复制失败');
		    },
			close(val) {
				this.isLogin = val;
			},
			//关闭弹窗
			close_modal(){
				this.modal=0;
				this.modal_del=0;
			},
			init(){	
				//默认近一个月
				let date = new Date();
			    let seperator1 = "-";
			    let seperator2 = ":";
			    let month = date.getMonth()-5;
			    let month_ed = date.getMonth() + 1;
			    let strDate = date.getDate();
			    let strDated = date.getDate();	
			    let d=date.getFullYear();
			    let m=date.getMinutes();
			    if(month<0){
			    	d=d-1
			    	month=12+month
			    	if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }			    	
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
			    if (m >= 0 && m <= 9) {
			        m = "0" + m;
			    }
			    let currentdate = d + seperator1 + month + seperator1 + strDate
			            + " " + '00' + seperator2 + '00'
			            + seperator2 + '00';
	            let h=date.getHours();
	            if(h >= 1 && h <= 9){
	            	h = "0" + h;
	            }
	            let s=date.getSeconds();
	            if(s>=1 && s<=9){
	            	s='0'+s;
	            }
	            let currentdate_end = date.getFullYear() + seperator1 + month_ed + seperator1 + strDate
			            + " " + h + seperator2 + m
			            + seperator2 + s;
				
			    
				this.value1=new Date(currentdate);
				this.value2=new Date(currentdate_end);
				//关联活动名称
				this.$http.post({
					url: '/activity/cutlist',
					data: {
						type:2,
						use_type:2
					}
				}).then((res) => {
					console.log(res)
					this.option=res.items;
				}).catch((err) => {
					console.log(err)
				})
			
				this.getdata(1,this.page,currentdate,currentdate_end,this.option_id,this.work_name,0,1);
			},
			//改变日期筛选
			chang_time(){
				let start_time=this.date_ey(this.value1);
				let end_time=this.date_ey(this.value2);
				if(end_time>start_time){
					this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,1);
				}else{
					this.$message.error('起始日期不能大于结束日期');
				}				
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
					return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
				}				
			},
			//跳转新建页面
			create(){
				window.location.href=process.env.VUE_APP_EDITOR;
			},
			//关联活动名称
			association(){
				this.association_type=!this.association_type;
				this.page=1
				let start_time=this.date_ey(this.value1);
				let end_time=this.date_ey(this.value2);
				if(this.association_type){
					this.sort_type=2
				}else{
					this.sort_type=1
				}
				if(this.datad!=0&&this.datad!=2){
					this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,this.sort_type);
				}else{
					this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,0,this.sort_type);
				}
			},
			status(){
				this.status_type=!this.status_type;
				this.page=1
				let start_time=this.date_ey(this.value1);
				let end_time=this.date_ey(this.value2);
				if(this.status_type){
					this.sort_type=3
				}else{
					this.sort_type=1
				}
				if(this.datad!=0&&this.datad!=2){
					this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,this.sort_type);
				}else{
					this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,0,this.sort_type);
				}
			},
			iframeOnLoad () {
                frameWindow = window.frames["preview"].window
            },
            //关联活动
            change_prize(event){
			    let obj = {};
			    obj = this.option.find((item)=>{
			        return item.id === event;//比如：选项2
			    });
			    this.option_id=event;
			    let start_time=this.date_ey(this.value1);
				let end_time=this.date_ey(this.value2);
			    this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,1);
			},
			//作品名称搜索
			workname_change(){
				let start_time=this.date_ey(this.value1);
				let end_time=this.date_ey(this.value2);
				this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,1);
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
			//获取数据
			getdata(type,page,start_time,end_time,option_id,work_name,filter,sort_type){
				if(getAccessToken()){				
					this.$http.post({
						url: '/editor/list',
						data: {
//							publish_start_time:start_time,	
//							publish_end_time:end_time,	
							edit_start_time:start_time,
							edit_end_time:end_time,
							activity_id:option_id,	
							name:work_name,
							sort_type:sort_type,
							page_flag:1,
							per_page:20,
							current_page:page,
						}
					}).then((res) => {
						console.log(res)
						if(filter==0){
							if(res.items.length==0){
								this.datad=0	
							}else{
								this.table = res.items
								this.pagenumber=res.paging.last_page;
								this.datad=1
							}	
						}else{
							if(res.items.length==0){
								this.datad=2	
							}else{
								this.table = res.items
								this.pagenumber=res.paging.last_page;
								this.datad=1
							}
						}				
					}).catch((err) => {
						
					})
				}else{
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}
			},
			edit(id){
				window.location.href=process.env.VUE_APP_EDITOR+'/#/?templateId='+id+'&type=prod';
			},
			preview(id,status_ed){
				if(status_ed==3){
					this.status_ed=true
				}else{
					this.status_ed=false
				}
				if(getAccessToken()){				
					this.$http.post({
						url: '/editor/detail',
						data: {
							id:id
						}
					}).then((res) => {
//						console.log("dasda"+res.editor.preview_url)
						this.iframe=res.editor.preview_url+'?mode=server';
						this.url=res.editor.url;
					}).catch((err) => {
						
					})
				}else{
					this.isLogin=true;
					localStorage.removeItem('userinfo');
					localStorage.removeItem('accessToken_test');
					clearAccessToken();
				}
				this.modal=1;
			},
			//删除
			modal_dely(id){
				this.modal_del=1;
				this.id=id;
				console.log(id)
			},
			remove(){
				this.$http.post({
					url: '/editor/remove',
					data: {
						id:this.id
					}
				}).then((res) => {
					console.log(res)
					let start_time=this.date_ey(this.value1);
					let end_time=this.date_ey(this.value2);
					this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,0,1);
					this.modal_del=0;
				}).catch((err) => {
					console.log(err)
				})
			},
			remove_modal(){
				this.modal_del=0;
			},
			//分页
			sublimepage(index){
				let start_time=this.date_ey(this.value1);
				let end_time=this.date_ey(this.value2);
				if(index==1){						
					this.page--
					if(this.page<1){
						this.page=1;
					}else{
						this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,this.sort_type);
					}
				}else if(index==2){
					this.page++
					if(this.page>this.pagenumber){
						this.page=this.pagenumber;
					}else{
						this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,this.sort_type);
					}					
				}else if(index==3){
					if(this.page>this.pagenumber){
						this.$message.error('请输入正确页码');
					}else{
						this.getdata(1,this.page,start_time,end_time,this.option_id,this.work_name,1,this.sort_type);
					}
				}				
			},
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
.activitieprizeuse_top{
	width: 100%;height: 50px;background-color: #ECEEF8;margin-bottom:20px;border: 1px solid #E3E6EB;padding: 9px 16px;display: flex;justify-content: space-between;box-sizing: border-box;
}
.activitieprizeuse_top_tab{
	color: #333333;font-size:14px;display: flex;justify-content: space-between;line-height: 18px;
}
.activitieprizeuse_top_tab div{
	padding: 5px 20px;box-sizing: border-box;margin-right: 20px;cursor: pointer;
}
.modal_content_frame{
	width: 306px !important;
    height: 509px !important;
}
.modal_content_left_page_back,.modal_content_left_page_go{
	margin-left: 10px;
}
.time span{
	margin: 0 5px;position: relative;top: -34px;
}
.activitieprizeuse_top .option_select span{
    float: right;top: -5px;right: -2px;
}
.top_right .el-checkbox__label,.top_right .el-checkbox__input.is-checked+.el-checkbox__label{
	color: #333;
	font-size: 14px;
}
.top_right .el-checkbox__input{
    top: -9px;
}
.top_right .el-checkbox__label{
	line-height: 28px;
}
.top_right .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
	background-color: #9582F2;
    border-color: #9582F2;
}
.top_right .el-checkbox__inner:hover,.top_right .el-checkbox__input.is-focus .el-checkbox__inner{
	border-color: #9582F2;
}
.use_type .el-checkbox+.el-checkbox{
	margin-left: 10px !important;
}
.tab_active{
	background-color: #9582F2;color: #fff;
}
table img{
	margin-left: 3px;
    margin-top: -2px;
    cursor: pointer;
}
.del{
	padding: 0 25px;
}
.del button{
	width:120px;
	height:34px;
	background-color: #fff;
	border: 1px solid #DDDDDD;
	color: #333;
	border-radius:4px;
	font-size: 14px;
	cursor: pointer;
}
.del button:first-child{
	background-color: #9380F2;
	color: #fff;
	border: 1px solid #9380F2;
}
</style>