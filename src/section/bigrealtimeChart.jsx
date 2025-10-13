import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { db } from "../Firebase";
import { onValue, ref } from "firebase/database";
import api from "../Restapi";

const Bigrealtimechart = () => {
    const [series, setSeries] = useState([{ name: "SUHU", data: [] }]);
    const recordRef = useRef([]);
    const suhuRef = useRef(null);
    const [suhu, setSuhu] = useState(null);

    // --- STEP 1: Ambil data awal dari database ---
    useEffect(() => {
        api
            .get("/sensor")
            .then((response) => {
                console.log("Response /sensor:", response.data);

                const sensorData = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data.data)
                    ? response.data.data
                    : [];

                const formattedData = sensorData.map((item) => ({
                    x: new Date(item.created_at),
                    y: parseFloat(item.suhu),
                }));

                recordRef.current = formattedData;
                setSeries([{ name: "SUHU", data: formattedData }]);
            })
            .catch((error) => {
                console.error("Error fetching initial data:", error);
            });
    }, []);

    // --- STEP 2: Ambil data realtime dari Firebase ---
    useEffect(() => {
        const suhuDb = ref(db, "suhu");
        const unsubSuhu = onValue(suhuDb, (snap) => {
            const value = snap.val();
            if (value !== null) setSuhu(value);
        });

        return () => unsubSuhu();
    }, []);

    // --- STEP 3: Setiap kali suhu berubah, update chart ---
    useEffect(() => {
        if (suhu !== null) {
            const newData = [
                ...recordRef.current,
                { x: new Date(), y: parseFloat(suhu) },
            ].slice(-15);

            recordRef.current = newData;
            setSeries([{ name: "SUHU", data: newData }]);
        }
    }, [suhu]);

    const options = {
        chart: {
            id: "realtime",
            type: "line",
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: { speed: 500 },
            },
            zoom: { enabled: false },
        },
        stroke: { curve: "smooth" },
        markers: { size: 4, colors: "#FF5733" },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
                format: "HH:mm:ss",
                rotate: -45,
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            title: { text: "Nilai Suhu" },
        },
        title: {
            text: "Realtime Suhu Chart",
            align: "left",
        },
    };

    return (
        <div className="col-lg-12 col-md-12">
            <div className="card" style={{ borderTop: "4px solid #F0E4D3" }}>
                <div className="card-block">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-wrap">
                                <div>
                                    <h3 className="card-title">Realtime Suhu</h3>
                                    <h6 className="card-subtitle">
                                        Menampilkan data suhu dari database dan update dari Firebase
                                    </h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-wrap mt-4">
                            {series[0].data.length > 0 ? (
                                <Chart
                                    options={options}
                                    series={series}
                                    type="line"
                                    height={300}
                                    width={1000}
                                />
                            ) : (
                                <p>Memuat data dari server...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bigrealtimechart;
