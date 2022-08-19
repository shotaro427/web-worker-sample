console.log("self", self);

const worker = self as unknown as Worker;

worker.addEventListener("message", ({ data }: MessageEvent<number>) => {
  let a = 0;
  for (let j = 0; j < 1000; j++) {
    a = 0;
    for (let i = 1; i <= data; i++) {
      a += i;
    }
  }

  postMessage(a);
});

// eslint-disable-next-line
export default null;
