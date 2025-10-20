import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { onValue, ref } from "firebase/database";

function HalamanName() {
    const [StatusTandonAir, setStatusTandonAir] = useState(null);
    const [StatusTandonNutrisi, setStatusTandonNutrisi] = useState(null);

    useEffect(() => {
        const tandonAirRef = ref(db, "tinggiAir");
        const tandonNutrisiRef = ref(db, "tinggiNutrisi");
        // const tiggiWadahRef = ref(db, "tinggiWadah");

        const unsubscribeAir = onValue(tandonAirRef, (snapshot) => {
            const tinggiAir = snapshot.val();
            tinggiAir === 0 ? setStatusTandonAir(true) : setStatusTandonAir(false);
        });

        const unsubscribeNutrisi = onValue(tandonNutrisiRef, (snapshot) => {
            const tinggiNutrisi = snapshot.val();
            tinggiNutrisi === 0 ? setStatusTandonNutrisi(true) : setStatusTandonNutrisi(false);
        });

        return () => {
            unsubscribeAir();
            unsubscribeNutrisi();
            // unsubscribeWadah();
        };
    }, []);

    return (
        <div className="row page-titles position-relative">
            <div className="col-md-5 col-8 align-self-center">
                <h3 className="text-themecolor">Dashboard</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>

            {StatusTandonAir && (
                <div
                    className="alert alert-danger floating-alert show m-0 py-2 px-4"
                    role="alert"
                >
                    <i className="fa-solid fa-exclamation"></i> Tandon Air kosong
                </div>
            )}

            {StatusTandonNutrisi && (
                <div
                    className="alert alert-danger floating-alert show m-0 py-2 px-4"
                    role="alert"
                >
                    <i class="fa-solid fa-exclamation"></i> Tandon Nutrisi kosong
                </div>
            )}
        </div>
    );
}

export default HalamanName;
