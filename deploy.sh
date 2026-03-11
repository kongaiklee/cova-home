#!/bin/bash

# Cova Home Deployment Script
# This script automates the deployment process for the Cova Home application (Static Vite React)

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="covarage.com"
NGINX_SITE_PATH="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED_PATH="/etc/nginx/sites-enabled/${DOMAIN}"
PROJECT_DIR="$(pwd)"
BUILD_DIR="${PROJECT_DIR}/dist"

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_root() {
    if [ "$EUID" -ne 0 ] && ! sudo -n true 2>/dev/null; then
        log_error "This script requires sudo privileges. Please run with sudo or ensure passwordless sudo is configured."
        exit 1
    fi
}

run_sudo() {
    if [ "$EUID" -eq 0 ]; then
        "$@"
    else
        sudo "$@"
    fi
}

# Step 1: Create deploy branch with timestamp
log_info "Step 1: Creating deploy branch..."
TIMESTAMP=$(date +%Y%m%d%H%M)
BRANCH_NAME="deploy/${TIMESTAMP}"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    log_warn "Not a git repository. Skipping branch creation."
else
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")
    log_info "Current branch: ${CURRENT_BRANCH}"

    # Checkout main branch
    log_info "Switching to main branch..."
    if git show-ref --verify --quiet refs/heads/main; then
        git checkout main
    elif git show-ref --verify --quiet refs/heads/master; then
        log_info "Main branch not found, using master instead..."
        git checkout master
    else
        log_error "Neither 'main' nor 'master' branch found!"
        exit 1
    fi

    # Pull latest changes
    log_info "Pulling latest changes from remote..."
    git pull origin $(git branch --show-current) || log_warn "Failed to pull from remote. Continuing with local branch..."

    # Create and checkout deploy branch from main
    if git show-ref --verify --quiet refs/heads/${BRANCH_NAME}; then
        log_warn "Branch ${BRANCH_NAME} already exists. Checking it out..."
        git checkout ${BRANCH_NAME}
    else
        log_info "Creating new deploy branch: ${BRANCH_NAME}"
        git checkout -b ${BRANCH_NAME}
    fi

    log_info "Current branch: $(git branch --show-current)"
fi

# Step 2: Build the application
log_info "Step 2: Building the application..."
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Are you in the project root?"
    exit 1
fi

log_info "Running npm install..."
npm install

log_info "Running lint check..."
if ! npm run lint; then
    log_error "Lint check failed! Please fix linting errors before deploying."
    exit 1
fi

log_info "Running format check..."
if ! npm run fm:check; then
    log_error "Format check failed! Please fix formatting issues before deploying."
    exit 1
fi

log_info "All checks passed! Running npm run build..."
npm run build

if [ ! -d "dist" ]; then
    log_error "Build failed! dist directory not found."
    exit 1
fi

log_info "Build completed successfully!"

# Step 3: Install nginx
log_info "Step 3: Installing nginx..."
if command -v nginx &> /dev/null; then
    log_warn "Nginx is already installed."
    NGINX_VERSION=$(nginx -v 2>&1 | awk -F/ '{print $2}')
    log_info "Nginx version: ${NGINX_VERSION}"
else
    log_info "Installing nginx..."
    run_sudo apt update
    run_sudo apt install nginx -y
    log_info "Nginx installed successfully!"
fi

# Start and enable nginx
log_info "Starting and enabling nginx service..."
run_sudo systemctl start nginx
run_sudo systemctl enable nginx

# Step 4: Configure HTTP nginx
log_info "Step 4: Configuring HTTP nginx..."
if [ ! -f "nginx_http.conf" ]; then
    log_error "nginx_http.conf not found in project directory!"
    exit 1
fi

log_info "Copying nginx_http.conf to ${NGINX_SITE_PATH}..."
run_sudo cp nginx_http.conf ${NGINX_SITE_PATH}

# Create symbolic link to enable the site
if [ ! -L "${NGINX_ENABLED_PATH}" ]; then
    log_info "Creating symbolic link to enable the site..."
    run_sudo ln -s ${NGINX_SITE_PATH} ${NGINX_ENABLED_PATH}
else
    log_warn "Symbolic link already exists."
fi

# Remove default site (optional)
if [ -L "/etc/nginx/sites-enabled/default" ]; then
    log_info "Removing default nginx site..."
    run_sudo rm /etc/nginx/sites-enabled/default
fi

# Test nginx configuration
log_info "Testing nginx configuration..."
if run_sudo nginx -t; then
    log_info "Nginx configuration test passed!"
    run_sudo systemctl reload nginx
else
    log_error "Nginx configuration test failed!"
    exit 1
fi

# Step 5: Install certbot
log_info "Step 5: Installing certbot..."
if command -v certbot &> /dev/null; then
    log_warn "Certbot is already installed."
else
    log_info "Installing certbot and python3-certbot-nginx..."
    run_sudo apt install certbot python3-certbot-nginx -y
    log_info "Certbot installed successfully!"
fi

# Step 6: Get SSL certificate and configure HTTPS nginx
log_info "Step 6: Configuring SSL certificate..."
SSL_CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

if [ -f "${SSL_CERT_PATH}" ]; then
    log_warn "SSL certificate already exists for ${DOMAIN}."
    log_info "Skipping certificate generation. Updating nginx config with SSL..."
