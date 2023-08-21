const http = require('http');
const httpProxy = require('http-proxy');

const proxyTarget = 'http://3.8.20.9:8443'; // Replace with your target host

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    // Check if the request path starts with '/gateway-server/explorer/address/'
    if (req.url.startsWith('/gateway-server/')) {
        // Modify the request URL to remove the '/gateway-server' prefix
        req.url = req.url.replace('/gateway-server', '');

        // Proxy the request to the target host
        proxy.web(req, res, { target: proxyTarget });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Proxy server is listening on port ${PORT}`);
});
