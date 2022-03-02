import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { Modal } from "../Modal";
import {
  getChannelMembers,
  getChannelNonMembers,
  addUserToChannel,
} from "../../helpers/index";
import { ConnectionType } from "../../types";
import { List } from "../common/list/index";
import { Collapsible } from "../common/collapsible";
import userIcon from "../../assets/user.png";

type Props = {
  channelId: string;
};

export function ChannelMembers({ channelId }: Props) {
  const { isOpen, toggle } = useToggle(false);
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
      {isOpen && (
        <Modal>
          <div className="modal-container">
            <div className="chat__members-modal">
              <header className="chat__members-modal-hedear">
                <h3>Members</h3>
                <button onClick={toggle}>X</button>
              </header>
              <Collapsible defaultIsOpen={true}>
                <Collapsible.Header
                  render={(isOpen) => {
                    return (
                      <List.Item>
                        <List.ItemIcon>
                          <div
                            className={"arrow" + (isOpen ? " arrow--down" : "")}
                          ></div>
                        </List.ItemIcon>
                        <p className="list-item__text">In this channel</p>
                      </List.Item>
                    );
                  }}
                />
                <Collapsible.Content>
                  <List>
                    {members.map((member) => (
                      <List.Item
                        key={member.id}
                        style={{ "padding-left": "20px" }}
                      >
                        <List.ItemIcon>
                          <img
                            src={userIcon}
                            alt="user-icon"
                            style={{ maxHeight: "100%" }}
                          />
                        </List.ItemIcon>
                        <p className="list-item__text">{member.name}</p>
                      </List.Item>
                    ))}
                  </List>
                </Collapsible.Content>
              </Collapsible>
              <Collapsible defaultIsOpen={true}>
                <Collapsible.Header
                  render={(isOpen) => {
                    return (
                      <List.Item>
                        <List.ItemIcon>
                          <div
                            className={"arrow" + (isOpen ? " arrow--down" : "")}
                          ></div>
                        </List.ItemIcon>
                        <p className="list-item__text">Not in this channel</p>
                      </List.Item>
                    );
                  }}
                />
                <Collapsible.Content>
                  <List>
                    {nonMembers.map((nonMember) => (
                      <List.Item
                        key={nonMember.id}
                        style={{ "padding-left": "20px" }}
                      >
                        <List.ItemIcon>
                          <img
                            src={userIcon}
                            alt="user-icon"
                            style={{ maxHeight: "100%" }}
                          />
                        </List.ItemIcon>
                        <p className="list-item__text">{nonMember.name}</p>
                        <List.ItemOptions>
                          <button
                            className="channel-members__add-btn"
                            onClick={() => addUser(nonMember.id)}
                          >
                            Add
                          </button>
                        </List.ItemOptions>
                      </List.Item>
                    ))}
                  </List>
                </Collapsible.Content>
              </Collapsible>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
