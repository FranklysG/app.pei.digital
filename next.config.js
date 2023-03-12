module.exports = {
  serverRuntimeConfig: {
    // Define a opção devIndicators com a opção prerender desativada
    devIndicators: {
      autoPrerender: false,
      buildActivity: false,
      showInk: false,
      prerender: false,
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
