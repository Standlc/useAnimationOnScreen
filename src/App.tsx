import "./app.css";
import Element from "./components/Element";

function App() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div className="home"></div>
      <Element
        animationType="fade-up"
        screenEntryRatio={0.9}
        makeAnimationUnique={false}
      />
      <Element
        animationType="fade-left"
        screenEntryRatio={0}
        makeAnimationUnique={false}
      />
      <Element
        animationType="fade-right"
        screenEntryRatio={0.9}
        makeAnimationUnique={false}
      />
      <Element
        animationType="zoom-in"
        transitionDuration={2800}
        screenEntryRatio={0.9}
        makeAnimationUnique={false}
      />
      <Element
        animationType="zoom-out"
        screenEntryRatio={0.9}
        makeAnimationUnique={true}
      />
      <Element
        animationType="fade-up"
        screenEntryRatio={0.6}
        makeAnimationUnique={false}
      />
    </div>
  );
}

export default App;
