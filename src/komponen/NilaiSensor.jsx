import SpedoMeter from "../section/SpedoMeter";
// import firebase from "../firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";

function NilaiSensor() {
    const [ph, setPh] = useState(null);
    const [tds, setTds] = useState(null);
    const [suhu, setSuhu] = useState(null);

    useEffect(() => {
        const phRef = ref(db, "ph");
        const tdsRef = ref(db, "tds");
        const suhuRef = ref(db, "suhu");

        const unsubscribePh = onValue(phRef, (snapshot) => {
            setPh(snapshot.val());
        });

        const unsubscribeTds = onValue(tdsRef, (snapshot) => {
            setTds(snapshot.val());
        });

        const unsubscribeSuhu = onValue(suhuRef, (snapshot) => {
            setSuhu(snapshot.val());
        });

        return () => {
            unsubscribePh();
            unsubscribeTds();
            unsubscribeSuhu();
        };
    }, []);


    return (
        <div className="row">
            <div className="col-12">
                <div className="card" style={{ borderTop: '4px solid #BADFDB' }}>
                    <div className="card-block">
                        <div className="d-flex flex-wrap mb-4">
                            <div>
                                <h3 className="card-title">Lorem ipsum dolor sit amet.</h3>
                                <h6 className="card-subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eaque.</h6>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row">
                            <SpedoMeter title={"Sensor Ph"} value={ph} satuan={"Ph"} border={true} />
                            <SpedoMeter title={"Sensor TDS"} value={tds} satuan={"Ppm"} border={true} />
                            <SpedoMeter title={"Sensor Suhu"} value={suhu} satuan={"°C"} border={false} />

                            {/* <div className="col-12 col-md-4 text-center mb-sm-5">
                                <div className="custom-border-md">
                                    <h4 className="text-center">
                                        Sensor Ph
                                    </h4>
                                    <GaugeComponent
                                        arc={{
                                            subArcs: [
                                                {
                                                    limit: 20,
                                                    color: '#EA4228',
                                                    showTick: true
                                                },
                                                {
                                                    limit: 40,
                                                    color: '#F58B19',
                                                    showTick: true
                                                },
                                                {
                                                    limit: 60,
                                                    color: '#F5CD19',
                                                    showTick: true
                                                },
                                                {
                                                    limit: 100,
                                                    color: '#5BE12C',
                                                    showTick: true
                                                },
                                            ]
                                        }}
                                        value={50}
                                        labels={{
                                            valueLabel: {
                                                formatTextValue: value => value + ' Ph',
                                                style: { fill: '#393E46', fontSize: '30px', fontFamily: 'Arial' }
                                            }
                                        }}
                                    />
                                </div>
                            </div> */}
                            {/* <div className="col-12 col-md-4 text-center mb-sm-5">
                                <div className="custom-border-md">
                                    <h4 className="text-center">
                                        Sensor TDS
                                    </h4>
                                    <GaugeComponent
                                        arc={{
                                            subArcs: [
                                                {
                                                    limit: 20,
                                                    color: '#EA4228',
                                                    showTick: true
                                                },
                                                {
                                                    limit: 40,
                                                    color: '#F58B19',
                                                    showTick: true
                                                },
                                                {
                                                    limit: 60,
                                                    color: '#F5CD19',
                                                    showTick: true
                                                },
                                                {
                                                    limit: 100,
                                                    color: '#5BE12C',
                                                    showTick: true
                                                },
                                            ]
                                        }}
                                        value={80}
                                        labels={{
                                            valueLabel: {
                                                formatTextValue: value => value + ' Ppm',
                                                style: { fill: '#393E46', fontSize: '30px', fontFamily: 'Arial' }
                                            }
                                        }}
                                    />
                                </div>
                            </div> */}
                            {/* <div className="col-12 col-md-4 text-center">
                                <h4 className="text-center">
                                    Sensor Suhu
                                </h4>
                                <GaugeComponent
                                    arc={{
                                        subArcs: [
                                            {
                                                limit: 20,
                                                color: '#EA4228',
                                                showTick: true
                                            },
                                            {
                                                limit: 40,
                                                color: '#F58B19',
                                                showTick: true
                                            },
                                            {
                                                limit: 60,
                                                color: '#F5CD19',
                                                showTick: true
                                            },
                                            {
                                                limit: 100,
                                                color: '#5BE12C',
                                                showTick: true
                                            },
                                        ]
                                    }}
                                    value={20}
                                    labels={{
                                        valueLabel: {
                                            formatTextValue: value => value + ' °C',
                                            style: { fill: '#393E46', fontSize: '30px', fontFamily: 'Arial' }
                                        }
                                    }}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NilaiSensor
