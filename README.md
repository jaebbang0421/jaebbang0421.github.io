# Personal Homepage

https://jaebbang0421.github.io

[![Homepage preview](public/assets/img/preview.jpg)](https://jaebbang0421.github.io)

## Stack

* [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
* [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React
* [Three.js](https://threejs.org/) - 3D library for JavaScript
* [Framer Motion](https://www.framer.com/motion/) - An animation library for React
* [GitHub Pages](https://pages.github.com/) - Static hosting, deployed by GitHub Actions

## Install

```
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Project structure

```
$PROJECT_ROOT
│   # Pages: home, publications, 404
├── pages
│   # Navbar, footer, 3D scene, page layouts and UI parts
├── components
│   # Theme, 3D scene builder and site data (news, projects, publications)
├── lib
│   # Images, publication thumbnails and the CV PDF
└── public
```

## CV

The CV at `public/assets/pdf/cv.pdf` is exported from the Word version of my CV.

```
Edit the Word CV -> Save as PDF -> Replace public/assets/pdf/cv.pdf -> Push -> Live in a few minutes
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
