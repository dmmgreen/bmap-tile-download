<template>
  <div class="flex-box">
    <div class="left">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="下载线程数" prop="threads">
          <el-input v-model="form.threads"></el-input>
        </el-form-item>
        <el-form-item label="瓦片保存路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="文件拓展名">
          <el-input v-model="form.ext"></el-input>
        </el-form-item>
        <el-form-item label="左上角经纬度">
          <el-input v-model="form.leftTop">
            <template #append>
              <el-button @click="choose('leftTop')">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="右下角经纬度">
          <el-input v-model="form.rightBottom">
            <template #append>
              <el-button @click="choose('rightBottom')">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="瓦片最小级别" prop="minLevel">
          <el-select v-model="form.minLevel" placeholder="请选择瓦片最小级别" @change="initMap">
            <el-option v-for="index in levelLen" :label="index" :value="index" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="瓦片最大级别" prop="maxLevel">
          <el-select v-model="form.maxLevel" placeholder="请选择瓦片最大级别">
            <el-option v-for="index in levelLen" :label="index" :value="index" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地图风格">
          <el-select v-model="form.customid" placeholder="请选择地图风格">
            <el-option label="常规" value="normal"></el-option>
            <el-option label="清新蓝风格" value="light"></el-option>
            <el-option label="黑夜风格" value="dark"></el-option>
            <el-option label="自然绿风格" value="grassgreen"></el-option>
            <el-option label="午夜蓝风格" value="midnight"></el-option>
            <el-option label="浪漫粉风格" value="pink"></el-option>
            <el-option label="清新蓝绿风格" value="bluish"></el-option>
            <el-option label="高端灰风格" value="grayscale"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义样式">
          <el-input type="textarea" v-model="form.style" :rows="10"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即下载</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <div id="MapHolder"></div>
    </div>
  </div>
