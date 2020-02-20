// let huts = require('./huts.js')
// let beds = require('./beds.js')

// // 31 + 7
// // huts.get().then(res => console.log(res))

// // beds.get('七卡山莊').then(res => console.log(res));
// beds.get('奇萊山屋').then(res => console.log(res));

const getHuts = require("./getHuts");

test("National park", async () => {
  const huts = await getHuts();
  expect(huts.length).toBe(38);
});
