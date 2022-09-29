// ; threads: 下载线程数
// ; path：瓦片保存路径
// ; ext：文件扩展名，不建议修改，因为下载下来的都是png文件，强行修改扩展名可能导致有的程序无法读取
// ; minLevel：瓦片最小级别
// ; maxLevel：瓦片最大级别
// ; leftTop：地图左上角经纬度
// ; rightBottom：地图右下角经纬度
// ; customid：地图风格，可选值有常规地图样式(normal)、清新蓝风格(light)、黑夜风格(dark)、自然绿风格(grassgreen)、午夜蓝风格(midnight)、浪漫粉风格(pink)、清新蓝绿风格(bluish)、高端灰风格(grayscale)
// ; style: 自定义样式，因为有一些特殊字符，需要加引号


module.exports ={
    threads :  1000,
    ak: 'syRCKICa5EimeW6hyK2TaKEehaUrudiE',
    seckey: 'YTCl0WlaqaWIR+AqW6atCE/W6tc7C6MnTskgcKfgq+E=,HiMMnx_9vYRX1aFqWLchiAvA0Cu7zt2f5HzYMc5GBwy4q1QwFby_P7-3qGzSaPW_-X1oDf264ADLY99R_BUOB9yW05mJygpkAE4adVDoucbPVJ0dEedd27YoQzJeciCcSEs7j-gSzJmHrCa5OVQXxiW2Z3LwRDAg6vCZrGzS5Vfc7chUZpN-vOYONL4d8UUw',
    path :  './tiles',
    ext :  'png',
    minLevel :  15,
    maxLevel :  15,
    x1 :  '117.766529',
    y1:'24.862675',
    x2 : '118.623153',
    y2:'24.291686',
    customid: 'midnight',
    style: "t:land|e:g|c:#08090dff,t:manmade|e:g|c:#08090dff,t:water|e:g|c:#1c212cff,t:road|e:g.f|c:#242e41ff,t:road|e:g.s|c:#252e41ff,t:label|e:l.t.f|c:#657392ff,t:label|e:l.t.s|c:#1c212cff|w:3,t:poi|e:l.t.f|c:#657392ff,t:poi|e:l.t.s|c:#1c212cff|w:3,t:subway|e:g|v:off,t:railway|e:g|v:off,t:poi|e:l.i|v:off,t:subwaylabel|e:l|v:off,t:subwaylabel|e:l.i|v:off,t:tertiarywaysign|e:l|v:off,t:tertiarywaysign|e:l.i|v:off,t:provincialwaysign|e:l.i|v:off,t:provincialwaysign|e:l|v:off,t:nationalwaysign|e:l.i|v:off,t:nationalwaysign|e:l|v:off,t:highwaysign|e:l.i|v:off,t:highwaysign|e:l|v:off,t:green|e:g|c:#262b38ff,t:nationalwaysign|e:l.t.f|c:#08090dff,t:nationalwaysign|e:l.t.s|c:#ffffffff,t:city|e:l|v:on,t:city|e:l.i|v:off,t:city|e:l.t.f|c:#657392ff,t:city|e:l.t.s|c:#1c212cff,t:water|e:l.t.f|c:#657392ff,t:water|e:l.t.s|c:#08090dff,t:local|e:g.f|c:#232b3cff,t:local|e:g.s|c:#ffffff00,t:fourlevelway|e:g.f|c:#232b3cff,t:fourlevelway|e:g.s|c:#ffffff00,t:tertiaryway|e:g.f|c:#232b3cff,t:tertiaryway|e:g.s|c:#ffffff00,t:tertiaryway|e:l.t.f|c:#4e5b75ff,t:fourlevelway|e:l.t.f|c:#576581ff,t:highway|e:l.t.f|c:#576581ff,t:highway|e:g.f|c:#242e41ff,t:highway|e:g.s|c:#252e41ff,t:provincialway|e:g.f|c:#242e41ff,t:provincialway|e:g.s|c:#252e41ff,t:tertiaryway|e:l.t.s|c:#242e41ff,t:fourlevelway|e:l.t.s|c:#242e41ff,t:highway|e:l.t.s|c:#242e41ff,t:nationalway|e:l.t.s|c:#242e41ff,t:nationalway|e:l.t.f|c:#576581ff,t:nationalway|e:g.f|c:#242e41ff,t:nationalway|e:g.s|c:#252e41ff,t:cityhighway|e:g.f|c:#242e41ff,t:cityhighway|e:g.s|c:#252e41ff,t:arterial|e:g.f|c:#242e41ff,t:arterial|e:g.s|c:#252e41fa,t:medicallabel|e:l|v:off,t:medicallabel|e:l.i|v:off,t:entertainmentlabel|e:l|v:off,t:entertainmentlabel|e:l.i|v:off,t:estatelabel|e:l|v:off,t:estatelabel|e:l.i|v:off,t:businesstowerlabel|e:l|v:off,t:businesstowerlabel|e:l.i|v:off,t:companylabel|e:l|v:off,t:companylabel|e:l.i|v:off,t:governmentlabel|e:l|v:off,t:governmentlabel|e:l.i|v:off,t:restaurantlabel|e:l|v:off,t:restaurantlabel|e:l.i|v:off,t:hotellabel|e:l|v:off,t:hotellabel|e:l.i|v:off,t:shoppinglabel|e:l|v:off,t:shoppinglabel|e:l.i|v:off,t:lifeservicelabel|e:l|v:off,t:lifeservicelabel|e:l.i|v:off,t:carservicelabel|e:l|v:off,t:carservicelabel|e:l.i|v:off,t:financelabel|e:l|v:off,t:financelabel|e:l.i|v:off,t:otherlabel|e:l|v:off,t:otherlabel|e:l.i|v:off,t:airportlabel|e:l|v:on,t:airportlabel|e:l.t.f|c:#5d6a87ff,t:airportlabel|e:l.t.s|c:#1c212cff,t:airportlabel|e:l.i|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:highway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:g|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:nationalway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:highway|e:l|v:off,t:provincialway|e:g|v:off,t:provincialway|e:g|v:off,t:provincialway|e:l|v:off,t:provincialway|e:l|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:g|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:cityhighway|e:l|v:off,t:arterial|e:g|v:off,t:arterial|e:g|v:off,t:arterial|e:l|v:off,t:arterial|e:l|v:off,t:building|e:undefined|c:#2a3341ff,t:building|e:undefined|c:#313b4cff,t:building|e:g.s|c:#1a212eff,t:road|e:l.t.f|c:#576581ff,t:road|e:l.t.s|c:#242e41ff,t:provincialway|e:l.t.f|c:#576581ff,t:cityhighway|e:l.t.f|c:#576581ff,t:arterial|e:l.t.f|c:#576581ff,t:provincialway|e:l.t.s|c:#242e41ff,t:cityhighway|e:l.t.s|c:#242e41ff,t:arterial|e:l.t.s|c:#242e41ff,t:local|e:l|v:off,t:manmade|e:l.t.f|c:#657392ff,t:manmade|e:l.t.s|c:#1c212cff,t:subwaystation|e:g|v:off,t:transportationlabel|e:l.i|v:off,t:transportationlabel|e:l|v:off,t:estate|e:g|c:#2a3341ff,t:subway|e:l|v:off,t:subway|e:l.i|v:off"        
}