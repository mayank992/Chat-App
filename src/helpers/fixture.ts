import { MESSAGE_TYPE } from "../constants/index";
import {
  UserType,
  KnownUserType,
  ChannelType,
  KnownChannelType,
  MessageType,
} from "../types";

export const users: UserType[] = [
  {
    id: "1",
    name: "Mayank Jindal",
    username: "mayank992",
  },
  {
    id: "2",
    name: "Rishi Goel",
    username: "rishi992",
  },
  {
    id: "3",
    name: "Rishab",
    username: "rishab992",
  },
  {
    id: "4",
    name: "Mridul",
    username: "mridul992",
  },
];

export const knownUsers: KnownUserType[] = [
  {
    id: "2",
    name: "Rishi Goel",
    username: "rishi992",
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Mridul",
    username: "mridul992",
    unreadCount: 10,
  },
  {
    id: "5",
    name: "Enan",
    username: "rishi992",
    unreadCount: 0,
  },
  {
    id: "6",
    name: "Caloman",
    username: "mridul992",
    unreadCount: 2,
  },
  {
    id: "7",
    name: "Cassemir",
    username: "rishi992",
    unreadCount: 0,
  },
  {
    id: "8",
    name: "Lukius",
    username: "mridul992",
    unreadCount: 0,
  },
  {
    id: "9",
    name: "Cyrla",
    username: "rishi992",
    unreadCount: 0,
  },
  {
    id: "10",
    name: "Railan",
    username: "mridul992",
    unreadCount: 0,
  },
  {
    id: "11",
    name: "Cassemir",
    username: "rishi992",
    unreadCount: 0,
  },
  {
    id: "12",
    name: "Lukius",
    username: "mridul992",
    unreadCount: 0,
  },
  {
    id: "13",
    name: "Cyrla",
    username: "rishi992",
    unreadCount: 0,
  },
  {
    id: "14",
    name: "Railan",
    username: "mridul992",
    unreadCount: 0,
  },
];

export const channels: ChannelType[] = [
  {
    id: "10",
    name: "help-learn-sam",
  },
  {
    id: "20",
    name: "jan2021",
  },
  {
    id: "30",
    name: "security",
  },
  {
    id: "40",
    name: "frontend-project",
  },
];

export const knownChannels: KnownChannelType[] = [
  {
    id: "30",
    name: "security",
    unreadCount: 2,
  },
  {
    id: "40",
    name: "frontend-project",
    unreadCount: 1,
  },
];

