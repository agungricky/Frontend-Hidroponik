import { useEffect, useState } from "react";
import PengukurWadah from "../section/PengukurWadah"
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
function Card() {
    const [tinggiAir, settinggiAir] = useState(null);
    const [tinggiNutrisi, settinggiNutrisi] = useState(null);
    const [tinggiWadah, settinggiWadah] = useState(null);

    const [statusAir, setstatusAir] = useState(null);
    const [statusNutrisi, setstatusNutrisi] = useState(null);
    const [statusWadah, setstatusWadah] = useState(null);

    useEffect(() => {
        const tandonAirRef = ref(db, "tinggiAir");
        const tandonNutrisiRef = ref(db, "tinggiNutrisi");
        const tiggiWadahRef = ref(db, "tinggiWadah");

        const unsubscribeAir = onValue(tandonAirRef, (snapshot) => {
            settinggiAir(snapshot.val());
            if (snapshot.val() >= 22) {
                setstatusAir("Penuh");
            } else if ((snapshot.val() < 22) && (snapshot.val() >= 3)) {
                setstatusAir("Cukup");
            } else if (snapshot.val() < 3) {
                setstatusAir("Habis");
            }
        });

        const unsubscribeNutrisi = onValue(tandonNutrisiRef, (snapshot) => {
            settinggiNutrisi(snapshot.val());
            if (snapshot.val() >= 15) {
                setstatusNutrisi("Penuh");
            } else if ((snapshot.val() < 15) && (snapshot.val() >= 3)) {
                setstatusNutrisi("Cukup");
            } else if (snapshot.val() < 3) {
                setstatusNutrisi("Habis");
            }
        });

        const unsubscribeWadah = onValue(tiggiWadahRef, (snapshot) => {
            settinggiWadah(snapshot.val());
            if (snapshot.val() == 0) {
                setstatusWadah("Cukup");
            } else if (snapshot.val() == 1) {
                setstatusWadah("Penuh");
            }
        });

        return () => {
            unsubscribeAir();
            unsubscribeNutrisi();
            unsubscribeWadah();
        };
    }, []);

    return (
        <div className="row my-3">
            <PengukurWadah title={"Tinggi Air"} nilai={tinggiAir} status={statusAir} satuan={true} />
            <PengukurWadah title={"Tinggi Nutrisi"} nilai={tinggiNutrisi} status={statusNutrisi} satuan={true} />
            <PengukurWadah title={"Tinggi Wadah"} nilai={tinggiWadah} status={statusWadah} satuan={false} />
        </div>
    )
}

export default Card
