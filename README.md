# Bionic Reader CRX

Bionic reader extension for chromium browsers.

## Tech Stack

React with TypeScript

Webpack 5

## Set up dev environment

To deploy this project for development:

1. Clone this repo:

```bash
git clone https://github.com/c-arvind/bionic-reader.git
```

2. Install all the dependencies for the client and the server:

```bash
cd bionic-reader/client
npm i
cd ../server
npm i
```

3. Next, run the following command to build the **dist** folder:

```bash
cd ../client
npm run dev
```

4. Now, you must see a folder named **dist** in your client directory.

5. Next, run the following command to start the server. Make sure to add a .env file in the server directory with the API key and API host.

```bash
cd ../server
npm run dev
```

6. Open Google Chrome and click on the extensions icon.
<p align="center"> 
<img width="120" alt="image" src="https://user-images.githubusercontent.com/72320207/181052270-7340c38a-3de6-485d-9f5c-13a98f1a0f23.png">
</p>

7. Click on it, then click on manage extensions. Now ensure that you have turned on the **Developer Mode**
<p align="center"> 
<img width="189" alt="image" src="https://user-images.githubusercontent.com/72320207/181052464-c705af56-3c5f-4cb9-a366-98429c039a60.png">
</p>

8. Click on **Load Unpacked**. A file selector window should open. Select the previously created **dist** folder.

9. The extension should now be visible. While the dev script is running, all changes in made in development can be simultaneously seen on the loaded extension.

## Demo

<p align="center"> 
<img width="364" alt="image" src="https://user-images.githubusercontent.com/72320207/181053873-2ea81a59-f60e-4dcc-a2a2-fb2c9544726f.png">
</p>

## Important Resources

**Wire framing**: Using [Excalidraw](https://excalidraw.com/)

**Time Management**: Using [Cuckoo](https://cuckoo.team/)

**Gradients**: Using [Colorhunt](https://colorhunt.co/) and [UI Gradients](https://uigradients.com/#MidnightCity)
