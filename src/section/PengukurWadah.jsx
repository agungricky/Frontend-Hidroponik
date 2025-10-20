function PengukurWadah(props) {
    return (
        <div className="col-lg-4 mb-4">
            <div className="card h-100 border-start-lg border-start-primary" style={{ borderTop: "4px solid #B6CEB4" }}>
                <div className="card-body">
                    <div className="small text-muted mb-2">{props.title}</div>
                    <div className="h3 m-1">{props.nilai}</div>
                    <div className="text-arrow-icon small">
                        Dalam Keadaan {props.status}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PengukurWadah
