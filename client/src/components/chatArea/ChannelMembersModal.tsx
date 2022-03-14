import { useGetChannelMembers } from "./hooks/useGetChannelMembers";
import { List, ListItem } from "../library/list/index";
import { FullPageSpinner } from "../library/spinner";
import { ErrorMessage } from "../library/Messages";
import { Modal } from "../library/modal";

import userIcon from "../../assets/user.png";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channelId: string;
};

export function ChannelMembersModal({ isOpen, onClose, channelId }: Props) {
  const { members, isSuccess, isLoading, isError, error } =
    useGetChannelMembers(channelId);

  return (
    <Modal title="Channel members" isOpen={isOpen} onClose={onClose}>
      {isLoading && <FullPageSpinner />}
      {isError && <ErrorMessage message={error.message} />}
      <List>
        {members?.map((member) => (
          <ListItem key={member.id} style={{ height: "60px" }}>
            <img
              className="chat-members__icon"
              src={userIcon}
              alt="user-icon"
            />
            <p>{member.name}</p>
          </ListItem>
        ))}
      </List>
    </Modal>
  );
}
