const getHuts = require("./getHuts");
const getBeds = require("./getBeds");

// let beds = require('./beds.js')

// beds.get('七卡山莊').then(res => console.log(res));

test("Get sheipa huts", async () => {
  const huts = await getHuts("sheipa");
  expect(huts.length).toBe(31);
});

test("Get taroko huts", async () => {
  const huts = await getHuts("taroko");
  expect(huts.length).toBe(7);
});

test("Get sheipa beds", async () => {
  const beds = await getBeds("七卡山莊");
  console.log(beds);
  expect(beds.length).toBe(31);
});
