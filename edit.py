#!/usr/bin/env python3

import sys
import os

page = """<!DOCTYPE html>
<html lang="en">

<head>
  <title>Learning-Enabled Verification of Distributed Systems with End-to-End Proofs</title>
  <link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'>
  <link href="../reset.css" rel="stylesheet" type="text/css" />
  <link href="../style.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="title-box">
    <div class="title"></div>
  </div>
  <div class="full-box">
    <div style="margin-right: 80px; margin-left: 80px">
    </div>
  </div>
  <div class="foot-box">
    <div class="footnote"></div>
    <div class="slide-number"></div>
  </div>
</body>


<script type="module">
  import { step } from "../utils.js";

  var state = 0;
  const to_disappear = [];
  const to_appear = [];
  const body = document.querySelector('body');
  body.onkeydown = function (e) { state = step(e, state, to_disappear, to_appear) };
</script>

<script type='module' src="../next.js"></script>

</html>
"""

args = list(map(int, sys.argv[1:]))

def get_files():
  # get all files in the slides directory
  files = [f for f in os.listdir('slides') if os.path.isfile(os.path.join('slides', f))]
  # filter out the files that are not .html files and whose name is not a number
  files = [f for f in files if f.endswith('.html') and f[:-5].isnumeric()]

  # sort the files by their number
  files.sort(key=lambda f: int(f[:-5]))

  return files

def insert(i):
  # get the file currently in that place and all the files after it
  files_after = get_files()[i-1:]

  # shift the files that are after up by one number in reverse order
  for f in reversed(files_after):
    os.rename(os.path.join('slides', f), os.path.join('slides', str(int(f[:-5]) + 1) + '.html'))

  # create the new file
  with open(os.path.join('slides', str(i) + '.html'), 'w') as f:
    f.write(page)

def delete(i):
  # get all the files after the one we want to delete
  files_after = get_files()[i:]

  # delete the file
  os.remove(os.path.join('slides', str(i) + '.html'))

  # shift the files that are after down by one number
  for f in files_after:
    os.rename(os.path.join('slides', f), os.path.join('slides', str(int(f[:-5]) - 1) + '.html'))


def move(old_location, new_location):
  # get the contents of the file at the old location
  with open(os.path.join('slides', str(old_location) + '.html'), 'r') as f:
      contents = f.read()
  delete(old_location)
  new_location = new_location if new_location < old_location else new_location - 1
  insert(new_location)
  with open(os.path.join('slides', str(new_location) + '.html'), 'w') as f:
      f.write(contents)

if len(args) == 1:
  if args[0] > 0:
      insert(args[0])
  else:
      delete(-args[0])
elif len(args) == 2:
    assert args[0] > 0 and args[1] > 0
    move(args[0], args[1])
else:
    print("Usage: edit.py args")
    print("\tif args is a positive number, insert a slide at that position\n\tif args is a negative number, delete the slide at that position\n\tif args is x y, move slide x to position y")
    exit(1)

new_count = len(get_files())
# open next.js and replace the first line with "const NUMBER_OF_SLIDES = k;" where k is the number of slides
with open('next.js', 'r') as f:
    lines = f.readlines()
    lines[0] = f"const NUMBER_OF_SLIDES = {new_count};\n"

with open('next.js', 'w') as f:
    f.writelines(lines)