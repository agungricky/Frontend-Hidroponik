import GaugeComponent from 'react-gauge-component';

function SpedoMeter(props) {
    return (
        <div className="col-12 col-md-4 text-center mb-sm-5">
            <div className={props.border === true ? "custom-border-md" : ""}>
                <h4 className="text-center">
                    {props.title}
                </h4>
                {/* <GaugeComponent
                    minValue={0}
                    maxValue={15}
                    arc={{
                        subArcs: [
                            {
                                limit: props.limit[0],
                                color: '#EA4228',
                                showTick: true
                            },
                            {
                                limit: props.limit[1],
                                color: '#F58B19',
                                showTick: true
                            },
                            {
                                limit: props.limit[2],
                                color: '#F5CD19',
                                showTick: true
                            },
                            {
                                limit: props.limit[3],
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
                /> */}

                <GaugeComponent
                    minValue={props.min}
                    maxValue={props.max}
                    arc={{
                        subArcs: props.limit
                            .filter(limit => limit >= props.min && limit <= props.max) 
                            .map((limit, index) => ({
                                limit,
                                color: ['#EA4228', '#F58B19', '#F5CD19', '#5BE12C', '#EA4228'][index],
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

            </div>
        </div>
    )
}

export default SpedoMeter
