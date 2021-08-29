const user = require("./user.js");
async function main() {
  await user(0);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
