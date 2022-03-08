import { useState, useCallback } from "react";
import { useUser } from "../../contexts/UserContext";
import { Chat } from "../../components/chat/index";
import { Sidebar } from "../../components/sidebar/index";
import { CHAT_TYPE } from "../../constants/index";
import { getUserDetails } from "../../helpers/index";
import { SplitPane } from "../../components/common/SplitPane";
import { useQuery } from "../../hooks/useQuery";
import "./Main.css";

type Selected = {
  type: CHAT_TYPE;
  id: string | null;
};

export default function Main() {
  const [user] = useUser();
  const { data: userData } = useQuery<any>(
    [user.id],
    ({ signal }) => getUserDetails(user.id, { signal }),
    { refetchInterval: 5000 }
  );
  const [selected, setSelected] = useState<Selected>({
    type: CHAT_TYPE.DM,
    id: null,
  });

  const selectedItem =
    selected.type === CHAT_TYPE.DM
      ? userData?.connections.find(
          (connection: any) => connection.id === selected.id
        )
      : userData?.channels.find((channel: any) => channel.id === selected.id);

  const changeSelected = useCallback((toSelect: Selected) => {
    setSelected(toSelect);
  }, []);

  return (
    <div className="main">
      <div className="main__body">
        <SplitPane
          minWidth="300px"
          leftPane={
            <Sidebar
              users={userData?.connections || []}
              channels={userData?.channels || []}
              selected={selected}
              changeSelected={changeSelected}
            />
          }
          rightPane={
            selectedItem && (
              <Chat
                chatType={selected.type}
                id={selectedItem.id}
                name={selectedItem.name}
              />
            )
          }
        />
      </div>
    </div>
  );
}
