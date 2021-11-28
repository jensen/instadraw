import 

const sizes = [1, 2, 4, 6, 10, 12, 16];

export default function Brush(props) {
  const { current, setCurrent } = useBrush();

  return (
    <div style={{ display: "flex" }}>
      {sizes.map((s, i) => (
        <div
          key={s}
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: `#${s}`,
            borderBottom: i === sizeIndex ? "4px solid black" : "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSizeIndex(i)}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
