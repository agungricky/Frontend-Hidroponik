import Title_halaman from "../section/halaman_name";
import Card from "../komponen/Card";
import NilaiSensor from "../komponen/NilaiSensor";
import BigrealtimeChart from "../section/BigrealtimeChartt";
import RiwayatLog from "../komponen/RiwayatLog";
import Linechart_ph from "../section/Linechart_ph";
import Linechart_tds from "../section/Linechart_tds";
import Footer from "../komponen/Footer";

function dashboard() {

    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <Title_halaman />
                <Card />
                <NilaiSensor />
                <div className="row">
                    <Linechart_ph/>
                    <BigrealtimeChart />
                </div>
                <div className="row">
                    <Linechart_tds/>
                </div>

                <RiwayatLog />
            </div>
            <Footer />
        </div>
    )
}

export default dashboard
