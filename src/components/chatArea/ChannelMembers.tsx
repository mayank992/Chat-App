import { useQuery } from "../../hooks/useQuery";
import { Modal, ModalOpenButton, ModalContents } from "../common/modal";
import { getChannelMembers } from "../../helpers/index";
import { List, ListItem } from "../common/list/index";
import { ConnectionType } from "../../types";
import userIcon from "../../assets/user.png";

type Props = {
  channelId: string;
};

export function ChannelMembers({ channelId }: Props) {
  const { data: members } = useQuery<ConnectionType[]>(
    [channelId],
    ({ signal }) => getChannelMembers(channelId, { signal }),
    { refetchInterval: 5000 }
  );

  return (
    <Modal>
      <ModalOpenButton>
        <span className="chat__members">
          <img className="chat-members__icon" src={userIcon} alt="user-img" />
          <p className="chat__members-count">{members?.length}</p>
        </span>
      </ModalOpenButton>
      <ModalContents title="Members">
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
      </ModalContents>
    </Modal>
  );
}
