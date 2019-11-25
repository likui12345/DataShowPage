$(document).ready(function() {
    const defaultColor = ['#FEC942', '#F56D4B', '#7479BB', '#52BCE3', '#6DC59E', '#6CC4C4']
    const lineStyle = {
            color: '#1e3f75'
        }
        // 坐标轴样式 文字
    const axisLabel = {
            color: '#333',
            lineHeight: 20,
            interval: 0
        }
        // 区域内分割线样式
    const dashedSplitLineStyle = {
        show: true,
        lineStyle: {
            type: 'dashed',
            color: 'rgba(128,128,128,.3)'
        }
    }
    const solidSplitLineStyle = {
            show: true,
            lineStyle: {
                type: 'solid',
                color: 'rgba(128,128,128,.1)'
            }
        }
        // 坐标轴线相关设置  坐标轴轴线
    const axisLineStyle = {
            lineStyle: {
                color: '#e5e5e5'
            }
        }
        // 标题样式
    const titleTextStyle = {
            color: '#000',
            fontSize: 14,
            fontWeight: 'bolder',
        }
        // 刻度
    const hideAxisTick = {
        show: false
    }

    const carrierTypeDataReq = {
        name: '单位',
        title: '数据载体类型统计',
        data: [{
                label: '网页',
                value: 11
            },
            {
                label: '接口',
                value: 100
            },
            {
                label: '文件',
                value: 181
            }
        ]
    }
    const carrierTypeData = formatCarrierTypeData(carrierTypeDataReq);

    const carrierTypeOption = {
        title: [{
            text: carrierTypeData.title || '数据载体类型统计',
            x: 15,
            y: 15,
            textStyle: titleTextStyle
        }],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            icon: 'circle',
            itemWidth: 10,
            right: 55,
            top: 15,
        },
        color: ['#3EAFE0'],
        grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            top: 80,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            axisLine: axisLineStyle,
            axisTick: hideAxisTick,
            splitLine: {
                show: false
            },
            axisLabel: axisLabel
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: axisLineStyle,
            axisTick: hideAxisTick,
            axisLabel: axisLabel,
            data: carrierTypeData.data.map(data => data.label)
        },
        series: [{
            name: carrierTypeData.name || '单位',
            type: 'bar',
            barWidth: 30,
            data: carrierTypeData.data.map(data => data.value)
        }]
    }

    const carrierTypeChart = echarts.init(document.getElementById('carrierType'))
    carrierTypeChart.setOption(carrierTypeOption)
        //事件
    carrierTypeChart.on('click', function(params) {})

    function formatCarrierTypeData(data) {
        const result = _.cloneDeep(data);
        result.data = _.sortBy(data.data, (item) => -item.value)
        return result
    }

    // 饼图公用配置
    const pieCommonOption = {
        color: defaultColor,
        title: [{
            x: 15,
            y: 15,
            textStyle: titleTextStyle
        }],
        legend: {
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 14,
            // type: 'scroll',
            orient: 'vertical',
            x: '220',
            y: '84',
            bottom: 20,
            data: [],
            // pageIcons: {
            //     vertical: ['path://M2,0h10c1.104,0,2,0.896,2,2v10c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2C0,0.896,0.896,0,2,0z M7,5L3,9h8L7,5z', 'path://M12,0H2C0.896,0,0,0.896,0,2v10c0,1.104,0.896,2,2,2h10c1.104,0,2-0.896,2-2V2C14,0.896,13.104,0,12,0z M7,9L3,5h8L7,9z']
            // },
            // pageIconColor: '#314557',
            textStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: defaultColor,
            },
            itemGap: 16
        },
        series: [{
            name: '半径模式', //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'pie', //饼状图
            radius: [28, 78], //饼图的半径，（内半径 和 外半径）
            center: ['18%', '60%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            roseType: 'radius', //扇区圆心角展现数据的百分比，半径展现数据的大小。
            label: {
                show: false
            },
            data: [],
            itemStyle: {
                normal: {
                    borderColor: 'rgba(255,255,255,1)',
                    borderWidth: 2
                }
            }
        }]
    }

    // 风险数据类型
    const senDataTypeReq = [{
            value: 50,
            name: '数值',
        },
        {
            value: 10,
            name: '数值',
        },
        {
            value: 20,
            name: '数值',
        },
        {
            value: 30,
            name: '数值',
        },
        {
            value: 41,
            name: '数值',
        },
        {
            value: 11,
            name: '数值',
        },
        {
            value: 21,
            name: '数值',
        },
        {
            value: 31,
            name: '数值',
        },
        {
            value: 41,
            name: '数值',
        }
    ];
    const senDataType = formatPieRoseData(senDataTypeReq);
    const senDataTypeOption = _.cloneDeep(pieCommonOption)
    senDataTypeOption.title[0].text = '敏感数据分类占比';
    senDataTypeOption.legend.data = senDataType.map((item) => item.name);
    senDataTypeOption.series[0].data = senDataType;

    const senDataTypeChart = echarts.init(document.getElementById('senDataType'))
    senDataTypeChart.setOption(senDataTypeOption)


    // 地域事件分析
    const dataValueDataReq = [{
            value: 50,
            name: '数值',
        },
        {
            value: 10,
            name: '数值',
        },
        {
            value: 20,
            name: '数值',
        },
        {
            value: 30,
            name: '数值',
        }
    ];
    const dataValueData = formatPieRoseData(dataValueDataReq);
    const dataValueOption = _.cloneDeep(pieCommonOption)
    dataValueOption.title[0].text = '敏感数据价值占比';
    dataValueOption.legend.data = dataValueData.map((item) => item.name);
    dataValueOption.series[0].data = dataValueData;

    const dataValueChart = echarts.init(document.getElementById('dataValue'))
    dataValueChart.setOption(dataValueOption)

    function formatPieRoseData(data) {
        const counts = _.reduce(data, function(sum, n) {
            return sum + n.value;
        }, 0);
        return _.chain(data).forEach((item) => {
            item.name = `${item.name}： ${item.value}  占比${(item.value * 100 / counts).toFixed(2)}%`
        }).sortBy(function(item) {
            return -item.value
        }).value()
    }
})