import { Edit } from ".";

export default {
  title: "Components/Edit",
  component: Edit,
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
    styleOutlined: "/img/style-outlined-1.png",
  },
};
