const apiKey = 'sc72Faf3GB0inb9pCq4kQOzLLCFKCp4i';
let baseUrl = 'https://api.giphy.com/v2/emoji';

export default async function getGifs(limit, maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    const totalCount = 99;
    const maxOffset = totalCount - limit;
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));
    const url = `${baseUrl}?api_key=${apiKey}&limit=${limit}&offset=${randomOffset}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.data.length === limit) {
      const gifs = data.data.map((gif) => gif.images.original.mp4);
      return gifs;
    }

    retries++;
  }
  retries = 0;
  while (retries < maxRetries) {
    const totalCount = 99;
    const maxOffset = totalCount - limit;
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));
    const url = `${baseUrl}?api_key=${apiKey}&limit=${limit + 2}&offset=${randomOffset}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.data.length === limit) {
      const gifs = data.data.map((gif) => gif.images.original.mp4);
      return gifs;
    }

    retries++;
  }

  throw new Error('Failed to fetch enough gifs after multiple attempts');
}
