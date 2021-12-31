const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000

// console.log(process.env.NODE_ENV);

//  NEXT_PUBLIC_BASE_URL = https://www.dummy.com/
//  NEXT_PUBLIC_APP_ENV = development
//  NEXT_PUBLIC_NODE_ENV = development

/**
 * Setting the NODE_ENV to dev, need to check. Ideally it shud not be done, as we are already defining it in .env.development
 */
process.env.NODE_ENV = 'development'
// console.log(process.env.NODE_ENV);

const dev = process.env.NODE_ENV === 'development'
// const dev = true;
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
  '/jobapi/v3/srchcount': {
    target: 'https://www.dummy.com',
    // pathRewrite: {
    //     '^/api': '/api'
    // },
    changeOrigin: true
  },
  '/servicegateway-mynaukri/jobseeker-follow-services/v0/users/self/companygroups-follow-status': {
    target: 'https://www.dummy.com',
    // pathRewrite: {
    //     '^/api': '/api'
    // },
    changeOrigin: true
  },
  '/servicegateway-mynaukri/jobseeker-follow-services/v0/companygroups': {
    target: 'https://www.dummy.com',
    // pathRewrite: {
    //     '^/api': '/api'
    // },
    changeOrigin: true
  },
  '/servicegateway-mynaukri/jobseeker-follow-services/v0/companygroups-follow-status': {
    target: 'https://www.dummy.com',
    // pathRewrite: {
    //     '^/api': '/api'
    // },
    changeOrigin: true
  },
  '/jobapi/v3/search': {
    target: 'https://www.dummy.com',
    //don't delete
    // pathRewrite: {
    //     '^/api': '/api'
    // },
    changeOrigin: true
  },
  '/nlogin/v1/loginStatus': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/alertapi/v3/cja/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },

  //JD page
  '/jobapi/v2/user/saveJob/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/alertapi/v2/smjlt': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/job-details-services/v0/jobapi/v4/job/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/servicegateway-jobsearch/job-details-services/v1/job': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/jobapi/v3/job/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/jobapi/v2/search/simjobs/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/jobapi/v1/job/report': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },

  '/alertapi/v1/user/cja/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/alertapi/v1/cja/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/servicegateway-jobsearch/job-details-services/v1/job/': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/recruiters/rpapi/v1/vcardbulk': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/recruiters/rpapi/v1/rp/4050014/follower': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
  '/recruiters/rpapi/v1/rp/4050014/sendmessage': {
    target: 'https://www.dummy.com',
    changeOrigin: true
  },
}

const isDevelopment = process.env.NODE_ENV === 'development'
// const isDevelopment = true;

app.prepare().then(() => {
  const server = express()

  if (isDevelopment) {
    server.use('/recruiters/rpapi/v1/rp/4050014/follower', createProxyMiddleware(apiPaths['/recruiters/rpapi/v1/rp/4050014/follower']));
    server.use('/recruiters/rpapi/v1/rp/4050014/sendmessage', createProxyMiddleware(apiPaths['/recruiters/rpapi/v1/rp/4050014/sendmessage']));


    server.use('/jobapi/v3/search', createProxyMiddleware(apiPaths['/jobapi/v3/search']));
    server.use('/nlogin/v1/loginStatus', createProxyMiddleware(apiPaths['/nlogin/v1/loginStatus']));
    server.use('/alertapi/v3/cja/', createProxyMiddleware(apiPaths['/alertapi/v3/cja/']));
    server.use('/jobapi/v3/srchcount', createProxyMiddleware(apiPaths['/jobapi/v3/srchcount']));
    // server.use('/mynaukri/jobseeker-follow-services/v0/companygroups-follow-status',
    // createProxyMiddleware(apiPaths['/mynaukri/jobseeker-follow-services/v0/companygroups-follow-status']));
    server.use('/servicegateway-mynaukri/jobseeker-follow-services/v0/companygroups-follow-status', createProxyMiddleware(apiPaths['/servicegateway-mynaukri/jobseeker-follow-services/v0/companygroups-follow-status']));
    server.use('/servicegateway-mynaukri/jobseeker-follow-services/v0/companygroups', createProxyMiddleware(apiPaths['/servicegateway-mynaukri/jobseeker-follow-services/v0/companygroups']));
    server.use('/servicegateway-mynaukri/jobseeker-follow-services/v0/users/self/companygroups-follow-status', createProxyMiddleware(apiPaths['/servicegateway-mynaukri/jobseeker-follow-services/v0/users/self/companygroups-follow-status']));
    server.use('/job-details-services/v0/jobapi/v4/job/', createProxyMiddleware(apiPaths['/job-details-services/v0/jobapi/v4/job/']));
    server.use('/servicegateway-jobsearch/job-details-services/v1/job', createProxyMiddleware(apiPaths['/servicegateway-jobsearch/job-details-services/v1/job']));
    server.use('/jobapi/v3/job/', createProxyMiddleware(apiPaths['/jobapi/v3/job/']));
    server.use('/alertapi/v2/smjlt', createProxyMiddleware(apiPaths['/alertapi/v2/smjlt']));
    server.use('/alertapi/v1/user/cja/', createProxyMiddleware(apiPaths['/alertapi/v1/user/cja/']));
    server.use('/alertapi/v1/cja/', createProxyMiddleware(apiPaths['/alertapi/v1/cja/']));
    server.use('/servicegateway-jobsearch/job-details-services/v1/job/', createProxyMiddleware(apiPaths['/servicegateway-jobsearch/job-details-services/v1/job/']));

    server.use('/jobapi/v2/user/saveJob/', createProxyMiddleware(apiPaths['/jobapi/v2/user/saveJob/']));

    server.use('/jobapi/v2/search/simjobs/', createProxyMiddleware(apiPaths['/jobapi/v2/search/simjobs/']));
    server.use('/jobapi/v1/job/report', createProxyMiddleware(apiPaths['/jobapi/v1/job/report']));
    server.use('/recruiters/rpapi/v1/vcardbulk', createProxyMiddleware(apiPaths['/recruiters/rpapi/v1/vcardbulk']));


  }


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
  console.log('Error:::::', err)
})