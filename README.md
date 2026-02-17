# Gemini Q&A Web App

A modern, premium-designed web application that lets you chat with Google Gemini (Free Tier) directly from your browser.

## Features
- **Premium UI**: Glassmorphism design, dark mode, smooth animations.
- **Privacy First**: Your API key is stored locally in your browser (LocalStorage).
- **Gemini Powered**: Uses the `gemini-1.5-flash` model for fast and free responses.
- **Markdown Support**: Renders code blocks, lists, and formatting beautifully.

## Setup

1.  **Get an API Key**:
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Create a new API key (it's free).

2.  **Run the App**:
    - Open `index.html` in your web browser.
    - Click the settings icon (if not prompted automatically) and paste your API Key.
    - Start chatting!

## Deployment with Cloudflare Pages (Recommended)

This error usually happens if you chose **"Worker"** instead of **"Pages"**. For a static website like this, please use **Pages**:

1.  **Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2.  Go to **Workers & Pages** > **Create** > **Pages** (Not Worker).
3.  Click **Connect to Git** and select `gemini-qa-web`.
4.  **Build settings**:
    - **Framework preset**: `None`
    - **Build command**: (Leave totally empty)
    - **Build output directory**: `.` (Single dot or leave empty if it shows root)
5.  Click **Save and Deploy**.

> [!TIP]
> If you still see the error, make sure the **Build output directory** is set to `.` which means the current folder where `index.html` is located.

## Development

The project is built with vanilla HTML, CSS, and JavaScript. No build step required for simple usage.

- `index.html`: Structure and SDK imports.
- `style.css`: Styling and animations.
- `script.js`: Logic for API calls and UI updates.

## GitHub
This code is ready to be pushed to GitHub.

```bash
git init
git add .
git commit -m "Initial commit"
# Add your remote
# git remote add origin https://github.com/yourusername/gemini-qa-web.git
# git push -u origin main
```
