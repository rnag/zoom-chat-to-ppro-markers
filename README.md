# Zoom Chat to PPro Markers

> Import a [Zoom `.chat` File](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067312) for a Recording as Clip (or Sequence) [Markers](https://helpx.adobe.com/premiere-pro/using/markers.html) into Adobe Premiere Pro.

- [How It Works](#how-it-works)
	- [`AddChatMarkersToClips`](#addchatmarkerstoclips)
	- [`AddChatMarkersToSeq`](#addchatmarkerstoseq)
	- [`ImportFilesWithMarkers`](#importfileswithmarkers)
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

Same as above, but adds the Zoom Chat markers as _sequence markers_ (e.g. attached to the active sequence) instead of _clip markers_.

### `ImportFilesWithMarkers`

Opens a file browser window, and prompts the user to select media files to import. Imports all selected media files into a new project bin called `My New Bin`.

Then, searches under the same media path (or folder) for a `*.chat` file, and for each imported media file in the bin, imports the Zoom Chat file as **clip markers** into the media file in the Adobe Premiere Pro project.

Useful info is logged by the script into the Events pane in Premiere.

### `SelectChatFileToImport`

Opens a file browser window, and prompts the user to select a `*.chat` file. Locates all media clips in the project (**clip** or **file**) that share the same _media path_ or folder as the selected `*.chat` file, and for each one imports the Zoom Chat file as **clip markers** into the media clip in the Adobe Premiere Pro project.

Useful info is logged by the script into the Events pane in Premiere.

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

Open up a [Terminal] on Mac (use `Cmd + Space` and search for `Terminal`).

Use `mkdir` to create folder where you want to download the `*.jsx` file, and optionally `cd` to navigate there.

Assuming you want to create a folder under the User Home `~` directory (Mac):

```sh
mkdir ~/PPro-Files
```

Now download the `AddChatMarkersToClips.jsx` to that folder:

```sh
curl -fsSL https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/AddChatMarkersToSeq.jsx -o ~/PPro-Files/AddChatMarkersToClips.jsx
```

Or, if you'd also want to download `SelectChatFileToImport.jsx` and `ImportFilesWithMarkers.jsx`:

```sh
files=(AddChatMarkersToClips.jsx SelectChatFileToImport.jsx ImportFilesWithMarkers.jsx); for f in ${files[*]}; do curl -fsSL "https://raw.githubusercontent.com/rnag/zoom-chat-to-ppro-markers/main/minified/${f}" -o ~/PPro-Files/"${f}"; done
```

### Set Folder for Extension (in Premiere)

1. Navigate to `Windows > Extensions > JSX Launcher`
2. Choose Extensions flyout menu `"Select Folder..."` (in the ≡ menu of the extension panel)
3. Select your folder that includes the `.jsx` (Extendscript) script file of the script.
   The panel will collect `.jsx` files and generate buttons.

## Development

### Install

[Terminal]: https://support.apple.com/guide/terminal/what-is-terminal-trmld4c92d55/mac

Download the `.zip` file or [clone the project from GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository). Example with `ssh` (requires [Terminal]):

```sh
git clone git@github.com:rnag/zoom-chat-to-ppro-markers.git
```

Then open [Terminal], `cd` into the downloaded repo folder, and install all project dependencies with `npm i`:

```sh
cd zoom-chat-to-ppro-markers
npm i
```

### Build

To compile typescript `.ts` files to `.jsx`, run the following command in [Terminal] (or within a console in [VS Code](https://code.visualstudio.com/)):

```sh
npm run build
```

## Credits

-   [Made a script for importing a .csv of Vimeo review notes as markers into Premiere](https://www.reddit.com/r/editors/comments/11qkrev/made_a_script_for_importing_a_csv_of_vimeo_review/)

-   [How to import CSV as markers?](https://www.reddit.com/r/premiere/comments/mrcvao/how_to_import_csv_as_markers/)

-   [ExtendScript Starter (Premiere)](https://github.com/adobe-extension-tools/extendscript-starter/blob/master/src/Premiere/index.ts)
