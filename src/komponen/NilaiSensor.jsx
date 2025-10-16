import SpedoMeter from "../section/SpedoMeter";
// import firebase from "../firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";

function NilaiSensor() {
    const [ph, setPh] = useState(null);
    const [tds, setTds] = useState(null);
    const [suhu, setSuhu] = useState(null);
    const [autoPh, setAutoPh] = useState(null);
    const [autoTds, setAutoTds] = useState(null);
    const [autoSuhu, setAutoSuhu] = useState(null);

    const [keteranganSuhu, setKeteranganSuhu] = useState([]);
    const [keteranganPh, setKeteranganPh] = useState([]);
    const [keteranganTds, setKeteranganTds] = useState([]);

    useEffect(() => {
        const phRef = ref(db, "ph");
        const tdsRef = ref(db, "tds");
        const suhuRef = ref(db, "suhu");
        const autoPhRef = ref(db, "autoPh");
        const autoTdsRef = ref(db, "autoTds");
        const autoSuhuRef = ref(db, "autoSuhu");

        const unsubscribePh = onValue(phRef, (snapshot) => {
            setPh(snapshot.val());
        });

        const unsubscribeTds = onValue(tdsRef, (snapshot) => {
            setTds(snapshot.val());
        });

        const unsubscribeSuhu = onValue(suhuRef, (snapshot) => {
            setSuhu(snapshot.val());
        });

        const unsubscribeAutoPh = onValue(autoPhRef, (snapshot) => {
            setAutoPh(snapshot.val());
        });

        const unsubscribeAutoTds = onValue(autoTdsRef, (snapshot) => {
            setAutoTds(snapshot.val());
        });

        const unsubscribeAutoSuhu = onValue(autoSuhuRef, (snapshot) => {
            setAutoSuhu(snapshot.val());
        });

        return () => {
            unsubscribePh();
            unsubscribeTds();
            unsubscribeSuhu();
            unsubscribeAutoPh();
            unsubscribeAutoTds();
            unsubscribeAutoSuhu();
        };
    }, []);

    useEffect(() => {
        if (ph === null || autoPh === null) return;

        const max = autoPh + 0.5;
        const min = autoPh - 0.5;

        if (ph < min) {
            setKeteranganPh(["Asam", "Pompa Air Menyala"]);
        } else if (ph >= min && ph <= max) {
            setKeteranganPh(["Normal", null]);
        } else {
            setKeteranganPh(["Basa", "Pompa Air Menyala"]);
        }
    }, [ph, autoPh])

    useEffect(() => {
        if (tds === null || autoTds === null) return;

        if (tds < autoTds) {
            setKeteranganTds(["Nutrisi Kurang", "Pompa Nutrisi Menyala"]);
        } else {
            setKeteranganTds(["Nutrisi Cukup", null]);
        }
    }, [tds, autoTds])

    useEffect(() => {
        if (suhu === null || autoSuhu === null) return;

        const max = autoSuhu + 0.5;

        if (suhu < autoSuhu) {
            setKeteranganSuhu(["Dingin", null]);
        } else if (suhu >= autoSuhu && suhu <= max) {
            setKeteranganSuhu(["Normal", null]);
        } else {
            setKeteranganSuhu(["Hangat", null]);
        }
    }, [suhu, autoSuhu])

    return (
        <div className="row">
            <div className="col-12">
                <div className="card" style={{ borderTop: '4px solid #BADFDB' }}>
                    <div className="card-block">
                        <div className="d-flex flex-wrap mb-4">
                            <div className="m-auto">
                                <h3 className="card-title">Realtime Data Sensor.</h3>
                                <h6 className="card-subtitle">Menampilkan data sensor secara langsung untuk memantau kondisi sistem hidroponik secara real-time.</h6>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row">
                            <SpedoMeter title={"Sensor Ph"} value={ph} satuan={"Ph"} border={true} limit={[0, 4, 9, 14]} min={0} max={14} keterangan={keteranganPh} />
                            <SpedoMeter title={"Sensor TDS"} value={tds} satuan={"Ppm"} border={true} limit={[0, 500, 1000, 1500, 2000]} min={0} max={2000} keterangan={keteranganTds} />
                            <SpedoMeter title={"Sensor Suhu"} value={suhu} satuan={"°C"} border={false} limit={[0, 40, 80, 100]} min={0} max={100} keterangan={keteranganSuhu} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NilaiSensor
