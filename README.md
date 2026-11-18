# Personal Homepage

https://jaebbang0421.github.io

[![Homepage preview](public/assets/img/preview.jpg)](https://jaebbang0421.github.io)

## Stack

* [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
* [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React
* [Three.js](https://threejs.org/) - 3D library for JavaScript
* [Framer Motion](https://www.framer.com/motion/) - An animation library for React

## Install

```
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion next react react-dom react-icons three
```

## Run

```
npm run dev     # local server at http://localhost:3000
npm run build   # static export to out/
```

## Project structure

```
$PROJECT_ROOT
│   # Page files
├── pages
│   # React component files
├── components
│   # Non-react modules
├── lib
│   # Static files for images and 3d model file
└── public
```

## CV

`public/assets/pdf/cv.pdf` is updated automatically from my CV repository ([jaebbang0421/CV](https://github.com/jaebbang0421/CV), private):

```
push to the CV repo
  → GitHub Action builds the PDF from the Word file
  → commits it here as public/assets/pdf/cv.pdf ("update cv: ...")
  → GitHub Actions redeploys jaebbang0421.github.io
```

- Don't edit `public/assets/pdf/cv.pdf` by hand; the next CV update overwrites it.
- The Action pushes here with a deploy key (*Settings → Deploy keys → CV auto-publish*), so run `git pull` before working locally.

## License

The code is available under the MIT License.

You are welcome to fork this project and build your own homepage from it, under these conditions:

- Link to [my homepage](https://jaebbang0421.github.io) and [Takuya's website](https://www.craftz.dog/) in your footer or README.
- Do not use my 3D scene or my personal content (profile photo, CV, publication figures).

See [LICENSE](LICENSE) for details.

## Acknowledgement

The layout of this site is inspired by [Takuya Matsuyama's website](https://www.craftz.dog/).
