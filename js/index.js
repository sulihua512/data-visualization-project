(function () {
    // 实现rem适配
    var setFont = function () {
        var html = document.documentElement;
        var width = html.clientWidth;
        if (width < 1024) {
            width = 1024;
        }
        if (width > 1920) {
            width = 1920;
        }
        var fontSize = width / 80 + 'px';
        html.style.fontSize = fontSize;
    }
    setFont();
    window.onresize = function () {
        setFont();
    }
})();

// 监控区域-效果
(function () {
    $('.monitor').on('click', '.tabs a', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.monitor .content').eq(this.dataset.index).show().siblings('.content').hide()
    })
    // 动画
    $('.marquee').each(function () {
        var $cloneList = $(this).children().clone();
        $(this).append($cloneList)
    })
})();

// 实现点位-饼状图
(function () {
    var option = {
        // 控制提示
        tooltip: {
            // 非轴图形，使用item的意思是放到数据对应图形上触发提示
            trigger: 'item',
            // 格式化提示内容：
            // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 控制图表
        series: [
            {
                // 图表名称
                name: '点位统计',
                // 图表类型
                type: 'pie',
                // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
                // 百分比基于  图表DOM容器的半径
                radius: ['10%', '70%'],
                // 图表中心位置 left 50%  top 50% 距离图表DOM容器
                center: ['50%', '50%'],
                // 半径模式，另外一种是 area 面积模式
                roseType: 'radius',
                // 数据集 value 数据的值 name 数据的名称
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ],
                // 文字调整
                label: {
                    fontSize: 10
                },
                // 引导线调整
                labelLine: {
                    // 连接扇形图线长
                    length: 8,
                    // 连接文字线长
                    length2: 10
                }
            }
        ],
        // 每块图颜色
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
    };
    var myChart = echarts.init($('.pie')[0])
    myChart.setOption(option)
})();

// 用户统计
(function () {
    // 中间省略的数据  准备三项
    var item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    }
    option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '3%',
            right: '3%',
            bottom: '3%',
            // 是否包含文本
            containLabel: true,
            // 显示边框
            containLabel: true,
            // 边框颜色
            // borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [
            {
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                // 刻度设置
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false     //剔除刻度
                },
                axisLabel: {
                    color: '#4c9bfd'
                }
            }
        ],
        // 控制y轴
        yAxis: [
            {
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    show: false  //剔除刻度   
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }
        ],
        // 控制x轴
        series: [
            {
                // 图表数据名称
                name: '用户统计',
                // 图表类型
                type: 'bar',
                // 柱子宽度
                barWidth: '60%',
                // 数据
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
                // 颜色
                itemStyle: {
                    // 提供的工具函数生成渐变颜色
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' }, // 0 起始颜色
                            { offset: 1, color: '#0061ce' }  // 1 结束颜色
                        ]
                    )
                }
            }
        ]
    };
    var myChart = echarts.init($('.bar')[0])
    myChart.setOption(option)
})();

// 订单区域
(function () {
    // 1. 准备数据
    var data = {
        day365: { orders: '20,301,987', amount: '99834' },
        day90: { orders: '301,987', amount: '9834' },
        day30: { orders: '1,987', amount: '3834' },
        day1: { orders: '987', amount: '834' }
    }
    // 获取显示 订单数量 容器
    var $h4Orders = $('.order h4:eq(0)')
    // 获取显示 金额数量 容器
    var $h4Amount = $('.order h4:eq(1)')
    $('.order').on('click', '.filter a', function () {
        // 2. 点击切换激活样式
        $(this).addClass('active').siblings().removeClass('active')
        // 3. 点击切换数据
        var currdata = data[this.dataset.key]
        $h4Orders.html(currdata.orders)
        $h4Amount.html(currdata.amount)
    })
    // 4. 开启定时器切换数据
    var index = 0;
    var $allTab = $('.order .filter a')
    setInterval(() => {
        index++;
        if (index >= 4) {
            index = 0;
        }
        $allTab.eq(index).click()
    }, 3000);
})();

// 销售统计
(function () {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    var option = {
        // 设置网格样式
        grid: {
            show: true,// 显示边框
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        // 工具提示
        tooltip: {
            trigger: 'axis'
        },
        // 图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: '10%' // 距离右边10%
        },
        xAxis: {
            type: 'category',
            data: data.year[1],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false
            },
            boundaryGap: false  // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        series: [{
            name: '预期销售额',
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1'  // 线颜色
            }
        }, {
            name: '实际销售额',
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35'  // 线颜色
            }
        }]
    };
    var myChart = echarts.init($('.line')[0])
    myChart.setOption(option);

    $('.sales').on('click', '.caption a', function () {
        // 样式
        $(this).addClass('active').siblings().removeClass('active')
        var currData = data[this.dataset.type]
        // 修改图表1的数据
        option.series[0].data = currData[0]
        // 修改图表2的数据                  
        option.series[1].data = currData[1]
        // 重新设置数据  让图标重新渲染                  
        myChart.setOption(option)
    })

    // tab索引
    var index = 0;
    // 所有tab
    var allTab = $('.sales .caption a')
    setInterval(function () {
        index++
        // 大于等于4索引切换到0索引
        if (index >= 4) index = 0
        // 选中对应tab触发点击
        allTab.eq(index).click()
    }, 1000)
})();

