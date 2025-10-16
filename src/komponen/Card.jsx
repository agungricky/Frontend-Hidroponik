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
            const phRef = ref(db, "tinggiAir");
            const tdsRef = ref(db, "tinggiNutrisi");
            const suhuRef = ref(db, "tinggiWadah");
    
            const unsubscribeAir = onValue(phRef, (snapshot) => {
                settinggiAir(snapshot.val());
                if (snapshot.val() >= 22) {
                    setstatusAir("Penuh");
                } 

                if ((snapshot.val() < 22 ) && (snapshot.val() >= 3)) {
                    setstatusAir("Cukup");
                }

                if (snapshot.val() < 3) {
                    setstatusAir("Habis");
                }
            });
    
            const unsubscribeNutrisi = onValue(tdsRef, (snapshot) => {
                settinggiNutrisi(snapshot.val());
                if (snapshot.val() >= 15) {
                    setstatusNutrisi("Penuh");
                } 

                if ((snapshot.val() < 15 ) && (snapshot.val() >= 3)) {
                    setstatusNutrisi("Cukup");
                }

                if (snapshot.val() < 3) {
                    setstatusNutrisi("Habis");
                }
            });
    
            const unsubscribeWadah = onValue(suhuRef, (snapshot) => {
                settinggiWadah(snapshot.val());
                if (snapshot.val() >= 8) {
                    setstatusWadah("Penuh");
                } 

                if ((snapshot.val() < 8 ) && (snapshot.val() >= 1)) {
                    setstatusWadah("Cukup");
                }

                if (snapshot.val() < 1) {
                    setstatusWadah("Habis");
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
            <PengukurWadah title={"Tinggi Air"} nilai={tinggiAir} status={statusAir}/>
            <PengukurWadah title={"Tinggi Nutrisi"} nilai={tinggiNutrisi} status={statusNutrisi}/>
            <PengukurWadah title={"Tinggi Wadah"} nilai={tinggiWadah} status={statusWadah}/>            
        </div>
    )
}

export default Card
