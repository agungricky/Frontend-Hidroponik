import Title_halaman from "../section/halaman_name";
import NilaiSensor from "../komponen/NilaiSensor";
import RealtimeChart from "../section/realtimeChart";
import BigrealtimeChart from "../section/BigrealtimeChart";
import RiwayatLog from "../komponen/RiwayatLog";
import Linechart_ph from "../section/Linechart_ph";
import Linechart_tds from "../section/Linechart_tds";

function dashboard() {

    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <Title_halaman />
                <NilaiSensor />
                <div className="row">
                    <Linechart_ph/>
                    <Linechart_tds/>
                </div>
                <div className="row">
                    <BigrealtimeChart />
                </div>

                <RiwayatLog />
            </div>
            <footer className="footer"> © 2025 Water Quality </footer>
        </div>
    )
}

export default dashboard
