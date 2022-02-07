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
    transitionDuration: 500,
    makeAnimationUnique: false,
  });

  return (
    <>
      <div ref={element}>Hello World</div>
    </>
  );
};
```

### `Config`

| key                   | option type | default   | Comment                                                   |
| --------------------- | ----------- | --------- | --------------------------------------------------------- |
| `screenEntryRatio`    | `number`    | `0.9`     | When the animation happens on the screen, from `0` to `1` |
| `animationType`       | `string`    | `fade-up` | Type of animation                                         |
| `makeAnimationUnique` | `boolean`   | `false`   | Makes the animation happen only once                      |
| `transitionDuration`  | `number`    | `400`     | In ms, `0` disables the transition                        |
