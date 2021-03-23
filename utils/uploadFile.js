const pinataApiKey = "{YOUR_API_KEY}";
const pinataSecretApiKey = "{YOUR_API_SECRET}";
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const pinFileToIPFS = async () => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    let data = new FormData();
    data.append("file", fs.createReadStream("{filePath}"));
    const res = await axios.post(url, data, {
      maxContentLength: "Infinity", 
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey, 
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
    console.log(res.data);
  };
  pinFileToIPFS();