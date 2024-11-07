import java.util.ArrayList;
import java.util.List;

public class EnigmaMachine {
    private List<Rotor> rotors;
    private Reflector reflector;
    private Plugboard plugboard;

    // Default constructor initializing empty rotors and plugboard
    public EnigmaMachine() {
        rotors = new ArrayList<>();
        plugboard = new Plugboard();
    }

    // Add a rotor to the Enigma machine
    public void addRotor(Rotor rotor) {
        rotors.add(rotor);
    }

    // Set reflector for the Enigma machine
    public void setReflector(Reflector reflector) { this.reflector = reflector; }

    // Adds a plugboard to the plugboard configuration
    public void addPlugboardPair(char a, char b) { plugboard.addPlug(a, b);}

    // Encrypts a single character by passing it through the plugboard, rotors, reflector, and back
    public char encryptChar(char inputChar) {
        // Step the rotors before encrypting the character
        stepRotors();

        // Display the rotor positions after stepping
        System.out.print("Updated Rotor Positions: ");
        for (Rotor rotor : rotors) {
            System.out.print(rotor.getPosition() + " ");
        }
        System.out.println();

        // Step 1: Plugboard mapping
        char charAfterPlugboard = plugboard.process(inputChar);

        // Step 2: Pass through each rotor forward
        char charAfterRotors = charAfterPlugboard;
        for (int i = rotors.size() - 1; i >= 0; i--)
            charAfterRotors = rotors.get(i).forward(charAfterRotors);

        // Step 3: Pass through reflector
        char reflectedChar = reflector.reflect(charAfterRotors);

        // Step 4: Pass back through each rotor in reverse
        char charAfterReverseRotors = reflectedChar;
        for (Rotor rotor : rotors)
            charAfterReverseRotors = rotor.backward(charAfterReverseRotors);

        // Step 5: Pass back through the plugboard
        char outputChar = plugboard.process(charAfterReverseRotors);

        System.out.println("Plain = " + inputChar + " -> " + outputChar + " = Cipher");

//        // Step the rotors before returning the result
//        stepRotors();

        return outputChar;
    }

    private void stepRotors() {
        Rotor rightRotor = rotors.get(2);
        Rotor middleRotor = rotors.get(1);
        Rotor leftRotor = rotors.get(0);

        // Step the right rotor every time a character is encrypted
        rightRotor.step();

        /*
            Double-stepping mechanism:
            If the middle rotor is at the notch, it will step the left rotor
            If the right rotor is at the notch, it will step the middle rotor
         */
        if (middleRotor.atNotch()) {
            middleRotor.step();
            leftRotor.step();
        } else if (rightRotor.atNotch()) {
            middleRotor.step();
        }
    }

    // Encrypts an entire string by processing each character individually
    public String encryptMessage(String plaintext) {
        StringBuilder ciphertext = new StringBuilder();
        for (char c : plaintext.toCharArray())
            ciphertext.append(encryptChar(c));

        return ciphertext.toString();
    }

    // Display the current configuration and state of the Enigma Machine
    public void displayConfiguration() {
        System.out.println("Enigma Machine Configuration");

        // Plugboard Configuration
        System.out.println("Plugboard:");
        System.out.println(plugboard.displayMappings());

        // Rotor Configurations
        System.out.println("Rotors:");
        for (Rotor rotor : rotors)
            System.out.println(rotor.display());

        // Reflector Configuration
        System.out.println("Reflector:");
        System.out.println(reflector.display());
    }
}
