const apiKey = 'sc72Faf3GB0inb9pCq4kQOzLLCFKCp4i';
let baseUrl = 'https://api.giphy.com/v2/emoji';

export default async function getGifs(limit) {
  const totalCount = 99;
  const random = Math.floor(Math.random() * (totalCount - limit + 1));
  const url = `${baseUrl}?api_key=${apiKey}&limit=${limit}&offset=${random}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const gifs = data.data.map((gif) => gif.images.original.mp4);
  return gifs;
}
