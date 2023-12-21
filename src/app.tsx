// @refresh reload
import { createSignal } from "solid-js";
import "./app.css";
import ContextMenu from "./components/contextMenu";

export default function App() {
  const [menuType, setMenuType] = createSignal("close");
  const [menuPos, setMenuPos] = createSignal([0, 0]);

  return (
    <main onclick={() => setMenuType("close")}>
      <div
        class="playground"
        onContextMenu={(e) => {
          e.preventDefault(); // remove default context menu
          setMenuType(e.target.className);
          setMenuPos([e.clientX, e.clientY]);
        }}
      >
        <div class="box"></div>
      </div>
      <ContextMenu menuType={menuType()} menuPos={menuPos()} />
    </main>
  );
}