else
    log_info "Obtaining SSL certificate for ${DOMAIN}..."
    log_warn "This step requires the domain to be pointing to this server!"

    # Check if certbot account already exists
    CERTBOT_ACCOUNTS_DIR="/etc/letsencrypt/accounts"
    if [ -d "${CERTBOT_ACCOUNTS_DIR}" ] && [ "$(ls -A ${CERTBOT_ACCOUNTS_DIR} 2>/dev/null)" ]; then
        log_info "Certbot account already registered. Running certbot non-interactively..."
        if run_sudo certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos; then
            log_info "SSL certificate obtained successfully!"
        else
            log_error "Failed to obtain SSL certificate!"
            log_warn "You may need to run certbot manually: sudo certbot --nginx -d ${DOMAIN}"
            log_warn "Continuing with HTTP configuration only..."
        fi
    else
        log_warn "First time certbot setup - email registration required!"
        log_info "Certbot will prompt you for an email address for renewal notifications."
        log_info "You can also skip email by using --register-unsafely-without-email"
        log_info "Running certbot interactively..."

        # Try interactive mode (will prompt for email)
        if run_sudo certbot --nginx -d ${DOMAIN}; then
            log_info "SSL certificate obtained successfully!"
        else
            log_error "Failed to obtain SSL certificate!"
            log_warn "You may need to run certbot manually: sudo certbot --nginx -d ${DOMAIN}"
            log_warn "Continuing with HTTP configuration only..."
        fi
    fi
fi

# Copy SSL nginx configuration if certificate exists
if [ -f "${SSL_CERT_PATH}" ]; then
    log_info "Copying SSL nginx configuration..."
    if [ ! -f "nginx.conf" ]; then
        log_error "nginx.conf not found in project directory!"
        exit 1
    fi

    run_sudo cp nginx.conf ${NGINX_SITE_PATH}

    # Test and reload nginx
    log_info "Testing nginx SSL configuration..."
    if run_sudo nginx -t; then
        log_info "Nginx SSL configuration test passed!"
        run_sudo systemctl reload nginx
    else
        log_error "Nginx SSL configuration test failed!"
        exit 1
    fi
fi

# Step 7: Configure firewall
log_info "Step 7: Configuring firewall..."
if command -v ufw &> /dev/null; then
    log_info "Configuring UFW firewall..."

    # Check if firewall is already enabled
    UFW_STATUS=$(run_sudo ufw status | head -n 1)

    # Allow HTTP, HTTPS, and SSH
    log_info "Allowing HTTP (port 80)..."
    run_sudo ufw allow 80/tcp

    log_info "Allowing HTTPS (port 443)..."
    run_sudo ufw allow 443/tcp

    log_info "Allowing SSH (port 22)..."
    run_sudo ufw allow 22/tcp

    # Enable firewall if not already enabled
    if echo "${UFW_STATUS}" | grep -q "inactive"; then
        log_info "Enabling firewall..."
        echo "y" | run_sudo ufw enable
    else
        log_warn "Firewall is already enabled."
    fi

    log_info "Firewall status:"
    run_sudo ufw status
else
    log_warn "UFW not found. Skipping firewall configuration."
    log_warn "Please configure your firewall manually to allow ports 80, 443, and 22."
fi

# Step 8: Verify deployment (Static site - no PM2 needed)
log_info "Step 8: Verifying deployment..."

# Verify build directory exists and has content
if [ -d "${BUILD_DIR}" ] && [ "$(ls -A ${BUILD_DIR})" ]; then
    log_info "Build directory exists and contains files."
    log_info "Files in dist/:"
    ls -la ${BUILD_DIR}
else
    log_error "Build directory is empty or missing!"
    exit 1
fi

# Verify nginx is running
if systemctl is-active --quiet nginx; then
    log_info "Nginx is running."
else
    log_error "Nginx is not running!"
    exit 1
fi

# Push deploy branch to remote
if [ -d ".git" ]; then
    log_info "Pushing deploy branch to remote..."
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")

    if [ "${CURRENT_BRANCH}" = "${BRANCH_NAME}" ]; then
        # Check if remote exists
        if git remote | grep -q "origin"; then
            if git push -u origin ${BRANCH_NAME} 2>/dev/null; then
                log_info "Deploy branch pushed to remote successfully!"
            else
                log_warn "Failed to push branch to remote. You may need to push manually:"
                log_warn "  git push -u origin ${BRANCH_NAME}"
            fi
        else
            log_warn "No remote 'origin' found. Skipping push."
        fi
    else
        log_warn "Not on deploy branch. Skipping push."
    fi
else
    log_warn "Not a git repository. Skipping branch push."
fi

# Final summary
echo ""
log_info "=========================================="
log_info "Deployment completed successfully!"
log_info "=========================================="
log_info "Branch: ${BRANCH_NAME}"
log_info "Domain: ${DOMAIN}"
log_info "Build directory: ${BUILD_DIR}"
log_info ""
log_info "Useful commands:"
log_info "  - Rebuild: npm run build"
log_info "  - Nginx status: sudo systemctl status nginx"
log_info "  - Nginx reload: sudo systemctl reload nginx"
log_info "  - Test SSL renewal: sudo certbot renew --dry-run"
log_info "  - View nginx logs: sudo tail -f /var/log/nginx/access.log"
log_info "=========================================="
