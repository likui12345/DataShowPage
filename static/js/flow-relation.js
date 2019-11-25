$(document).ready(function() {
    // 坐标轴样式 文字
    const axisLabel = {
        color: '#333',
        lineHeight: 20,
        interval: 0
    }

    const businessSysDataReq = {
        title: '业务系统关系图',
        categories: [{
                name: '类目0'
            },
            {
                name: '类目1'
            }
        ],
        links: [{
                source: '5', // nodes.id
                lineStyle: {
                    normal: {}
                },
                target: '1' // nodes.id
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '2'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '3'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '4'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '6'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '7'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '8'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '9'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '10'
            },
            {
                source: '5',
                lineStyle: {
                    normal: {}
                },
                target: '11'
            }
        ],
        nodes: [{
                name: 'category name1',
                id: '1',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name2',
                id: '2',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name3',
                id: '3',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name4',
                id: '4',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                },
                x: 22,
                y: 44
            },
            {
                name: 'category name5',
                id: '5',
                category: 1,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name6',
                id: '6',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name7',
                id: '7',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name8',
                id: '8',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name9',
                id: '9',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name10',
                id: '10',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            },
            {
                name: 'category name11',
                id: '11',
                category: 0,
                value: {
                    request_num: 123,
                    traffic_size: 213
                }
            }
        ]
    }
    getBusinessSysData(businessSysDataReq)
    const businessSysOption = {
        title: {
            text: businessSysDataReq.title || '业务系统关系图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bolder'
            }
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            padding: [10, 20, 10, 10],
            formatter: function(params, ticket, callback) {
                return `当日请求次数： ${params.value.request_num}<br>
                        当日流量大小： ${params.value.traffic_size}`
            }
        },
        legend: [{
            top: 70,
            left: 'center',
            textStyle: axisLabel,
            data: businessSysDataReq.categories.map(function(a) {
                return a.name
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
            type: 'graph',
            layout: 'none',
            data: businessSysDataReq.nodes,
            links: businessSysDataReq.links,
            categories: businessSysDataReq.categories,
            roam: true,
            top: 120,
            bottom: 50,
            focusNodeAdjacency: true,
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            },
            label: {
                position: 'right',
                formatter: '{b}'
            },
            lineStyle: {
                color: 'source',
                curveness: 0.3
            },
            emphasis: {
                lineStyle: {
                    width: 10
                }
            }
        }]
    }
    const businessSysChart = echarts.init(document.getElementById('businessSys'))
    businessSysChart.setOption(businessSysOption)
    businessSysChart.on('click', function(params) {})

    function getBusinessSysData(data) {
        _.map(data.nodes, item => {
            // TODO x y的值可由后台数据库给出
            if (item.category) {
                item.symbolSize = Math.floor(Math.random() * (60 - 40) + 40)
                item.x = 0
                item.y = 0
            } else {
                item.symbolSize = Math.floor(Math.random() * 10 + 10)
                item.x = Math.floor(Math.random() * -50 + 25)
                item.y = Math.floor(Math.random() * -50 + 25)
            }
        })
    }
})