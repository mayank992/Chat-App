import { useToggle } from "../../hooks/useToggle";
import { Icon, Arrow } from "../common/icons/index";
import { useQuery } from "../../hooks/useQuery";
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
  const { data: members, refreshData: refreshMembers } = useQuery<
    ConnectionType[]
  >([channelId], ({ signal }) => getChannelMembers(channelId, { signal }), {
    refetchInterval: 5000,
  });
  const { data: nonMembers, refreshData: refreshNonMembers } = useQuery<
    ConnectionType[]
  >([channelId], ({ signal }) => getChannelNonMembers(channelId, { signal }), {
    refetchInterval: 5000,
  });

  function addUser(userId: string) {
    addUserToChannel(channelId, userId).then(() => {
      refreshMembers();
      refreshNonMembers();
    });
  }

  return (
    <>
      <span className="chat__members" onClick={toggle}>
        <img className="chat-members__icon" src={userIcon} alt="user-img" />
        <p className="chat__members-count">{members?.length}</p>
      </span>
      {isOpen && (
        <Modal>
          <div className="modal-container">
            <div className="chat__members-modal">
              <header className="chat__members-modal-hedear">
                <h3>Members</h3>
                <Icon onClick={toggle}>X</Icon>
              </header>
              <Collapsible defaultIsOpen={true}>
                <Collapsible.Header
                  render={(isOpen) => {
                    return (
                      <List.Item>
                        <List.ItemIcon>
                          <Arrow direction={isOpen ? "down" : "right"}></Arrow>
                        </List.ItemIcon>
                        <p className="list-item__text">In this channel</p>
                      </List.Item>
                    );
                  }}
                />
                <Collapsible.Content>
                  <List>
                    {members?.map((member) => (
                      <List.Item
                        key={member.id}
                        style={{ paddingLeft: "20px" }}
                      >
                        <List.ItemIcon>
                          <img
                            src={userIcon}
                            alt="user-icon"
                            style={{ maxHeight: "100%" }}
                          />
                        </List.ItemIcon>
                        <List.ItemText>{member.name}</List.ItemText>
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
                          <Arrow direction={isOpen ? "down" : "right"}></Arrow>
                        </List.ItemIcon>
                        <p className="list-item__text">Not in this channel</p>
                      </List.Item>
                    );
                  }}
                />
                <Collapsible.Content>
                  <List>
                    {nonMembers?.map((nonMember) => (
                      <List.Item
                        key={nonMember.id}
                        style={{ paddingLeft: "20px" }}
                      >
                        <List.ItemIcon>
                          <img
                            src={userIcon}
                            alt="user-icon"
                            style={{ maxHeight: "100%" }}
                          />
                        </List.ItemIcon>
                        <List.ItemText>{nonMember.name}</List.ItemText>
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
