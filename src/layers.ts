import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import {
  PointSymbol3D,
  IconSymbol3DLayer,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  WebStyleSymbol,
  LineSymbol3D,
  PathSymbol3DLayer,
  MeshSymbol3D,
  FillSymbol3DLayer,
  LabelSymbol3D,
  TextSymbol3DLayer,
} from "@arcgis/core/symbols";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import SizeVariable from "@arcgis/core/renderers/visualVariables/SizeVariable";
import RotationVariable from "@arcgis/core/renderers/visualVariables/RotationVariable";
import { labelSymbol3DLine } from "./Label";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
////////////////////////////// test est
/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

/* Chainage Layer  */
var labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

var chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 5,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,

  popupEnabled: false,
});

// * Pier No layer * //
const pierNoLayerTextSymbol = labelSymbol3DLine({
  materialColor: "white",
  fontSize: 10,
  fontFamily: "Ubuntu Mono",
  fontWeight: "normal",
  haloColor: "black",
  haloSize: 1,
  vOffsetScreenLength: 100,
  vOffsetMaxWorldLength: 100,
  vOffsetMinWorldLength: 20,
  calloutColor: "white",
  calloutSize: 0.7,
  calloutBorderColor: "grey",
});

var pierNoLabelClass = new LabelClass({
  symbol: pierNoLayerTextSymbol,
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
    //value: "{TEXTSTRING}"
  },
});

export const pierNoLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 6,
  labelingInfo: [pierNoLabelClass],
  elevationInfo: {
    mode: "on-the-ground", //absolute-height, relative-to-ground
  },
  title: "Pier No",

  popupEnabled: false,
});

// * Station Box * //
let stationBoxRenderer = new UniqueValueRenderer({
  field: "Layer",
  uniqueValueInfos: [
    {
      value: "00_Platform",
      label: "Platform",
      symbol: new SimpleFillSymbol({
        color: [160, 160, 160],
        style: "backward-diagonal",
        outline: {
          width: 1,
          color: "black",
        },
      }),
    },
    {
      value: "00_Platform 10car",
      label: "Platform 10car",
      symbol: new SimpleFillSymbol({
        color: [104, 104, 104],
        style: "cross",
        outline: {
          width: 1,
          color: "black",
          style: "short-dash",
        },
      }),
    },
    {
      value: "00_Station",
      label: "Station Box",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2,
          color: [115, 0, 0],
        },
      }),
    },
  ],
});

export const stationBoxLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  renderer: stationBoxRenderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",

  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

// * Pier Head column * //
let pierHeadColRenderer = new UniqueValueRenderer({
  field: "Layer",
  //defaultSymbol: { type: 'simple-fill' }, // autocasts as new SimpleFillSymbol()
  uniqueValueInfos: [
    {
      // All features with value of "North" will be blue
      value: "Pier_Column",
      symbol: new SimpleFillSymbol({
        color: [78, 78, 78, 0.5],
      }),
    },
    {
      // All features with value of "North" will be blue
      value: "Pier_Head",
      symbol: new SimpleFillSymbol({
        color: [169, 169, 169, 0.7],
      }),
    },
  ],
});

export const pierHeadColumnLayerLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  title: "Pier Head/Column",

  renderer: pierHeadColRenderer,
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: false,
});

// * PROW *//
var prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const rowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  layerId: 1,
  title: "ROW",
  renderer: prowRenderer,
  definitionExpression: "Extension = 'N2'",
  popupEnabled: false,
});

// * Station Layer * //
const stationLayerTextSymbol = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "#d4ff33",
        },
        size: 13,
        halo: {
          color: "black",
          size: 0.5,
        },
        font: {
          family: "Ubuntu Mono",
        },
      }),
    ],
    verticalOffset: {
      screenLength: 70,
      maxWorldLength: 200,
      minWorldLength: 150,
    },
    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: "white",
      size: 0.7,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: 'DefaultValue($feature.Station, "no data")',
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Station",
  labelingInfo: [stationLayerTextSymbol],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});
stationLayer.listMode = "hide";

