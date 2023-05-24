async function UseGetKey() {
  async function getApiKey() {
    let response = await fetch(
      "https://raw.githubusercontent.com/vittoopugliese/gptherapist/main/README.md"
    );
    let text = await response.text();

    let matchA = text.match(/a:\s*'([^']+)'/);
    let matchK = text.match(/k:\s*'([^']+)'/);

    if (matchA && matchK) {
      let a = matchA[1];
      let k = matchK[1];
      let complete = a + k;
      return complete;
    }
  }

  let apikey = await getApiKey();
  return apikey;
}

export default UseGetKey;
