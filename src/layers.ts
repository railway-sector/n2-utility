import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import {
  utilp_renderer,
  utilp2_renderer,
  utilp2_label,
  util_popup,
  utilLineRenderer,
  utill2_line_label,
  via_renderer,
  via_popup,
  minScale,
} from "./uniqueValues";

import {
  portalItems,
  label_chainage,
  chainage_renderer,
  stationbox_renderer,
  prow_renderer,
  label_stationp,
  pierhead_renderer,
  pier_access_label,
} from "./uniqueValues";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 2,
  title: "SC Stations",
  labelingInfo: [label_stationp],
  elevationInfo: { mode: "relative-to-ground" },
});
stationLayer.listMode = "hide";

//--- CHAINAGE LAYER ---//
export const chainageLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 5,
  title: "Chainage",
  elevationInfo: { mode: "relative-to-ground" },
  labelingInfo: [label_chainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainage_renderer,
  popupEnabled: false,
});

//--- STATION BOX LAYER ---//
export const stationBoxLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 3,
  renderer: stationbox_renderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",
  popupEnabled: false,
  elevationInfo: { mode: "on-the-ground" },
});

//--- PIER HEAD & COLUMN LAYER ---//
export const pierHeadColumnLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 4,
  title: "Pile Cap/Column",
  definitionExpression: "Layer <> 'Pier_Head'",
  minScale: 150000,
  maxScale: 0,
  renderer: pierhead_renderer,
  popupEnabled: false,
  elevationInfo: { mode: "on-the-ground" },
});

//--- PIER ACCESS POINT LAYER ---//
export const pierAccessLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 6,
  labelingInfo: [pier_access_label], // [pierAccessReadyDateLabel, pierAccessNotYetLabel, pierAccessDateMissingLabel], //[pierAccessDateMissingLabel, pierAccessReadyDateLabel, pierAccessNotYetLabel],
  title: "Pier Number", //'Pier with Access Date',
  minScale: 150000,
  maxScale: 0,
  popupEnabled: false,
  elevationInfo: { mode: "on-the-ground" },
});

//--- PROW LAYER ---//
export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  layerId: 1,
  title: "PROW",
  popupEnabled: false,
  renderer: prow_renderer,
});

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [
    pierHeadColumnLayer,
    stationBoxLayer,
    chainageLayer,
    pierAccessLayer,
    prowLayer,
  ],
});

//----------------------------------------------//
//                Other Layers                  //
//----------------------------------------------//
//--- DATES FEATURE TABLE ---//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("b2a118b088a44fa0a7a84acbe0844cb2"),
});

//---------------------------------------------//
//           Utility Relocation                //
//---------------------------------------------//
//--- UTILITY POINT LAYER 1 (Point Symbol) ---//
export const utilityPointLayer = new FeatureLayer({
  portalItem: portalItems("7507e625f480470a9af257d60cf67c1c"),
  layerId: 1,
  title: "Point Symbol",
  renderer: utilp_renderer,
  elevationInfo: {
    mode: "relative-to-ground",
    featureExpressionInfo: { expression: "$feature.Height" },
    unit: "meters",
  },
  minScale: minScale,
  popupTemplate: util_popup,
});

//--- UTILITY POINT LAYER 2 (Point Status) ---//
export const utilityPointLayer1 = new FeatureLayer({
  portalItem: portalItems("7507e625f480470a9af257d60cf67c1c"),
  layerId: 1,
  title: "Point Status",
  renderer: utilp2_renderer,
  elevationInfo: {
    mode: "relative-to-ground",
    featureExpressionInfo: { expression: "$feature.Height" },
    unit: "meters",
  },
  labelingInfo: [utilp2_label],
  minScale: minScale,
  popupTemplate: util_popup,
});

//--- UTILITY LINE LAYER 1 (LINE SYMBOL) ---//
export const utilityLineLayer = new FeatureLayer({
  portalItem: portalItems("7507e625f480470a9af257d60cf67c1c"),
  layerId: 2,
  title: "Line Symbol",
  elevationInfo: {
    mode: "relative-to-ground",
    featureExpressionInfo: { expression: "$feature.height" },
    unit: "meters",
  },
  renderer: utilLineRenderer(),
  minScale: minScale,
  popupTemplate: util_popup,
});

//--- UTILITY LINE LAYER 2 (LINE STATUS) ---//
export const utilityLineLayer1 = new FeatureLayer({
  portalItem: portalItems("7507e625f480470a9af257d60cf67c1c"),
  layerId: 2,
  title: "Line Status",
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: { expression: "$feature.height" },
    unit: "meters",
  },
  renderer: utilp2_renderer,
  labelingInfo: [utill2_line_label],
  minScale: minScale,
  popupTemplate: util_popup,
});

export const utilityGroupLayer = new GroupLayer({
  title: "Utility Relocation",
  visible: false,
  visibilityMode: "independent",
  layers: [
    utilityLineLayer1,
    utilityLineLayer,
    utilityPointLayer1,
    utilityPointLayer,
  ],
});

export const utilityLayers: any = {
  Point: [utilityPointLayer, utilityPointLayer1],
  Line: [utilityLineLayer, utilityLineLayer1],
};

//--- VIADUCT MULTIPATCH LAYER ---//
export const viaductLayer = new SceneLayer({
  portalItem: portalItems("3c112d7fe610486eaf4df3eac07d3ea0"),
  elevationInfo: { mode: "absolute-height" },
  title: "Viaduct",
  labelsVisible: false,
  renderer: via_renderer,
  popupTemplate: via_popup,
});

//---------------------------------------------//
//            Other Parameters                 //
//---------------------------------------------//
//--- SEARCH WIDGET
export const sources: any = [
  {
    layer: pierAccessLayer,
    searchFields: ["PierNumber"],
    displayField: "PierNumber",
    exactMatch: false,
    outFields: ["PierNumber"],
    name: "Pier No",
    zoomScale: 1000,
    placeholder: "example: P-288",
  },
  {
    layer: chainageLayer,
    searchFields: ["KmSpot"],
    displayField: "KmSpot",
    exactMatch: false,
    outFields: ["*"],
    zoomScale: 1000,
    name: "Main KM",
    placeholder: "example: 80+400",
  },
  {
    layer: utilityPointLayer,
    searchFields: ["Id"],
    displayField: "Id",
    exactMatch: false,
    outFields: ["Id"],
    name: "Unique ID (Point)",
    placeholder: "example: MER0001-X01",
  },
  {
    layer: utilityLineLayer1,
    searchFields: ["Id"],
    displayField: "Id",
    exactMatch: false,
    outFields: ["Id"],
    name: "Unique ID (Line)",
    placeholder: "example: MER0001-X01",
  },
];
