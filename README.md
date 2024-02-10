# Zoom Chat to PPro Markers

> Import a [Zoom `.chat` File](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067312) for a Recording as Sequence [Markers](https://helpx.adobe.com/premiere-pro/using/markers.html) into Adobe Premiere Pro.

- [Getting Started](#getting-started)
	- [Download JSX Files](#download-jsx-files)
	- [Set Folder for Extension (in Premiere)](#set-folder-for-extension-in-premiere)
- [Credits](#credits)

## Getting Started

Steps to get this working in Adobe Premiere:

1. Download and activate the `JSX Launcher` Extension on _Adobe Exchange_:

    - https://adobe.com/go/cc_plugins_discover_plugin?pluginId=12096&workflow=share

2. Download `.jsx` files and save it to a local folder -- see [Download JSX Files](#download-jsx-files) below.

3. Open Extension in Premiere, choose `Select Script Folder...` and then folder with the `.jsx` file.

    See [Set Folder for Extension (in Premiere)](#set-folder-for-extension-in-premiere) for help.

4. Open or create new Premiere Project.

5. Drag any media file into the timeline, so that a default sequence is created.

    > The folder with the media file should contain the `*.chat` file to import sequence markers for.

6. Ensure there is an ACTIVE sequence -- usually there should be one by default.

7. In _JSX Launcher_ window, Click the `AddChatMarkersToSeq` button to run the script.

    Chat Markers should be added automatically to the Sequence in Premiere.

### Download JSX Files

Open up a Mac Terminal (use `Cmd + Space` and search for `Terminal`).

Use `mkdir` to create folder where you want to download the `*.jsx` file, and optionally `cd` to navigate there.

Assuming you want to create a folder under the User Home `~` directory (Mac):

```sh
mkdir ~/PPro-Files
```

Now download the `AddChatMarkersToSeq.jsx` to that folder:

```sh
curl -fsSL https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/AddChatMarkersToSeq.jsx -o ~/PPro-Files/AddChatMarkersToSeq.jsx
```

Or, if you'd also want to download `SelectChatFileToImport.jsx`:

```sh
files=(AddChatMarkersToSeq.jsx SelectChatFileToImport.jsx); for f in ${files[*]}; do curl -fsSL "https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/${f}" -o ~/PPro-Files/"${f}"; done
```

### Set Folder for Extension (in Premiere)

1. Navigate to `Windows > Extensions > JSX Launcher`
2. Choose Extensions flyout menu `"Select Folder..."` (in the ≡ menu of the extension panel)
3. Select your folder that includes the `.jsx` (Extendscript) script file of the script.
   The panel will collect `.jsx` files and generate buttons.

## Credits

-   [Made a script for importing a .csv of Vimeo review notes as markers into Premiere](https://www.reddit.com/r/editors/comments/11qkrev/made_a_script_for_importing_a_csv_of_vimeo_review/)

-   [How to import CSV as markers?](https://www.reddit.com/r/premiere/comments/mrcvao/how_to_import_csv_as_markers/)
