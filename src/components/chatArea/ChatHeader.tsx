import userLogo from "../../assets/user.png";
import addUserIcon from "../../assets/add-user.png";
import { CHAT_TYPE } from "../../constants";
import { ChannelMembers } from "./ChannelMembers";
import { Modal, ModalOpenButton, ModalContents } from "../common/modal/index";
import { AddUserChannel } from "./AddUserChannel";

type ChatHeaderProps = {
  name: string;
  id: string;
  chatType: CHAT_TYPE;
};

export function ChatHeader({ name, chatType, id }: ChatHeaderProps) {
  return (
    <header className="chat__header">
      <img className="chat__icon" src={userLogo} alt="user-img" />
      <p>{name}</p>
      {chatType === CHAT_TYPE.CHANNEL && (
        <>
          <ChannelMembers channelId={id} />
          <Modal>
            <ModalOpenButton>
              <img
                className="add-user__icon"
                src={addUserIcon}
                alt="user-img"
              />
            </ModalOpenButton>
            <ModalContents title="Add user">
              <AddUserChannel channelId={id} />
            </ModalContents>
          </Modal>
        </>
      )}
    </header>
  );
}
