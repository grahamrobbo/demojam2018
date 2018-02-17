    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
    var color = Chart.helpers.color;
    /*
    Set global chart configuration attributes
     */
    Chart.defaults.global.legend.display = false;
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
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }
        }]
    };
    const maxDatapoints = 5;
    const configHead = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftShoulder = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRightShoulder = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftElbow = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRightElbow = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftWrist = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRightWrist = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftHip = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRightHip = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftKnee = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRightKnee = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftAnkle = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRightAnkle = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configLeftFoot = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
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
    const configRigthFoot = {
        type: "line",
        maxDatapoints: maxDatapoints,
        options: {
            title: {
                text: 'Rigth Foot Weight',
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