/*
 * LightningChartJS example that showcases creation of a Candlestick-chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Import xydata
const xydata = require('@arction/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, AxisTickStrategies, OHLCFigures, emptyLine, AxisScrollStrategies, Themes } = lcjs

// Import data-generator from 'xydata'-library.
const { createOHLCGenerator } = xydata

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2018, 0, 1)
const dateOriginTime = dateOrigin.getTime()

// Create a XY Chart.
const chart = lightningChart().ChartXY({
    theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
})
// Use DateTime X-axis using with above defined origin.
chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))

chart.setTitle('Candlesticks Chart')
// Style AutoCursor using preset.
chart.setAutoCursor((cursor) => {
    cursor.setTickMarkerYVisible(false)
    cursor.setGridStrokeYStyle(emptyLine)
})
chart.setPadding({ right: 40 })

// Change the title and behavior of the default Y Axis
chart
    .getDefaultAxisY()
    .setTitle('USD')
    .setInterval({ start: 90, end: 110, stopAxisAfter: false })
    .setScrollStrategy(AxisScrollStrategies.expansion)

// Add a OHLC series with Candlestick as type of figures.
const series = chart.addOHLCSeries({ positiveFigure: OHLCFigures.Candlestick })
// Generate some points using 'xydata'-library.
const dataSpan = 10 * 24 * 60 * 60 * 1000
const dataFrequency = 1000 * 60
createOHLCGenerator()
    .setNumberOfPoints(dataSpan / dataFrequency)
    .setStart(100)
    .generate()
    .toPromise()
    // Map x datapoints to start from date origin with the frequency of dataFrequency
    .then((data) =>
        data.map((innerArray) => {
            innerArray[0] = dateOriginTime + innerArray[0] * dataFrequency
            return innerArray
        }),
    )
    // Shift the data by dateOriginTime
    .then((data) =>
        data.map((innerArray) => {
            innerArray[0] = innerArray[0] - dateOriginTime
            return innerArray
        }),
    )
    .then((data) => {
        series.add(data)
    })