// * Utility Point * //
function customSymbol3D(name: string) {
  return new WebStyleSymbol({
    //portal: 'https://www.maps.arcgis.com',
    // IMPORTANT: Your browser needs to be able to open the following link. It will say insecure so need to go to advanced.
    styleUrl:
      "https://www.maps.arcgis.com/sharing/rest/content/items/c04d4d4145f64f8fa38407dd5331dd1f/data",
    name: name,
  });
}

function utilPtSymbolInfra(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriInfrastructureStyle",
  });
}

function utilPtSymbolStreet(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriRealisticStreetSceneStyle",
  });
}

const verticalOffsetRelocation = {
  screenLength: 10,
  maxWorldLength: 30,
  minWorldLength: 35,
};

// Function that automatically creates the symbol for the points of interest
function getUniqueValueSymbol(name: string, color: any, sizeS: number) {
  return new PointSymbol3D({
    symbolLayers: [
      new IconSymbol3DLayer({
        resource: {
          href: name,
        },
        size: sizeS,
        outline: {
          color: color,
          size: 2,
        },
      }),
    ],

    verticalOffset: verticalOffsetRelocation,

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.1],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  });
}

const utilPointSymbolRenderer = new UniqueValueRenderer({
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.UtilType2 == 1, 'Telecom Pole (BTS)', \
                        $feature.UtilType2 == 2, 'Telecom Pole (CATV)', \
                        $feature.UtilType2 == 3, 'Water Meter', \
                        $feature.UtilType2 == 4, 'Water Valve', \
                        $feature.UtilType2 == 5, 'Manhole', \
                        $feature.UtilType2 == 6, 'Drain Box', \
                        $feature.UtilType2 == 7, 'Electric Pole', \
                        $feature.UtilType2 == 8, 'Street Light', \
                        $feature.UtilType2 == 9, 'Junction Box', \
                        $feature.UtilType2 == 10, 'Coupling', \
                        $feature.UtilType2 == 11, 'Fitting', \
                        $feature.UtilType2 == 12, 'Transformer', \
                        $feature.UtilType2 == 13, 'Truss Guy', \
                        $feature.UtilType2 == 14, 'Concrete Pedestal', \
                        $feature.UtilType2 == 15, 'Ground', \
                        $feature.UtilType2 == 16, 'Down Guy', \
                        $feature.UtilType2 == 17, 'Entry/Exit Pit', \
                        $feature.UtilType2 == 18, 'Handhole', \
                        $feature.UtilType2 == 19, 'Transmission Tower', \
                        $feature.UtilType)",
  uniqueValueInfos: [
    {
      value: "Telecom Pole (BTS)",
      symbol: customSymbol3D("3D_Telecom_BTS"),
    },
    {
      value: "Telecom Pole (CATV)",
      symbol: customSymbol3D("3D_TelecomCATV_Pole"),
    },
    {
      value: "Manhole",
      symbol: utilPtSymbolStreet("Storm_Drain"),
    },
    {
      value: "Electric Pole",
      //symbol: utilPtSymbolInfra("Powerline_Pole")
      symbol: customSymbol3D("3D_Electric_Pole"),
    },
    {
      value: "Street Light",
      symbol: utilPtSymbolStreet("Overhanging_Street_and_Sidewalk_-_Light_on"),
    },
    {
      value: "Junction Box",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Coupling",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Fitting",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Transformer",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Truss Guy",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Concrete Pedestal",
      symbol: customSymbol3D("Concrete Pedestal"),
    },
    {
      value: "Ground",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Down Guy",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Entry/Exit Pit",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Handhole",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Transmission Tower",
      symbol: utilPtSymbolInfra("Powerline_Pole"),
    },
  ],
  visualVariables: [
    new SizeVariable({
      axis: "height",
      field: "SIZE",
      valueUnit: "meters",
    }),
    new RotationVariable({
      field: "ROTATION",
    }),
  ],
});

