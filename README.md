# CORS Proxy

A simple Node.js-based CORS proxy enabled you to use resources hosted on a different domain that don't support [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing). 

## Basic Installation

1. Clone this repository 
    - `git clone https://github.com/cmd430/CORS-Proxy`
2. Change into the cloned repo
    - `cd CORS-Proxy`
3. Install the server dependencies
    - `npm i --only=prod`
4. Start the server
    - `node index.js`

## Usage

When making an API call using JavaScript (using XMLHTTPRequest, $.ajax, etc):

1. Prepend the actual service URL with the Proxy URL 
    - E.g https://some-rest-api/ would become https://this-proxy/https://some-rest-api/
2. Set the request method, query parameters, and body as usual
3. Send the request as usual