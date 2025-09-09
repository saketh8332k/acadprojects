package java.upper;

public class Upper {
    public static void main(String[] args) {
        String input = "Hello World!"; // Example input
        StringBuilder converted = new StringBuilder();

        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            if (Character.isLowerCase(ch)) {
                converted.append(Character.toUpperCase(ch));
            } else if (Character.isUpperCase(ch)) {
                converted.append(Character.toLowerCase(ch));
            } else {
                converted.append(ch); // Keep non-alphabetic characters as is
            }
        }

        System.out.println("Original: " + input);
        System.out.println("Converted: " + converted.toString());
    }
}
