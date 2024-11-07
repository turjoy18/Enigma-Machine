import java.util.*;

public class Main {
    public static void main(String[] args) {
        //Initialize the Enigma Machine
        EnigmaMachine enigma = new EnigmaMachine();
        Scanner scanner = new Scanner(System.in);

        // Available rotors
        Map<String, Rotor> availableRotors = new HashMap<>();
        availableRotors.put("I", new Rotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ", 16, "I"));
        availableRotors.put("II", new Rotor("AJDKSIRUXBLHWTMCQGZNPYFVOE", 4, "II"));
        availableRotors.put("III", new Rotor("BDFHJLCPRTXVZNYEIWGAKMUSQO", 21, "III"));
        availableRotors.put("IV", new Rotor("ESOVPZJAYQUIRHXLNFTGKDCMWB", 9, "IV"));
        availableRotors.put("V", new Rotor("VZBRGITYUPSDNHLXAWMJQOFECK", 25, "V"));

        // Available reflectors
        Map<String, Reflector> availableReflectors = new HashMap<>();
        availableReflectors.put("A", new Reflector("EJMZALYXVBWFCRQUONTSPIKHGD", 'A'));
        availableReflectors.put("B", new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT", 'B'));
        availableReflectors.put("C", new Reflector("FVPJIAOYEDRZXWGCTKUQSBNMHL", 'C'));
        availableReflectors.put("D", new Reflector("ZGBTCJFEQJHRSKLPALDXNZMVOU", 'D'));

        // User input for rotor selection
        System.out.println("Available rotors: I, II, III, IV, V");
        for (int i = 1; i <= 3; i++) {
            System.out.println("Select rotor" + i + ": ");
            String rotorChoice = scanner.nextLine().toUpperCase();
            if (availableRotors.containsKey(rotorChoice)) {
                // enigma.addRotor(availableRotors.get(rotorChoice));
                Rotor selectedRotor = availableRotors.get(rotorChoice);

                // Set the ring setting for the selected rotor
                System.out.print("Set ring setting (0-25) for rotor " + i + ": ");
                int ringSetting = scanner.nextInt();
                selectedRotor.setRingSetting(ringSetting);

                // Set the initial rotor position
                System.out.print("Set initial position (0-25) for rotor " + i + ": ");
                int position = scanner.nextInt();
                selectedRotor.setPosition(position);

                enigma.addRotor(selectedRotor);
                scanner.nextLine();
            } else {
                System.out.println("Invalid rotor. Please restart and choose from I, II, III, IV, V.");
                return;
            }
        }

        // User input for reflector selection
        System.out.println("Available reflectors: A, B, C, D");
        System.out.print("Select reflector: ");
        String reflectorChoice = scanner.nextLine().toUpperCase();
        if (availableReflectors.containsKey(reflectorChoice)) {
            enigma.setReflector(availableReflectors.get(reflectorChoice));
        } else {
            System.out.println("Invalid reflector. Please restart and choose from A, B, C, D.");
            return;
        }

        // User input for Plugboard configuration
        System.out.println("Enter plugboard pairs (format: AB CD ...), or press Enter to skip:");
        String plugboardInput = scanner.nextLine().toUpperCase().replaceAll("\\s", "");
        for (int i = 0; i < plugboardInput.length() - 1; i += 2) {
            char a = plugboardInput.charAt(i);
            char b = plugboardInput.charAt(i + 1);
            //enigma.addPlugboardPair(a, b);
            try {
                enigma.addPlugboardPair(a, b);
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }

        // Display Enigma Configuration
        enigma.displayConfiguration();

        // User input plaintext
        System.out.println("Enter plaintext to encrypt: ");
        String plaintext = scanner.nextLine().toUpperCase();

        // Encrypt the message and display the ciphertext
        String ciphertext = enigma.encryptMessage(plaintext);
        System.out.println("Ciphertext: " + ciphertext);

        scanner.close();
    }
}
