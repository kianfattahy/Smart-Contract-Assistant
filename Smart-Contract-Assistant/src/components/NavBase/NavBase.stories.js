import { NavBase } from ".";

export default {
  title: "Components/NavBase",
  component: NavBase,
  argTypes: {
    property1: {
      options: ["two", "one", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "two",
    className: {},
    text: "Home",
  },
};
