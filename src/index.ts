export interface Env {
    // Bind your KV namespace here
    CDN: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		// Handle GET requests for photos and videos
		if (request.method === 'GET' && path.startsWith('/media/')) {
			const mediaId = path.split('/media/')[1];
			const media = await env.CDN.get(mediaId, 'stream');

			if (media) {
				let contentType = 'image/jpeg'; // Default content type
				if (mediaId.endsWith('.mp4')) {
					contentType = 'video/mp4';
				} // Add other content types as needed

				return new Response(media, {
					headers: {
						'Content-Type': contentType,
					},
				});
			} else {
				return new Response('Media not found', { status: 404 });
			}
		}
		if (request.method === 'POST') {
			const formData = await request.formData();
			const file = formData.get('file'); // Use 'file' as the field name for both photos and videos

			if (file instanceof File && file.size > 0) {
				// Generate a unique ID for the media
				const fileExtension = file.name.split('.').pop();
				const mediaId = `${generateMediaId()}.${fileExtension}`;

				// Store the media in KV
				await env.CDN.put(mediaId, file.stream(), {
					expirationTtl: 86400 // Adjust TTL as needed
				});

				// Construct the URL for accessing the media
				const mediaUrl = new URL(request.url);
				mediaUrl.pathname = `/media/${mediaId}`;

				return new Response(`Media uploaded successfully. Access it at: ${mediaUrl}`, {
					status: 200
				});
			} else {
				return new Response('No media found in the request', { status: 400 });
			}
		} else {
			return new Response('This worker accepts POST requests only', { status: 405 });
		}
	},
};


function generateMediaId() {
    return Math.random().toString(36).substring(2, 15);
}