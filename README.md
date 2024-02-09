# Zoom Chat to PPro Markers

> Import a Zoom .chat File for Meeting as Sequence Markers into Adobe Premiere Pro

## Getting Started

Steps to get this working in Adobe Premiere:

1. Use following link to download `JSX Launcher` Extension:

    - https://adobe.com/go/cc_plugins_discover_plugin?pluginId=12096&workflow=share

2. Download `.jsx` files and save it to a local folder -- see [Download JSX File](#download-jsx-file) below.

3. Open Extension in Premiere, Choose `Select Script Folder...` and select the folder where `.jsx` file was downloaded to.

4. Open or create new Premiere Project.

5. Drag any media file into the timeline. The folder with the media file should contain the `*.chat` file to import sequence markers for.

6. Ensure there is an ACTIVE sequence -- usually there should be one by default.

7. Run the Script. Chat Markers should be added automatically to the Sequence in Premiere.

## Download JSX File

Open up a Mac Terminal (use `Cmd + Space` and search for `Terminal`).

Use `cd` to create and go to folder where you want to download the `*.jsx` file.

```sh
mkdir ~/PPro-Files
```

Now download the `AddChatMarkersToSeq.jsx` to that folder:

```sh
curl -fsSL https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/AddChatMarkersToSeq.jsx -o ~/PPro-Files/AddChatMarkersToSeq.jsx
```
