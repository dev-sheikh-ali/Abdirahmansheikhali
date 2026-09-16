// Export the Worker entry point.
// Cloudflare calls the `fetch()` method whenever the Worker receives
// an incoming HTTP request.
export default {
  async fetch(request, env) {

    // `env.ASSETS` is the asset binding configured in your
    // Cloudflare deployment 
    //
    // `.fetch(request)` passes the original request to Cloudflare's
    // static asset service, which looks for the requested file
    // (HTML, CSS, JS, images, etc.).
    return env.ASSETS.fetch(request);
  }
}
