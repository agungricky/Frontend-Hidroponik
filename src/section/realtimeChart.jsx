import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const RealtimeChart = () => {
    const POINTS = 15;
    const INTERVAL = 1000;
    const now = new Date();

    // 15 data awal
    const initialData = Array.from({ length: POINTS }).map((_, i) => ({
        x: new Date(now.getTime() - (POINTS - i) * INTERVAL),
        y: Math.floor(Math.random() * 1000),
    }));

    const [series, setSeries] = useState([{ name: "Sales", data: initialData }]);

    const options = {
        chart: {
            id: "realtime",
            type: "line",
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: { speed: INTERVAL / 10 }, // gerakan smooth
            },
            zoom: { enabled: false },
        },
        stroke: { curve: "smooth" },
        markers: {
            size: 4, // ukuran marker untuk semua titik
            colors: '#FF5733', // warna marker
        },
        xaxis: {
            type: "datetime",
            tickAmount: 15,
            labels: {
                datetimeUTC: false,
                format: "HH:mm:ss",
                rotate: -45,
            },
        },
        yaxis: { max: 1000 },
        title: { text: "Grafik Chart", align: "left" },
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSeries(prev => {
                const lastTime = prev[0].data[prev[0].data.length - 1].x.getTime();
                const newPoint = { x: new Date(lastTime + INTERVAL), y: Math.floor(Math.random() * 1000) };
                const newData = [...prev[0].data.slice(1), newPoint]; // scroll dengan data baru
                return [{ ...prev[0], data: newData }];
            });
        }, INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="col-12 col-md-6 col-lg-6">
            <div className="card" style={{ borderTop: '4px solid #E0D9D9' }}>
                <div className="card-block">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-wrap">
                                <div>
                                    <h3 className="card-title">Lorem, ipsum.</h3>
                                    <h6 className="card-subtitle">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, provident?</h6>
                                </div>
                            </div>

                            <div className="mt-3">
                                <Chart options={options} series={series} type="line" height={250} width={460} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealtimeChart;


