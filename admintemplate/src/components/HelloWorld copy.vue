<template>
  <div>
    <div>
      <span v-for="item in (this.xend- this.xstart)" :key="item" style="display:inline-block;margin-right:20px;cursor:pointer;" @click="clickX(item)">{{Number(item)+this.xstart}}</span>
    </div>
    <div>
      x:
      <input type="text" v-model="x" />
      <div @click="addX">增加x+1</div>
    </div>
     <div>
      ystart:
      <input type="text" v-model="ystart" />
    </div>
     <div>
      yend:
      <input type="text" v-model="yend" />
    </div>
    <div>
      层级:
      <input type="text" v-model="zoom" />
    </div>
    <div @click="downClick">
      下载百度地图
    </div>
  </div>
</template>
<script>
import {downFunc} from '@/api'
import qs from 'qs'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    const ystart= 2700
    const xstart = 12840
    return {
      x:xstart,
      xstart:xstart,
      xend:12860,
      ystart:ystart,
      yend:2750,
      y:ystart,
      zoom:16,
      modules:{
        map: "knpfsh",
        common: "jlxvtp",
        style: "b5uguy",
        tile: "bauk44",
        vectordrawlib: "1c4yrv",
        newvectordrawlib: "fdkcbk",
        groundoverlay: "zss5l3",
        pointcollection: "z3ltdf",
        marker: "svsyag",
        symbol: "lnxio2",
        canvablepath: "dshrx4",
        vmlcontext: "cydzw2",
        markeranimation: "z4pkfi",
        poly: "201pkh",
        draw: "xhbwef",
        drawbysvg: "33qhfd",
        drawbyvml: "w3clpk",
        drawbycanvas: "4v4300",
        infowindow: "aebmuu",
        oppc: "0gpw55",
        opmb: "0ptx5z",
        menu: "otbrtk",
        control: "lsi442",
        navictrl: "vqfcua",
        geoctrl: "4xgbm1",
        copyrightctrl: "rmm2uo",
        citylistcontrol: "0gq51b",
        scommon: "310v5f",
        local: "q44g0v",
        route: "ira1u5",
        othersearch: "gzlmbk",
        mapclick: "mhmlxd",
        buslinesearch: "m50r3e",
        hotspot: "s03sdj",
        autocomplete: "y5depp",
        coordtrans: "srsuz1",
        coordtransutils: "q2wska",
        convertor: "okhx3z",
        clayer: "z0ke1t",
        pservice: "wsxl3a",
        pcommon: "lsbofj",
        panorama: "hde3m0",
        panoramaflash: "2glbbj",
        vector: "abjscu"
      }
    }
  },
  // watch:{
  //   ystart(val){
  //       this.yend = Number(val) +20
  //   },
  //   yend(val){
  //       this.ystart = Number(val) -20
  //   }
  // },
  methods:{
    async downLoad(site){
      let now = new Date();
      let udt = now.getFullYear()+''+(now.getMonth()<9?('0'+(now.getMonth()+1)):(now.getMonth()+1))+''+now.getDate()
      let params = {
          qt:'customimage',
          udt:udt,
          scale:1,
          ...site,
          ak: 'syRCKICa5EimeW6hyK2TaKEehaUrudiE',
          v: 2.1,
          seckey: 'YTCl0WlaqaWIR+AqW6atCE/W6tc7C6MnTskgcKfgq+E=,HiMMnx_9vYRX1aFqWLchiAvA0Cu7zt2f5HzYMc5GBwy4q1QwFby_P7-3qGzSaPW_-X1oDf264ADLY99R_BUOB9yW05mJygpkAE4adVDoucbPVJ0dEedd27YoQzJeciCcSEs7j-gSzJmHrCa5OVQXxiW2Z3LwRDAg6vCZrGzS5Vfc7chUZpN-vOYONL4d8UUw',
          timeStamp: now.getTime(),
          sign: '453cfcd32c8d',
          styles: "t:land|e:g|c:#08090dff,t:manmade|e:g|c:#08090dff,t:water|e:g|c:#1c212cff,t:road|e:g.f|c:#242e41ff,t:road|e:g.s|c:#252e41ff,t:label|e:l.t.f|c:#657392ff,t:label|e:l.t.s|c:#1c212cff|w:3,t:poi|e:l.t.f|c:#657392ff,t:poi|e:l.t.s|c:#1c212cff|w:3,t:subway|e:g|v:off,t:railway|e:g|v:off,t:poi|e:l.i|v:off,t:subwaylabel|e:l|v:off,t:subwaylabel|e:l.i|v:off,t:tertiarywaysign|e:l|v:off,t:tertiarywaysign|e:l.i|v:off,t:provincialwaysign|e:l.i|v:off,t:provincialwaysign|e:l|v:off,t:nationalwaysign|e:l.i|v:off,t:nationalwaysign|e:l|v:off,t:highwaysign|e:l.i|v:off,t:highwaysign|e:l|v:off,t:green|e:g|c:#262b38ff,t:nationalwaysign|e:l.t.f|c:#08090dff,t:nationalwaysign|e:l.t.s|c:#ffffffff,t:city|e:l|v:on,t:city|e:l.i|v:off,t:city|e:l.t.f|c:#657392ff,t:city|e:l.t.s|c:#1c212cff,t:water|e:l.t.f|c:#657392ff,t:water|e:l.t.s|c:#08090dff,t:local|e:g.f|c:#232b3cff,t:local|e:g.s|c:#ffffff00,t:fourlevelway|e:g.f|c:#232b3cff,t:fourlevelway|e:g.s|c:#ffffff00,t:tertiaryway|e:g.f|c:#232b3cff,t:tertiaryway|e:g.s|c:#ffffff00,t:tertiaryway|e:l.t.f|c:#4e5b75ff,t:fourlevelway|e:l.t.f|c:#576581ff,t:highway|e:l.t.f|c:#576581ff,t:highway|e:g.f|c:#242e41ff,t:highway|e:g.s|c:#252e41ff,t:provincialway|e:g.f|c:#242e41ff,t:provincialway|e:g.s|c:#252e41ff,t:tertiaryway|e:l.t.s|c:#242e41ff,t:fourlevelway|e:l.t.s|c:#242e41ff,t:highway|e:l.t.s|c:#242e41ff,t:nationalway|e:l.t.s|c:#242e41ff,t:nationalway|e:l.t.f|c:#576581ff,t:nationalway|e:g.f|c:#242e41ff,t:nationalway|e:g.s|c:#252e41ff,t:cityhighway|e:g.f|c:#242e41ff,t:cityhighway|e:g.s|c:#252e41ff,t:arterial|e:g.f|c:#242e41ff,t:arterial|e:g.s|c:#252e41fa,t:medicallabel|e:l|v:off,t:medicallabel|e:l.i|v:off,t:entertainmentlabel|e:l|v:off,t:entertainmentlabel|e:l.i|v:off,t:estatelabel|e:l|v:off,t:estatelabel|e:l.i|v:off,t:businesstowerlabel|e:l|v:off,t:businesstowerlabel|e:l.i|v:off,t:companylabel|e:l|v:off,t:companylabel|e:l.i|v:off,t:governmentlabel|e:l|v:off,t:governmentlabel|e:l.i|v:off,t:restaurantlabel|e:l|v:off,t:restaurantlabel|e:l.i|v:off,t:hotellabel|e:l|v:off,t:hotellabel|e:l.i|v:off,t:shoppinglabel|e:l|v:off,t:shoppinglabel|e:l.i|v:off,t:lifeservicelabel|e:l|v:off,t:lifeservicelabel|e:l.i|v:off,t:carservicelabel|e:l|v:off,t:carservicelabel|e:l.i|v:off,t:financelabel|e:l|v:off,t:financelabel|e:l.i|v:off,t:otherlabel|e:l|v:off,t:otherlabel|e:l.i|v:off,t:airportlabel|e:l|v:on,t:airportlabel|e:l.t.f|c:#5d6a87ff,t:airportlabel|e:l.t.s|c:#1c212cff,t:airportlabel|e:l.i|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:provincialway|e:g|v:off,t:provincialway|e:g|v:off,t:provincialway|e:l|v:off,t:provincialway|e:l|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:arterial|e:g|v:off,t:arterial|e:g|v:off,t:arterial|e:l|v:off,t:arterial|e:l|v:off,t:building|e:undefined|c:#2a3341ff,t:building|e:undefined|c:#313b4cff,t:building|e:g.s|c:#1a212eff,t:road|e:l.t.f|c:#576581ff,t:road|e:l.t.s|c:#242e41ff,t:provincialway|e:l.t.f|c:#576581ff,t:cityhighway|e:l.t.f|c:#576581ff,t:arterial|e:l.t.f|c:#576581ff,t:provincialway|e:l.t.s|c:#242e41ff,t:cityhighway|e:l.t.s|c:#242e41ff,t:arterial|e:l.t.s|c:#242e41ff,t:local|e:l|v:off,t:manmade|e:l.t.f|c:#657392ff,t:manmade|e:l.t.s|c:#1c212cff,t:subwaystation|e:g|v:off,t:transportationlabel|e:l.i|v:off,t:transportationlabel|e:l|v:off,t:estate|e:g|c:#2a3341ff,t:subway|e:l|v:off,t:subway|e:l.i|v:off"
      }
      let urls='http://mapapip2.bdimg.com/customimage/tile?'
      urls += qs.stringify(params, { indices: false })
      await downFunc({
        ...site,
        urls:urls
      }).then(response=>{
        console.log(response,'下载成功!')
        if(this.y<this.yend){
            this.y = this.y +1
            this.downLoad({
                  x: Number(this.x),
                  y: Number(this.y),
                  z: Number(this.zoom)
            })
        }else{
          alert('下载全部完毕')
        }
      }).catch(()=>{
        console.log('失败')
      })
    },
    downClick() {
      this.y = this.ystart
      this.downLoad({
            x: Number(this.x),
            y: Number(this.y),
            z: Number(this.zoom)
      })
    },
    clickX(item){
      this.x = Number(item) +this.xstart
      this.downClick()
    },
    addX(){
      this.x = Number(this.x) +1
      this.downClick()
    }
  }
}
</script>