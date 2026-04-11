# A-Frame: Image Targets

This example uses image targets to display information about jellyfish on a flyer. It uses the xrextras-named-image-target component to connect an <a-entity> to an image target by name while the xrextras-play-video component enables video playback. 

![artgallery-screenshot](./src/assets/screenshot-flyer.jpg)

![flyer](./src/assets/flyer.jpg)

## Usage

1. On this repository, click **Code** > **Download ZIP**. If you clone the repository instead, make sure you have Git LFS installed and run `git lfs pull`
2. Unzip the folder to the location you'd like to work in
3. `npm install`
4. `npm run serve`
5. To connect to a mobile device, follow [these instructions](https://8th.io/test-on-mobile)
6. Recommended: Track your files using [git](https://git-scm.com/about) to avoid losing progress

## Serve projects over HTTPS

Browsers require HTTPS certificates to access the camera. Use [http-server](https://github.com/http-party/http-server#readme) to serve project directories with HTTPS.

First, you need to make sure that [openssl](https://github.com/openssl/openssl) is installed, and you have key.pem and cert.pem files. You can generate them using this command:

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompted with a few questions after entering the command. Use 127.0.0.1 as value for Common name if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.

This generates a cert-key pair and it will be valid for 3650 days (about 10 years).

Then you can run `http-server` with `-S` for enabling SSL and `-C` for your certificate file:

```
npx http-server . -S -C cert.pem
```

**NOTE**: The first IP address listed is **127.0.0.1:8080** (which is the loopback
device aka "localhost") and your mobile phone won't be able to connect to that IP address directly.
Please use one of the other IP addresses.

**WINDOWS USERS**: Run the http-server command using a standard Command Prompt window (cmd.exe). The script may generate errors if run from PowerShell.

Learn more in the [http-server documentation](https://github.com/http-party/http-server#tlsssl).

## Questions?

Please raise any questions on [Github Discussions](https://github.com/orgs/8thwall/discussions) or join the [Discord](https://8th.io/discord) to connect with the community.

---

### Preparing Target Images

1. `npx @8thwall/image-target-cli@latest`


