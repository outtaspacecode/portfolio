export async function getJson(url) {
    let data = [];
    const response = await fetch(url);
    if (response.ok) {
        data = await response.json();
    } else throw new Error("response not ok");
    return data;
}
