import java.util.HashMap;
import java.util.Map;

public class Plugboard {
    private Map<Character, Character> wiring; // Map that holds pairs of characters that are swapped by the plugboard

    // Initialize empty mapping of plugboard connections in default constructor
    public Plugboard() { wiring = new HashMap<>(); }

    /*
        Adds a pair of letters to the plugboard wiring
        @param char1 The first character in the pair
        @param char2 The second character in the pair
     */
    public void addPlug(char char1, char char2) {
        // Check to ensure no letter is already mapped
//        if (wiring.containsKey(char1) || wiring.containsKey(char2))
//            throw new IllegalArgumentException("One or both characters are already in use in the plugboard.");

        if (wiring.containsKey(char1)) {
            throw new IllegalArgumentException("Character '" + char1 + "' is already paired with '" + wiring.get(char1) + "'.");
        }
        if (wiring.containsKey(char2)) {
            throw new IllegalArgumentException("Character '" + char2 + "' is already paired with '" + wiring.get(char2) + "'.");
        }

        // Map characters onto each other
        wiring.put(char1, char2);
        wiring.put(char2, char1);
    }

    /*
        Removes a pair from the plugboard wiring, undoing a connection
        @param char1 The first character in the pair to remove
     */
    public void removePlug(char char1) {
        // Check if the character is mapped
        if (!wiring.containsKey(char1))
            throw new IllegalArgumentException("Character is not mapped in the plugboard.");

        // Retrieve the character that char1 is connected to
        char char2 = wiring.get(char1);

        // Remove both mappings
        wiring.remove(char1);
        wiring.remove(char2);
    }

    // Pass a character through the plugboard, return the swapped character if mapped, or itself
    public char process(char inputChar) { return wiring.getOrDefault(inputChar, inputChar); }

    // Clear all plugboard connections
    public void reset() { wiring.clear(); }

    // Display the current plugboard mappings for visualization
    public String displayMappings() {
        StringBuilder sb = new StringBuilder();
        sb.append("Plugboard Mappings:\n");

        // Display each unique mapping only once
        for (Map.Entry<Character, Character> entry : wiring.entrySet()) {
            char key = entry.getKey();
            char value = entry.getValue();
            if (key < value) // Avoid duplicate pairs
                sb.append(key).append(" <-> ").append(value).append("\n");
        }
        return sb.toString();
    }
}
