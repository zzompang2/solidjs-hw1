// @refresh reload
import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import "./app.css";
import ContextMenu from "./components/contextMenu";
import Box from "./components/box";
import { BoxInfo, MENU_TYPE, getMenuType } from "./constant";

export default function App() {
  const [menuType, setMenuType] = createSignal(MENU_TYPE.CLOSE);
  const [menuPos, setMenuPos] = createSignal({ x: 0, y: 0 });
  const [boxList, setBoxList] = createStore(Array<BoxInfo>());
  let selectedBoxId = 0;
  let boxId = 1;

  const createRandomColor = () =>
    `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

  const addNewBox = () => {
    setBoxList([
      ...boxList,
      {
        id: ++boxId,
        color: createRandomColor(),
        pos: menuPos(),
      },
    ]);
  };

  const deleteBox = () => {
    setBoxList(boxList.filter((box) => box.id !== selectedBoxId));
  };

  const changeBoxColor = () => {
    // Store 사용함으로써 불필요한 렌더링 줄이기
    setBoxList((box) => box.id === selectedBoxId, "color", createRandomColor());
  };

  return (
    <main
      onclick={() => {
        selectedBoxId = 0;
        setMenuType(MENU_TYPE.CLOSE);
      }}
    >
      <div
        class="playground"
        onContextMenu={(e) => {
          e.preventDefault(); // remove default context menu
          selectedBoxId = Number(e.target.id);
          setMenuType(getMenuType(e.target.className));
          setMenuPos({ x: e.clientX, y: e.clientY });
        }}
      >
        <For each={boxList}>
          {(box, i) => <Box id={box.id} color={box.color} pos={box.pos} />}
        </For>
      </div>
      <div class="playground-copied">
        <For each={boxList}>
          {(box, i) => <Box id={box.id} color={box.color} pos={box.pos} />}
        </For>
      </div>
      <ContextMenu
        menuType={menuType()}
        menuPos={menuPos()}
        addNewBox={addNewBox}
        deleteBox={deleteBox}
        changeBoxColor={changeBoxColor}
      />
    </main>
  );
}
