    Chart.prototype.addDataPoints = function () {
        if (!this._seq) {
            this._seq = 0;
        }
        this._seq++;
        for (var i = 0; i < arguments.length; i++) {
            try {
                if (this.data.datasets[i].data.length >= this.config.maxDatapoints) {
                    this.data.datasets[i].data.splice(0, 1);
                }
                this.data.datasets[i].data.push({
                    x: this._seq,
                    y: arguments[i]
                });
            } catch (e) {}
        }
        this.update();
    };
    window.onload = function () {
        var ctx = document.getElementById("chartHead").getContext("2d");
        window.chartHead = new Chart(ctx, configHead);
        var ctx2 = document.getElementById("chartRShoulder").getContext("2d");
        window.chartRShoulder = new Chart(ctx2, configLeftShoulder);
    };
    var gSeed = 345;
    randomScalingFactor = function (min, max) {
        var seed = gSeed;
        min = min === undefined ? -340 : min;
        max = max === undefined ? 340 : max;
        gSeed = (seed * 9301 + 49297) % 233280;
        return min + (gSeed / 233280) * (max - min);
    };

    document.getElementById('addData').addEventListener('click', function () {
        chartHead.addDataPoints(randomScalingFactor(), randomScalingFactor());
        chartRShoulder.addDataPoints(randomScalingFactor(), randomScalingFactor());
    });