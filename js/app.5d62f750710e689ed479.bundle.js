(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const i=s(89),a=s(863),{lightningChart:r,AxisTickStrategies:n,OHLCFigures:o,emptyLine:l,AxisScrollStrategies:g,Themes:h}=i,{createOHLCGenerator:c}=a,d=new Date(2018,0,1),k=d.getTime(),S=r().ChartXY({theme:h[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0});S.getDefaultAxisX().setTickStrategy(n.DateTime,(e=>e.setDateOrigin(d))),S.setTitle("Candlesticks Chart"),S.setAutoCursor((e=>{e.setTickMarkerYVisible(!1),e.setGridStrokeYStyle(l)})),S.setPadding({right:40}),S.getDefaultAxisY().setTitle("USD").setInterval({start:90,end:110,stopAxisAfter:!1}).setScrollStrategy(g.expansion);const m=S.addOHLCSeries({positiveFigure:o.Candlestick});c().setNumberOfPoints(14400).setStart(100).generate().toPromise().then((e=>e.map((e=>(e[0]=k+6e4*e[0],e))))).then((e=>e.map((e=>(e[0]=e[0]-k,e))))).then((e=>{m.add(e)}))}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);