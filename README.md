# William Yao Portfolio

![Astro Badge](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff&style=for-the-badge)

## Installation

```
git clone https://github.com/liyunze-coding/TofuSenpai.git
cd path/to/project
npm install
```

## Home Cards component

- Edit components: `src/components/HomeCards.astro`
- Add webp images to `src/components/film-images/...`
  - Compress images using Squoosh
    - MozJPEG -> WebP
    - resize, recommended size is 20kB - 40kB
- reference it using imports

Left/Right Card Component:
```
<LeftCard
    src={Image Source}
    alt="Image description"
    heading="heading here"
    subheading="(sub heading here)"
    eager={true/false}
    x="0px"
    y="0px"
    z="0px"
    rotation="0deg"
/>
```

