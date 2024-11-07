import java.util.HashMap;
import java.util.Map;

public class Reflector {
    private Map<Character, Character> wiring; // Reflector wiring map
    private char name;                        // Reflector identifier

    /*
        Initialize reflector with a specific wiring configuration in the constructor
        @param wiringStr A string representing the reflector wiring
        @param name      Name of the reflector
     */
    public Reflector(String wiringStr, char name) {
        this.wiring = new HashMap<>();
        this.name = name;
        initializeWiring(wiringStr);
    }

    // Initialize reflector wiring based on provided wiring string
    private void initializeWiring(String wiringStr) {
        for (int i = 0; i < wiringStr.length(); i++) {
            char letter = (char)('A' + i);
            char mappedChar = wiringStr.charAt(i);

            // Ensure symmetric mapping
            wiring.put(letter, mappedChar);
            wiring.put(mappedChar, letter);
        }
    }

    // Reflect a character through the reflector wiring (Map character to its pair)
    public char reflect(char inputChar) { return wiring.getOrDefault(inputChar, inputChar); }

    public String display() {
        StringBuilder sb = new StringBuilder();
        sb.append("Reflector").append(name).append(":\n");

        // Display each unique mapping only once
        for (Map.Entry<Character, Character> entry : wiring.entrySet()) {
            char key = entry.getKey();
            char value = entry.getValue();
            if (key < value) // Avoid duplicate pairs
                sb.append("  ").append(key).append(" <-> ").append(value).append("\n");
        }
        return sb.toString();
    }
}