export const messages: MessageType[] = [
  {
    id: "1",
    type: MESSAGE_TYPE.CHANNEL,
    from: {
      id: "1",
      name: "Mayank Jindal",
      username: "mayank992",
    },
    to: {
      id: "3",
      name: "Rishab",
      username: "rishab992",
    },
    text: "Hello!",
    time: "1:14 PM",
    seen: false,
  },
  {
    id: "2",
    type: MESSAGE_TYPE.DM,
    from: {
      id: "2",
      name: "Rishi Goel",
      username: "rishab992",
    },
    to: {
      id: "4",
      name: "Mridul",
      username: "mridul992",
    },
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus arcu, dignissim at dolor eu, rutrum accumsan metus. Fusce justo enim, efficitur at tincidunt tristique, mattis a nulla. Praesent interdum nisi eu mi rutrum, sed interdum libero laoreet. Sed vestibulum erat mollis purus aliquam, eget pretium nisi finibus. Curabitur eu neque in nunc semper cursus. Proin vitae sapien interdum, congue lorem at, ornare quam. Suspendisse in lectus iaculis, lacinia erat vitae, pretium metus. Suspendisse tincidunt rhoncus nunc, in dictum ex dapibus nec. Proin tempus vitae lacus fermentum fermentum. Nulla eleifend semper elit, vitae gravida enim rutrum aliquet. Nullam ut porta mi. Suspendisse pulvinar ante sem, vitae dapibus eros egestas a.",
    time: "1:14 PM",
    seen: false,
  },
  {
    id: "3",
    type: MESSAGE_TYPE.CHANNEL,
    from: {
      id: "2",
      name: "Rishi Goel",
      username: "rishi992",
    },
    to: {
      id: "1",
      name: "Mayank Jindal",
      username: "mayank992",
    },
    text: "This is the text.",
    time: "1:14 PM",
    seen: true,
  },
  {
    id: "4",
    type: MESSAGE_TYPE.CHANNEL,
    from: {
      id: "1",
      name: "Mayank Jindal",
      username: "mayank992",
    },
    to: {
      id: "3",
      name: "Rishab",
      username: "rishab992",
    },
    text: "Hello!",
    time: "1:14 PM",
    seen: false,
  },
  {
    id: "5",
    type: MESSAGE_TYPE.DM,
    from: {
      id: "2",
      name: "Rishi Goel",
      username: "rishab992",
    },
    to: {
      id: "4",
      name: "Mridul",
      username: "mridul992",
    },
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus arcu, dignissim at dolor eu, rutrum accumsan metus. Fusce justo enim, efficitur at tincidunt tristique, mattis a nulla. Praesent interdum nisi eu mi rutrum, sed interdum libero laoreet. Sed vestibulum erat mollis purus aliquam, eget pretium nisi finibus. Curabitur eu neque in nunc semper cursus. Proin vitae sapien interdum, congue lorem at, ornare quam. Suspendisse in lectus iaculis, lacinia erat vitae, pretium metus. Suspendisse tincidunt rhoncus nunc, in dictum ex dapibus nec. Proin tempus vitae lacus fermentum fermentum. Nulla eleifend semper elit, vitae gravida enim rutrum aliquet. Nullam ut porta mi. Suspendisse pulvinar ante sem, vitae dapibus eros egestas a.",
    time: "1:14 PM",
    seen: false,
  },
  {
    id: "6",
    type: MESSAGE_TYPE.CHANNEL,
    from: {
      id: "2",
      name: "Rishi Goel",
      username: "rishi992",
    },
    to: {
      id: "1",
      name: "Mayank Jindal",
      username: "mayank992",
    },
    text: "This is the text.",
    time: "1:14 PM",
    seen: true,
  },
  {
    id: "7",
    type: MESSAGE_TYPE.CHANNEL,
    from: {
      id: "1",
      name: "Mayank Jindal",
      username: "mayank992",
    },
    to: {
      id: "3",
      name: "Rishab",
      username: "rishab992",
    },
    text: "Hello!",
    time: "1:14 PM",
    seen: false,
  },
  {
    id: "8",
    type: MESSAGE_TYPE.DM,
    from: {
      id: "2",
      name: "Rishi Goel",
      username: "rishab992",
    },
    to: {
      id: "4",
      name: "Mridul",
      username: "mridul992",
    },
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus arcu, dignissim at dolor eu, rutrum accumsan metus. Fusce justo enim, efficitur at tincidunt tristique, mattis a nulla. Praesent interdum nisi eu mi rutrum, sed interdum libero laoreet. Sed vestibulum erat mollis purus aliquam, eget pretium nisi finibus. Curabitur eu neque in nunc semper cursus. Proin vitae sapien interdum, congue lorem at, ornare quam. Suspendisse in lectus iaculis, lacinia erat vitae, pretium metus. Suspendisse tincidunt rhoncus nunc, in dictum ex dapibus nec. Proin tempus vitae lacus fermentum fermentum. Nulla eleifend semper elit, vitae gravida enim rutrum aliquet. Nullam ut porta mi. Suspendisse pulvinar ante sem, vitae dapibus eros egestas a.",
    time: "1:14 PM",
    seen: false,
  },
  {
    id: "9",
    type: MESSAGE_TYPE.CHANNEL,
    from: {
      id: "2",
      name: "Rishi Goel",
      username: "rishi992",
    },
    to: {
      id: "1",
      name: "Mayank Jindal",
      username: "mayank992",
    },
    text: "This is the text.",
    time: "1:14 PM",
    seen: true,
  },
];
