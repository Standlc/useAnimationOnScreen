## UseAnimationOnScreen

### UseAnimationOnScreen is a lightweight React hook that allows you to give life to your website by animating any element when it enters the screen.

Including many animation types, transition duration, screen entry ratio.

### `Installation`

```
npm install use-animation-on-screen
```

### `usage`

```javascript
import { useAnimationOnScreen } from "use-animation-on-screen";
export default App = () => {
  //  With default config
  const element = useAnimationOnScreen();

  // With custom config
  const element = useAnimationOnScreen({
    screenEntryRatio: 0.9,
    animationType: "fade-up",
    transitionDuration: 800,
    makeAnimationUnique: false,
  });

  //Add the ref to your element
  return (
    <>
      <div ref={element}>Hello World</div>
    </>
  );
};
```

### `Config`

| key                        | option type | default    | Comment                                                                                               |
| -------------------------- | ----------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `screenEntryRatio`         | `number`    | `0.9`      | When the animation happens on the screen. From `0` (top of the screen) to `1` (bottom of the screen ) |
| `animationType`            | `string`    | `fade-up`  | Type of animation (`fade-up`, `fade-left`, `fade-right`, `zoom-in`, `zoom-out`)                       |
| `makeAnimationUnique`      | `boolean`   | `false`    | Makes the animation happen only once after the element enters the screen                              |
| `transitionDuration`       | `number`    | `800`      | In ms, `0` disables the transition                                                                    |
| `animationDelay`           | `number`    | `0`        | In ms, delays when the animation happens                                                              |
| `transitionTimingFunction` | `string`    | `ease-out` | The transition-timing-function property specifies the speed curve of the transition effect.           |