export const utilityPointLayer = new FeatureLayer({
  portalItem: {
    id: "7507e625f480470a9af257d60cf67c1c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Point Symbol",

  renderer: utilPointSymbolRenderer,
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.Height",
    },
    unit: "meters",
    //offset: 0
  },
  popupTemplate: {
    title: "<h5>{comp_agency}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

const utilityStatusRenderer = new UniqueValueRenderer({
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.Remarks == 'pending', 'NoAction', \
                        $feature.Status == 1 && $feature.LAYER == 1, 'DemolishComplete',\
                        $feature.Status == 0 && $feature.LAYER == 1, 'DemolishIncomplete',\
                        $feature.Status == 0 && $feature.LAYER == 2, 'RelocIncomplete', \
                        $feature.Status == 1 && $feature.LAYER == 2, 'RelocComplete', \
                        $feature.Status == 0 && $feature.LAYER == 3, 'NewlyAdded', \
                        $feature.Status == 1 && $feature.LAYER == 3, 'NewlyAddedComplete',$feature.Comp_Agency)",
  uniqueValueInfos: [
    {
      value: "DemolishIncomplete",
      label: "To be Demolished",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Demolished.png",
        "#D13470",
        20
      ),
    },
    {
      value: "DemolishComplete",
      label: "Demolision Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
        "#D13470",
        25
      ),
    },
    {
      value: "RelocIncomplete",
      label: "Proposed Relocation",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Relocatd.png",
        "#D13470",
        30
      ),
    },
    {
      value: "RelocComplete",
      label: "Relocation Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Utility_Relocated_Completed_Symbol.png",
        "#D13470",
        30
      ),
    },
    {
      value: "NewlyAdded",
      label: "Add New Utility",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded.png",
        "#D13470",
        35
      ),
    },
    {
      value: "NewlyAddedComplete",
      label: "Newly Utility Added",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded_Completed.png",
        "#D13470",
        35
      ),
    },
    {
      value: "NoAction",
      label: "Require Data Checking",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Unknown_v2.png",
        "#D13470",
        35
      ),
    },
  ],
});

const utilPointStatusTextSymbol = labelSymbol3DLine({
  materialColor: "white",
  fontSize: 10,
  haloColor: [0, 0, 0, 0.7],
  haloSize: 0.4,
});

const utilPointStatusLabel = new LabelClass({
  labelPlacement: "above-center",
  labelExpressionInfo: {
    //value: "{Company}",
    expression:
      "When($feature.Status >= 0, DomainName($feature, 'Comp_Agency'), '')", //$feature.Comp_Agency
  },
  symbol: utilPointStatusTextSymbol,
});

export const utilityPointLayer1 = new FeatureLayer({
  portalItem: {
    id: "7507e625f480470a9af257d60cf67c1c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Point Status",

  renderer: utilityStatusRenderer,
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.Height",
    },
    unit: "meters",
    //offset: 0
  },
  labelingInfo: [utilPointStatusLabel],
  popupTemplate: {
    title: "<h5>{comp_agency}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

// * Utility Line * //
const utilLineStatusRenderer = new UniqueValueRenderer({
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.Remarks == 'pending', 'NoAction', \
                        $feature.Status == 1 && $feature.LAYER == 1, 'DemolishComplete',\
                        $feature.Status == 0 && $feature.LAYER == 1, 'DemolishIncomplete',\
                        $feature.Status == 0 && $feature.LAYER == 2, 'RelocIncomplete', \
                        $feature.Status == 1 && $feature.LAYER == 2, 'RelocComplete', \
                        $feature.Status == 0 && $feature.LAYER == 3, 'NewlyAdded', \
                        $feature.Status == 1 && $feature.LAYER == 3, 'NewlyAddedComplete',$feature.Comp_Agency)",
  //field: "Company",
  uniqueValueInfos: [
    {
      value: "DemolishIncomplete",
      label: "To be Demolished",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Demolished.png",
        "#D13470",
        20
      ),
    },
    {
      value: "DemolishComplete",
      label: "Demolision Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
        "#D13470",
        25
      ),
    },
    {
      value: "RelocIncomplete",
      label: "Proposed Relocation",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Relocatd.png",
        "#D13470",
        30
      ),
    },
    {
      value: "RelocComplete",
      label: "Relocation Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Utility_Relocated_Completed_Symbol.png",
        "#D13470",
        30
      ),
    },
    {
      value: "NewlyAdded",
      label: "Add New Utility",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded.png",
        "#D13470",
        35
      ),
    },
    {
      value: "NewlyAddedComplete",
      label: "Newly Utility Added",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded_Completed.png",
        "#D13470",
        35
      ),
    },
    {
      value: "NoAction",
      label: "Require Data Checking",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Unknown_v2.png",
        "#D13470",
        35
      ),
    },
  ],
});

