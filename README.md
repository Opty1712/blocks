#Description

Frontend blocks on the page using webpack, ES5, polyfil.io
Working under WINDOWS and:

- NODE v5.4.1
- npm v3.5.3




#Installation

clone BLOCKS to the project folder `git clone https://github.com/Opty1712/blocks.git`

#Development

1. run `npm i` - it will load all dependencies from package.json

2. run `webpack` - it will build "app.js" and move it to the root folder

  2.1. use `NODE_ENV=development` for developing {*watch : true, minification : false, devtool : "cheap-module-inline-source-map"*}

  2.2. use `NODE_ENV=production` for production {*watch : false, minification : true, NO devtool*}

#Launch

navigate your browser to `index.html` in the root folder


#Known Issues

If project runs not under WINDOWS may be you need to check **line 21** in `webpack.config.js`



#ToDo


