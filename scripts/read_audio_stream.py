import pyaudio
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import welch

# Define parameters
FORMAT = pyaudio.paInt16  # Audio format (16-bit PCM)
CHANNELS = 1             # Number of audio channels (1 for mono, 2 for stereo)
RATE = 44100             # Sampling rate (samples per second)
CHUNK = 1024             # Number of frames per buffer
overlap = 0.5            # how much window overlap
window_samples = int(0.1 * RATE) # how many samples

# Create a figure for plotting the PSD
plt.figure(figsize=(8, 4))
plt.ion()  # Turn on interactive mode for real-time updating of the plot

# Function to update the PSD plot
def update_psd_plot(signal):
    plt.clf()
    # plt.semilogy(freqs, psd)
    plt.plot(signal)
    plt.title('Power Spectral Density (PSD)')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Power/Frequency (dB/Hz)')
    plt.grid(True)
    plt.pause(.01)
    plt.pause(window_size)

# Initialize PyAudio
p = pyaudio.PyAudio()

# Open an audio stream (input stream in this example)
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

# Continuously read and process audio data
try:
    print("Streaming audio. Press Ctrl+C to stop.")
    while True:
        # Read audio data from the stream
        audio_data = stream.read(CHUNK)

        # Convert the binary audio data to a NumPy array
        audio_array = np.frombuffer(audio_data, dtype=np.int16)

        # freqs, psd = welch(audio_array, RATE, nperseg=CHUNK, noverlap=int(overlap * CHUNK))

        # Update the PSD plot
        # update_psd_plot(audio_array)  # Convert to dB

        # Process the audio data here (e.g., perform analysis or write to a file)
        # Example: print the maximum value of the audio samples
        max_sample = np.max(audio_array)
        print(f"Max Sample Value: {max_sample}")

except KeyboardInterrupt:
    print("Stopped by user.")

# Close the stream and terminate PyAudio
stream.stop_stream()
stream.close()
p.terminate()
