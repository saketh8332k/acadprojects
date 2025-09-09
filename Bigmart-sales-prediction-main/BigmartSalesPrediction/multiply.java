def multiply(a, b):
    # Handle negative numbers
    negative_result = (a < 0) ^ (b < 0)
    a, b = abs(a), abs(b)

    result = 0
    for _ in range(b):
        result += a

    return -result if negative_result else result

# Example usage:
num1 = 6
num2 = -4
print(multiply(num1, num2))  # Output: -24
