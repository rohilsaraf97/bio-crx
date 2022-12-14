export const bionifyContent = () => {
  localStorage.setItem("orgBody", `${document.body.innerHTML}`);
  const url = "https://afternoon-sands-94401.herokuapp.com/bionify";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      htmlBody: `${document.body.innerHTML}`,
      fixation: "1",
      saccade: "10",
      url: window.location.href,
    }),
  };

  document.head.innerHTML =
    document.head.innerHTML +
    "<style> .lds-ellipsis {display: inline-block;position: absolute; top: 50%; left: 48%; width: 80px;height: 80px;}.lds-ellipsis div {position: absolute;top: 33px;width: 13px;height: 13px;border-radius: 50%;background: #231955;animation-timing-function: cubic-bezier(0, 1, 1, 0);}.lds-ellipsis div:nth-child(1) {left: 8px;animation: lds-ellipsis1 0.6s infinite;}.lds-ellipsis div:nth-child(2) {left: 8px;animation: lds-ellipsis2 0.6s infinite;}.lds-ellipsis div:nth-child(3) {left: 32px;animation: lds-ellipsis2 0.6s infinite;}.lds-ellipsis div:nth-child(4) {left: 56px;animation: lds-ellipsis3 0.6s infinite;}@keyframes lds-ellipsis1 {0% {transform: scale(0);}100% {transform: scale(1);}}@keyframes lds-ellipsis3 {0% {transform: scale(1);}100% {transform: scale(0);}}@keyframes lds-ellipsis2 {0% {transform: translate(0, 0);}100% {transform: translate(24px, 0);}}</style>";
  document.body.innerHTML =
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

  if (localStorage.getItem("bioBody") !== null) {
    document.body.innerHTML = localStorage.getItem("bioBody") as string;
  } else {
    fetch(url, options)
      .then((response) => {
        if (response.status === 200) return response.body;
        throw Error(response.statusText);
      })
      .then((rb) => {
        const reader = rb!.getReader();
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
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
        localStorage.setItem("bioBody", result);
      })
      .catch((error) => {
        document.body.innerHTML =
          "<div><h3>Cannot Process your request at the moment.</h3></div>";
        setTimeout(() => {
          document.body.innerHTML = localStorage.getItem("orgBody")!;
          localStorage.clear();
        }, 1000);
      });
  }
};

export const deBionifyContent = () => {
  document.body.innerHTML = localStorage.getItem("orgBody")!;
  localStorage.removeItem("orgBody");
};
