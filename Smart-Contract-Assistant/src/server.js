const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000', // This is your backend server address
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
      console.log(err);
      res.status(500).send('Proxy encountered an error.');
    },
}));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
