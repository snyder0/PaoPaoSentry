
## How to Run

The dependency [opencv4nodejs](https://www.npmjs.com/package/opencv4nodejs) requires you to [download cmake](https://cmake.org/download/).<br />
Be sure to add cmake to your environment variables.<br />
Also, be sure to install windows build tools to compile the native Node modules.<br />

Start PowerShell as Administrator and run

### `npm install --global windows-build-tools --vs2015`

Install node_modules (this will take a minute... opencv4nodejs is very large)

### `npm install`

Start the server

### `npm run server`

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
