import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { Modal } from "../Modal";
import {
  getChannelMembers,
  getChannelNonMembers,
  addUserToChannel,
} from "../../helpers/index";
import { ConnectionType } from "../../types";
import { ListItem, ListItemIcon, ListItemText } from "../collapsibleList/index";
import { CollapsibleList } from "../collapsibleList/index";
import userIcon from "../../assets/user.png";

type Props = {
  channelId: string;
};

export function ChannelMembers({ channelId }: Props) {
  const { open, toggle } = useToggle(false);
  const [members, setMembers] = useState<ConnectionType[]>([]);
  const [nonMembers, setNonMembers] = useState<ConnectionType[]>([]);

  function refreshData() {
    getChannelMembers(channelId).then((data: ConnectionType[]) =>
      setMembers(data)
    );
    getChannelNonMembers(channelId).then((data: ConnectionType[]) =>
      setNonMembers(data)
    );
  }

  useEffect(() => {
    refreshData();
  }, [channelId]);

  function addUser(userId: string) {
    addUserToChannel(channelId, userId).then(() => refreshData());
  }

  return (
    <>
      <span className="chat__members" onClick={toggle}>
        <img className="chat-members__icon" src={userIcon} />
        <p className="chat__members-count">{members.length}</p>
      </span>
      {open && (
        <Modal>
          <div className="modal-container">
            <div className="chat__members-modal">
              <header className="chat__members-modal-hedear">
                <h3>Members</h3>
                <button onClick={toggle}>X</button>
              </header>
              <CollapsibleList title="In this channel" addDisabled={true}>
                {members.map((member) => {
                  return (
                    <ListItem
                      key={member.id}
                      selected={false}
                      onClick={() => {}}
                      style={{ padding: "5px 20px", height: "60px" }}
                    >
                      <ListItemIcon src={userIcon} />
                      <ListItemText text={member.name} />
                    </ListItem>
                  );
                })}
              </CollapsibleList>
              <CollapsibleList title="Not in this channel" addDisabled={true}>
                {nonMembers.map((member) => {
                  return (
                    <ListItem
                      key={member.id}
                      selected={false}
                      onClick={() => {}}
                      style={{ padding: "5px 20px", height: "60px" }}
                    >
                      <ListItemIcon src={userIcon} />
                      <ListItemText text={member.name} />
                      <button
                        className="channel-members__add-btn"
                        onClick={() => addUser(member.id)}
                      >
                        Add
                      </button>
                    </ListItem>
                  );
                })}
              </CollapsibleList>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

//  className="chat__members-modal-body"
