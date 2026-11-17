# jaebbang0421.github.io

Personal website of **Jae Young Jang**, Ph.D. student at the Future Space Lab, KAIST.

**Live:** https://jaebbang0421.github.io

The site is plain HTML, CSS and JavaScript with no build step. GitHub Pages serves the repository as is, so every push goes live within a minute or two.

## Structure

```
index.html                     Home: 3D scene, intro, News, Info, Education, Projects
publications/index.html        Publications page (rendered from the JSON file below)
404.html                       Not-found page
assets/
  css/style.css                All styles (light and dark themes)
  js/site.js                   Theme toggle and profile-photo fallback
  js/voxel-home.js             3D voxel smart home with an agent robot (three.js)
  js/publications.js           Renders the publication list
  data/publications.json       Publication data
  img/profile.jpg              Profile photo (add this file; initials are shown until then)
  img/pubs/                    Publication thumbnails
  pdf/cv.pdf                   CV
  vendor/three/                three.js r170 (MIT License)
```

## Common edits

| Task | Where |
|---|---|
| Add a publication | Add an entry to `assets/data/publications.json`. Put a thumbnail in `assets/img/pubs/` and set `"thumb"`. Links go in `"links"`, e.g. `{"pdf": "...", "doi": "...", "code": "..."}`. Entries with `"status"` (e.g. `"Under review"`) are listed first. |
| Add a news item | Copy an `<li>` in the News section of `index.html`. |
| Add a project | Copy an `<li>` in the Projects section of `index.html`. |
| Profile photo | Upload a square image as `assets/img/profile.jpg`. |
| LinkedIn | Set the `href` of the LinkedIn button in `index.html` and remove its `is-todo` class. |
| Update the CV | Replace `assets/pdf/cv.pdf`. |
| Colors and fonts | CSS variables at the top of `assets/css/style.css`. |

## 3D scene

The voxel room is generated in code by `assets/js/voxel-home.js`, so there is no model file. It shows a resident with a wrist sensor, three UWB beacons that ping the resident, and an agent robot that watches the resident and acts on the devices. Colors and layout are set in the `PALETTE`, `BEACONS` and `buildScene()` parts of that file.

To use a hand-made model instead (for example from MagicaVoxel exported to `.glb` with Blender), load it with three.js `GLTFLoader` in place of `buildScene()`. The camera, controls and render loop can stay as they are.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

A local server is needed because the publication list is loaded with `fetch`.

## Credits

The layout is inspired by [Takuya Matsuyama's website](https://www.craftz.dog/). The code and the 3D scene are original to this site. 3D rendering uses [three.js](https://threejs.org/) (MIT License).
