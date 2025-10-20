import GaugeComponent from 'react-gauge-component';

function SpedoMeter(props) {
    return (
        <div className="col-12 col-md-4 text-center mb-sm-5">
            <div className={props.border === true ? "custom-border-md" : ""}>
                <h4 className="text-center">
                    {props.title}
                </h4>
                <GaugeComponent
                    minValue={props.min}
                    maxValue={props.max}
                    arc={{
                        subArcs: props.limit
                            .filter(limit => limit >= props.min && limit <= props.max)
                            .map((limit, index) => ({
                                limit,
                                color: props.warna[index],
                                showTick: true,
                            })),
                    }}
                    value={props.value}
                    labels={{
                        valueLabel: {
                            formatTextValue: value => value + ' ' + props.satuan,
                            style: { fill: '#393E46', fontSize: '30px', fontFamily: 'Arial' },
                        },
                    }}
                />

                <table className='m-auto'>
                    <tbody>
                        <tr>
                            <td>{props.keterangan[0]}</td>
                        </tr>
                        <tr>
                            <td>{props.keterangan[1]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SpedoMeter
