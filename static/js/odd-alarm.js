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
            type: 'scroll',
            orient: 'vertical',
            x: '250',
            y: '84',
            bottom: 20,
            data: [],
            pageIcons: {
                vertical: ['path://M2,0h10c1.104,0,2,0.896,2,2v10c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2C0,0.896,0.896,0,2,0z M7,5L3,9h8L7,5z', 'path://M12,0H2C0.896,0,0,0.896,0,2v10c0,1.104,0.896,2,2,2h10c1.104,0,2-0.896,2-2V2C14,0.896,13.104,0,12,0z M7,9L3,5h8L7,9z']
            },
            pageIconColor: '#314557',
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
            center: ['24%', '60%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
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
    const riskTypeDataReq = [{
            value: 50,
            name: '敏感类型',
        },
        {
            value: 10,
            name: '敏感类型',
        },
        {
            value: 20,
            name: '敏感类型',
        },
        {
            value: 30,
            name: '敏感类型',
        },
        {
            value: 40,
            name: '敏感类型',
        },
        {
            value: 10,
            name: '敏感类型11',
        },
        {
            value: 20,
            name: '敏感类型22',
        },
        {
            value: 30,
            name: '敏感类型33',
        },
        {
            value: 40,
            name: '敏感类型44',
        }
    ];
    const riskTypeData = formatPieRoseData(riskTypeDataReq);
    const dataRiskTypeOption = _.cloneDeep(pieCommonOption)
    dataRiskTypeOption.title[0].text = '风险数据类型';
    dataRiskTypeOption.legend.data = riskTypeData.map((item) => item.name);
    dataRiskTypeOption.series[0].data = riskTypeData;

    const dataRiskTypeChart = echarts.init(document.getElementById('dataRiskType'))
    dataRiskTypeChart.setOption(dataRiskTypeOption)


    // 地域事件分析
    const areaAnalyDataReq = [{
            value: 50,
            name: '重庆市',
        },
        {
            value: 10,
            name: '上海市',
        },
        {
            value: 20,
            name: '天津市',
        },
        {
            value: 30,
            name: '重庆市',
        },
        {
            value: 40,
            name: '成都市',
        },
        {
            value: 10,
            name: '山西省',
        },
        {
            value: 20,
            name: '资阳市',
        },
        {
            value: 30,
            name: '内江市',
        },
        {
            value: 40,
            name: '广州市',
        }
    ];
    const areaAnalyData = formatPieRoseData(areaAnalyDataReq);
    const areaAnalyOption = _.cloneDeep(pieCommonOption)
    areaAnalyOption.title[0].text = '地域事件分析';
    areaAnalyOption.legend.data = areaAnalyData.map((item) => item.name);
    areaAnalyOption.series[0].data = areaAnalyData;

    const areaAnalyChart = echarts.init(document.getElementById('areaAnaly'))
    areaAnalyChart.setOption(areaAnalyOption)


    // 风险排行（城市）
    const riskRankingDataReq = {
        title: '风险排行（城市）',
        seriesName: '告警数量',
        data: [{
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
    }

    const riskRankingData = formatBarData(riskRankingDataReq.data);
    const riskRankingOption = {
        title: [{
            text: riskRankingDataReq.title,
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
            left: '5%',
            right: '4%',
            bottom: '3%',
            top: 80,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: hideAxisTick,
            axisLine: axisLineStyle,
            axisLabel: axisLabel,
            data: riskRankingData.map(data => data.city)
        },
        yAxis: {
            type: 'value',
            boundaryGap: true,
            splitLine: dashedSplitLineStyle,
            axisLine: {
                show: false
            },
            axisTick: hideAxisTick,
        },
        series: [{
            name: riskRankingDataReq.seriesName,
            type: 'bar',
            data: riskRankingData.map(data => data.value)
        }]
    }

    const riskRankingChart = echarts.init(
        document.getElementById('riskRanking')
    )
    riskRankingChart.setOption(riskRankingOption)
        //事件
    riskRankingChart.on('click', function(params) {})


    // 异常告警页面 折线图公用配置
    const lineCommonOption = {
        title: [{
            x: 15,
            y: 15,
            textStyle: titleTextStyle
        }],
        legend: {
            top: 15,
            itemWidth: 20,
            itemHeight: 12,
            textStyle: axisLabel
        },
        grid: {
            left: '5%',
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
            backgroundColor: '#fff',
            borderColor: '#ccc',
            padding: [10, 20, 10, 10],
            extraCssText: 'z-index:100',
            textStyle: {
                color: '#333'
            },
            formatter: function(params, ticket, callback) {
                let result = `<span style="color: #FEC942;">${params[0].seriesName}告警量： ${params[0].value[1]}</span><br>
                                <span style="color: #3EAFE0;">${params[1].seriesName}告警量： ${params[0].value[2]}</span><br>`;
                if (params[0].value[1] > params[0].value[2]) {
                    result += `<span style="color: #F56D4B;">环比：<img src='./static/imgs/rise_icon.png'/>${((params[0].value[1] - params[0].value[2]) * 100 / params[0].value[2]).toFixed(2)}%</span>`;
                } else {
                    result += `<span style="color: #6DC59E;">环比：<img src='./static/imgs/decline_icon.png'/>${Math.abs(((params[0].value[1] - params[0].value[2]) * 100 / params[0].value[2]).toFixed(2))}%</span>`;
                }
                return result;
            }
        },
        color: ['#FEC942', '#3EAFE0'],
        dataset: {
            source: []
        },
        xAxis: {
            type: 'category',
            axisLine: axisLineStyle,
            axisTick: hideAxisTick,
            axisLabel: axisLabel
        },
        yAxis: {
            gridIndex: 0,
            boundaryGap: true,
            splitLine: solidSplitLineStyle,
            axisLine: axisLineStyle,
            axisTick: hideAxisTick,
            axisLabel: axisLabel
        },
        series: [{
                type: 'line',
                symbol: 'circle',
                symbolSize: 4,
                seriesLayoutBy: 'row'
            },
            {
                type: 'line',
                symbol: 'circle',
                symbolSize: 4,
                seriesLayoutBy: 'row'
            }
        ]
    }


    // 告警环比（周）
    const alarmWowDataReq = {
        title: '告警环比（周）',
        data: [
            ['product', '周一', '周二', '周三 ', '周四', '周五', '周六', '周日'],
            ['本周', 411, 304, 651, 533, 838, 987, 52],
            ['上周', 865, 921, 857, 831, 734, 551, 1254]
        ]
    }
    const alarmWowData = alarmWowDataReq.data;

    const alarmWowOption = _.cloneDeep(lineCommonOption);
    alarmWowOption.title[0].text = alarmWowDataReq.title;
    alarmWowOption.dataset.source = alarmWowData;
    const alarmWowChart = echarts.init(document.getElementById('alarmWow'))
    alarmWowChart.setOption(alarmWowOption)

    // 告警环比（月）
    const alarmMomDataReq = {
        title: '告警环比（月）',
        data: [
            ['product', '01', '03', '05 ', '07', '09', '11', '13', '15 ', '17', '19', '21', '23', '25 ', '27', '29', '31'], // TODO 数据为月天数奇数(28/29/30/31)
            ['本月', 411, 304, 651, 533, 533, 838, 987, 52, 411, 304, 651, 533, 838, 987, 52, 304],
            ['上月', 865, 921, 857, 831, 734, 551, 125, 411, 304, 651, 533, 838, 987, 52, 154, 411]
        ]
    }
    const alarmMomData = alarmMomDataReq.data;

    const alarmMomOption = _.cloneDeep(lineCommonOption);
    alarmMomOption.title[0].text = alarmMomDataReq.title;
    alarmMomOption.dataset.source = alarmMomData;
    const alarmMomChart = echarts.init(document.getElementById('alarmMom'))
    alarmMomChart.setOption(alarmMomOption)

    // 告警趋势（月）
    const alarmTrendDataReq = {
        title: '告警趋势（月）',
        data: [
            ['product', '01', '02', '03 ', '04', '05', '06', '07'], // TODO 数据为月天数(28/29/30/31)
            ['账号合规', 411, 304, 651, 533, 838, 987, 52],
            ['身份鉴权', 865, 921, 857, 831, 734, 551, 1254],
            ['用户行为', 838, 987, 52, 411, 304, 651, 533],
            ['数据访问', 411, 304, 651, 533, 838, 987, 52],
        ]
    }

    const alarmTrendDataOptions = {
        title: [{
            text: alarmTrendDataReq.title || '告警趋势（月）',
            x: 15,
            y: 15,
            textStyle: titleTextStyle
        }],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            borderWidth: 1,
            showDelay: 0,
            hideDelay: 0,
            transitionDuration: 0,
            backgroundColor: '#fff',
            borderColor: '#ccc',
            padding: [10, 20, 10, 10],
            extraCssText: 'z-index:100',
            textStyle: {
                color: '#333'
            },
            formatter: function(params, ticket, callback) {
                return `${params[0].seriesName}异常： ${params[0].value[1]}<br>
                        ${params[1].seriesName}异常： ${params[0].value[2]}<br>
                        ${params[2].seriesName}异常： ${params[0].value[3]}<br>
                        ${params[3].seriesName}异常： ${params[0].value[4]}`
            }
        },
        legend: {
            itemWidth: 10,
            itemHeight: 10,
            right: 55,
            top: 15,
            textStyle: axisLabel,
        },
        color: ['#F86439', '#FC9E75', '#C6BF34', '#EAE2A5'],
        grid: {
            left: '5%',
            right: '3%',
            bottom: '3%',
            top: 80,
            containLabel: true
        },
        dataset: {
            source: alarmTrendDataReq.data
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: axisLineStyle,
            axisTick: hideAxisTick,
            axisLabel: axisLabel
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(30,63,117,.1)'
                }
            },
            axisLine: {
                show: false
            },
            axisTick: hideAxisTick,
            axisLabel: axisLabel
        },
        series: [{
            name: alarmTrendDataReq.data[1][0],
            type: 'bar',
            seriesLayoutBy: 'row',
            stack: true,
        }, {
            name: alarmTrendDataReq.data[2][0],
            type: 'bar',
            seriesLayoutBy: 'row',
            stack: true,
        }, {
            name: alarmTrendDataReq.data[3][0],
            type: 'bar',
            seriesLayoutBy: 'row',
            stack: true,
        }, {
            name: alarmTrendDataReq.data[4][0],
            type: 'bar',
            seriesLayoutBy: 'row',
            stack: true,
        }, ]
    }

    const alarmTrendDataChart = echarts.init(document.getElementById('alarmTrend'))
    alarmTrendDataChart.setOption(alarmTrendDataOptions)
        //事件
    alarmTrendDataChart.on('click', function(params) {})



    function formatBarData(data) {
        return _.sortBy(data, (item) => -item.value)
    }

    function formatPieRoseData(data) {
        const counts = _.reduce(data, function(sum, n) {
            return sum + n.value;
        }, 0);
        return _.chain(data).forEach((item) => {
            item.name = `${item.name}：${item.value}次 占比${(item.value * 100 / counts).toFixed(2)}%`
        }).sortBy(function(item) {
            return -item.value
        }).value()
    }
})

function submitFun() {
    console.log("submit", $(".sub-nav .input-search input").val())
}