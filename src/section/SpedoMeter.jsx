import GaugeComponent from 'react-gauge-component';

function SpedoMeter(props) {
    return (
        <div className="col-12 col-md-4 text-center mb-sm-5">
            <div className={props.border === true ? "custom-border-md" : ""}>
                <h4 className="text-center">
                    {props.title}
                </h4>
                <GaugeComponent
                    arc={{
                        subArcs: [
                            {
                                limit: 20,
                                color: '#EA4228',
                                showTick: true
                            },
                            {
                                limit: 40,
                                color: '#F58B19',
                                showTick: true
                            },
                            {
                                limit: 60,
                                color: '#F5CD19',
                                showTick: true
                            },
                            {
                                limit: 100,
                                color: '#5BE12C',
                                showTick: true
                            },
                        ]
                    }}
                    value={props.value}
                    labels={{
                        valueLabel: {
                            formatTextValue: value => value + ' ' + props.satuan,
                            style: { fill: '#393E46', fontSize: '30px', fontFamily: 'Arial' }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default SpedoMeter
