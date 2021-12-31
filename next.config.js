//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const path = require('path');

//console.log(process.env);
//console.log(process.env.NEXT_PUBLIC_ASSET_PREFIX);

module.exports = {
  //todo- to check, not helping
  // generateBuildId: async () => {
  //   // You can, for example, get the latest git commit hash here
  //   return "123456789";
  // },
  //experimental: { optimizeCss: true },


  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  //   mySecret: 'secret'
  // },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
        tls: "empty",
      };

      // config.optimization.splitChunks.cacheGroups.assetsChunk = {
      //   chunks: 'all',
      //   enforce: true,
      //   minChunks: 2,
      //   enforceSizeThreshold: 10000,
      //   name(module) {
      //     // get the name. E.g. node_modules/packageName/not/this/part.js
      //     // or node_modules/packageName
      //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //     // npm package names are URL-safe, but some servers don't like @ symbols
      //     return `npm.${packageName.replace('@', '')}`;
      //   },
      //   priority: 10,
      //   test: /[\\\/]node_modules[\\\/]/,
      // };

      //config.optimization.runtimeChunk = 'single';
      // config.optimization.splitChunks = {
      //   maxInitialRequests: Infinity,
      //   //minSize: 0,
      //   //chunks: 'all',
      //   //name: false,
      //   cacheGroups: {
      //     //default: false,
      //     //vendors: false,
      //     framework: {
      //       name: 'framework',
      //       chunks: 'all',
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: 40,
      //       //minChunks: 2,
      //     },
      //     lib: {
      //       // test(module) {
      //       //   return module.size() > 16000
      //       // },
      //       // name(module) {
      //       //   // get the name. E.g. node_modules/packageName/not/this/part.js
      //       //   // or node_modules/packageName
      //       //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //       //   // npm package names are URL-safe, but some servers don't like @ symbols
      //       //   return `npm.${packageName.replace('@', '')}`;
      //       // },
      //       chunks: 'all',
      //       name: false,
      //       priority: 30,
      //       //minChunks: 2,
      //       reuseExistingChunk: true
      //     },
      //     commons: {
      //       name: 'commons',
      //       chunks: 'all',
      //       //minChunks: 3, //total pages
      //       priority: 20
      //     },
      //     shared: {
      //       chunks: 'all',
      //       name: false,
      //       priority: 10,
      //       //minChunks: 2,
      //       reuseExistingChunk: true
      //     }
      //   }
      // }

      // config.optimization.splitChunks.cacheGroups.commons = {
      //   name: 'commons',
      //   chunks: 'initial',
      //   minChunks: 2,
      // }
    }

    // config.output = {
    //   path: path.resolve(__dirname, 'gen/_next'),
    //   filename: '[name].js',
    // }

    config.module.rules.push(
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: "@svgr/webpack",
      //       options: {
      //         svgo: false, // Optimization caused bugs with some of SVGs
      //       },
      //     },
      //   ],
      // },
      {
        issuer: {
          // excluding background url images present in scss file,
          // nextjs already handles url() in css/sass/scss files
          test: /\.\w+(?<!(s?c|sa)ss)$/i,
        },
        test: /\.(jpg|jpeg|gif|png)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10,
              outputPath: `${isServer ? "../" : ""}static/i/`,
              context: "src",
              name: "[name].[ext]",
              publicPath: `/_next/static/i/`,
            },
          },
        ],
      },
      {
        issuer: {
          // excluding background url images present in scss file,
          // nextjs already handles url() in css/sass/scss files
          //converting svgs to base64- this is for icons handling
          test: /\.\w+(?<!(s?c|sa)ss)$/i,
        },
        test: /\.(svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // sample options
              limit: 5120,
              outputPath: `${isServer ? "../" : ""}static/i/`,
              context: "src",
              name: "[name].[ext]",
              publicPath: `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/_next/static/i/` //todo
              //publicPath: `/_next/static/i/`,
            },
          },
        ],
      },

      // {
      //   test: /\.font\.js/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         url: false
      //       }
      //     },
      //     'webfonts-loader'
      //   ]
      // }
    );
    return config;
  },

  async rewrites() {
    return [
      //JD page
      {
        source: "/job-listings(.)*-:jobId(\\d{1,})",
        destination: `/jd`,
      },
      /**
       * SRP URls:-
       * if two parameters are one after another then we have to manually separate the two.
       *  ++ -:location-:pageNo , -:premiumTypeCategory-:pageNo
       *      if location is of 2 words then the 2nd word goes into pageNo for such cases
       *
       * FYI:
       * this does not apply to companyId and pageNo case because companyId will always be single word always
       */
      {
        source: "/jobs",
        destination: `/srp?urlType=${SRP_URL_TYPES.jobs_search}`,
      }      {
        source: "/:slug*",
        destination: `/srp?urlType=${SRP_URL_TYPES.search_404}`,
      },
    ];
  },

  images: {
    domains: ['img.dummy.com', 'static.dummy.com', 'img.dummy.com', 'www.dummy.com', 'static.ambitionbox.com', 'naukrirecruiter.dummy.com', "recruit.dummy.com", "img.youtube.com", "recruit.test2.dummy-test2.cluster.infoedge.com"],
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
  distDir: 'gen/_next',
  // Creating loading issue in dev env
  //reactStrictMode: true,
}
