# Personal Homepage

https://jaebbang0421.github.io

[![Homepage preview](assets/img/preview.jpg)](https://jaebbang0421.github.io)

## Stack

- [three.js](https://threejs.org/) - 3D library for the voxel smart home scene, generated entirely in code
- [HTML, CSS and JavaScript](https://developer.mozilla.org/) - No framework and no build step
- [GitHub Actions](https://github.com/features/actions) - Copies the site to the `gh-pages` branch on every push
- [GitHub Pages](https://pages.github.com/) - Static hosting

## Run locally

No installation is needed. Serve the folder with any static server:

```
python3 -m http.server 8000
# open http://localhost:8000
```

## Project structure

```
$PROJECT_ROOT
│   # Home page: 3D scene, About me, News, Info, Projects
├── index.html
│   # Publications page
├── publications
│   # Styles, scripts (3D scene, publication list) and publication data
├── assets/css, assets/js, assets/data
│   # Images, publication thumbnails and the CV PDF
├── assets/img, assets/pdf
│   # three.js (MIT License)
└── assets/vendor
```

## CV

The CV at `assets/pdf/cv.pdf` is exported from the Word version of my CV.

```
Edit the Word CV -> Save as PDF -> Replace assets/pdf/cv.pdf -> Push -> Live in a minute or two
```

- Edit the Word file, not the PDF, so the two versions stay the same.
- Keep the file name `cv.pdf`. The CV links on the site point to this path.

## License

The code is available under the MIT License.

You are welcome to fork this project and build your own homepage from it, under these conditions:

- Link to [my homepage](https://jaebbang0421.github.io) and [Takuya's website](https://www.craftz.dog/) in your footer or README.
- Do not use my 3D scene or my personal content (profile photo, CV, publication figures).

See [LICENSE](LICENSE) for details.

## Acknowledgement

The layout of this site is inspired by [Takuya Matsuyama's website](https://www.craftz.dog/).
