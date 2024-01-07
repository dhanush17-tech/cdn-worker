# Cloudflare Worker CDN

## Description
This repository contains the code for a Cloudflare Worker that implements a Content Delivery Network (CDN) using Cloudflare's Workers KV storage. It is designed to handle the upload and retrieval of media files, such as images and videos.

## Features
- **File Upload**: Supports uploading images and videos via POST requests.
- **File Serving**: Efficiently serves uploaded media files through global CDN.
- **Unique URL Generation**: Generates unique URLs for each uploaded file for easy access and sharing.
- **Scalability and Performance**: Leverages Cloudflare's edge network for low-latency data access and high scalability.

## How It Works
The Worker script intercepts HTTP requests:
- **POST requests** are used to upload files to the KV storage. The script assigns a unique ID to each file and returns a URL for accessing it.
- **GET requests** on the generated URLs are used to fetch and serve the stored files from the KV storage.

## Installation and Deployment
1. Clone this repository.
2. Set up your Cloudflare Workers and KV namespace.
3. Configure your `wrangler.toml` with your account and project details.
```toml
# wrangler.toml

name = "your-worker-name" # Name of your Cloudflare Worker
type = "javascript"
account_id = "" # Your Cloudflare account ID
workers_dev = true # Enables deployment to workers.dev

# Define your KV Namespace bindings here
kv_namespaces = [
  { binding = "CDN", id = "" } # Replace with your KV Namespace ID
]
```
4. Deploy the Worker using `wrangler publish`.

## Usage
- To **upload** a file, send a POST request with the file to the Worker's URL.
- To **access** a file, use the unique URL provided after upload.

## Local Development
- Use `wrangler dev` for a local development environment.
- Test file uploads and retrievals as described in the Usage section.

## Contributing
Contributions to this project are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
