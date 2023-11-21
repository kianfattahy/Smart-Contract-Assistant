import { Chip } from ".";

export default {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    text: {
      options: ["churned", "customer"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    showIcons: true,
    text: "churned",
    className: {},
    nameArrowNarrowUpNameArrowNarrowUp: "/img/icons-1.png",
    divClassName: {},
    text1: "Customer",
  },
};
