module.exports = {
  serverRuntimeConfig: {
    // Define a opção devIndicators diretamente
    devIndicators: {
      autoPrerender: false,
      buildActivity: false,
      showInk: false,
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: true,
      },
    ]
  },
}
