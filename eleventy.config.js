import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import path from 'node:path'

export default function (eleventyConfig) {
  // Add a passthrough copy for static files
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/styles')
  // Add image plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['webp'],
    svgShortCircuit: true,
    widths: [300, 450, 600, 900, 1200],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async'
      }
    },
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)
      return `${name}-${width}w.${format}`
    }
  })
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  // Return the configuration object
  return {
    dir: {
      input: 'src', // Tell Eleventy to use the "src" folder as the input
      output: '_site' // The output folder where Eleventy will generate static files
    }
  }
};