// 销售进度
(function () {
    var option = {
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                radius: ['130%', '150%'],  // 放大图形
                center: ['48%', '80%'],    // 往下移动  套住75%文字
                label: {
                    show: false,
                },
                data: [
                    { value: 100 }, // 不需要名称
                    { value: 100 }, // 不需要名称
                    { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
                ],
                hoverOffset: 0,  // 鼠标经过不变大
                data: [
                    {
                        value: 100,
                        itemStyle: { // 颜色渐变#00c9e0->#005fc1
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#00c9e0' }, { offset: 1, color: '#005fc1' }
                                ]
                            }
                        }
                    },
                    { value: 100, itemStyle: { color: '#12274d' } },
                ]
            }
        ]
    }
    var myChart = echarts.init($('.gauge')[0])
    myChart.setOption(option)
})();

// 热销排行
(function () {
    var data = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ]
    // 绑定鼠标经过事件，激活样式，根据随机数据渲染内容。
    $('.province').on('mouseenter', '.sup li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        // 打乱数据
        var randomData = data.sort(function (a, b) {
            return 0.5 - Math.random()
        });
        // 拼接字符串
        var html = '';
        randomData.forEach(item => {
            html += `<li><span>${item.name}</span><span>${item.num} <s class="icon-up"></s></span></li>`
        })
        // 渲染
        $('.sub').html(html)
    })
    // 所有的LI
    var $lis = $('.province .sup li')
    // 第一个默认激活
    $lis.eq(0).mouseenter();
    // 开启定时器 切换
    var index = 0
    setInterval(function () {
        index++
        // 大于等于5索引切换到0索引
        if (index >= 5) index = 0
        // 选中对应tab触发点击
        $lis.eq(index).mouseenter()
    }, 1000)
})();

// 地图
; (function () {
    var chinaGeoCoordMap = {
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京市': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413],
        "陕西": [109.1162, 34.2004],
        "甘肃": [103.5901, 36.3043],
        "宁夏": [106.3586, 38.1775],
        "青海": [101.4038, 36.8207],
        "新疆": [87.9236, 43.5883],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        "福建": [119.4543, 25.9222],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.4648, 31.2891]
    };
    var chinaDatas = [
        [{
            name: '黑龙江',
            value: 0
        }], [{
            name: '内蒙古',
            value: 0
        }], [{
            name: '吉林',
            value: 0
        }], [{
            name: '辽宁',
            value: 0
        }], [{
            name: '河北',
            value: 0
        }], [{
            name: '天津',
            value: 0
        }], [{
            name: '山西',
            value: 0
        }], [{
            name: '陕西',
            value: 0
        }], [{
            name: '甘肃',
            value: 0
        }], [{
            name: '宁夏',
            value: 0
        }], [{
            name: '青海',
            value: 0
        }], [{
            name: '新疆',
            value: 0
        }], [{
            name: '西藏',
            value: 0
        }], [{
            name: '四川',
            value: 0
        }], [{
            name: '重庆',
            value: 0
        }], [{
            name: '山东',
            value: 0
        }], [{
            name: '河南',
            value: 0
        }], [{
            name: '江苏',
            value: 0
        }], [{
            name: '安徽',
            value: 0
        }], [{
            name: '湖北',
            value: 0
        }], [{
            name: '浙江',
            value: 0
        }], [{
            name: '福建',
            value: 0
        }], [{
            name: '江西',
            value: 0
        }], [{
            name: '湖南',
            value: 0
        }], [{
            name: '贵州',
            value: 0
        }], [{
            name: '广西',
            value: 0
        }], [{
            name: '海南',
            value: 0
        }], [{
            name: '上海',
            value: 1
        }]
    ];

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.4551, 40.2539];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord,
                    value: dataItem[0].value
                }, {
                    coord: toCoord,
                }]);
            }
        }
        return res;
    };
    var series = [];
    [['北京市', chinaDatas]].forEach(function (item, i) {
        console.log(item)
        series.push({
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 5, //图标大小
            },
            lineStyle: {
                normal: {
                    width: 1, //尾迹线条宽度
                    opacity: 1, //尾迹线条透明度
                    curveness: .3 //尾迹线条曲直度
                }
            },
            data: convertData(item[1])
        }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: { //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: 'right', //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: function (params) {//圆环显示文字
                        return params.data.name;
                    },
                    fontSize: 13
                },
                emphasis: {
                    show: true
                }
            },
            symbol: 'circle',
            symbolSize: function (val) {
                return 5 + val[2] * 5; //圆环大小
            },
            itemStyle: {
                normal: {
                    show: false,
                    color: '#f00'
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[0].name,
                    value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
            }),
        },
            //被攻击点
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        //offset:[5, 0],
                        color: '#0f0',
                        formatter: '{b}',
                        textStyle: {
                            color: "#0f0"
                        }
                    },
                    emphasis: {
                        show: true,
                        color: "#f60"
                    }
                },
                symbol: 'pin',
                symbolSize: 50,
                data: [{
                    name: item[0],
                    value: chinaGeoCoordMap[item[0]].concat([10]),
                }],
            }
        );
    });

    option = {
        tooltip: {
            trigger: 'item',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function (params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        visualMap: { //图例值控制
            min: 0,
            max: 1,
            calculable: true,
            show: false,
            color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true, //是否允许缩放
            itemStyle: {
                normal: {
                    color: 'rgba(51, 69, 89, .5)', //地图背景色
                    borderColor: '#516a89', //省市边界线00fcff 516a89
                    borderWidth: 1
                },
                emphasis: {
                    color: 'rgba(37, 43, 61, .5)' //悬浮背景
                }
            }
        },
        series: series
    };
    var myecharts = echarts.init($('.map .geo')[0])
    myecharts.setOption(option)
})()