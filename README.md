# UCSD map archive

| La Jolla Campus                                                                                              | Hillcrest                                                                                    |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| ![La Jolla Campus Aerial Photo 1964](./archive/screenshots/La%20Jolla%20Campus%20Aerial%20Photo%201964.webp) | ![Hillcrest Aerial Photo 1999](./archive/screenshots/Hillcrest%20Aerial%20Photo%201999.webp) |
| ![La Jolla Campus Aerial Photo 2012](./archive/screenshots/La%20Jolla%20Campus%20Aerial%20Photo%202012.webp) | ![Hillcrest Aerial Photo 2012](./archive/screenshots/Hillcrest%20Aerial%20Photo%202012.webp) |

Perhaps because of the TSS transition, UCSD deprecated its previous online campus map (maps.ucsd.edu) in summer 2026.

This repo archives historical aerial photos of UCSD's campus from [Campus Map (2009)](https://maps.ucsd.edu/mapping/viewer/default.htm?mkey=1&selectedTab=2&background=15).

- La Jolla Campus (3.28 GB)
  - [Internet Archive](https://archive.org/details/ucsd-aerial-photo-map-tiles)
  - [questionable host](https://sheeptester.github.io/hello-world/questionable-host/?hash=i7c71c1461c36823f16c9d32a863da698&name=tiles_png.zip)
  - [`tiles_webp/`](./tiles_webp/) (lossily compressed to 75% quality, 373 MB)
- Hillcrest (787.17 MB)
  - [Internet Archive](https://archive.org/details/ucsd-hillcrest-aerial-photos-map-tiles)
  - [questionable host](https://sheeptester.github.io/hello-world/questionable-host/?hash=i7a408a7056805946b07373f9c63d4769&name=tiles_png_hillcrest.zip)
  - [`tiles_webp_hillcrest/`](./tiles_webp_hillcrest/) (lossily compressed to 75% quality, 66.8 MB)

This repo also archives two tilesets from [UCSD's Concept3D map](https://map.concept3d.com/?id=1005), which has 3D illustrations of the campus's buildings that superior to UCSD's new map replacement. The tilesets are `UCSD_MasterUpdated-03-28-2019` (the oldest tileset I could find on the Internet archive) and `1005_Map_69fce94e12df9` (latest tileset, published around June 2026).

- Concept3D map (373 MB gzipped, 385 MB zipped)
  - [Internet Archive](https://archive.org/details/ucsd-concept3d-map-tiles)
  - [questionable host (zip)](https://sheeptester.github.io/hello-world/questionable-host/?hash=ie6110aa1fa3731ff72484dae6a5ed62d&name=concept3d.zip)
  - [questionable host (tar.gz)](https://sheeptester.github.io/hello-world/questionable-host/?hash=id29df8bf352bf62ef3cf12f4ea3ca563&name=concept3d.tar.gz)

## Usage

```sh
$ npm install

$ node scripts/index.ts la-jolla tiles_png
$ node scripts/index.ts hillcrest tiles_png_hillcrest

# requires cwebp to be installed
$ node scripts/webp.ts tiles_png tiles_webp
$ node scripts/webp.ts tiles_png_hillcrest tiles_webp_hillcrest
```
