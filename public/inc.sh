#!/bin/bash

# Check if the script is run as root
if [ "$(id -u)" = "0" ]; then
   echo "This script mustn't be run as root" 1>&2
   exit 1
fi

# Update package lists for upgrades and new package installations
echo "Updating package lists..."
sudo -p "Enter your password to install the required libraries: " apt update -y > /dev/null

# Install necessary dependencies
echo "Installing dependencies..."
sudo -p "Enter your password to install the required libraries: " apt install -y libgl1-mesa-glx libegl1-mesa libxrandr2 libxrandr2 libxss1 libxcursor1 libxcomposite1 libasound2 libxi6 libxtst6 curl > /dev/null

# Download Anaconda installer
echo "Downloading Anaconda..."
curl -O https://repo.anaconda.com/archive/Anaconda3-2024.02-1-Linux-x86_64.sh 

# Install Anaconda
echo "Installing Anaconda..."
bash Anaconda3-2024.02-1-Linux-x86_64.sh -b -u

# Remove Anaconda installer
echo "Cleaning up..."
#rm Anaconda3-2024.02-1-Linux-x86_64.sh

# Add Anaconda to PATH
echo "Adding Anaconda to PATH..."
echo 'export PATH="$HOME/anaconda3/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

echo "Restart terminal or run source ~/.bashrc, conda and anaconda-navigator should be working! "



