import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import {reactOutputTarget} from "@stencil/react-output-target";

export const config: Config = {
  namespace: 'a11y-carousel',
  tsconfig: "./tsconfig.json",
  devServer:{
    openBrowser: false
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/components.ts'
    })
  ],
  plugins: [
    sass()
  ]
};
