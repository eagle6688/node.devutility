/**
 * Default configuration for forwarder.
 */

export default {
    proxyOptions: {
        target: 'http://{host}:{port}',
        changeOrigin: true
    },
    proxyReq: function (proxyReq, request, response, options) {
    },
    proxyRes: function (proxyRes, req, res) {
    },
    close: function (res, socket, head) {
    },
    error: function (err, req, res) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('System error!');
    },
    proxyReqWs: function (proxyReqWs, request, response, options) {
    },
    openWs: function (proxySocket) {
    }
};