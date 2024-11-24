module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.marketstack.com/v1/:path*',
        },
      ];
    },
  };
  