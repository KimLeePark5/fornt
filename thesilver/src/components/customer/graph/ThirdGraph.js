// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import {ResponsiveBar} from '@nivo/bar'
import {useState} from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ThirdGraph = ({data /* see data tab */}) => {
    const [keys, setKeys] = useState(['여성', '남성']);
    const [graphType, setGraphType] = useState("vertical")
    const onChangeKeys = (e) => {
        switch (e.target.value) {
            case '여성':
                setKeys(['여성']);
                break;
            case '남성':
                setKeys(['남성']);
                break;
            default:
                setKeys(['여성', '남성']);
                break;
        }
    }
    const onClickType = () => {
        graphType === "horizontal" ? setGraphType("vertical"):setGraphType("horizontal")
    }

    return (
        <>
            <div className="customers-graph-title">신규 고객 등록 수</div>
            <div
                className="customers-graph-button"
                onClick={onClickType}
                name="typeButton"
            >
                O
            </div>
            <select
                className="customers-graph-select"
                onChange={onChangeKeys}
                name="selectKey"
            >
                <option value=''>전체 보기</option>
                <option value="여성">여성</option>
                <option value="남성">남성</option>
            </select>
            <ResponsiveBar
                data={data}
                keys={
                    keys
                }
                indexBy="country"
                margin={{top: 50, right: 130, bottom: 50, left: 60}}
                padding={0.3}
                maxValue={8}
                layout={graphType}
                valueScale={{type: "linear"}}
                groupMode="grouped"
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'nivo'}}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '인원 (명)',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </>
    )
}
export default ThirdGraph;