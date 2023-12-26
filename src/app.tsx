// @refresh reload

import "./app.css";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { BoxInfo, MENU_TYPE } from "./constant";
import Editor from "./components/editor";
import Viewer from "./components/viewer";

export default function App() {
  const [menuType, setMenuType] = createSignal(MENU_TYPE.CLOSE);
  const [boxList, setBoxList] = createStore(Array<BoxInfo>());

  return (
    <main onclick={() => setMenuType(MENU_TYPE.CLOSE)}>
      <Editor
        menuType={menuType()}
        setMenuType={setMenuType}
        boxList={boxList}
        setBoxList={setBoxList}
      />
      <Viewer boxList={boxList} />
    </main>
  );
}
