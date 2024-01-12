const apiKey = 'sc72Faf3GB0inb9pCq4kQOzLLCFKCp4i';
let baseUrl = 'https://api.giphy.com/v2/emoji';

export default async function getGifs(limit) {
  const random = Math.random() * 90;
  const url = `${baseUrl}?api_key=${apiKey}&limit=${limit}&offset=${random}`;
  const response = await fetch(url);
  const gifs = (await response.json()).data.map((gif) => gif.images.original.mp4);
  console.log(gifs);
  return gifs;
}
