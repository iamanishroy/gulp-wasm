#define WASM_EXPORT __attribute__((visibility("default")))

WASM_EXPORT
int add(int num1, int num2)
{
    return num1 * num2;
}