<template>
	<div class="moneysave" style="display: inherit !important;">
		<div>
			<div class="card_management_navigation_content_left" :class="{'colFF4':type2==1}">活动名称</div>
			<div class="card_management_navigation_content_right" v-if="activity_type==0">
				<el-input  v-model="input"  placeholder="" maxlength="32" style="width: 300px;"></el-input>
			</div>
			<div class="card_management_navigation_content_right he50" v-if="activity_type==1 || activity_type==2">{{input}}</div>
		</div>
		<div style="display: flex;justify-content: space-between;width: 1032px;">
			<div style="display: flex;justify-content: space-between;" >
				<div class="card_management_navigation_content_left" :class="{'colFF4':type3==1}">活动时间</div>
				<div class="block" v-if="activity_type==0">
					<el-date-picker v-model="value2" style="width: 376px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</div>
				<div class="block" v-if="activity_type==2">
					<el-date-picker v-model="value1" disabled="disabled" type="datetime" placeholder="选择起始日期时间" style="width: 140px;"></el-date-picker>
					<span style="margin: 0 3px;position: relative;top: -19px;">至</span>
					<el-date-picker v-model="value4" type="datetime" placeholder="选择结束日期时间" style="width: 140px;"></el-date-picker>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="activity_type==1">{{value2}}</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div class="card_management_navigation_content_left" :class="{'colFF4':type4==1}">领取时间</div>
				<div class="block" v-if="activity_type==0">
					<el-date-picker v-model="value3" style="width: 376px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
				</div>
				<div class="block" v-if="activity_type==2">
					<el-date-picker v-model="value5" disabled="disabled" type="datetime" placeholder="选择起始日期时间" style="width: 140px;"></el-date-picker>
					<span style="margin: 0 3px;position: relative;top: -19px;">至</span>
					<el-date-picker v-model="value6" type="datetime" placeholder="选择结束日期时间" style="width: 140px;"></el-date-picker>
				</div>
				<div class="card_management_navigation_content_right he50" v-if="activity_type==1">{{value3}}</div>
			</div>
		</div>
		<div>
			<div class="card_management_navigation_content_left" :class="{'colFF4':type5==1}">活动说明</div>
			<div class="card_management_navigation_content_right input_textarea" v-if="activity_type==0 || activity_type==2">
				<el-input type="textarea" style="width: 893px;height: 109px;" maxlength="500" :autosize="{ minRows: 2, maxRows: 4}" placeholder="500字以内" v-model="textarea3"></el-input>
			</div>
			<div class="card_management_navigation_content_right " v-if="activity_type==1" style="width: 897px;height: auto;box-sizing: border-box;padding: 14px 0 0;line-height: 20px;word-wrap: break-word;">{{textarea3}}</div>
		</div>

		<div>
			<div class="card_management_navigation_content_left" :class="{'colFF4':type6==1}">活动规则</div>
			<div class="card_management_navigation_content_right">
				<div class="card_made_bottom">
					<span>每个用户可以助力砍价</span>
					<el-select v-model="number" placeholder="" style="width: 50px;" v-if="activity_type==0">
						<el-option v-for="item in num" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select v-model="number" placeholder="" style="width: 50px;" disabled v-if="activity_type==2">
						<el-option v-for="item in num" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="moneysave_inpnull" v-if="activity_type==1">{{number}}</div>
					<span>次，每次金额为</span>
					<el-select v-model="money" placeholder="固定金额" class="money" v-if="activity_type==0" @change="change">
						<el-option v-for="item in mon" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select v-model="money" placeholder="固定金额" class="money" disabled v-if="activity_type==2" @change="change">
						<el-option v-for="item in mon" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="moneysave_inpnull" v-if="activity_type==1">{{moneyed}}</div>
					<div v-if="money==1" style="display: flex;">
						<span>，每次砍价金额</span>
						<input type="text" v-model="fixed_amount" maxlength="4" v-if="activity_type==0" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 50px;margin: 0 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);" />
						<input type="text" v-model="fixed_amount" maxlength="4" disabled v-if="activity_type==2" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 50px;margin: 0 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
						<div class="moneysave_inpnull" v-if="activity_type==1">{{fixed_amount}}</div>
						<span>元。</span>
					</div>
					<div v-if="money==2" style="display: flex;">
						<span>，每次砍价金额区间</span>
						<input type="text" v-model="rule_min_price" maxlength="4" v-if="activity_type==0" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 50px;margin: 0 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
						<input type="text" v-model="rule_min_price" maxlength="4" disabled v-if="activity_type==2" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 50px;margin: 0 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
						<div class="moneysave_inpnull" v-if="activity_type==1">{{rule_min_price}}</div>
						<span>至</span>
						<input type="text" v-model="rule_max_price" maxlength="4" v-if="activity_type==0" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 50px;margin: 0 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
						<input type="text" v-model="rule_max_price" maxlength="4" disabled v-if="activity_type==2" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 50px;margin: 0 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
						<div class="moneysave_inpnull" v-if="activity_type==1">{{rule_max_price}}</div>
						<span>元。</span>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="card_management_navigation_content_left" :class="{'colFF4':type7==1}">领取条件</div>
			<div class="card_management_navigation_content_right">
				<div class="card_made_bottom">
					<el-select v-model="prizeman_from" v-if="activity_type==0" placeholder="选择奖品来源" style="width: 130px;margin-left: 0;" >
						<el-option v-for="item in prizemanfrom" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="moneysave_inpnull" v-if="activity_type==1 || activity_type==2">策玩奖品</div>
				</div>	
				<div class="card_made_bottom">
					<span>助力金额满</span>
					<input type="text" v-model="gold" maxlength="6" v-if="activity_type==0" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="width: 80px;margin: 6px 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
					<input type="text" v-model="gold" maxlength="6" v-if="activity_type==2" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" disabled style="width: 80px;margin: 6px 10px;border-radius:4px;border:1px solid rgba(225,228,232,1);"/>
					<div class="moneysave_inpnull" v-if="activity_type==1">{{gold}}</div>
					<span>元，可领取奖品</span>
					<el-select v-model="platformp" placeholder="平台奖品" style="width: 90px;" v-if="activity_type==0">
						<el-option v-for="item in platformprize" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select v-model="platformp" placeholder="平台奖品" style="width: 90px;" disabled v-if="activity_type==2">
						<el-option v-for="item in platformprize" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="moneysave_inpnull" v-if="activity_type==1">平台奖品</div>
					<el-select v-model="prize" placeholder="调用奖品分类" style="width: 130px;" v-if="activity_type==0">
						<el-option v-for="item in prizenum" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select v-model="prize" placeholder="调用奖品分类" style="width: 130px;" disabled v-if="activity_type==2">
						<el-option v-for="item in prizenum" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="moneysave_inpnull" v-if="activity_type==1">券</div>
					<el-select v-model="classification" filterable placeholder="调用奖品分类，支持输入" style="width: 215px;" v-if="activity_type==0" @change="change_prize">
					    <el-option v-for="item in prizeclassification" :key="item.id" :label="item.name" :value="item.id"></el-option>
				 	</el-select>
				 	<el-select v-model="classification" filterable placeholder="调用奖品分类，支持输入" style="width: 215px;" disabled v-if="activity_type==2" @change="change_prize">
					    <el-option v-for="item in prizeclassification" :key="item.id" :label="item.name" :value="item.id"></el-option>
				 	</el-select>
				 	
					<div class="moneysave_inpnull" v-if="activity_type==1">{{classification}}</div>
				</div>
			</div>
		</div>
		<div>
			<div class="card_management_navigation_content_left">额外设置</div>
			<div class="card_management_navigation_content_right_css" v-if="activity_type==0 || activity_type==2 ">
				<div style="position: relative;">
					<div class="card_navigation" @click="chose_navigation(1)"  :class="{'card_navigation_check':radio==1}">
						<img src="../static/images/format_1.png" alt="" width="100%" height="100%" />
					</div>
					<img v-if="radio==1" src="../static/images/card_navigation_check.png" style="width: 22px;height: 18px;position: absolute;bottom: 0;right: 0;"/>
				</div>
				<div style="position: relative;">
					<div class="card_navigation" @click="chose_navigation(2)" :class="{'card_navigation_check':radio==2}">
						<img src="../static/images/format_2.png" alt="" width="100%" height="100%" />
					</div>
					<img v-if="radio==2" src="../static/images/card_navigation_check.png" style="width: 22px;height: 18px;position: absolute;bottom: 0;right: 0;"/>
				</div>
			</div>			
			<div class="card_management_navigation_content_right_css" v-if="activity_type==1">
				<div style="position: relative;">
					<div class="card_navigation" v-if="radio==1">
						<img src="../static/images/format_1.png" alt="" width="100%" height="100%" />
					</div>
					<div class="card_navigation" v-if="radio==2">
						<img src="../static/images/format_2.png" alt="" width="100%" height="100%" />
					</div>
				</div>
			</div>			
		</div>
		<div>
			<div class="card_management_navigation_content_left" :class="{'colFF4':type8==1}">项目名称</div>
			<div style="height: 50px;line-height: 50px;">
				<input type="text" v-model="projectname" placeholder="" v-if="activity_type==0 " maxlength="10" style="width: 220px;height:47px;border-radius:4px;border:1px solid rgba(225,228,232,1);text-align: center;box-sizing:border-box;padding: 0 10px;"/>
				<input type="text" v-model="projectname" placeholder="" v-if="activity_type==2" disabled maxlength="10" style="width: 220px;height:47px;border-radius:4px;border:1px solid rgba(225,228,232,1);text-align: center;box-sizing:border-box;padding: 0 10px;"/>
				
				<div class="moneysave_inpnull" v-if="activity_type==1">{{projectname}}</div>
			</div>
			<div style="margin-left: 50px;" class="moneysave_left" :class="{'colFF4':type9==1}">奖品发放量</div>
			<div style="height: 50px;line-height: 50px;width: 300px;clear: both;">
				<input type="text" placeholder="" v-model="total" maxlength="3" v-if="activity_type==0 || activity_type==2" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" style="float:left;margin-right:10px;width: 104px;height:47px;border-radius:4px;border:1px solid rgba(225,228,232,1);text-align: center;box-sizing:border-box;padding: 0 10px;"/>
				<div class="moneysave_inpnull" v-if="activity_type==1 " style="float:left;">{{total}}</div>
				<!--<span style="float:left;">张<font color="#999999">（不能大于库存余量{{surplus}}）</font></span>-->
			</div>
		</div>
		<div>
			<div class="card_management_navigation_content_left" :class="{'colFF4':type10==1}">发放方式</div>
			<div style="height: 50px;line-height: 50px;">
				<el-select v-model="optiond" placeholder="" style="width: 120px;height: 100%;" v-if="activity_type==0">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>				 
				<div class="moneysave_inpnull" v-if="activity_type==1 || activity_type==2">{{optiond}}</div>
			</div>
		</div>	
		<div style="width:100%;height:30px;position: absolute;bottom: 97px;" v-if="!complete">
			<div style="width:220px;height:100%;color:#FF4C25;font-size:14px;box-sizing:border-box;background:rgba(236,76,41,0.3);border-radius:15px;padding:0 10px;line-height:30px;margin:auto;text-align: center;">
				<img src="../static/images/caveat.png" alt="" width="18px" height="18px" style="margin-right: 14px;margin-top: -2px;" /> 您还有信息未填写
			</div>
		</div>
		<div style="width:100%;height:30px;position: absolute;bottom: 97px;" v-if="!errmg">
			<div style="width:220px;height:100%;color:#FF4C25;font-size:14px;box-sizing:border-box;background:rgba(236,76,41,0.3);border-radius:15px;padding:0 10px;line-height:30px;margin:auto;text-align: center;">
				<img src="../static/images/caveat.png" alt="" width="18px" height="18px" style="margin-right: 14px;margin-top: -2px;" /> 您填写的信息有误
			</div>
		</div>
		<div class="card_made_submit">
			<div>
				<!--<button v-if="btn_once==1">确定</button>
				<button @click="sublime()" v-if="checktype==0||checktype==2&&btn_once==3">确定</button>
				<!--<button >确定</button>-->
				<!--<button @click="editd" v-if="checktype==1||btn_once==0">编辑</button>-->
				<button @click="sublime()" v-if="activity_type==0">确定</button>
				<button @click="sublime()" v-if="activity_type==2">修改</button>
				<button @click="editd" v-if="activity_type==1">编辑</button>
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
		name: 'moneysave',
		data() {
			return {
				isLogin: false, //登录弹窗
				//新增参数
				input: '', //抽奖名称
				
				//日期选择插件参数
				value1: '',
				//活动开始
				value2: [],
				//活动结束
				value3: [],
				value4: '',
				value5: '',
				value6: '',				
				//活动说明
      			textarea3: '',
				//版式
				radio: '1',
				//选择方案
				options: [{
					value: '1',
					label: '卡券号'
				}],
				optiond: '卡券号',
				//每次砍价金额
				fixed_amount: '',
				rule_min_price:'',
				rule_max_price:'',
				//砍价次数		        
				num: [{
					value: '1',
					label: '1'
				}],
				number: '1',
				//金额模式
				mon: [{
						value: '1',
						label: '固定金额'
					},
					{
						value: '2',
						label: '随机'
					}
				],
				money: '1',
				moneyed:'',
				//平台奖品
				platformprize: [{
					value: '1',
					label: '平台奖品'
				}],
				platformp: '平台奖品',
				//奖品数量		        
				prizenum: [{
					value: '1',
					label: '优惠券'
				}],
				prize: '优惠券',
				//奖品分类		        
				prizeclassification: [
					
				],
				classification: '',
				//奖品来源
				prizemanfrom: [{
					value: '1',
					label: '策玩奖品'
				}],
				prizeman_from: '策玩奖品',
				
				//助力金额
				gold:'',
				//项目名称
				projectname:'',
				//奖品总发量
				total:1,
				//信息填写有误
				errmg:true,
				//信息不全
				complete:true,
				//编辑
				edit:0,
				//初始化标题
				type2: 0,type3: 0,type4: 0,type5: 0,type6: 0,type7: 0,type8: 0,type9: 0,type10: 0,type_ed: -1,type2_ed: -1,	
				activity_type:0,
				//初始发放量
				init_total:'' ,
				surplus:'',
				modaltype:true,
				isFromIframe:this.$route.query.isFromIframe||false,
			}
		},
		props:["checktype","adminid"],		
		mounted() {
			this.init()			
		},
		components: {
			login
		},
		methods:{
			check_sub(){
				if(this.activity_type==0){
					if(this.isFromIframe){
						this.setMessage('closeIframe');
					}else {
						this.input='';
						this.data = 0;
						this.$emit('modaltype',false)
						this.value2='';
						this.value3='';
						this.textarea3='';
					}
				}else{
					this.$emit('modaltype',false)
				}
			},
			close(val) {
				this.isLogin = val;
			},
			change(){
				if(this.money==1){
					this.moneyed='固定金额';
				}else{
					this.moneyed='随机';
				}
			},
			init(){
				//默认时间
				this.value2=[this.default_date().currentdate, this.default_date().currentdate_end];
				this.value3=[this.default_date().currentdate, this.default_date().currentdate_end];
				this.activity_type=this.checktype
				console.log(this.activity_type)
				//新增活动
				if(this.activity_type==0){
					this.input='';
					this.textarea3='';
					this.adminid=0;
					this.value2=[this.default_date().currentdate, this.default_date().currentdate_end];
					this.value3=[this.default_date().currentdate, this.default_date().currentdate_end];
					this.init_data();
				}else if(this.activity_type==1){
					if(getAccessToken()){
						this.$http.post({
							url: '/bargain/actdetail',
							data: {
								id:this.adminid
							}
						}).then((res) => {
							console.log(res)
							this.input=res.activity.name;
							this.value2=res.activity.start_time+'-'+res.activity.end_time;
							this.value3=res.activity.exchange_start_time+'-'+res.activity.exchange_end_time;
							this.textarea3=res.activity.remark;
							this.projectname=res.activity.gift_tag;	
							this.classification=res.activity.bargain_gift.gift.name;		
							this.total=res.activity.bargain_gift.total;
							this.init_total=res.activity.bargain_gift.total;
							this.radio=res.activity.bargain_gift.show_type;	
							this.money=res.activity.bargain_rule.type;
							if(this.money==1){
								this.moneyed='固定金额';	
							}else{
								this.moneyed='随机';	
							}
							this.fixed_amount=res.activity.bargain_rule.price;		
							this.rule_min_price=res.activity.bargain_rule.min_price;		
							this.rule_max_price=res.activity.bargain_rule.max_price;	
							this.gold=res.activity.bargain_rule.target_price;	
							this.surplus=res.activity.bargain_gift.surplus;
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
				}
				//奖品列表展示
				if(getAccessToken()){
					this.$http.post({
						url: 'gift/cutlist',
						data: {
							type:1
						}
					}).then((res) => {
						this.prizeclassification=res.items;
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
			//数据初始化
			init_data(){
				this.complete=true;
				this.errmg=true;
				this.type1=0;
				this.type2=0;
				this.type3=0;
				this.type4=0;
				this.type5=0;
			},
			//默认日期
			default_date(){
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
	            return {currentdate,currentdate_end};
			},
			//选择奖品
			change_prize(event){
			    let obj = {};
			    obj = this.prizeclassification.find((item)=>{
			        return item.id === event;//比如：选项2
			    });
			    this.surplus=obj.surplus;
			},
			sublime() {
				if(this.activity_type==0){
					this.value?this.type1 = 0:this.type1 = 1;
					this.input?this.type2 = 0:this.type2 = 1;
					this.value2?this.type3 = 0:this.type3 = 1;
					this.value3?this.type4 = 0:this.type4 = 1;
					this.textarea3?this.type5 = 0:this.type5 = 1;
					this.gold?this.type7 = 0:this.type7 = 1;
					this.classification?this.type7 = 0:this.type7 = 1;		
					this.projectname?this.type8 = 0:this.type8 =1;	
					this.total?this.type9 = 0:this.type9 =1;	
//					this.option?this.type10 = 0:this.type10 = 1;
					let start_time=this.date_ey(this.value2[0]);
					let end_time=this.date_ey(this.value2[1]);
					let exchange_start_time=this.date_ey(this.value3[0]);
					let exchange_end_time=this.date_ey(this.value3[1]);
					//固定金额
					let rule_priced='';
					let rule_min_priced='';
					let rule_max_priced='';
					if(this.money==1){
						rule_priced=this.fixed_amount;
						rule_min_priced='';
						rule_max_priced='';
					}else{
						rule_priced='';
						rule_min_priced=this.rule_min_price;
						rule_max_priced=this.rule_max_price;
					}
					if(this.money==1){
						if(parseInt(this.fixed_amount)<parseInt(this.gold)){
							this.type6 = 0
						}else{
							this.type6 = 1;
						}					
						console.log(this.input+','+this.value2+','+this.value3+','+this.textarea3+','+this.number+','+this.money+','+this.fixed_amount+','+this.gold+','+this.classification+','+this.radio+','+this.projectname+','+this.total)
						if(this.input && this.value2 && this.value3 && this.textarea3&&this.number&&this.money&&this.fixed_amount&&this.gold&&this.classification&&this.radio&&this.projectname&&this.total){
							if(this.type2==0 &&this.type3==0 &&this.type4==0 &&this.type5==0 &&this.type6==0  && this.type7==0 && this.type8==0 && this.type9==0){
								this.errmg=true;
								this.complete=true;
								if(getAccessToken()){
									this.$http.post({
										url: '/bargain/add',
										data: {
											name:this.input,
											start_time:start_time,
											end_time:end_time,
											exchange_start_time:exchange_start_time,
											exchange_end_time:exchange_end_time,
											gift_tag:this.projectname,
											remark:this.textarea3,
											gift_id:this.classification,
											total:this.total,
											show_type:this.radio,
											rule_type:this.money,
											rule_price:rule_priced,
											rule_min_price:rule_min_priced,
											rule_max_price:rule_max_priced,
											rule_target_price:this.gold
										}
									}).then((res) => {
										console.log(res);
										if(this.isFromIframe){
											this.setMessage('newSuccess');
										}else {
											this.$emit('modaltype',false)
										}
										this.$message.success('提交成功');
									}).catch((err) => {
										console.log(err)
										this.$message.error('您提交的信息有误');
										this.$emit('modaltype',true)
									})
								}else{
									this.isLogin=true;
								}
//								this.$emit('moneydata',this.number,this.money,this.fixed_amount,this.rule_min_price,this.rule_max_price,this.gold,this.classification,this.radio,this.projectname,this.total,this.option)
							}else{
								this.errmg=false;
							}
						}else{
							this.complete=false;
//							this.errmg=false;
						}
					}else{
						if(parseInt(this.rule_max_price)<=parseInt(this.gold)){
							this.type6 = 0
						}else{
							this.type6 = 1
						}
						if(this.input && this.value2 && this.value3 && this.textarea3&&this.number&&this.money&&this.rule_min_price&&this.rule_max_price&&this.gold&&this.classification&&this.radio&&this.projectname&&this.total){
							if(this.type2==0 &&this.type3==0 &&this.type4==0 &&this.type5==0 && this.type6==0 && this.type7==0 && this.type8==0 && this.type9==0){
								this.complete=true;
								this.errmg=true;
								if(getAccessToken()){
									this.$http.post({
										url: '/bargain/add',
										data: {
											name:this.input,
											start_time:start_time,
											end_time:end_time,
											exchange_start_time:exchange_start_time,
											exchange_end_time:exchange_end_time,
											gift_tag:this.projectname,
											remark:this.textarea3,
											gift_id:this.classification,
											total:this.total,
											show_type:this.radio,
											rule_type:this.money,
											rule_price:rule_priced,
											rule_min_price:rule_min_priced,
											rule_max_price:rule_max_priced,
											rule_target_price:this.gold
										}
									}).then((res) => {
										console.log(res);
										if(this.isFromIframe){
											this.setMessage('newSuccess');
										}else {
											this.$emit('modaltype',false)
										}
										this.$message.success('提交成功');
									}).catch((err) => {
										console.log(err)
										this.$message.error('您提交的信息有误');
										this.$emit('modaltype',true)
									})
								}else{
									this.isLogin=true;
								}
//								this.$emit('moneydata',this.number,this.money,this.fixed_amount,this.rule_min_price,this.rule_max_price,this.gold,this.classification,this.radio,this.projectname,this.total,this.option)
							}else{
								this.errmg=true;
							}
						}else{
							this.complete=true;
						}
					}
	//				if(this.type6==0 && this.type7==0 && this.type8==0 && this.type9==0 && this.type10==0){
	//					this.$emit('complete',false)
	//					this.$emit('moneydata',this.number,this.money,this.fixed_amount,this.rule_min_price,this.rule_max_price,this.gold,this.classification,this.radio,this.projectname,this.total,this.option)
	//				}else{
	//					this.$emit('complete',true)
	//				}	
				}else if(this.activity_type==2){
					let end_time=this.date_ey(this.value4);
					let exchange_end_time=this.date_ey(this.value6);
					if(this.input && this.value2 && this.value3 && this.textarea3&&this.number&&this.money&&this.fixed_amount&&this.gold&&this.classification&&this.radio&&this.projectname&&this.total) {
						if(this.type2==0 &&this.type3==0 &&this.type4==0 &&this.type5==0 &&this.type6==0  && this.type7==0 && this.type8==0 && this.type9==0){
							this.complete=true;
							this.errmg=true;
							console.log(end_time+','+this.default_date().currentdate_end+','+exchange_end_time+','+this.default_date().currentdate_end)
							if(end_time>this.default_date().currentdate_end&&exchange_end_time>this.default_date().currentdate_end){
								if(getAccessToken()){
									this.$http.post({
									url: '/bargain/edit',
										data: {
											id:this.adminid,
											end_time:end_time,
											exchange_end_time:exchange_end_time,
											remark:this.textarea3,
											total:this.total,
											show_type:this.radio
										}
									}).then((res) => {
										console.log(res)
										this.$emit('modaltype',false)
										this.$message.success('提交成功');
									}).catch((err) => {
										console.log(err)
										this.$message.error('奖品发放量只有大于创建时填写的数字，但不能超过库存余量');
										this.$emit('modaltype',true)
									})
								}else{
									this.isLogin=true;
								}
							}else{
								this.$message.error('结束时间只能修改到当前时间+1天后的任何时候');
							}							

						}
					}else{
						this.complete=true;
						this.errmg=false;
					}
				}
			},
			//編輯
	      	editd(){
	      		this.prizeclassification='';
	      		this.surplus='';
//	      		this.title="编辑活动";
	      		this.$emit('titled',"编辑活动")
				this.activity_type=2;
				this.$http.post({
					url: '/bargain/actdetail',
					data: {
						id:this.adminid
					}
				}).then((res) => {
					console.log(res)
					this.value1=new Date(res.activity.start_time);
					this.value4=new Date(res.activity.end_time);
					this.value5=new Date(res.activity.exchange_start_time);
					this.value6=new Date(res.activity.exchange_end_time);
					this.adminid=res.activity.id;
					this.surplus=res.activity.bargain_gift.surplus;
					this.prizeclassification=res.activity.bargain_gift.gift;
					console.log(this.surplus)
//					this.$refs.moneysave_chid.check_sub(this.adminid)
				}).catch((err) => {
					console.log(err)
					this.$message.error('该活动信息有误');
				})  		
	      	},
	      	//发送信息到iframe
	      	setMessage(type){
				parent.postMessage(type, process.env.VUE_APP_EDITOR);
				// parent.postMessage(type, 'http://localhost:8081/#/');
			},
	      	//传参日期格式化
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
			chose_navigation(index){
				this.radio=index
			},
		},
//		watch:{
//			checktype(newValuem,oldValue){
//				if(newValuem==2){
//					this.edit=1;
//				}
//			},
//			
//		}
	}
</script>

<style>
</style>