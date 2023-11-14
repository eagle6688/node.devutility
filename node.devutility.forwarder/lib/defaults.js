/**
 * Default configuration for forwarder.
 */
export default {
    debug: true,

    /**
     * Configuration object of 'http-proxy'.
     */
    proxyOptions: {
        target: 'http://{host}:{port}',
        changeOrigin: true
    },

    /**
     * The error event is emitted if the request to the target fail. 
     */
    error: function (err, req, res) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('System error!');
    },

    /**
     * This event is emitted before the data is sent. It gives you a chance to alter the proxyReq request object. Applies to "web" connections.
     */
    proxyReq: function (proxyReq, request, response, options) {
    },

    /**
     * This event is emitted if the request to the target got a response.
     */
    proxyRes: function (proxyRes, req, res) {
    }
};