import { AutoFixNormal } from ".";

export default {
  title: "Components/AutoFixNormal",
  component: AutoFixNormal,
  argTypes: {
    style: {
      options: ["round", "sharp", "filled", "two-tone", "outlined"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    style: "round",
    className: {},
    styleOutlined: "/img/style-outlined-3.png",
  },
};
