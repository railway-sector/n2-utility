export type StatusTypenamesType =
  | "To be Constructed"
  | "Under Construction"
  | "delayed"
  | "Completed";
export type StatusStateType = "comp" | "incomp" | "ongoing" | "delayed";
export type LayerNameType = "utility" | "viaduct" | "others";
export type TypeFieldType = "number" | "string";

export const utilTypeField = "Type";
export const chartCategoryTypeField = "UtilType";
export const status_Field = "Status";
export const cp_field = "CP";
export const company_field = "Company";

export const utilTypeLabels = ["Telecom", "Water", "Sewage", "Power"];
export const utilTypeValue = [1, 2, 3, 4];
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

export const statusColorForChart = [
  "#000000",
  "#f7f7f7ff",
  "#FF0000",
  "#0070ff",
];

export const utility_category_types = utilTypeLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: utilTypeValue[index],
      icon: utilePointTypeIcons[index],
    });
  },
);

export const statusLabels = ["incomp", "comp"];
export const statusValues = [0, 1];
export const statusArray = statusLabels.map((status: any, index: any) => {
  return Object.assign({
    status: status,
    value: statusValues[index],
  });
});
