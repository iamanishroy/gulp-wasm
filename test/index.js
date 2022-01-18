if ("WebAssembly" in window) {
    const importObject = {
        env: {
            __memory_base: 0,
            __table_base: 0,
            memory: new WebAssembly.Memory({ initial: 1 }),
        },
    };
    fetch("wasm/add.wasm")
        .then((response) => response.arrayBuffer())
        .then((bytes) => WebAssembly.instantiate(bytes, importObject))
        .then((results) => {
            instance = results.instance;

            let num1 = 4;
            let num2 = 6;

            document.getElementById("wasm").textContent =
                `Sum of ${num1} and ${num2} is ${instance.exports.add(num1, num2)}`;
        })
        .catch(console.error);
}