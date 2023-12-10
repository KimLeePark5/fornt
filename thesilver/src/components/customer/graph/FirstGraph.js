// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/radar
import {ResponsiveRadar} from '@nivo/radar'
import {ResponsiveLine} from "@nivo/line";
import {useState} from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const FirstGraph = ({data /* see data tab */}) => {
    const [keys, setKeys] = useState('nivo');

    const onChangeKeys = (e) => {
        switch (e.target.value) {
            case 'nivo':
                setKeys('nivo');
                break;
            case 'category10':
                setKeys('category10');
                break;
            case 'pastel1':
                setKeys('pastel1');
                break;
            default:
                setKeys('nivo');
                break;
        }
    }

    return (
        <>
            <div className="customers-graph-title">신규 고객 등록 수</div>
            <select
                className="customers-graph-select"
                onChange={onChangeKeys}
                name="selectKey"
            >
                <option value="nivo">기본</option>
                <option value="category10">대비</option>
                <option value="pastel1">연하게</option>
            </select>
            <ResponsiveLine
                data={data}
                margin={{top: 60, right: 110, bottom: 40, left: 60}}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: '0',
                    max: 'auto',
                    stacked: false,
                    reverse: false,
                }}
                yFormat=" >-0,.1~"
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: '월별 신규 등록 수',
                    legendOffset: 36,
                    legendPosition: 'middle',

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '인원 (명)',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: keys }}
                lineWidth={3}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </>
    )
}

export default FirstGraph;