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

MIT License.

You can create your own homepage for free without notifying me by forking this project under the following conditions:

* Add a link to [my homepage](https://jaebbang0421.github.io/) and [Takuya's website](https://www.craftz.dog/)
* Do not use the 3D model

Check out [LICENSE](./LICENSE) for more detail.

## Acknowledgement

This website is built based on [Takuya's website](https://www.craftz.dog/) and [Changwoon Choi's website](https://www.changwoon.info/).
