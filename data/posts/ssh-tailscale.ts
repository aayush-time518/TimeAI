export const markdown = `
This comprehensive guide will walk you through setting up SSH and Tailscale on your Ubuntu server, enabling secure remote access without complex router configurations.

## Why This Setup?

The standard way to access servers often involves risky port forwarding on your router. By using Tailscale, we create a **Point-to-Point Mesh VPN**, which means your server is never actually exposed to the public internet, yet you can access it from anywhere in the world.

- **SSH:** Secure Shell protocol for remote server access.
- **Tailscale:** Zero-config VPN that creates a secure network between your devices.
- **No Router Config:** Bypass port forwarding and firewall complexities.

## Prerequisites

Before starting, ensure you have:
- Ubuntu 20.04 or newer installed
- Sudo privileges on the server
- Active internet connection

## Step-by-Step Configuration

### 1. Update System Packages
Always start with a fresh package index to avoid dependency conflicts.
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

### 2. Install OpenSSH Server
The OpenSSH server is the industry standard for secure remote logins.
\`\`\`bash
sudo apt install openssh-server -y
\`\`\`

### 3. Service Management
Ensure the daemon is running and set to start on system boot.
\`\`\`bash
sudo systemctl start ssh
sudo systemctl enable ssh
\`\`\`

### 4. Configure Firewall
We need to allow SSH traffic specifically. If you use UFW (Uncomplicated Firewall):
\`\`\`bash
sudo ufw allow ssh
sudo ufw reload
sudo ufw status
\`\`\`

### 5. Secure SSH Config
Edit the configuration file to disable root login for better security.
\`\`\`bash
sudo nano /etc/ssh/sshd_config
\`\`\`
Find and modify these lines:
\`\`\`text
PasswordAuthentication yes
PermitRootLogin no
\`\`\`
> **Security note:** For production environments, we strongly recommend disabling password authentication entirely in favor of SSH Keys.

### 6. Install Tailscale
Now we install the networking layer. Tailscale provides a one-line installer for Ubuntu.
\`\`\`bash
curl -fsSL https://tailscale.com/install.sh | sh
\`\`\`

### 7. Authenticate Node
Finalize the connection to your private mesh network.
\`\`\`bash
sudo tailscale up
\`\`\`
Follow the authentication link provided in the terminal to log in with your Tailscale account.

## Automated Deployment
For quick deployment across multiple nodes, you can use our proprietary automation script:

\`\`\`bash
#!/bin/bash
# Time AI Deployment Engine v1.0
echo "=== Starting Architecture Hardening ==="
sudo apt update && sudo apt upgrade -y
sudo apt install openssh-server -y
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
echo "=== Node Secured ==="
\`\`\`
`;