#!/usr/bin/env python3

import sys
import os

i = int(sys.argv[1])

# get all files in the slides directory
files = [f for f in os.listdir('slides') if os.path.isfile(os.path.join('slides', f))]
# filter out the files that are not .html files and whose name is not a number
files = [f for f in files if f.endswith('.html') and f[:-5].isnumeric()]

# sort the files by their number
files.sort(key=lambda f: int(f[:-5]))

# get the files that are after the file to be inserted
files_after = files[i-1:]

# shift the files that are after up by one number in reverse order
for f in reversed(files_after):
    os.rename(os.path.join('slides', f), os.path.join('slides', str(int(f[:-5]) + 1) + '.html'))

page = """<!DOCTYPE html>
<html lang="en">

<head>
  <title>Learning-Enabled Verification of Distributed Systems with End-to-End Proofs</title>
  <script src="https://unpkg.com/roughjs@latest/bundled/rough.js"></script>
  <script src="https://unpkg.com/rough-notation/lib/rough-notation.iife.js"></script>
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
  import { step, tertiary_color } from "../utils.js";

  var state = 0;
  const to_disappear = [];
  const to_appear = [];
  const body = document.querySelector('body');
  body.onkeydown = function (e) { state = step(e, state, to_disappear, to_appear) };
</script>

<script type='module' src="../next.js"></script>

</html>
"""

# create the new file
with open(os.path.join('slides', str(i) + '.html'), 'w') as f:
    f.write(page)

# open next.js and replace the first line with "const NUMBER_OF_SLIDES = k;" where k is the number of slides
with open('next.js', 'r') as f:
    lines = f.readlines()
    lines[0] = f"const NUMBER_OF_SLIDES = {len(files) + 1};\n"

with open('next.js', 'w') as f:
    f.writelines(lines)
