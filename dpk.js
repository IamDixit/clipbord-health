const crypto = require("crypto");
const {TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH} = require('./partition-key-config');

function deterministicPartitionKey(event) {
  let partitionKey = "";
  if (event) {
    if (event.partitionKey) {
      partitionKey = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      partitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (partitionKey) {
    if (typeof partitionKey !== "string") {
      partitionKey = JSON.stringify(partitionKey);
    }
  } else {
    partitionKey = TRIVIAL_PARTITION_KEY;
  }
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
  }
  return partitionKey;
}

module.exports = {
  deterministicPartitionKey
}