const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns 128 char hash key when given 0 as params", () => {
    const trivialKey = deterministicPartitionKey(0);
    expect(trivialKey).toBe("0");
  });
  it("Returns 128 char hash key when given negative number as params", () => {
    const trivialKey = deterministicPartitionKey(-1004);
    expect(trivialKey.length).toBe(128);
  });
  it("Returns 128 char hash key when given positive number as params", () => {
    const trivialKey = deterministicPartitionKey(1004);
    expect(trivialKey.length).toBe(128);
  });
  it("Returns 128 char hash key when given a string as params", () => {
    const trivialKey = deterministicPartitionKey("hello world");
    expect(trivialKey.length).toBe(128);
  });
  it("Returns the literal '0' when given empty string as params", () => {
    const trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe("0");
  });
  it("Returns 128 char hash key when given partitionKey as 0", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 0});
    expect(trivialKey.length).toBe(128);
  });
  it("Returns same value as string when given partitionKey as positive number", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 1004});
    expect(trivialKey).toBe("1004");
  });
  it("Returns same value as string when given partitionKey as negative number", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: -1004});
    expect(trivialKey).toBe("-1004");
  });
  it("Returns 128 char hash key when given partitionKey as empty string", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: ""});
    expect(trivialKey.length).toBe(128);
  });
  it("Returns same value when given partitionKey as non empty string", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "hello world"});
    expect(trivialKey).toBe("hello world");
  });
});
