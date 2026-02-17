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

If you see an error about "Missing entry-point", it's likely because you are on the **Workers** tab. This project must be deployed as **Pages**:

1.  **Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2.  Click **Workers & Pages** in the sidebar.
3.  Click the **Create application** button.
4.  **CRITICAL**: Look at the top of the page. You will see two tabs: **Workers** and **Pages**. 
    - Click on the **Pages** tab.
5.  Click **Connect to Git** and select your `gemini-qa-web` repository.
6.  **Build settings**:
    - **Framework preset**: `None`
    - **Build command**: (Leave empty)
    - **Build output directory**: `.` (Make sure it is just a single dot)
7.  Click **Save and Deploy**.

> [!IMPORTANT]
> Make sure you are on the **Pages** tab before clicking "Connect to Git". Workers won't work for this static site.

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
