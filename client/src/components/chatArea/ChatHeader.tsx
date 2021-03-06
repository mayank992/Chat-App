import userLogo from "../../assets/user.png";
import addUserIcon from "../../assets/add-user.png";
import { CHAT_TYPE } from "../../constants";
import { ChannelMembersModal } from "./ChannelMembersModal";
import { AddUserChannelModal } from "./AddUserChannelModal";
import { useWindow } from "../../hooks/useWindow";
import userIcon from "../../assets/user.png";

type ChatHeaderProps = {
  chatType: CHAT_TYPE;
  chat: {
    id: string;
    name: string;
  };
};

export function ChatHeader({ chatType, chat }: ChatHeaderProps) {
  const {
    window: modalName,
    openWindow: openModal,
    closeWindow: closeModal,
  } = useWindow<"addUserChannel" | "channelMembers">();

  return (
    <header className="chat__header">
      <img className="chat__icon" src={userLogo} alt="user-img" />
      <p>{chat.name}</p>
      {chatType === CHAT_TYPE.CHANNEL && (
        <>
          <span
            className="chat__members"
            onClick={() => openModal("channelMembers")}
          >
            <img className="chat-members__icon" src={userIcon} alt="user-img" />
          </span>
          <ChannelMembersModal
            channelId={chat.id}
            isOpen={modalName === "channelMembers"}
            onClose={closeModal}
          />
          <img
            className="add-user__icon"
            src={addUserIcon}
            alt="user-img"
            onClick={() => openModal("addUserChannel")}
          />
          <AddUserChannelModal
            isOpen={modalName === "addUserChannel"}
            onClose={closeModal}
            channelId={chat.id}
          />
        </>
      )}
    </header>
  );
}
