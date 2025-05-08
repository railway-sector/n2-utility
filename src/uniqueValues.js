import Collection from "@arcgis/core/core/Collection";
import ActionButton from "@arcgis/core/support/actions/ActionButton";

export const utilTypeField = "UtilType";
export const utilStatusField = "Status";
export const utilTypes = [
  {
    type: "Telecom",
    value: 1,
  },
  {
    type: "Water",
    value: 2,
  },
  {
    type: "Sewage",
    value: 3,
  },
  {
    type: "Power",
    value: 4,
  },
];
export const utilePointTypeIcons = [
  "https://EijiGorilla.github.io/Symbols/Telecom_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Water_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Sewage_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Power_Logo2.svg",
];

// Layter list
export async function defineActions(event) {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Chainage" ||
  item.title === "Viaduct" ||
  item.title === "Pier No"
    ? (item.visible = false)
    : (item.visible = true);
}
