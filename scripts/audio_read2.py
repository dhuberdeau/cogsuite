import numpy as np
import matplotlib.pyplot as plt
import pyaudio
from scipy.signal import welch

# Define parameters
fs = 44100        # Sampling frequency (Hz)
# CHUNK = 1024      # Samples to pull from stream (samples)
window_size = 0.1 # Window size in seconds (100 ms)
overlap = 0.5     # Overlap between windows (50%)

# Calculate the number of samples per window
window_samples = int(window_size * fs)
buffer_read_samples = int(window_samples/2)

# Initialize a buffer to store audio samples
audio_buffer = np.zeros(window_samples, dtype=np.float32)

# Create a figure for plotting the PSD
plt.figure(figsize=(8, 4))
plt.ion()  # Turn on interactive mode for real-time updating of the plot

# Function to update the PSD plot
def update_psd_plot(freqs, psd):
    plt.clf()
    plt.semilogy(freqs, psd)
    plt.title('Power Spectral Density (PSD)')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Power/Frequency (dB/Hz)')
    plt.grid(True)
    plt.pause(window_size)

# Initialize the audio stream
p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paFloat32,
                channels=1,  # Mono input
                rate=fs,
                input=True,
                frames_per_buffer=window_samples)

# Function to process audio in real-time
def audio_callback(in_data, frame_count):
    audio_data = np.frombuffer(in_data, dtype=np.float32)

    # Add the new audio data to the buffer
    audio_buffer[:-frame_count] = audio_buffer[frame_count:]
    audio_buffer[-frame_count:] = audio_data

    # Compute the PSD
    freqs, psd = welch(audio_buffer, fs, nperseg=window_samples, noverlap=int(overlap * window_samples))

    # Update the PSD plot
    update_psd_plot(freqs, 10 * np.log10(psd))  # Convert to dB

# Start streaming audio
# print("Streaming audio. Press Ctrl+C to stop.")
try:
    print("Streaming audio. Press Ctrl+C to stop.")
    while True:
        audio_data = stream.read(buffer_read_samples)

        # Convert the binary audio data to a NumPy array
        audio_array = np.frombuffer(audio_data, dtype=np.int16)

        audio_callback(audio_array, buffer_read_samples)
except KeyboardInterrupt:
    print("Stopped by user.")
# plt.show(block=True)  # Keep the plot window open until Ctrl+C is pressed

# Stop the audio stream and close PyAudio
stream.stop_stream()
stream.close()
p.terminate()
