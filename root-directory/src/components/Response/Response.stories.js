import { Response } from ".";

export default {
  title: "Components/Response",
  component: Response,
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
    styleOutlined: "/img/style-outlined-2.png",
  },
};
