# Enigma Machine Simulator

## Project Overview
This project is a Java-based simulation of the famous Enigma machine, a cipher device used predominantly in World War II by German military forces. This simulation allows users to encrypt and decrypt messages with similar functionality to the original Enigma machine. Users can customize rotor and reflector configurations, ring settings, plugboard settings, and choose their plaintext message to observe the encrypted output. The program also showcases the internal state changes of the rotors after each character encryption, mirroring the mechanical nature of the original Enigma.

## Background: The Enigma Machine
The Enigma machine was invented by German engineer Arthur Scherbius and was used by the German military during WWII to encode strategic messages. It consisted of several rotating disks (rotors), a plugboard to swap letters, and a reflector that reversed the signal path, making decryption without the correct machine configuration almost impossible. 

The machine operated by passing an electrical signal through each component in the following order:
1. **Plugboard (Steckerbrett)**: Swapped letters in pairs before entering the rotors.
2. **Rotors**: Rotating disks with internal wiring that performed letter substitution. Each rotor stepped according to specific rules, advancing the cipher with each character typed.
3. **Reflector**: Reversed the electrical signal back through the rotors, allowing for bidirectional encryption and decryption.
4. **Return through Rotors**: The signal passed back through the rotors in the opposite direction.
5. **Plugboard**: Swapped letters a second time based on the initial configuration, producing the final output letter.

## Features of This Simulation
- **Customizable Rotors**: Choose 3 rotors out of 5 available options, each with distinct wiring and a customizable ring setting and initial position.
- **Reflector Options**: Select one reflector from options A, B, C, or D.
- **Plugboard Setup**: Configure plugboard settings to swap letter pairs for additional encryption complexity.
- **Step-by-Step Encryption**: Displays rotor positions after each character encryption, illustrating the machine's mechanical stepping action.

## Code Structure
This project consists of the following core classes:
1. **Main.java**: 
   - Entry point of the program. It collects user input to configure the Enigma machine (rotors, reflector, plugboard) and validates each input to ensure a realistic and functional setup. 
   - Allows users to input their plaintext message and displays the encrypted ciphertext along with the rotor positions after each step.

2. **EnigmaMachine.java**:
   - Manages the overall functionality of the Enigma machine, including character-by-character encryption. 
   - Provides methods for adding rotors, setting a reflector, adding plugboard pairs, and encrypting a message.
   - Contains the `stepRotors()` method to handle the machine’s double-stepping mechanism and manage rotor positions accurately.
   - Validates that the machine is correctly configured (three rotors, one reflector) before processing encryption.

3. **Rotor.java**:
   - Represents a rotor component with customizable wiring, notch positions, ring settings, and initial rotor positions. 
   - Implements `forward` and `backward` mappings to pass signals through the rotor in both directions.
   - Contains the `step` method to advance the rotor position and handle the notch mechanism for triggering the next rotor.
   - Displays the rotor configuration for easy tracking and debugging.

4. **Reflector.java**:
   - Represents the reflector component, providing fixed bidirectional mapping.
   - Reflects the signal path back through the rotors.
   - Supports four reflector configurations (A, B, C, D) with different wiring.

5. **Plugboard.java**:
   - Represents the plugboard component, allowing the user to specify letter swaps for additional encryption complexity.
   - Validates that no letter is mapped to itself or mapped more than once.
   - Contains a display method to show active plugboard mappings.

## Getting Started
### Prerequisites
- Java JDK 8 or higher installed on your system.
- A basic understanding of the Enigma machine's operation will help in understanding the code and how to configure it.

### Running the Program
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/EnigmaMachineSimulator.git
   cd EnigmaMachineSimulator
   ```

2. Compile the Java files:
   ```bash
   javac Main.java EnigmaMachine.java Rotor.java Reflector.java Plugboard.java
   ```

3. Run the program:
   ```bash
   java Main
   ```

### Using the Simulator
1. **Select Rotors and Reflector**: 
   - Choose 3 out of 5 available rotors (I, II, III, IV, V) and one of the reflectors (A, B, C, D).
2. **Set Plugboard Pairs**: 
   - Enter pairs of letters (e.g., `AB, CD`) to map on the plugboard or press Enter to skip.
3. **Ring Settings and Initial Positions**: 
   - For each selected rotor, set the initial ring setting (0–25) and starting position (0–25).
4. **Encrypt Message**: 
   - Enter the plaintext to be encrypted. The program will display each encrypted character along with the updated rotor positions.

## Known Limitations
- **Historical Accuracy**: This simulation models the essential mechanics of the Enigma machine but omits certain mechanical nuances. 
- **Character Range**: Currently supports only uppercase English letters (A-Z), excluding spaces and punctuation.
  
## Future Enhancements
- **Extended Character Set**: Support for punctuation and other symbols.
- **Graphical Interface**: Potentially integrate with a GUI (e.g., in JavaFX or with a web-based front end using Node.js and React.js) to visualize rotor movements and wiring paths.
