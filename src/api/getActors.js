/* This function uses fetch to load the actors from a static json file
 * in public/actors.json. This is obviously just mock data, but it simulates
 * a real HTTP request with loading states. If we were to connect this to a real api,
 * we would obviously replace the URL to point to the API.
 * */
export function getActors() {
  return fetch(`/tree-stunt/actors.json`).then((r) => {
    if (!r.ok) throw new Error(r.statusText);
    return r.json();
  });
}
