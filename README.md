## Purpose

This project was completed as part of a group learning exercise.

## Demo

https://user-images.githubusercontent.com/14803/144395610-e15832a6-4bea-41c9-b519-e54b440dd229.mp4

[https://instadraw.netlify.app/](https://instadraw.netlify.app/)

## Project Features

This project allows multiple users to view the pictures that other users have drawn. Once a user uses their discord account to login, they can also create or edit images.

### User Stories

1. ✅ User can draw in a canvas using the mouse
2. ✅ User can change the color
3. ✅ User can change the size of the tool
4. ✅ User can press a button to clear the canvas

### Bonus features

1. ✅ User can save the artwork as an image (.png, .jpg, etc format)

### Custom features

1. ✅ User can comment on an existing post
2. ✅ User can add to an existing drawing started by another user

## Technical Specifications

Remix provides a foundational framework for the web application. The client loads the [PixiJS](https://pixijs.com/) library and uses it for the rendering of the drawings.

### Local Builds

### Dependencies

- remix
- pixi.js
- supabase/js
- tailwindcss
- postgres

### Local Development

Run three processes in separate tabs or concurrently.

```sh
$ npm run dev:netlify
```

```sh
$ npm run dev
```

```sh
$ npm run watch:css
```

### Deployment

```sh
$ npm run build
$ netlify deploy --prod
```

### Drawing with PixiJS

The rendering is handled by the PixiJS library. PixiJS will render using WebGL, but can fallback to canvas rendering if GL is unavailable. It is used for browser game development, and can be found in engines like [Phaser](https://phaser.io/).

When the user clicks the event listener for `mousedown` fires and sets some state to indicate that drawing is in progress. This state is called `isDrawing`.

We only care about the `mousemove` event when `isDrawing` is set to `true`.

```javascript
useMouseMove(
  canvasRef.current,
  useCallback(
    (event: MouseEvent) => {
      if (isDrawing && rendererRef.current) {
        /* create a Point object that describes where the
           mouse is now */
        const to = new PIXI.Point(event.offsetX, event.offsetY);

        /* lookup the drawing layers container, it is easier
           to group these in a Container provided by PIXI */
        const layers = rendererRef.current.stage.getChildAt(
          ZINDEX.LAYER
        ) as Container;

        /* in the layers container, look for the last graphic
           which is our current drawing layer */j
        const graphics = layers.getChildAt(
          layers.children.length - 1
        ) as Graphics;

        /* any drawing should be the color that is chosen
           as the current brush */
        graphics.beginFill(parseInt(color, 16));

        /* helper function to draw a circle at x, y */
        const draw = (x: number, y: number) =>
          graphics.drawCircle(x, y, brush);

        /* if this is the second frame of dragging we can
           interpolate between two points. this gives a
           smoother line */
        if (previousPointRef.current) {
          interpolateDirect(draw, previousPointRef.current, to);
        } else {
          draw(to.x, to.y);
        }

        /* stop filling the drawing */
        graphics.endFill();

        /* keep track of where we were, so that the next
           mouse move can be interpolated */
        previousPointRef.current = to;
      }
    },
    [isDrawing, color, brush]
  )
);
```

### Storage with Supabase

We want to store the data for the image as a `png` file. When we store objects using the Supabase API we can send them as an `ArrayBuffer`.

With PixiJS there is an included plugin that can convert the rendered layers to a `base64` encoded image. Decoding this image to an `ArrayBuffer` allows us to match the type of `data` that supabase expects.

```javascript
return decode(
  rendererRef.current?.renderer.plugins.extract
    .base64(layers)
    .replace(/^data:image\/\w+;base64,/, "")
);
```

When an image is saved, we store it using the [supabase](https://supabase.io) storage API.

```javascript
/* give the object a unique name */
const name = `${uuid()}.png`;

/* store the object into the "layers" bucket */
const uploadResponse = await supabase?.storage
  .from("layers")
  .upload(name, data, {
    contentType: "image/png",
  });
```
