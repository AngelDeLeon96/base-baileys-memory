const sendMessageChatwood = async (msg = "", message_type = "") => {
    var myHeaders = new Headers;
    myHeaders.append("api_access_token", "b4Byq6gGFtXjFGiWt57usi4Z");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        content: msg,
        message_type: message_type, // "incoming", 
        private: true,
        content_type: "input_email",
        content_attributes: {}
    });


    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const dataRaw = await fetch("http://localhost:3000/api/v1/accounts/2/conversations/2/messages", requestOptions);


    const data = await dataRaw.json()
    return data
}
module.exports = { sendMessageChatwood };