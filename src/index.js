/*
 * LightningChartJS example that showcases creation of a Candlestick-chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    AxisTickStrategies,
    OHLCFigures,
    emptyLine,
    AxisScrollStrategies,
    Themes
} = lcjs

// Import data-generator from 'xydata'-library.
const {
    createOHLCGenerator
} = require('@arction/xydata')

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2018, 0, 1)

// Create a XY Chart.
const chart = lightningChart().ChartXY({
    // theme: Themes.darkGold
})
// Use DateTime X-axis using with above defined origin.
chart
    .getDefaultAxisX()
    .setTickStrategy(
        AxisTickStrategies.DateTime,
        (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin)
    )

chart.setTitle('Candlesticks Chart')
// Style AutoCursor using preset.
chart.setAutoCursor(cursor => {
    cursor.disposeTickMarkerY()
    cursor.setGridStrokeYStyle(emptyLine)
})
chart.setPadding({ right: 40 })

// Change the title and behavior of the default Y Axis
chart.getDefaultAxisY()
    .setTitle('USD')
    .setInterval(90, 110)
    .setScrollStrategy(AxisScrollStrategies.expansion)

// Add a OHLC series with Candlestick as type of figures.
const series = chart.addOHLCSeries({ positiveFigure: OHLCFigures.Candlestick })
// Generate some points using 'xydata'-library.
const dataSpan = 10 * 24 * 60 * 60 * 1000
const dataFrequency = 1000 * 60
createOHLCGenerator()
    .setNumberOfPoints(dataSpan / dataFrequency)
    .setDataFrequency(dataFrequency)
    .setStart(100)
    .generate()
    .toPromise()
    .then(data => {
        series.add(data)
    })
