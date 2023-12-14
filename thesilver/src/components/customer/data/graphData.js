export const firstGraphData = ({slicedData1,slicedData2,slicedData3,slicedData4}) =>

    [
    {
        "id": "2023년",
        "data": [
            {
                "x": "7월",
                "y": 6
            },
            {
                "x": "8월",
                "y": 7
            },
            {
                "x": "9월",
                "y": 8
            },
            {
                "x": "10월",
                "y": 9
            },
            {
                "x": "11월",
                "y": 10
            },
            {
                "x": "12월",
                "y": 11
            },

        ]
    },
    {
        "id": "70대",
        "data": [
            {
                "x": "7월",
                "y": 3
            },
            {
                "x": "8월",
                "y": 5
            },
            {
                "x": "9월",
                "y": 6
            },
            {
                "x": "10월",
                "y": 10
            },
            {
                "x": "11월",
                "y": 6
            },
            {
                "x": "12월",
                "y": 10
            },

        ]
    },
    {
        "id": "80대",
        "data": [
            {
                "x": "7월",
                "y": 2
            },
            {
                "x": "8월",
                "y": 2
            },
            {
                "x": "9월",
                "y": 5
            },
            {
                "x": "10월",
                "y": 7
            },
            {
                "x": "11월",
                "y": 5
            },
            {
                "x": "12월",
                "y": 8
            },

        ]
    },
    {
        "id": "90세 이상",
        "data": [
            {
                "x": "7월",
                "y": 1
            },
            {
                "x": "8월",
                "y": 2
            },
            {
                "x": "9월",
                "y": 1
            },
            {
                "x": "10월",
                "y": 3
            },
            {
                "x": "11월",
                "y": 2
            },
            {
                "x": "12월",
                "y": 3
            },

        ]
    }
]

export const secondGraphData = ({secondGraphData}) =>
    secondGraphData.map((item) => ({
        "taste": item.primaryAddress,
        "50년대": item.fifties,
        "40년대": item.forties,
        "30년대": item.thirties,
        "20년대이하": item.twenties
    }))


export const thirdGraphData = ({thirdGraphData}) => [
    {
        "country": thirdGraphData[3].month + "월",
        "여성": thirdGraphData[3].countFemale,
        "여성Color": "hsl(72, 70%, 50%)",
        "남성": thirdGraphData[3].countMale,
        "남성Color": "hsl(336, 70%, 50%)",
        "sandwich": 44,
        "sandwichColor": "hsl(232, 70%, 50%)",
        "kebab": 100,
        "kebabColor": "hsl(308, 70%, 50%)",
        "fries": 76,
        "friesColor": "hsl(278, 70%, 50%)",
        "donut": 197,
        "donutColor": "hsl(196, 70%, 50%)"
    },
    {
        "country": thirdGraphData[2].month + "월",
        "여성": thirdGraphData[2].countFemale,
        "여성Color": "hsl(354, 70%, 50%)",
        "남성": thirdGraphData[2].countMale,
        "남성Color": "hsl(201, 70%, 50%)",
        "sandwich": 30,
        "sandwichColor": "hsl(112, 70%, 50%)",
        "kebab": 83,
        "kebabColor": "hsl(183, 70%, 50%)",
        "fries": 196,
        "friesColor": "hsl(128, 70%, 50%)",
        "donut": 139,
        "donutColor": "hsl(263, 70%, 50%)"
    },
    {
        "country": thirdGraphData[1].month + "월",
        "여성": thirdGraphData[1].countFemale,
        "여성Color": "hsl(346, 70%, 50%)",
        "남성": thirdGraphData[1].countMale,
        "남성Color": "hsl(202, 70%, 50%)",
        "sandwich": 182,
        "sandwichColor": "hsl(114, 70%, 50%)",
        "kebab": 156,
        "kebabColor": "hsl(216, 70%, 50%)",
        "fries": 194,
        "friesColor": "hsl(182, 70%, 50%)",
        "donut": 47,
        "donutColor": "hsl(349, 70%, 50%)"
    },
    {
        "country": thirdGraphData[0].month + "월",
        "여성": thirdGraphData[0].countFemale,
        "여성Color": "hsl(287, 70%, 50%)",
        "남성": thirdGraphData[0].countMale,
        "남성Color": "hsl(259, 70%, 50%)",
        "sandwich": 184,
        "sandwichColor": "hsl(47, 70%, 50%)",
        "kebab": 129,
        "kebabColor": "hsl(231, 70%, 50%)",
        "fries": 44,
        "friesColor": "hsl(209, 70%, 50%)",
        "donut": 171,
        "donutColor": "hsl(66, 70%, 50%)"
    },

]