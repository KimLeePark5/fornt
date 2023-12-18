// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import {ResponsiveLine} from '@nivo/line'
import {ResponsiveRadar} from "@nivo/radar";
import {useState} from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const SecondGraph = ({data /* see data tab */}) => {
    const [keys, setKeys] = useState(['50-59년생', '40-49년생', '30-39년생', '30년생이하']);

    const onChangeKeys = (e) => {
        switch (e.target.value) {
            case '50-59년생':
                setKeys(['50-59년생']);
                break;
            case '40-49년생':
                setKeys(['40-49년생']);
                break;
            case '30-39년생':
                setKeys(['30-39년생']);
                break;
            case '30년생이하':
                setKeys(['30년생이하']);
                break;
            default:
                setKeys(['50-59년생', '40-49년생', '30-39년생', '30년생이하']);
                break;
        }
    }

    return (
        <>
            <div className="customers-graph-title">고객 지역 분포</div>
            <select
                className="customers-graph-select"
                onChange={onChangeKeys}
                name="selectKey"
            >
                <option value=''>전체 보기</option>
                <option value="50-59년생">50-59년생</option>
                <option value="40-49년생">40-49년생</option>
                <option value="30-39년생">30-39년생</option>
                <option value="30년생이하">30년생이하</option>
            </select>
            <ResponsiveRadar
                data={data}
                keys={keys}
                indexBy="taste"
                valueFormat=">-.2f"
                margin={{top: 70, right: 80, bottom: 40, left: 80}}
                borderColor={{from: 'color'}}
                gridLabelOffset={30}
                dotSize={10}
                dotColor={{theme: 'background'}}
                dotBorderWidth={2}
                colors={{scheme: 'nivo'}}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </>
    )
}

export default SecondGraph;