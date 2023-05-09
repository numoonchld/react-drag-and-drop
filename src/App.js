import "./styles.css";
import { useState } from "react";

const initialColumnHeaders = [
  "Title A",
  "Title B",
  "Title C",
  "Title D",
  "Title E",
  "Title F",
  "Title G",
  "Title H",
  "Title I",
  "Title J",
  "Title K"
];
export default function App() {
  const [columnHeaders, setColumnHeaders] = useState(initialColumnHeaders);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "fit-content",
          alignItems: "center"
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();

          const sourceIndex = parseInt(
            JSON.parse(e.dataTransfer.getData("text/plain")),
            0
          );
          const targetIndex = parseInt(e.target.getAttribute("index"), 0);

          const newColumnHeaders = [...columnHeaders];

          const displacedElement = newColumnHeaders.splice(sourceIndex, 1)[0];
          newColumnHeaders.splice(targetIndex, 0, displacedElement);

          setColumnHeaders(newColumnHeaders);
        }}
      >
        {columnHeaders.map((header, index) => (
          <article
            key={header}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "text/plain",
                JSON.stringify(e.target.getAttribute("index"))
              );
              e.dataTransfer.dropEffect = "move";
            }}
            index={index}
          >
            {header}
          </article>
        ))}
      </div>
    </div>
  );
}
