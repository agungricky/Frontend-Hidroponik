import Title_halaman from "../section/halaman_name";
import NilaiSensor from "../komponen/NilaiSensor";
import RealtimeChart from "../section/realtimeChart";
import BigrealtimeChart from "../section/bigrealtimeChart";
import RiwayatLog from "../komponen/RiwayatLog";

function dashboard() {

    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <Title_halaman />
                <NilaiSensor />
                <div className="row">
                    <RealtimeChart />
                    <RealtimeChart />
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