</template>
<script>
import {downFunc} from '@/api'
import mapstyle from '@/assets/mapstyle.json'
let BMap ={}
export default {
  name: 'HelloWorld',
  data(){
    var validateMinLevel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择瓦片层级'));
        } else if (value > this.form.maxLevel) {
          callback(new Error('瓦片最小级别不能大于瓦片最大级别'));
        } else {
          callback();
        }
      };
    var validateMaxLevel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择瓦片层级'));
        } else if (value < this.form.minLevel) {
          callback(new Error('瓦片最大级别不能小于瓦片最小级别'));
        } else {
          callback();
        }
      };
    return {
      map:null,
      levelLen:19,
      point:{},
      type:'',
      form:{
          threads :  1000,
          ak: '',//日均量不要超过2000
          seckey: 'YTCl0WlaqaWIR+AqW6atCE/W6tc7C6MnTskgcKfgq+E=,HiMMnx_9vYRX1aFqWLchiAvA0Cu7zt2f5HzYMc5GBwy4q1QwFby_P7-3qGzSaPW_-X1oDf264ADLY99R_BUOB9yW05mJygpkAE4adVDoucbPVJ0dEedd27YoQzJeciCcSEs7j-gSzJmHrCa5OVQXxiW2Z3LwRDAg6vCZrGzS5Vfc7chUZpN-vOYONL4d8UUw',
          path :  './tiles',
          ext :  'png',
          minLevel :  15,
          maxLevel :  15,
          leftTop:'117.766529,24.862675',
          rightBottom:'118.623153,24.291686',
          customid: 'midnight',
          style: "t:land|e:g|c:#08090dff,t:manmade|e:g|c:#08090dff,t:water|e:g|c:#1c212cff,t:road|e:g.f|c:#242e41ff,t:road|e:g.s|c:#252e41ff,t:label|e:l.t.f|c:#657392ff,t:label|e:l.t.s|c:#1c212cff|w:3,t:poi|e:l.t.f|c:#657392ff,t:poi|e:l.t.s|c:#1c212cff|w:3,t:subway|e:g|v:off,t:railway|e:g|v:off,t:poi|e:l.i|v:off,t:subwaylabel|e:l|v:off,t:subwaylabel|e:l.i|v:off,t:tertiarywaysign|e:l|v:off,t:tertiarywaysign|e:l.i|v:off,t:provincialwaysign|e:l.i|v:off,t:provincialwaysign|e:l|v:off,t:nationalwaysign|e:l.i|v:off,t:nationalwaysign|e:l|v:off,t:highwaysign|e:l.i|v:off,t:highwaysign|e:l|v:off,t:green|e:g|c:#262b38ff,t:nationalwaysign|e:l.t.f|c:#08090dff,t:nationalwaysign|e:l.t.s|c:#ffffffff,t:city|e:l|v:on,t:city|e:l.i|v:off,t:city|e:l.t.f|c:#657392ff,t:city|e:l.t.s|c:#1c212cff,t:water|e:l.t.f|c:#657392ff,t:water|e:l.t.s|c:#08090dff,t:local|e:g.f|c:#232b3cff,t:local|e:g.s|c:#ffffff00,t:fourlevelway|e:g.f|c:#232b3cff,t:fourlevelway|e:g.s|c:#ffffff00,t:tertiaryway|e:g.f|c:#232b3cff,t:tertiaryway|e:g.s|c:#ffffff00,t:tertiaryway|e:l.t.f|c:#4e5b75ff,t:fourlevelway|e:l.t.f|c:#576581ff,t:highway|e:l.t.f|c:#576581ff,t:highway|e:g.f|c:#242e41ff,t:highway|e:g.s|c:#252e41ff,t:provincialway|e:g.f|c:#242e41ff,t:provincialway|e:g.s|c:#252e41ff,t:tertiaryway|e:l.t.s|c:#242e41ff,t:fourlevelway|e:l.t.s|c:#242e41ff,t:highway|e:l.t.s|c:#242e41ff,t:nationalway|e:l.t.s|c:#242e41ff,t:nationalway|e:l.t.f|c:#576581ff,t:nationalway|e:g.f|c:#242e41ff,t:nationalway|e:g.s|c:#252e41ff,t:cityhighway|e:g.f|c:#242e41ff,t:cityhighway|e:g.s|c:#252e41ff,t:arterial|e:g.f|c:#242e41ff,t:arterial|e:g.s|c:#252e41fa,t:medicallabel|e:l|v:off,t:medicallabel|e:l.i|v:off,t:entertainmentlabel|e:l|v:off,t:entertainmentlabel|e:l.i|v:off,t:estatelabel|e:l|v:off,t:estatelabel|e:l.i|v:off,t:businesstowerlabel|e:l|v:off,t:businesstowerlabel|e:l.i|v:off,t:companylabel|e:l|v:off,t:companylabel|e:l.i|v:off,t:governmentlabel|e:l|v:off,t:governmentlabel|e:l.i|v:off,t:restaurantlabel|e:l|v:off,t:restaurantlabel|e:l.i|v:off,t:hotellabel|e:l|v:off,t:hotellabel|e:l.i|v:off,t:shoppinglabel|e:l|v:off,t:shoppinglabel|e:l.i|v:off,t:lifeservicelabel|e:l|v:off,t:lifeservicelabel|e:l.i|v:off,t:carservicelabel|e:l|v:off,t:carservicelabel|e:l.i|v:off,t:financelabel|e:l|v:off,t:financelabel|e:l.i|v:off,t:otherlabel|e:l|v:off,t:otherlabel|e:l.i|v:off,t:airportlabel|e:l|v:on,t:airportlabel|e:l.t.f|c:#5d6a87ff,t:airportlabel|e:l.t.s|c:#1c212cff,t:airportlabel|e:l.i|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:provincialway|e:g|v:off,t:provincialway|e:g|v:off,t:provincialway|e:l|v:off,t:provincialway|e:l|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:arterial|e:g|v:off,t:arterial|e:g|v:off,t:arterial|e:l|v:off,t:arterial|e:l|v:off,t:building|e:undefined|c:#2a3341ff,t:building|e:undefined|c:#313b4cff,t:building|e:g.s|c:#1a212eff,t:road|e:l.t.f|c:#576581ff,t:road|e:l.t.s|c:#242e41ff,t:provincialway|e:l.t.f|c:#576581ff,t:cityhighway|e:l.t.f|c:#576581ff,t:arterial|e:l.t.f|c:#576581ff,t:provincialway|e:l.t.s|c:#242e41ff,t:cityhighway|e:l.t.s|c:#242e41ff,t:arterial|e:l.t.s|c:#242e41ff,t:local|e:l|v:off,t:manmade|e:l.t.f|c:#657392ff,t:manmade|e:l.t.s|c:#1c212cff,t:subwaystation|e:g|v:off,t:transportationlabel|e:l.i|v:off,t:transportationlabel|e:l|v:off,t:estate|e:g|c:#2a3341ff,t:subway|e:l|v:off,t:subway|e:l.i|v:off"        
      },
      rules:{
        minLevel:[
          {validator:validateMinLevel,trigger:'change'}
        ],
        maxLevel:[
          {validator:validateMaxLevel,trigger:'change'}
        ]
      }
    }
  },
  methods:{
    initMap() {
        const that = this
        BMap = window.BMap
        this.map = new BMap.Map("MapHolder", {enableMapClick: false});
        this.map.centerAndZoom('厦门',that.form.minLevel)
        this.map.setMapStyle({styleJson:mapstyle})
        this.map.addEventListener('click',(c)=>{
          var b = c.point;
          if (c.overlay && c.overlay instanceof BMap.Marker) {
              b = c.overlay.point
          }
          that.point = b
          if(that.type){
             that.form[that.type] = b.lng + ',' + b.lat
          }
        })
    },
    choose(key){
      this.type = key
    },
    async onSubmit(){
      let leftTop = this.form.leftTop.split(',')
      let rightBottom = this.form.rightBottom.split(',')
      const params ={
        ...this.form,
        x1:leftTop[0],
        y1:leftTop[1],
        x2:rightBottom[0],
        y2:rightBottom[1]
      }
      let rs = await downFunc(params)
      console.log(rs,'rs')
    }
  },
  mounted(){
    this.initMap()
  }
}
</script>

<style scoped>
.flex-box{
  width: 100%;
  height: 1024px;
  display: flex;
  align-content: stretch;
}
.left{
  width: 450px;
  flex-shrink: 0;
  box-sizing: border-box;
  padding:30px;
}
.right{
  flex-basis: auto;
  width: 100%;
}
#MapHolder{
  width: 100%;
  height: 100%;
}
</style>