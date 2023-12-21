// @refresh reload
import { createSignal } from "solid-js";
import "./app.css";

export default function App() {
  let contextRef;

  const openContextMenu = (e) => {
    e.preventDefault();   // remove default context menu
    e.stopPropagation();  // stop clicking items behind
    console.log("right click");
    console.log(e.target.className);
    contextRef.style.setProperty("left", e.clientX + "px");
    contextRef.style.setProperty("top", e.clientY + "px");
    contextRef.style.setProperty("display", "block");
  }

  return (
    <main
    onclick={() => contextRef.style.setProperty("display", "none")}>
      <div
      class="playground"
      onContextMenu={openContextMenu}>
        <div class="contextmenu" ref={contextRef}>
          <div class="contextmenu-item">Add</div>
          <div class="contextmenu-item">Delete</div>
          <div class="contextmenu-item">Change Color</div>
        </div>
        <div class="box" onContextMenu={openContextMenu}></div>
      </div>
    </main>
  );
}
