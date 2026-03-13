# A-Frame: Image Targets

This example uses image targets to display information about jellyfish on a flyer. It uses the xrextras-named-image-target component to connect an <a-entity> to an image target by name while the xrextras-play-video component enables video playback. 

![artgallery-screenshot](./src/assets/screenshot-flyer.jpg)

![flyer](./src/assets/flyer.jpg)

### Preparing Target Images (macOS)

If you're on macOS, you can batch resize and preprocess the target images with **ImageMagick**.

Install ImageMagick:

```bash
brew install imagemagick
```

Then run this inside src/targets:

```bash
mogrify -resize 480x640^ -gravity center -extent 480x640 -colorspace Gray *.jpg
```

This resizes all .jpg files to 480×640, center-crops them, converts them to grayscale, and overwrites the originals.