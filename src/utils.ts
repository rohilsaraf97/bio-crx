export const bionifyContent = () => {
  localStorage.setItem("orgBody", `${document.body.innerHTML}`);
  const encodedParams = new URLSearchParams();
  encodedParams.append("content", `${document.body.innerHTML}`);
  encodedParams.append("response_type", "html");
  encodedParams.append("request_type", "html");
  encodedParams.append("fixation", "1");
  encodedParams.append("saccade", "10");

  document.head.innerHTML =
    document.head.innerHTML +
    "<style> .lds-ellipsis {display: inline-block;position: absolute; top: 50%; left: 48%; width: 80px;height: 80px;}.lds-ellipsis div {position: absolute;top: 33px;width: 13px;height: 13px;border-radius: 50%;background: #231955;animation-timing-function: cubic-bezier(0, 1, 1, 0);}.lds-ellipsis div:nth-child(1) {left: 8px;animation: lds-ellipsis1 0.6s infinite;}.lds-ellipsis div:nth-child(2) {left: 8px;animation: lds-ellipsis2 0.6s infinite;}.lds-ellipsis div:nth-child(3) {left: 32px;animation: lds-ellipsis2 0.6s infinite;}.lds-ellipsis div:nth-child(4) {left: 56px;animation: lds-ellipsis3 0.6s infinite;}@keyframes lds-ellipsis1 {0% {transform: scale(0);}100% {transform: scale(1);}}@keyframes lds-ellipsis3 {0% {transform: scale(1);}100% {transform: scale(0);}}@keyframes lds-ellipsis2 {0% {transform: translate(0, 0);}100% {transform: translate(24px, 0);}}</style>";
  document.body.innerHTML =
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

  const url = "https://bionic-reading1.p.rapidapi.com/convert";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "ENTER_API_KEY",
      "X-RapidAPI-Host": "bionic-reading1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  fetch(url, options)
    .then((response) => {
      return response.body;
    })
    .then((rb) => {
      const reader = rb!.getReader();
      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                console.log("done", done);
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });
    })
    .then((stream) =>
      new Response(stream, {
        headers: { "Content-Type": "text/html" },
      }).text()
    )
    .then((result) => {
      document.body.innerHTML = result;
    });
};

export const deBionifyContent = () => {
  document.body.innerHTML = localStorage.getItem("orgBody")!;
};