export const utilityLineLayer = new FeatureLayer({
  portalItem: {
    id: "7507e625f480470a9af257d60cf67c1c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Line Symbol ", // Relocation PLan?
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.height",
    },
    unit: "meters",
    //offset: 0
  },

  popupTemplate: {
    title: "<h5>{comp_agency}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

const utilLineColor = [
  [32, 178, 170, 0.5], //Telecom Line
  [112, 128, 144, 0.5], // Internet Cable Line
  [0, 128, 255, 0.5], // Water Distribution Pipe
  [224, 224, 224, 0.5], // Sewage
  [105, 105, 105, 0.5], // Drainage
  [205, 133, 63, 0.5], // Canal
  [139, 69, 19, 0.5], // Creek
  [211, 211, 211, 0.5], // Electric Line
  [0, 128, 255, 0.5], // Duct Bank
  [0, 128, 255, 0.5], // Water line
  [0, 128, 255, 0.5], // Gas Line
];

function lineSizeShapeSymbolLayers(
  profile: "circle" | "quad" | undefined,
  cap: "round" | "none" | "butt" | "square" | undefined,
  join: "round" | "miter" | "bevel" | undefined,
  width: number,
  height: number,
  profileRotation: "heading" | "all" | undefined,
  property: number
) {
  return new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        profile: profile,
        material: {
          color: utilLineColor[property],
        },
        width: width,
        height: height,
        join: join,
        cap: cap,
        anchor: "bottom",
        profileRotation: profileRotation,
      }),
    ],
  });
}

function renderutilityLineLayer() {
  const renderer = new UniqueValueRenderer({
    field: "utiltype2",
  });

  for (var i = 1; i <= utilLineColor.length; i++) {
    renderer.addUniqueValueInfo({
      value: i,
      symbol: lineSizeShapeSymbolLayers(
        "circle",
        "none",
        "miter",
        0.5,
        0.5,
        "all",
        i - 1
      ),
    });
  }
  utilityLineLayer.renderer = renderer;
}

renderutilityLineLayer();

const utilLineStatusTextSymbol = labelSymbol3DLine({
  materialColor: "black",
  fontSize: 10,
  haloColor: [255, 255, 255, 0.7],
  haloSize: 0.7,
});

const utilityLineLabelClass = new LabelClass({
  //labelPlacement: 'above-center', // Polyline has not choice
  labelExpressionInfo: {
    expression:
      "When($feature.Status >= 0, DomainName($feature, 'Comp_Agency'), '')",
  },
  symbol: utilLineStatusTextSymbol,
});

export const utilityLineLayer1 = new FeatureLayer({
  portalItem: {
    id: "7507e625f480470a9af257d60cf67c1c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Line Status",
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.height",
    },
    unit: "meters",
    //offset: 0
  },

  renderer: utilLineStatusRenderer,
  labelingInfo: [utilityLineLabelClass],
  popupTemplate: {
    title: "<h5>{comp_agency}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

// * Viaduct * //
const colorViaduct = [
  [225, 225, 225, 0.1], // To be Constructed (white)
  [130, 130, 130, 0.5], // Under Construction
  [255, 0, 0, 0.8], // Delayed
  [0, 112, 255, 0.8], // Completed
];

function renderViaductLayer() {
  const renderer = new UniqueValueRenderer({
    field: "Status",
  });

  for (var i = 0; i < colorViaduct.length; i++) {
    renderer.addUniqueValueInfo({
      value: i + 1,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorViaduct[i],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    });
  }
  viaductLayer.renderer = renderer;
}

export const viaductLayer = new SceneLayer({
  portalItem: {
    id: "3c112d7fe610486eaf4df3eac07d3ea0",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "absolute-height", //absolute-height, relative-to-ground
  },
  title: "Viaduct",
});

renderViaductLayer();

export const utilityGroupLayer = new GroupLayer({
  title: "Utility Relocation",
  visible: true,
  visibilityMode: "independent",
  layers: [
    utilityLineLayer1,
    utilityLineLayer,
    utilityPointLayer1,
    utilityPointLayer,
  ],
});

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [
    pierHeadColumnLayerLayer,
    stationBoxLayer,
    chainageLayer,
    pierNoLayer,
    rowLayer,
  ], //stationLayer,
});
