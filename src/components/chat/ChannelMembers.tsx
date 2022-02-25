import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { Modal } from "../Modal";
import { getMembers } from "../../helpers/index";
import { KnownUserType } from "../../types";
import { ListItem, ListItemIcon, ListItemText } from "../collapsibleList/index";
import addUserIcon from "../../add-user.png";
import userIcon from "../../user.png";

type Props = {
  channelId: string;
};

export function ChannelMembers({ channelId }: Props) {
  const { open, toggle } = useToggle(false);
  const [members, setMembers] = useState<KnownUserType[]>([]);

  useEffect(() => {
    getMembers(channelId).then((data) => setMembers(data));
  }, []);

  return (
    <>
      <span className="chat__members" onClick={toggle}>
        <img className="chat-members__icon" src={userIcon} />
        <p className="chat__members-count">{8}</p>
      </span>
      {open && (
        <Modal>
          <div className="modal-container">
            <div className="chat__members-modal">
              <header className="chat__members-modal-hedear">
                <h3>Members</h3>
                <button onClick={toggle}>X</button>
              </header>
              <dl className="chat__members-modal-body">
                <ListItem
                  selected={false}
                  onClick={() => {}}
                  style={{ padding: "5px 20px", height: "60px" }}
                >
                  <ListItemIcon src={addUserIcon} />
                  <ListItemText text="Add People" />
                </ListItem>
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
              </dl>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
