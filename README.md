# ucsd-historical-satellite-view

| La Jolla Campus                                                                                             | Hillcrest                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![La Jolla Campus Aerial Photo 1964](./archive/screenshots/La%20Jolla%20Campus%20Aerial%20Photo%201964.png) | ![Hillcrest Aerial Photo 1999](./archive/screenshots/Hillcrest%20Aerial%20Photo%201999.png) |
| ![La Jolla Campus Aerial Photo 2012](./archive/screenshots/La%20Jolla%20Campus%20Aerial%20Photo%202012.png) | ![Hillcrest Aerial Photo 2012](./archive/screenshots/Hillcrest%20Aerial%20Photo%202012.png) |

Historical aerial photos of UCSD's campus, archived from [Campus Map (2009)](https://maps.ucsd.edu/mapping/viewer/default.htm?mkey=1&selectedTab=2&background=15) in case it is affected by the TSS transition.

- La Jolla Campus (3.28 GB)
  - [Internet Archive](https://archive.org/details/ucsd-aerial-photo-map-tiles)
  - [questionable host](https://sheeptester.github.io/hello-world/questionable-host/?hash=i7c71c1461c36823f16c9d32a863da698&name=tiles_png.zip)
  - [`tiles_webp/`](./tiles_webp/) (lossily compressed to 75% quality, 373 MB)
- Hillcrest (787.17 MB)
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
