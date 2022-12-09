import { API_PATH } from "../constants/api";
import { MISC } from "../constants/common";
import { jObject, jString } from "../utils";

const retrieveTokenList= async() =>{
  try {
    let getResult = await fetch(API_PATH.TOKEN_LIST);
    getResult = await getResult.json();
    let apiData = jObject(getResult.data);
    console.log("getResultttttttttt", apiData);
    const nwChangeId = localStorage.getItem("staticNwId");
    apiData = apiData.filter((obj) => {
      return obj.nwChangeId == nwChangeId;
    });
    console.log("filterapiData", apiData);
    return apiData;
  } catch (error) {
    console.log("retrieveTokenList Error:", error);
  }
  // return new Promise((r, j) => {
  //   fetch(API_PATH.TOKEN_LIST)
  //     .then((res) => res.json())
  //     .then((res) => r(jObject(res.data)))
  //     .catch((er) => j(er));
  // });
}

function retrieveProjectVersion() {
  return new Promise((r, j) => {
    fetch(API_PATH.PROJECT_VERSION, {
      method: "POST",
      body: jString({
        projectId: MISC.PROJECT_ID,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => r(res.data))
      .catch((er) => j(er));
  });
}

export { retrieveTokenList, retrieveProjectVersion };
