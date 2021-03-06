    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
    const color = Chart.helpers.color;
    const maxDatapoints = 50;
    /*
    Set global chart configuration attributes
     */
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.maintainAspectRatio = false;
    const scales = {
        xAxes: [{
            type: "time",
            display: false,
            scaleLabel: {
                display: true,
                labelString: 'Time'
            },
            ticks: {
                major: {
                    fontStyle: "bold",
                    fontColor: "#FF0000"
                }
            }
        }],
        yAxes: [{
            display: false,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }
        }]
    };
    const oChartConfig = {};
    oChartConfig.Head = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Head Yaw & Pitch',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Pitch",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.LeftShoulder = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Shoulder Pitch & Roll',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.RightShoulder = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Shoulder Pitch & Roll',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.LeftElbow = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Elbow Yaw & Roll',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.RightElbow = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Elbow Yaw & Roll',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.LeftWrist = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Wrist Yaw',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.RightWrist = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Wrist Yaw',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.LeftHand = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Hand',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.RightHand = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Hand',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.LeftHip = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Hip Pitch, Roll & Yaw',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.RightHip = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Hip Pitch, Roll & Yaw',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Yaw",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.LeftKnee = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Knee Pitch',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.RightKnee = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Knee Pitch',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.LeftAnkle = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Ankle Pitch & Roll',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.RightAnkle = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Ankle Pitch & Roll',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Pitch",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }, {
                label: "Roll",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                pointRadius: 0,
            }]
        }
    };
    oChartConfig.LeftFoot = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Left Foot Weight',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Weight",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };
    oChartConfig.RightFoot = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                fontColor: 'black',
                fontSize: 14,
                text: 'Right Foot Weight',
                display: true
            },
            scales: scales
        },
        data: {
            datasets: [{
                label: "Weight",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                fill: false,
                pointRadius: 0
            }]
        }
    };