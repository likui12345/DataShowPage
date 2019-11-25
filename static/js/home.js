$(document).ready(function() {
    const lineStyle = {
            color: '#1e3f75'
        }
        // 坐标轴样式 文字
    const axisLabel = {
            color: '#8B99E0',
            lineHeight: 20,
            interval: 0
        }
        // 坐标轴刻度
    const axisTick = {
            show: false,
            alignWithLabel: true,
            lineStyle: lineStyle
        }
        // 区域内分割线样式
    const splitLineStyle = {
            show: true,
            lineStyle: {
                color: 'rgba(30,63,117,.5)'
            }
        }
        // 坐标轴线相关设置  坐标轴轴线
    const axisLineStyle = {
            lineStyle: lineStyle
        }
        // 敏感数据数量平滑趋势
    const senData = [{
            day: '01',
            value: 10202
        },
        {
            day: '03',
            value: 10024
        },
        {
            day: '05',
            value: 10345
        },
        {
            day: '07',
            value: 10745
        },
        {
            day: '09',
            value: 10567
        },
        {
            day: '11',
            value: 10465
        },
        {
            day: '13',
            value: 10789
        },
        {
            day: '15',
            value: 10079
        },
        {
            day: '17',
            value: 10456
        },
        {
            day: '19',
            value: 10045
        },
        {
            day: '21',
            value: 10464
        },
        {
            day: '23',
            value: 10756
        },
        {
            day: '25',
            value: 10045
        },
        {
            day: '27',
            value: 10056
        },
        {
            day: '29',
            value: 10056
        },
        {
            day: '31',
            value: 10098
        }
    ]
    const senDataTrendOptions = {
        title: {
            text: '时间段： 2019.9.16-2019.10.16',
            left: 'center',
            textStyle: {
                color: '#51B4FF',
                fontSize: 12,
                lineHeight: 30,
                fontWeight: 300
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}日 : {c}'
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '3%',
            top: 40,
            containLabel: true
        },
        legend: {
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: splitLineStyle,
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel,
            data: senData.map(item => item.day)
        },
        yAxis: {
            type: 'value',
            scale: true,
            splitLine: splitLineStyle,
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel
        },
        series: [{
            name: '',
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                color: '#33A0F5'
            },
            data: senData.map(item => item.value)
        }]
    }

    const senDataTrendChart = echarts.init(
        document.getElementById('senDataTrendChart')
    )
    senDataTrendChart.setOption(senDataTrendOptions)
        //事件
    senDataTrendChart.on('click', function(params) {})

    // 企业敏感数据量TOP5
    let companySenData = [{
            name: '网页',
            data: {
                top01: 45,
                top02: 51,
                top04: 5,
                top03: 78,
                top05: 65
            }
        },
        {
            name: '文件',
            data: {
                top01: 4,
                top02: 52,
                top04: 15,
                top03: 46,
                top05: 76
            }
        },
        {
            name: '接口',
            data: {
                top01: 11,
                top02: 45,
                top04: 56,
                top03: 15,
                top05: 76
            }
        }
    ]
    companySenData = initCompanySenData(_.cloneDeep(companySenData))
    const companySenDataOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            itemWidth: 20,
            itemHeight: 12,
            textStyle: axisLabel,
            data: companySenData.legendData
        },
        color: ['#FF9421', '#F86362', '#8B71F7'],
        grid: {
            left: '2%',
            right: '3%',
            bottom: '3%',
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(30,63,117,.5)'
                }
            },
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel,
            data: companySenData.yAxis
        },
        series: companySenData
    }

    const companySenDataChart = echarts.init(
        document.getElementById('companySenChart')
    )
    companySenDataChart.setOption(companySenDataOptions)
        //事件
    companySenDataChart.on('click', function(params) {})

    function initCompanySenData(data) {
        const dataCounts = {}
        data.legendData = []
        _.map(data, function(a) {
            _.map(a.data, function(b, k) {
                dataCounts[k] = dataCounts[k] == undefined ? b : dataCounts[k] + b
            })
        })
        const yAxis = _.chain(dataCounts)
            .map(function(value, key) {
                return {
                    key: key,
                    value: value
                }
            })
            .sortBy(function(value) {
                return -value.value
            })
            .value()

        _.map(data, function(a) {
            a.barWidth = 10
            a.stack = true
            a.type = 'bar'
            data.legendData.push(a.name)
            a.data = _.map(yAxis, function(data) {
                return a.data[data.key]
            })
        })
        data.yAxis = _.map(yAxis, val => val.key)
        return data
    }

    // 数据价值占比
    const dataValueDs = [{
            value: 50,
            name: '高价值 48.68% ',
            legend: true // 是否在legend中展示
        },
        {
            value: 10,
            name: 'rose2'
        },
        {
            value: 20,
            name: 'rose1'
        },
        {
            value: 30,
            name: '低价值 26.56%',
            legend: true
        },
        {
            value: 40,
            name: '中价值 35.68%',
            legend: true
        }
    ];
    const dataValueOption = {
        color: ['#91e7d0', '#d1b4e0', '#fa9588', '#ffe1a0', '#d4e8ae'],
        graphic: [{
                type: 'image',
                style: {
                    image: './static/imgs/high_tip_icon.png',
                    height: 12,
                    width: 12,
                    x: 360,
                    y: 88
                },
                onmouseover: function() {
                    $(".banner .box-tip .data-value").show();
                },
                onmouseout: function() {
                    $(".banner .box-tip .data-value").hide();
                }
            },
            {
                type: 'image',
                style: {
                    image: './static/imgs/midium_tip_icon.png',
                    height: 12,
                    width: 12,
                    x: 360,
                    y: 118
                },
                onmouseover: function() {
                    $(".banner .box-tip .sen-data").show();
                },
                onmouseout: function() {
                    $(".banner .box-tip .sen-data").hide();
                }
            },
            {
                type: 'image',
                style: {
                    image: './static/imgs/low_tip_icon.png',
                    height: 12,
                    width: 12,
                    x: 360,
                    y: 148
                },
                onmouseover: function() {
                    $(".banner .box-tip .data-influence").show();
                },
                onmouseout: function() {
                    $(".banner .box-tip .data-influence").hide();
                }
            }
        ],
        title: [{
            text: '数据价值占比',
            x: 238,
            y: 44,
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#4fb5fb'
            }
        }],
        legend: {
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 14,
            orient: 'vertical',
            x: '238',
            y: '84',
            data: dataValueDs.map((item) => item.legend && item.name),
            textStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: ['#91e7d0', '#d4e8ae', '#ffe1a0']
            },
            itemGap: 16
        },
        series: [{
            name: '半径模式', //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'pie', //饼状图
            radius: [28, 78], //饼图的半径，（内半径 和 外半径）
            center: ['26%', '50%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            roseType: 'radius', //扇区圆心角展现数据的百分比，半径展现数据的大小。
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false //hover的提示描述
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            data: dataValueDs,
            itemStyle: {
                normal: {
                    borderColor: '#081D40',
                    borderWidth: 2
                }
            }
        }]
    }

    const dataValueChart = echarts.init(document.getElementById('dataValue'))
    dataValueChart.setOption(dataValueOption)

    // 敏感数据占比
    const senDataDs = [{
            value: 50,
            name: 'Cahingarp04'
        },
        {
            value: 40,
            name: 'Cahingarp05'
        },
        {
            value: 50,
            name: 'Cahingarp01'
        },
        {
            value: 51,
            name: 'Cahingarp02'
        },
        {
            value: 40,
            name: 'Cahingarp03'
        }
    ];
    const senDataOption = {
        color: ['#f97458', '#f5f1ed', '#2cb9c9', '#56d1df', '#83dfe9'],
        title: [{
            text: '敏感数据占比',
            x: 250,
            y: 42,
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#4fb5fb'
            }
        }],
        legend: {
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 12,
            orient: 'vertical',
            x: '250',
            y: '72',
            data: senDataDs.map((item) => item.name),
            textStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#7281bf'
            },
            itemGap: 8
        },
        series: [{
            name: '半径模式', //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'pie', //饼状图
            radius: [28, 78], //饼图的半径，（内半径 和 外半径）
            center: ['28%', '50%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            roseType: 'radius', //扇区圆心角展现数据的百分比，半径展现数据的大小。
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false //hover的提示描述
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            data: senDataDs,
            itemStyle: {
                normal: {
                    borderColor: '#081D40',
                    borderWidth: 2
                }
            }
        }]
    }
    const senDataChart = echarts.init(document.getElementById('senData'))
    senDataChart.setOption(senDataOption)
        // 影响力分布
    const dataInfluenceDs = [{
            value: 50,
            name: 'top01  xxxxxx  38.69%'
        },
        {
            value: 10,
            name: 'top05  xxxxxx  9.21%'
        },
        {
            value: 20,
            name: 'top04  xxxxxx  10.20%'
        },
        {
            value: 30,
            name: 'top03  xxxxxx  21.24%'
        },
        {
            value: 40,
            name: 'top02  xxxxxx  31.14%'
        }
    ];

    const dataInfluenceOption = {
        color: ['#005c97', '#bfe5ff', '#89cdf7', '#5cb5ec', '#2e81b6'],
        title: [{
            text: '企业敏感数据泄露影响力分布',
            x: 208,
            y: 18,
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#4fb5fb'
            }
        }],
        legend: {
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 12,
            orient: 'vertical',
            x: '208',
            y: '56',
            data: dataInfluenceDs.map((item) => item.name),
            textStyle: {
                fontSize: 12,
                fontWeight: 00,
                color: '#7281bf'
            },
            itemGap: 14
        },
        series: [{
            name: '半径模式', //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'pie', //饼状图
            radius: [28, 78], //饼图的半径，（内半径 和 外半径）
            center: ['22%', '50%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            roseType: 'radius', //扇区圆心角展现数据的百分比，半径展现数据的大小。
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false //hover的提示描述
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            data: dataInfluenceDs,
            itemStyle: {
                normal: {
                    borderColor: '#081D40',
                    borderWidth: 2
                }
            }
        }]
    }
    const dataInfluenceChart = echarts.init(
        document.getElementById('dataInfluence')
    )
    dataInfluenceChart.setOption(dataInfluenceOption)

    // 地图
    const geoCoordMap = {
        沈阳市: [123.429092, 41.796768],
        长春市: [125.324501, 43.886841],
        哈尔滨: [, 126.642464, 45.756966],
        北京市: [116.405289, 39.904987],
        天津市: [117.190186, 39.125595],
        呼和浩特市: [111.75199, 40.84149],
        银川市: [106.23248, 38.48644],
        太原市: [112.549248, 37.857014],
        石家庄: [, 114.502464, 38.045475],
        济南市: [117.000923, 36.675808],
        郑州市: [113.665413, 34.757977],
        西安市: [108.948021, 34.263161],
        武汉市: [114.298569, 30.584354],
        南京市: [118.76741, 32.041546],
        合肥市: [117.283043, 31.861191],
        上海市: [121.472641, 31.231707],
        长沙市: [112.982277, 28.19409],
        南昌市: [115.892151, 28.676493],
        杭州市: [120.15358, 30.287458],
        福州市: [119.306236, 26.075302],
        广州市: [113.28064, 23.125177],
        台北市: [121.520076, 25.030724],
        海口市: [110.19989, 20.04422],
        南宁市: [108.320007, 22.82402],
        重庆市: [106.504959, 29.533155],
        昆明市: [102.71225, 25.040609],
        贵阳市: [106.713478, 26.578342],
        成都市: [104.065735, 30.659462],
        兰州市: [103.83417, 36.06138],
        西宁市: [101.77782, 36.61729],
        拉萨市: [91.1145, 29.64415],
        乌鲁木齐市: [87.61688, 43.82663],
        香港: [14.16546, 22.27534],
        澳门: [13.54913, 22.19875]
    }
    const dataUseData = [{
            name: '昆明市',
            type: 'danger_medium',
            value: {
                views: 45,
                sen_type: '网页',
                sen_count: 34,
                odd_type: 2345,
            }
        },
        {
            name: '拉萨市',
            type: 'danger_low',
            value: {
                views: 45,
                sen_type: '网页',
                sen_count: 45,
                odd_type: 2,
            }
        },
        {
            name: '银川市',
            type: 'danger_low',
            value: {
                views: 45,
                sen_type: '网页',
                sen_count: 5,
                odd_type: 67,
            }
        },
        {
            name: '合肥市',
            type: 'danger_high',
            value: {
                views: 45,
                sen_type: 'API',
                sen_count: 45,
                odd_type: 7,
            }
        },
        {
            name: '杭州市',
            type: 'danger_high',
            value: {
                views: 78,
                sen_type: 'API',
                sen_count: 213,
                odd_type: 5,
            }
        },
        {
            name: '北京市',
            type: 'danger_high',
            value: {
                views: 456,
                sen_type: 'API',
                sen_count: 456,
                odd_type: 4,
            }
        },
        {
            name: '香港',
            type: 'danger_low',
            value: {
                views: 78,
                sen_type: 'API',
                sen_count: 56,
                odd_type: 5,
            }
        },
        {
            name: '成都市',
            type: 'danger_high',
            value: {
                views: 78,
                sen_type: '文件',
                sen_count: 34,
                odd_type: 4,
            }
        },
        {
            name: '西宁市',
            type: 'danger_medium ',
            value: {
                views: 44,
                sen_type: '文件',
                sen_count: 44,
                odd_type: 54,
            }
        }
    ]
    const convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name]
            if (geoCoord) {
                res.push(geoCoord.concat(data[i].value))
            }
        }
        return res
    }
    const getSerieData = function(string) {
        return convertData(
            dataUseData.filter(function(item) {
                if (item.type == string) {
                    return true
                }
                return false
            })
        )
    }
    const mapOption = {
        legend: {
            show: false
        },
        tooltip: {
            trigger: 'item',
            borderWidth: 1,
            showDelay: 0,
            hideDelay: 0,
            transitionDuration: 0,
            backgroundColor: 'rgba(8,104,193, .5)',
            borderColor: '#2172aa',
            padding: [15, 30, 15, 15],
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                return `访问量：  ${params.value[2].views}<br>
                        敏感访问量：  ${params.value[2].sen_count}<br>
                        敏感数据承载方式：  ${params.value[2].sen_type}<br>
                        异常告警数量：  ${params.value[2].odd_type}`
            }
        },
        geo: {
            map: 'china',
            top: 30,
            right: 110,
            bottom: -250,
            left: 80,
            layoutCenter: ['50%', '50%'], //地图位置
            label: {
                show: false,
                color: '#51B4FF',
                fontSize: 14
            },
            itemStyle: {
                areaColor: 'rgba(8,95,153, .7)',
                borderColor: '#0c80c4',
                borderWidth: 2
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'top',
                    color: '#51B4FF'
                },
                itemStyle: {
                    areaColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: '#0c80c4',
                    borderWidth: 2
                }
            }
        },
        series: [{
                name: 'danger_low',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: getSerieData('danger_low'),
                symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'fill',
                    scale: 4,
                    period: 10
                },
                hoverAnimation: true,
                itemStyle: {
                    color: '#25B8BF',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'danger_high',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: getSerieData('danger_high'),
                symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'fill',
                    scale: 4,
                    period: 4
                },
                hoverAnimation: true,
                itemStyle: {
                    color: '#FE6546',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'danger_medium',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: getSerieData('danger_medium'),
                symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'fill',
                    scale: 4,
                    period: 6
                },
                hoverAnimation: true,
                itemStyle: {
                    color: '#FFF174',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            }
        ]
    }
    const mapChart = echarts.init(document.getElementById('chainMap'))
    mapChart.setOption(mapOption)


    // 拖拽
    const mapDataPool = {
        isDrag: false,
        originX: 0,
        originY: 0,
        pageX: 0,
        pageY: 0,
        offsetX: 0,
        offsetY: 0,
    };
    $(".map-data-pool").mousedown(function(event) {
        event.stopPropagation();
        const e = event || window.event;
        mapDataPool.originX = (e.pageX || e.clientX + $(document).scrollLeft()) - $(".map-data-pool").offset().left;
        mapDataPool.originY = (e.pageY || e.clientY + $(document).scrollTop()) - $(".map-data-pool").offset().top;
        mapDataPool.offsetX = parseInt($('.map-data-pool').css('marginLeft'));
        mapDataPool.offsetY = parseInt($('.map-data-pool').css('marginTop'));
        mapDataPool.isDrag = true;
    })
    $(".map-data-pool").mousemove(function(event) {
        event.stopPropagation();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        if (mapDataPool.isDrag) {
            const e = event || window.event;
            mapDataPool.pageX = e.pageX || e.clientX + $(document).scrollLeft();
            mapDataPool.pageY = e.pageY || e.clientY + $(document).scrollTop();
            const left = mapDataPool.pageX - mapDataPool.originX - $(".main-map").offset().left - mapDataPool.offsetX
            const top = mapDataPool.pageY - mapDataPool.originY - $(".main-map").offset().top - mapDataPool.offsetY;
            $(".map-data-pool").css({
                'left': left,
                'top': top,
                'bottom': 'none'
            });
        }
    })
    $(document).mouseup(function(e) {
        e.stopPropagation();
        mapDataPool.isDrag = false;
    })
    $(".map-data-pool .more").click(function() {
        // TODO 跳转
    })




    // 敏感数据访问量TOP5
    const senDataViews = [{
            label: 'TOP01',
            value: 191
        },
        {
            label: 'top02',
            value: 181
        },
        {
            label: 'TOP03',
            value: 171
        },
        {
            label: 'safdas04',
            value: 161
        },
        {
            label: 'sdwe05',
            value: 151
        }
    ]

    const senDataTop5Option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: false
        },
        color: ['#FF9421'],
        grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(30,63,117,.5)'
                }
            },
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
                lineStyle: {
                    color: '#1e3f75',
                    type: 'dashed'
                }
            },
            axisTick: axisTick,
            axisLabel: axisLabel,
            data: senDataViews.map(data => data.label)
        },
        series: [{
            type: 'bar',
            barWidth: '10',
            data: senDataViews.map(data => data.value)
        }]
    }

    const senDataTop5Chart = echarts.init(
        document.getElementById('senDataViewsChart')
    )
    senDataTop5Chart.setOption(senDataTop5Option)
        //事件
    senDataTop5Chart.on('click', function(params) {})

    // 敏感数据访问分布情况
    const senDistributedData = [
        ['product', '四川', '云南', '湖南 ', '2015', '2016', '2017'],
        ['昨日访问数据量', 411, 304, 651, 533, 838, 987],
        ['上周访问数据量', 865, 921, 857, 831, 734, 551]
    ]
    const senDataDistributedOption = {
        legend: {
            top: 40,
            itemWidth: 20,
            itemHeight: 12,
            textStyle: axisLabel
        },
        grid: {
            left: '2%',
            right: '5%',
            bottom: 30,
            top: 80,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            borderWidth: 1,
            showDelay: 0,
            hideDelay: 0,
            transitionDuration: 0,
            backgroundColor: 'rgba(8,104,193, 1)',
            borderColor: '#2172aa',
            padding: [10, 20, 10, 10],
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                return `${senDistributedData[1][0]}： ${params[0].value[1]}<br>
                        ${senDistributedData[2][0]}： ${(
                          params[0].value[1] - params[0].value[2]
                        ).toFixed(0)}`
            }
        },
        color: ['#FF9421', '#00D200'],
        dataset: {
            source: senDistributedData
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: splitLineStyle,
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel
        },
        yAxis: {
            gridIndex: 0,
            boundaryGap: true,
            splitLine: splitLineStyle,
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel
        },
        series: [{
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                seriesLayoutBy: 'row'
            },
            {
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                seriesLayoutBy: 'row'
            }
        ]
    }
    const senDataDistributedChart = echarts.init(
        document.getElementById('senDataDistributedChart')
    )
    senDataDistributedChart.setOption(senDataDistributedOption)
        //事件
    senDataDistributedChart.on('click', function(params) {})

    // 敏感数据访问区域TOP10
    const senDataViewsTwo = [{
            city: '成都',
            value: 191
        },
        {
            city: '成都sf',
            value: 181
        },
        {
            city: '成都sdf',
            value: 171
        },
        {
            city: 'sdf',
            value: 211
        },
        {
            city: 'z',
            value: 151
        },
        {
            city: 'sdf',
            value: 141
        },
        {
            city: 'asf',
            value: 131
        },
        {
            city: 'sf',
            value: 121
        },
        {
            city: 'xcv',
            value: 111
        },
        {
            city: 'sf',
            value: 101
        }
    ]

    function getViewsSortData(data) {
        return data.sort((a, b) => {
            var val1 = a.value
            var val2 = b.value
            if (val1 < val2) {
                return 1
            } else if (val1 > val2) {
                return -1
            }
            return 0
        })
    }
    const senDataTop10Option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: false
        },
        color: ['#FF9421'],
        grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            top: 60,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: axisLineStyle,
            axisTick: axisTick,
            axisLabel: axisLabel,
            data: getViewsSortData(senDataViewsTwo).map(data => data.city)
        },
        yAxis: {
            type: 'value',
            boundaryGap: true,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(30,63,117,.5)'
                }
            },
            axisLine: {
                show: false
            },
            axisTick: axisTick,
            axisLabel: axisLabel
        },
        series: [{
            type: 'bar',
            barWidth: '10',
            data: getViewsSortData(senDataViewsTwo).map(data => data.value)
        }]
    }

    const senDataTop10Chart = echarts.init(
        document.getElementById('senDataViewsTwoChart')
    )
    senDataTop10Chart.setOption(senDataTop10Option)
        //事件
    senDataTop10Chart.on('click', function(params) {})

    // chart图表轮播
    $('.banner').slides({
        container: 'slides_container',
        play: 2500,
        pause: 10,
        hoverPause: true,
        effect: "slide",
        generateNextPrev: true,
    })
    $('.banner').on("mousewheel DOMMouseScroll", function(e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
        if (delta == 0) {
            return;
        }
        if (delta > 0) {
            $(".banner .prev").click();
            return false;
        }
        $(".banner .next").click();
        return false;
    });

    // 表格数据轮播
    const tableSwiper = new Swiper('.reatime-warning .table-swiper', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        grabCursor: true,
        slidesPerView: 6,
        mousewheel: true
    })
    $('.reatime-warning .table-swiper').hover(
        function() {
            tableSwiper.autoplay.stop()
        },
        function() {
            tableSwiper.autoplay.start()
        }
    )

    // 跳转
    mapChart.on('click', function(params) {
        // TODO 跳转
    })
    $(".map-data-pool .more").click(function() {
        console.log("1222")
    })

    $(".exit-screen").click(function() {
        exitScreen();
    })
})

function exitScreen() {
    // if (document.documentElement.requestFullscreen) {
    //     document.documentElement.requestFullscreen();
    // } else if (document.documentElement.mozRequestFullScreen) {
    //     document.documentElement.mozRequestFullScreen();
    // } else if (document.documentElement.webkitRequestFullscreen) {
    //     document.documentElement.webkitRequestFullscreen();
    // } else if (document.documentElement.msRequestFullscreen) {
    //     document.documentElement.msRequestFullscreen();
    // }

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else {
        window.parent.showTopBottom();
    }
}