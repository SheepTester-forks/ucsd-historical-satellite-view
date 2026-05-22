# ucsd-historical-satellite-view

Historical aerial photos of UCSD's campus, archived from [Campus Map (2009)](https://maps.ucsd.edu/mapping/viewer/default.htm?mkey=1&selectedTab=2&background=15) in case it is affected by the TSS transition.

- La Jolla Campus (3.28 GB)
  - [Internet Archive](https://archive.org/details/ucsd-aerial-photo-map-tiles)
  - [questionable host](https://sheeptester.github.io/hello-world/questionable-host/?hash=i7c71c1461c36823f16c9d32a863da698&name=tiles_png.zip)
  - [`tiles_webp/`](./tiles_webp/) (lossily compressed to 75% quality, 373 MB)
- Hillcrest Campus (787.17 MB)
  - [Internet Archive](https://archive.org/details/ucsd-hillcrest-aerial-photos-map-tiles)
  - [questionable host](https://sheeptester.github.io/hello-world/questionable-host/?hash=i7a408a7056805946b07373f9c63d4769&name=tiles_png_hillcrest.zip)
  - [`tiles_webp_hillcrest/`](./tiles_webp_hillcrest/) (lossily compressed to 75% quality, 66.8 MB)

## Usage

```sh
$ npm install

$ node scripts/index.ts la-jolla tiles_png
$ node scripts/index.ts hillcrest tiles_png_hillcrest

# requires cwebp to be installed
$ node scripts/webp.ts tiles_png tiles_webp
$ node scripts/webp.ts tiles_png_hillcrest tiles_webp_hillcrest
```
