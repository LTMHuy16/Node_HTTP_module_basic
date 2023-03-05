const fs = require("fs");

function writeDataToFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content), "utf-8", (error) => {
        if (err) console.log(err);
    });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", async () => {
                resolve(body);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = {
    writeDataToFile,
    getPostData
};
