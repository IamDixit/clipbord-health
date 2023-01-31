# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The updated code have following enhancements
    1. **Moved constant value into config file** 
        > The constant values like `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` are moved into a centralized config file. These values can be reused in other places when required. 
    2. **Changed the export format**
        > The export method used earlier was hampering the code readability. Moving all exportable functions of a file into one module.export={} improved readability. A new dev looking at the file will get to know about functions are being exported and being used internally in the file by looking at it. 
    3. **Changed variable name candidate to partitionKey**
        > The function is all about determine the partition key by getting an input. The variable candidate is not really explaining the content its holding in the function.
