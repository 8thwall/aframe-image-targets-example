# A-Frame: Image Targets

This example uses image targets to display information about jellyfish on a flyer. It uses the xrextras-named-image-target component to connect an <a-entity> to an image target by name while the xrextras-play-video component enables video playback. 

![artgallery-screenshot](./src/assets/screenshot-flyer.jpg)

![flyer](./src/assets/flyer.jpg)

## Usage

1. On this repository, click **Code** > **Download ZIP**. If you clone the repository instead, make sure you have Git LFS installed and run `git lfs pull`
2. Unzip the folder to the location you'd like to work in
3. `npm install`
4. Create `key.pem` and `cert.pem` in the project root so the dev server can use HTTPS (required for camera access in the browser). See [HTTPS certificates](#https-certificates) below.
5. `npm run serve` and open the URL shown in the terminal (for example `https://localhost:8080`).
6. **To test on a phone** on the same Wi‑Fi: in the phone’s browser, open `https://<your-computer’s-LAN-IP>:<port>` using the same port as in the terminal. You will get a warning for the self‑signed certificate; proceed or install/trust the cert as needed for your OS/browser.  
   For access from outside your LAN (or if you prefer a tunnel), [Test on Mobile](https://8th.io/test-on-mobile) describes using **ngrok** with webpack; you may need to add ngrok hosts to `devServer.allowedHosts` in `config/webpack.config.js` as that page explains.
7. Recommended: Track your files using [git](https://git-scm.com/about) to avoid losing progress

## HTTPS certificates

Browsers require a secure context (HTTPS) to access the camera. The development server (`npm run serve`) reads `key.pem` and `cert.pem` from the project root.

First, make sure [OpenSSL](https://github.com/openssl/openssl) is installed. You can generate a key and certificate with:

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompted with a few questions after entering the command. Use `127.0.0.1` as the value for **Common name** if you want to install the certificate in your OS or browser trust store so that it is treated as trusted.

This generates a cert–key pair valid for 3650 days (about 10 years).

### Optional: serve a static build over HTTPS with http-server

If you prefer to preview the **built** output without webpack-dev-server, you can use [http-server](https://github.com/http-party/http-server#readme) with the same `key.pem` / `cert.pem`:

```
npx http-server . -S -C cert.pem
```

**NOTE**: The first address listed is often **127.0.0.1** (localhost only); other devices cannot use that. Use your machine’s LAN IP and the correct port, or use a tunnel as in the mobile section above.

**WINDOWS USERS**: Run the http-server command from a standard Command Prompt (cmd.exe). The script may show errors if run from PowerShell.

Learn more in the [http-server documentation](https://github.com/http-party/http-server#tlsssl).

## Questions?

Please raise any questions on [Github Discussions](https://github.com/orgs/8thwall/discussions) or join the [Discord](https://8th.io/discord) to connect with the community.

---

### Preparing Target Images

1. `npx @8thwall/image-target-cli@latest`

