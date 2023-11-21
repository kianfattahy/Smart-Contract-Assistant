import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    color: {
      options: ["primary", "gray", "secondary"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Button",
    showIconLeft: true,
    showIconRight: true,
    color: "primary",
    colorPrimaryClassName: {},
    frameClassName: {},
    divClassName: {},
  },
};
