# William Yao Portfolio

![Astro Badge](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff&style=for-the-badge)

## Installation

```
git clone https://github.com/liyunze-coding/TofuSenpai.git
cd path/to/project
npm install
```

## How to add a new project?

1. Create a new page in [/src/pages](/src/pages) folder such as `asfar.astro`.
2. Update `HomeCards` and `MobileViewCards` in [/src/components](/src/components/)

## Home Cards component

- Edit components: `src/components/HomeCards.astro`
- Add webp images to `src/components/film-images/...`
  - Compress images using Squoosh
    - Format WebP (Default is MozJPEG)
    - resize, recommended size is 20kB - 40kB
- Image source `src="/film-images/...` will reference from `/public/film-images`

Left/Right Card Component:
```js
// Image on the left side, text description on the right
<LeftCard
    src={Image Source}
    alt="Image description"
    heading="heading here"
    subheading="(sub heading here)"
    eager={true/false} // eager to load = reserved for the first few images user can see without scrolling
    x="0px" // by default, the divs will be centered
    y="0px"
    z="0px"
    rotation="0deg" // rotation of the image
/>
```

