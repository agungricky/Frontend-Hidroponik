
import Table from "../section/Table";
import Form from "../section/Form";

function RiwayatLog() {
    return (
        <div className="row">
            <div className="col-lg-12 col-xlg-12 col-md-12">
                <div className="card" style={{ borderTop: '4px solid #A3CCDA' }}>
                    <ul className="nav nav-tabs profile-tab" role="tablist">
                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#table" role="tab">Riwayat Log</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#settings" role="tab">Settings</a> </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="table" role="tabpanel">
                            <div className="card-block">
                                <Table />
                            </div>
                        </div>
                        <div className="tab-pane" id="settings" role="tabpanel">
                            <div className="card-block">
                                <Form />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiwayatLog
