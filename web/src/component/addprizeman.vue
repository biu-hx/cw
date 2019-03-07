<template>
	<div class="card_management_made">
		<div class="card_management_navigation" style="display: flex;justify-content: space-between;">
			<div style="display: flex;justify-content: space-between;width: 375px;">
				<span>{{title}}</span>						
			</div>
			<img src="../static/images/close_modal.png" alt="" @click="close_modal" style="width: 18px;height: 18px;margin-top: 24px;cursor: pointer;"/>
		</div>
		<div class="card_management_navigation_content">
			<div>
				<div class="card_management_navigation_content_left" :class="{'colFF4':type1==1}">奖品名称</div>
				<div class="card_management_navigation_content_right" v-if="prizeman_type==0">
					<el-input v-model="value" maxlength="32" placeholder="" style="width: 400px;"></el-input>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="prizeman_type==1 || prizeman_type==2">{{value}}</div>
			</div>
			<div>
				<div class="card_management_navigation_content_left" :class="{'colFF4':type2==1}">奖品分类</div>
				<div class="card_management_navigation_content_right" v-if="prizeman_type==0">
					<el-select v-model="optionsed" placeholder="优惠券">
				    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				  	</el-select>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="prizeman_type==1 || prizeman_type==2">{{optionsed}}</div>
			</div>
			<div>
				<div class="card_management_navigation_content_left" :class="{'colFF4':type3==1}">价值/面值</div>
				<div class="card_management_navigation_content_right" v-if="prizeman_type==0">
					<input v-model="input" type="text" maxlength="6"  placeholder="请填写整数" class="addprize_input" onkeyup="value=value.replace(/^(-1+)|[^\d]+/g,'')"/>
					<!--<el-input  v-model="input" type="number"  placeholder="" style="width: 120px;" ref='input' @input='limitOrder'></el-input>-->							
					<span style="position: relative;left: 10px;">元</span>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="prizeman_type==1 || prizeman_type==2">{{input}}元</div>
			</div>
			<div style="display: flex;justify-content: space-between;width: 880px;">
				<div style="display: flex;justify-content: space-between;" >
					<div class="card_management_navigation_content_left" :class="{'colFF4':type4==1}">可用时间</div>
					<div class="block" v-if="prizeman_type==0">
						<el-date-picker v-model="value2" style="width: 382px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</div>
					<div class="block" v-if="prizeman_type==2">
						<el-date-picker v-model="value1" disabled="disabled" type="datetime" placeholder="选择起始日期时间" style="width: 140px;"></el-date-picker>
						<span style="margin: 0 3px;position: relative;top: -19px;">至</span>
						<el-date-picker v-model="value3" type="datetime" placeholder="选择结束日期时间" style="width: 140px;"></el-date-picker>
					</div>
					<div class="card_management_navigation_content_right he50" v-if="prizeman_type==1">{{value2}}</div>		
				</div>						
			</div>
			<div>
				<div class="card_management_navigation_content_left" :class="{'colFF4':type5==1}">库存总量</div>
				<div class="card_management_navigation_content_right" v-if="prizeman_type==0 || prizeman_type==2">
					<input v-model="inputd" type="text" maxlength="5"  placeholder="" class="addprize_input" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"/>
					<!--<el-input  v-model="inputd" type="number" maxlength="99999" placeholder="" style="width: 120px;"></el-input>-->
					<span style="position: relative;left: 10px;">张</span>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="prizeman_type==1">{{inputd}}张</div>	
			</div>
			<div style="margin-bottom: 60px;">
				<div class="card_management_navigation_content_left" :class="{'colFF4':type6==1}">说明备注</div>
				<div class="card_management_navigation_content_right input_textarea" v-if="prizeman_type==0 || prizeman_type==2">
					<el-input type="textarea" style="width: 742px;height: 109px;" maxlength="200" :autosize="{ minRows: 2, maxRows: 4}" placeholder="200字以内" v-model="textarea3"></el-input>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="prizeman_type==1" style="width: 500px;height: 110px;overflow:auto;box-sizing: border-box;padding: 10px 0 0;line-height: 20px;">{{textarea3}}</div>
			</div>
		</div>
		<div style="width:100%;height:30px;position: absolute;bottom: 140px;" v-if="!complete">
			<div style="width:220px;height:100%;color:#FF4C25;font-size:14px;box-sizing:border-box;background:rgba(236,76,41,0.3);border-radius:15px;padding:0 10px;line-height:30px;margin:auto;text-align: center;">
				<img src="../static/images/caveat.png" alt="" width="18px" height="18px" style="margin-right: 14px;margin-top: -2px;" /> 您还有信息未填写
			</div>
		</div>
		<div class="card_made_submit">
			<div>
				<!--<button @click="sublime(1)" v-if="prizeman_type==0 ">确定</button>
				<button @click="sublime(2)" v-if="prizeman_type==2">确定</button>-->
				<button v-if="btn_once==1">确定</button>
				<button @click="sublime()" v-if="prizeman_type==0">确定</button>
				<button @click="sublime()" v-if="prizeman_type==2">修改</button>
				
				<button @click="editd" v-if="prizeman_type==1">编辑</button>
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
		name: 'prizeman',
		data() {
			return {
				title:'新建奖品',
				isLogin: false, //登录弹窗
				// 分类					
				value: '',
				// 分类	
				options: [{
					value: '1',
					label: '优惠券'
				}],
				optionsed:'优惠券',
				//新增开卷
				input: '', //抽奖名称
				//活动开始
				value2: [],
				value1:'',
				value3:'',
				
				inputd:1,
				//活动说明
				textarea3: '',
				
				//初始化标题
				type1: 0,type2: 0,type3: 0,type4: 0,type5: 0,type6: 0,				
				prizeman_type:0,
				
				complete:true,
				btn_once:0,
				surplus:'',
				total:''
			}
		},
		props:["prizeman_typed","prizeman_id"],		
		mounted() {
			this.init()			
		},			
		components: {
			login
		},
		methods:{
			close(val) {
				this.isLogin = val;
			},
			init(){
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
	            let strDated = date.getDate()+1;
	            if (strDated >= 0 && strDated <= 9) {
			        strDated = "0" + strDated;
			    }
				let currentdate_end = date.getFullYear() + seperator1 + month + seperator1 + strDated
			            + " " + '18' + seperator2 + '00'
			            + seperator2 + '00';
					console.log(currentdate_end)
				this.value2=[currentdate, currentdate_end];
				
				
				if(this.prizeman_typed==1){
					this.title='查看奖品';
					this.prizeman_type=this.prizeman_typed
					if(getAccessToken()){
						this.$http.post({
							url: '/gift/detail',
							data: {
								id:this.prizeman_id			
							}
						}).then((res) => {
							console.log(res)
							this.value=res.gift.name;
							this.optionsed='优惠券';
							this.input=res.gift.price;
							this.value2=res.gift.valid_start_time+'-'+res.gift.valid_end_time;
							this.inputd=res.gift.total;
							this.textarea3=res.gift.remark;
							this.made_card = 2;
						}).catch((err) => {
							console.log(err)
							this.made_card = 1;
						})
					}else{
						this.isLogin=true;
					}
				}
			},
			close_modal(){
				this.$emit('closeadd',false)
				if(this.prizeman_type==0){
					this.value='';
					this.input = '';
					this.inputd=1;
					this.textarea3='';
					this.made_card = 0;
	      		}
	      	},
	      	date(date){
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
	      	sublime() {
	      		this.btn_once=1;				
				if(this.prizeman_type==0){		
					if(this.value!='' && this.optionsed!='' && this.input!='' &&  this.value2!=null && this.inputd!='' && this.textarea3!='') {
						let valid_start_time=this.date(this.value2[0]);
						let valid_end_time=this.date(this.value2[1]);
						if(getAccessToken()){
							this.complete=true
							this.$http.post({
								url: '/gift/add',
								data: {
									type:1,
									name:this.value,
									price:this.input,
									total:this.inputd,
									remark:this.textarea3,
									valid_start_time:valid_start_time,
									valid_end_time:valid_end_time							
								}
							}).then((res) => {
								console.log(res)
								this.made_card = 2;
								this.init()	
								this.$emit('closeadd',false)
								this.$emit('addprizeman',true)
								this.$message.success('提交成功');
								this.btn_once=0;
							}).catch((err) => {
								console.log(err)
								this.made_card = 1;
								this.$emit('addprizeman',false)
								this.btn_once=0;
								this.$message.error('您提交的信息有误');
							})
						}else{
							this.isLogin=true;
						}
					}else{
						this.complete=false;
						this.btn_once=0;
					}
					this.value==''?this.type1 = 1:this.type1 = 0;
					this.optionsed==''?this.type2 = 1:this.type2 = 0;
					this.input==''?this.type3 = 1:this.type3 = 0;					
					this.value2==null?this.type4 = 1:this.type4 = 0;
					this.inputd==''?this.type5 = 1:this.type5 = 0;
					this.textarea3==''?this.type6 = 1:this.type6 = 0;
				}else{
					this.data = 2;
					this.made_card = 1;
					this.prizeman_type=2;		
					let valid_end_time=this.date(this.value3);
					if(this.value3!=null && this.inputd!='' && this.textarea3!=''){
						if(this.inputd>=this.total-this.surplus){
							if(getAccessToken()){
								this.$http.post({
									url: '/gift/edit',
									data: {
										total:this.inputd,
										remark:this.textarea3,
										valid_end_time:valid_end_time,
										id:this.prizeman_id
									}
								}).then((res) => {
	//								console.log(res)
									this.made_card = 2;
									this.init()	
									this.$emit('closeadd',false)
									this.$emit('addprizeman',true)
									this.btn_once=0;
									this.$message.success('提交成功');
								}).catch((err) => {
	//								console.log(err)
									this.made_card = 1;
									this.$emit('addprizeman',false)
									this.btn_once=0;
									this.$message.error('结束日期请选择当前以后的日期');
								})
							}else{
								this.isLogin=true;
								localStorage.removeItem('userinfo');
								localStorage.removeItem('accessToken_test');
								clearAccessToken();
							}
						}else{	
							this.btn_once=0;
							this.$message.error('库存总量只能大于等于库存总量-库存余量');
						}
						
					}else{
						this.btn_once=0;
						this.$message.error('请完善信息后提交');
					}
					this.value3==null?this.type4 = 1:this.type4 = 0;
					this.inputd==''?this.type5 = 1:this.type5 = 0;
					this.textarea3==''?this.type6 = 1:this.type6 = 0;
				}
							
			},
			//編輯
	      	editd(){
	      		this.btn_once=0;
	      		this.prizeman_type=2;
				this.title='编辑奖品';
				if(getAccessToken()){
					this.$http.post({
						url: '/gift/detail',
						data: {
							id:this.prizeman_id					
						}
					}).then((res) => {
						console.log(res)
						this.value=res.gift.name;
						this.optionsed='优惠券';
						this.input=res.gift.price;
						this.value1=new Date(res.gift.valid_start_time);
						this.value3=new Date(res.gift.valid_end_time);
						this.inputd=res.gift.total;
						this.textarea3=res.gift.remark;
						this.made_card = 2;
						this.btn_once=0;
						this.surplus=res.gift.surplus;
						this.total=res.gift.total;
					}).catch((err) => {
						console.log(err)
						this.made_card = 1;
						this.btn_once=0;
					})
				}else{
					this.isLogin=true;
				}
	      		
	      	},
		},
	}
</script>

<style>
</style>