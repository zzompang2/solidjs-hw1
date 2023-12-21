// @refresh reload

interface Props {
  id: number;
  color: string;
  pos: number[];
}

export default function Box(props: Props) {
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
