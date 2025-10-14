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
                                <h3 className="card-title">Realtime Data Sensor.</h3>
                                <h6 className="card-subtitle">Menampilkan data sensor secara langsung untuk memantau kondisi sistem hidroponik secara real-time.</h6>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row">
                            <SpedoMeter title={"Sensor Ph"} value={ph} satuan={"Ph"} border={true} limit={[0, 4, 9, 14]} min={0} max={14} />
                            <SpedoMeter title={"Sensor TDS"} value={tds} satuan={"Ppm"} border={true} limit={[0, 500, 1000, 1500, 2000]} min={0} max={2000} />
                            <SpedoMeter title={"Sensor Suhu"} value={suhu} satuan={"°C"} border={false} limit={[0, 40, 80, 100]} min={0} max={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NilaiSensor
