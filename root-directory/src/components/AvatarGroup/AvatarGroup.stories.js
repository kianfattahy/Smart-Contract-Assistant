import { AvatarGroup } from ".";

export default {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    size: {
      options: ["large", "small"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    size: "large",
    className: {},
    avatarClassName: {},
    avatarClassNameOverride: {},
    divClassName: {},
    divClassNameOverride: {},
    avatarClassName1: {},
    avatarClassName2: {},
    avatarAvatarClassName: {},
  },
};
