const searchRecipes =  async(searchTerm: string) => {
    const baseURL = new URL("www.themealdb.com/api/json/v1/1/search.php?s=");
    baseURL.searchParams.append('searchTerm', searchTerm);

    const response =  await fetch(baseURL.toString());

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    return response.json();
}

export { searchRecipes }