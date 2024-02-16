# Zoom Chat to PPro Markers

> Import a [Zoom `.chat` File](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067312) for a Recording as Clip (or Sequence) [Markers](https://helpx.adobe.com/premiere-pro/using/markers.html) into Adobe Premiere Pro.

- [How It Works](#how-it-works)
	- [`AddChatMarkersToClips`](#addchatmarkerstoclips)
	- [`AddChatMarkersToSeq`](#addchatmarkerstoseq)
	- [`ImportClipsWithMarkers`](#importclipswithmarkers)
	- [`SelectChatFileToImport`](#selectchatfiletoimport)
- [Getting Started](#getting-started)
	- [Download JSX Files](#download-jsx-files)
	- [Set Folder for Extension (in Premiere)](#set-folder-for-extension-in-premiere)
- [Development](#development)
	- [Install](#install)
	- [Build](#build)
- [Credits](#credits)

## How It Works

This section contains a brief description of what each script does.

### `AddChatMarkersToClips`

Iterates over each media clip in the project (**clip** or **file**), and for each one looks for any `*.chat` files in the same media path, and if found imports the Zoom Chat file as **clip markers** into the Adobe Premiere Pro project.

Useful info is logged by the script into the Events pane in Premiere.

### `AddChatMarkersToSeq`
TODO

### `ImportClipsWithMarkers`
TODO

### `SelectChatFileToImport`
TODO

## Getting Started

Steps to get this working in Adobe Premiere:

1. Download and activate the `JSX Launcher` Extension on _Adobe Exchange_:

    - https://adobe.com/go/cc_plugins_discover_plugin?pluginId=12096&workflow=share

2. Download `.jsx` files and save it to a local folder -- see [Download JSX Files](#download-jsx-files) below.

3. Open Extension in Premiere, choose `Select Script Folder...` and then folder with the `.jsx` file.

    See [Set Folder for Extension (in Premiere)](#set-folder-for-extension-in-premiere) for help.

4. Open or create new Premiere Project.

5. Drag any media file(s) into the timeline, so that a default sequence is created.

    > The folder (or media path) of each media clip should contain the corresponding `*.chat` file to import markers from.

6. In _JSX Launcher_ window, Click the `AddChatMarkersToClips` button to run the script.

7. Chat Markers should be added automatically to each Media Clip (Audio / Video file) in Adobe Premiere Pro.

### Download JSX Files

Open up a Mac Terminal (use `Cmd + Space` and search for `Terminal`).

Use `mkdir` to create folder where you want to download the `*.jsx` file, and optionally `cd` to navigate there.

Assuming you want to create a folder under the User Home `~` directory (Mac):

```sh
mkdir ~/PPro-Files
```

Now download the `AddChatMarkersToClips.jsx` to that folder:

```sh
curl -fsSL https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/AddChatMarkersToSeq.jsx -o ~/PPro-Files/AddChatMarkersToClips.jsx
```

Or, if you'd also want to download `SelectChatFileToImport.jsx`:

```sh
files=(AddChatMarkersToClips.jsx SelectChatFileToImport.jsx); for f in ${files[*]}; do curl -fsSL "https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/${f}" -o ~/PPro-Files/"${f}"; done
```

### Set Folder for Extension (in Premiere)

1. Navigate to `Windows > Extensions > JSX Launcher`
2. Choose Extensions flyout menu `"Select Folder..."` (in the ≡ menu of the extension panel)
3. Select your folder that includes the `.jsx` (Extendscript) script file of the script.
   The panel will collect `.jsx` files and generate buttons.

## Development

### Install

Checkout or clone the project from Git.

Then `cd` into the project folder and install all project dependencies with `npm`:

```sh
npm i
```

### Build

To compile typescript `.ts` files to `.jsx`, run:

```sh
npm run build
```

## Credits

-   [Made a script for importing a .csv of Vimeo review notes as markers into Premiere](https://www.reddit.com/r/editors/comments/11qkrev/made_a_script_for_importing_a_csv_of_vimeo_review/)

-   [How to import CSV as markers?](https://www.reddit.com/r/premiere/comments/mrcvao/how_to_import_csv_as_markers/)

- [ExtendScript Starter (Premiere)](https://github.com/adobe-extension-tools/extendscript-starter/blob/master/src/Premiere/index.ts)
