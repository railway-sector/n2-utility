/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useMemo, useRef, useState } from "react";
import {
  utilityPointLayer1,
  utilityLineLayer1,
  utilityPointLayer,
  utilityLineLayer,
  utilityLayers,
} from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { thousands_separators, zoomToLayer } from "../query";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import {
  cp_f,
  util_comp_f,
  util_dtype_f,
  util_status_f,
  util_status_q,
  util_type_f,
  util_types,
  viastatus_q,
} from "../uniqueValues";
import { queryDefinitionExpression } from "../queryExpression";
import { legendSetter, rootSetter } from "../chartSetter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";
import ChartStackColumns from "chart-stack-column";
import ChartStackColumnRender from "chart-stack-column-render";
import QueryExpressionLayers from "query-layers-expression";
import { MyContext } from "../contexts/MyContext";

//-----------------------//
//     usetUtilityData   //
//-----------------------//
function useUtilityData(
  cpackage: string,
  company: string,
  utype: string,
  query: any,
) {
  return useQuery<ChartResponse | any>({
    queryKey: [
      cpackage,
      company,
      utype,
      utilityPointLayer,
      utilityPointLayer1,
      utilityLineLayer,
      utilityLineLayer1,
      util_status_f,
      query,
    ],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: query.queryExpression(),
        featureLayer: [
          utilityPointLayer,
          utilityPointLayer1,
          utilityLineLayer,
          utilityLineLayer1,
        ],
      });

      //--- chart data
      const chartData = await new ChartStackColumns({
        where: query,
        categoryTypes: util_types,
        categoryTypeField: util_type_f,
        layers: [utilityPointLayer, utilityLineLayer],
        statusField: util_status_f,
        statusState: [0, 2, 3, 1],
      }).chartDataStackColumns();

      return {
        chartData: chartData[0] || [],
        totaln: chartData[1] || 0,
        perc: chartData[2] || 0,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
}

// Draw chart
const Chart = () => {
  const { cpackage, company, utype } = use(MyContext);

  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  //--Recompute only when utype is updated
  const rLayers = useMemo(
    () => (!utype ? Object.values(utilityLayers).flat() : utilityLayers[utype]),
    [utype],
  );

  //--- Query Expression
  const q1 = new QueryExpressionLayers({
    qFields: [cp_f, util_comp_f, util_dtype_f],
    qValues: [cpackage, company, utype],
  });

  const { data, isLoading } = useUtilityData(cpackage, company, utype, q1);

  const chartData = data?.chartData || [];
  const totaln = data?.totaln || 0;
  const perc_comp = data?.perc || 0;

  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const rendererRef = useRef<ChartStackColumnRender | null>(null);
  const chartID = "utility_chart";

  // Define parameters
  const marginTop = 0;
  const marginLeft = 0;
  const marginRight = 0;
  const marginBottom = 0;
  const paddingTop = 10;
  const paddingLeft = 5;
  const paddingRight = 5;
  const paddingBottom = 0;
  const chartIconPositionX = -21;
  const chartPaddingRightIconLabel = 45;
  const chartBorderLineColor = "#00c5ff";
  const chartBorderLineWidth = 0.4;

  // ************************************
  //  Responsive Chart parameters
  // ***********************************
  const fontSize = chartPanelwidth / 20;
  const valueSize = fontSize * 1.55;
  const chartIconSize = chartPanelwidth * 0.08;
  const axisFontSize = chartPanelwidth * 0.036;
  const imageSize = chartPanelwidth * 0.055;

  //--- Signature of the filters that should trigger a re-zoom.
  //  Set once from the true first render — NOT reset inside the
  //  effect — so React 18 StrictMode's dev-only double effect
  //  invoke (mount -> cleanup -> mount) sees "nothing changed"
  //  on both passes and correctly skips the zoom both times.
  //  A zoom only fires once one of these values genuinely
  //  changes on a later, real render.
  const zoomFiltersRef = useRef(`${cpackage}-${company}-${utype}`);

  useEffect(() => {
    const currentZoomFilters = `${cpackage}-${company}-${utype}`;

    if (currentZoomFilters !== zoomFiltersRef.current) {
      zoomFiltersRef.current = currentZoomFilters;
      zoomToLayer(utilityPointLayer, arcgisScene?.view);
    }
  }, [chartData]);

  //--- Keep click-handler-relevant values fresh without rebuilding the
  //    chart. view lives here too (not passed statically to the
  //    renderer) since arcgis-scene's view may not be ready on first
  //    mount.
  const configBaseArgs = {
    revit: false,
    layers: rLayers,
    buildingLayer: undefined,
    chartCategoryTypeField: util_type_f,
    where: q1,
    status_field: util_status_f,
    view: arcgisScene?.view,
  };
  const configRef = useRef({ ...configBaseArgs });
  useEffect(() => {
    configRef.current = { ...configBaseArgs };
  }, [data, util_status_f, arcgisScene]);

  //---  Column Chart Renderer — created ONCE (mount only)
  useEffect(() => {
    const root = rootSetter({ chartID: chartID });
    root.setThemes([]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        scale: 1,
        height: am5.percent(100),
      }),
    );
    chartRef.current = chart;

    const legend = legendSetter({
      chart: chart,
      root: root,
      centerX: 50,
      centerY: 50,
      x: 60,
      y: 97,
      marginTop: 20,
      layout: root.horizontalLayout,
    });
    legendRef.current = legend;

    //--- NOTE: no `view` here — it's read live from configRef.current
    //    inside chartrender.ts, since arcgis-scene may not have a
    //    ready `.view` yet at this point.
    const renderer = new ChartStackColumnRender({
      root,
      chart,
      data: [],
      configRef,
      chartCategoryTypes: util_types,
      statusTypename: ["Completed", "To be Constructed"], //["Completed", "To be Constructed", "Under Construction"],
      statusStatename: ["comp", "incomp"], //["comp", "incomp", "ongoing"],
      statusArray: util_status_q,
      seriesStatusColor: viastatus_q.map((c: any) => c.color),
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      chartIconSize,
      axisFontSize,
      chartIconPositionX,
      chartPaddingRightIconLabel,
      legend,
      updateChartPanelwidth: setChartPanelwidth,
    });
    rendererRef.current = renderer;
    renderer.chartRendererColumn();

    return () => {
      root.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--- Push new data / inner value / affected-area figures into the
  //    already-mounted chart. No dispose, no rebuild -> no blink.
  //    NOTE: affectedAreaValue is NOT called here directly — it's
  //    registered once inside chartrender.ts and reads live data via
  //    closures, which updateData() keeps in sync. Calling it here on
  //    every render would both miss the first paint and stack
  //    duplicate adapters.
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer || !chartPanelwidth) return; // wait for a real width

    //--- Sizes are captured at construction, so refresh them here
    renderer.chartIconSize = chartIconSize;
    renderer.axisFontSize = axisFontSize;

    renderer.updateData(chartData);
  }, [chartData, chartPanelwidth]);

  const primaryLabelColor = "#9ca3af";
  const valueLabelColor = "#d1d5db";

  return (
    <>
      <div
        slot="panel-end"
        style={{
          padding: "0 1rem",
          borderStyle: "solid",
          borderRightWidth: 3.5,
          borderLeftWidth: 3.5,
          borderBottomWidth: 3.5,
          borderColor: "#555555",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src="https://EijiGorilla.github.io/Symbols/Utility_Logo.png"
            alt="Utility Logo"
            height={`${imageSize}%`}
            width={`${imageSize}%`}
            style={{ marginLeft: "15px", marginTop: "10px" }}
          />
          <dl style={{ alignItems: "center", marginRight: "25px" }}>
            <dt
              style={{
                color: primaryLabelColor,
                fontSize: `${fontSize}px`,
              }}
            >
              TOTAL PROGRESS
            </dt>
            <dd
              style={{
                color: valueLabelColor,
                fontSize: `${valueSize}px`,
                fontWeight: "bold",
                fontFamily: "calibri",
                lineHeight: "1.2",
                margin: "auto",
                opacity: isLoading ? 0 : 1,
              }}
            >
              {thousands_separators(perc_comp)} %
            </dd>
            <div
              style={{
                color: valueLabelColor,
                fontSize: `${valueSize}*0.5px`,
                fontFamily: "calibri",
                lineHeight: "1.2",
                opacity: isLoading ? 0 : 1,
              }}
            >
              ({thousands_separators(totaln)})
            </div>
          </dl>
        </div>

        <div
          id={chartID}
          style={{
            width: "23vw",
            height: "71vh",
            backgroundColor: "rgb(0,0,0,0)",
            color: "white",
            marginRight: "10px",
            marginTop: "10px",
            opacity: isLoading ? 0 : 1,
          }}
        ></div>
      </div>
    </>
  );
};

export default Chart;
