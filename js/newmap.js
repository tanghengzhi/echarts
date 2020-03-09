var geoCoordMap = {
    "欢乐世界": [117.127982,34.234232],
    '糖果世界': [117.130387,34.235391],
    '欢乐水世界': [117.131404,34.23463],
    "广场": [117.130453,34.234139],
    "停车场所":[117.131459,34.23271],
    "1#厕所":[117.127547,34.233762],
    "2#厕所":[117.128396,34.233091],
    "3#厕所":[117.129537,34.233986],
    "4#厕所":[117.129339,34.23456],
    "5#厕所":[117.128593,34.235172]
};

var parkData = [
    {
        name: '欢乐世界',
        value: 100
    },
    {
        name: '糖果世界',
        value: 100,

    },
    {
        name: '欢乐水世界',
        value: 100
    },
    {
        name: '广场',
        value: 100
    },
    {
        name: '停车场所',
        value: 100
    }
];
var toiletData = [
    {
        name: '1#厕所',
        value: 50,
        tooltip: '剩余蹲位：20<br />正在使用：10<br />第三卫生间：占用<br />————————<br />温度：20<br />湿度:60%<br />空气质量：优'
    },
    {
        name: '2#厕所',
        value: 50,
        tooltip: '剩余蹲位：20<br />正在使用：10<br />第三卫生间：占用<br />————————<br />温度：20<br />湿度:60%<br />空气质量：优'
    },
    {
        name: '3#厕所',
        value: 50,
        tooltip: '剩余蹲位：20<br />正在使用：10<br />第三卫生间：占用<br />————————<br />温度：20<br />湿度:60%<br />空气质量：优'
    },
    {
        name: '4#厕所',
        value: 50,
        tooltip: '剩余蹲位：20<br />正在使用：10<br />第三卫生间：占用<br />————————<br />温度：20<br />湿度:60%<br />空气质量：优'
    },
    {
        name: '5#厕所',
        value: 50,
        tooltip: '剩余蹲位：20<br />正在使用：10<br />第三卫生间：占用<br />————————<br />温度：20<br />湿度:60%<br />空气质量：优'
    },
];

var color = ['#3ed4ff', '#ffa022'];
var series = [];
[
    ['徐州乐园', parkData],
    ['卫生间', toiletData]
].forEach(function (item, i) {
    series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
            normal: {
                color: color[i]
            }
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem.name,
                value: geoCoordMap[dataItem.name].concat([dataItem.value]),
                tooltip: dataItem.tooltip
            };
        })
    });
});

option = {
    backgroundColor: '#080a20',
    title: {
        left: 'left',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    geo: {
        map: 'park',
        zoom: 1.2,
        label: {
            emphasis: {
                show: false
            }
        },
        //roam: true,
        itemStyle: {
            normal: {
                areaColor: '#142957',
                borderColor: '#0692a4'
            },
            emphasis: {
                areaColor: '#0b1c2d'
            }
        }
    },
    series: series
};

$.get('data/park.json', function (json) {
    echarts.registerMap('park', json);
    var myecharts = echarts.init($('.map .geo')[0])
    myecharts.setOption(option)
})