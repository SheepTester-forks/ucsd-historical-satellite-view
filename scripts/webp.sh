#!/bin/bash


for aerial_path in tiles_png/*
do
  aerial=$(basename $aerial_path)
  mkdir -p tiles_webp/$aerial

  for png_path in tiles_png/$aerial/*.png
  do
    png=$(basename $png_path)
    dest="tiles_webp/$aerial/$png"
    if [ ! -f "tiles_webp/$aerial/$png" ]
    then
      cwebp -lossless $png_path -o $dest
    fi
  done
done
