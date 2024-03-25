module.exports = {
    
    devServer: {

      proxy: {
       
        '/api': {
          target: 'https://copy-api-git-deploy-hanabananaas-projects.vercel.app',
          pathRewrite: { '^/api': '' }, 
        },
      },
    },
  };