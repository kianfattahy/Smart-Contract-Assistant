import { TextFinishedWrapper } from ".";

export default {
  title: "Components/TextFinishedWrapper",
  component: TextFinishedWrapper,
  argTypes: {
    text: {
      options: ["finished", "Strong", "Moderate", "created"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    showIcons: true,
    text: "finished",
    className: {},
  },
};
