import { Cell } from ".";

export default {
  title: "Components/Cell",
  component: Cell,
  argTypes: {
    type: {
      options: ["row", "header"],
      control: { type: "select" },
    },
    content: {
      options: ["icon", "checkbox", "button", "blank", "text", "label"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    type: "row",
    content: "icon",
    twoNdText: true,
    iconLeft: true,
    iconRight: true,
    className: {},
    rowCellText: "Header",
    rowCellDivClassName: {},
    rowCellIconEllipsisVIconEllipsisVClassName: {},
  },
};
