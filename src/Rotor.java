public class Rotor {
    private String wiring;      //The rotor wiring, a 26-character string
    private int notchPosition;  // The position where the rotor causes the next rotor to step
    private int position;       // Current position of the rotor (0-25)
    private int ringSetting;    // Ring setting (0-25), acts as an offset
    private String name;

    public Rotor(String wiring, int notchPosition, String name) {
        this.wiring = wiring;
        this.notchPosition = notchPosition;
        this.position = 0;      //Initial rotor position
        this.ringSetting = 0;   // Default ring setting
        this.name = name;
    }

    // Public Setter Method for the ring setting
    public void setRingSetting(int setting) { this.ringSetting = setting; }

    // Public Setter Method for rotor position
    public void setPosition(int position) { this.position = position; }

    // Public Getter Method for rotor position
    public int getPosition() { return position; }

    // Public Getter Method for notch position
    public int getNotchPosition() { return notchPosition; }

    // Public Getter Method for ring setting
    public int getRingSetting() { return ringSetting; }

    // Forward mapping through the rotor's wiring
    public char forward(char input) {
        int inputIndex = input - 'A'; // Convert input char to 0-25 index
        int offsetIndex = (inputIndex + position - ringSetting + 26) % 26; // Calculate offset
        char mappedChar = wiring.charAt(offsetIndex); // Find the mapping from the wiring
        int outputIndex = (mappedChar - 'A' - position + ringSetting + 26) % 26; // Convert mappedChar to rotor position
//        return (char)(outputIndex - 'A'); // Convert back to character
        return (char)(outputIndex + 'A'); // Convert back to character
    }

    // Backward mapping
    public char backward(char input) {
        int inputIndex = input - 'A';
        int offsetIndex = (inputIndex + position - ringSetting + 26) % 26;
        int wiringIndex = wiring.indexOf((char)('A' + offsetIndex)); // Find character's position in wiring (reverse lookup)
        int outputIndex = (wiringIndex - position + ringSetting + 26) % 26;
        return (char)(outputIndex + 'A');
    }

    // Step the rotor by one position
    public void step() { position = (position + 1) % 26; }

    // Check if the rotor is at its notch position
    public boolean atNotch() { return position == notchPosition; }

    public String display() {
        StringBuilder sb = new StringBuilder();
        sb.append("Rotor ").append(name).append(":\n");
        sb.append("  Wiring: ").append(wiring).append("\n");
        sb.append("  Notch Position: ").append(notchPosition).append("\n");
        sb.append("  Current Position: ").append(position).append("\n");
        sb.append("  Ring Setting: ").append(ringSetting).append("\n");

        return sb.toString();
    }
}
