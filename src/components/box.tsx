// @refresh reload

export default function Box(props) {
  return (
    <div
      class="box"
      id={props.id.toString()}
      style={{
        "background-color": props.color,
        left: `${props.pos[0]}px`,
        top: `${props.pos[1]}px`,
      }}
    ></div>
  );
}
