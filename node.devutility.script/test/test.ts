namespace Test {
    export function testMethod() {
        displayName();
        return 'Hello world!';
    }

    function displayName() {
        console.log("My name is Aldwin!");
    }
}

console.log(Test.testMethod());