/// <reference path="./index.d.ts" />

addStringMethods();

var project = app.project; // current project

// app.project.importFiles(vidFiles);

// var videoTracks = project.activeSequence.videoTracks;

// Ref: https://ppro-scripting.docsforadobe.dev/item/projectitem.html
var projectItems = project.rootItem.children;
var numProjectItems = projectItems.numItems;

var typeClip = ProjectItemType.CLIP;
var typeFile = ProjectItemType.FILE;

var sep = Folder.fs == 'Macintosh' ? '/' : '\\';

if (numProjectItems === 0) exitErr('Script requires a project item!');

// https://ppro-scripting.docsforadobe.dev/general/marker.html#marker-setcolorbyindex
var colors = {
	GREEN: 0,
	RED: 1,
	PURPLE: 2,
	ORANGE: 3,
	YELLOW: 4,
	WHITE: 5,
	BLUE: 6,
	CYAN: 7,
};

var folderToChatFiles: Record<string, File[]> = {};

function main(): void {
	var clip: ProjectItem,
		folderPath: string | null,
		itemType: number,
		markers: MarkerCollection,
		name: string;

	for (var i = 0; i < numProjectItems; i++) {
		clip = projectItems[i];
		name = clip.name;
		// Will be CLIP, BIN, ROOT, or FILE.
		// Ref: https://ppro-scripting.docsforadobe.dev/item/projectitem.html#projectitem-type
		itemType = clip.type;

		updateEventPanel('[Checking Project Item #' + (i + 1) + ']');
		updateEventPanel('Name: ' + name);

		if (clip.isSequence()) updateEventPanel('Skipping Sequence.');
		else {
			if (itemType != typeClip && itemType != typeFile)
				updateEventPanel(
					'Skipping. Can only add markers to footage items.'
				);
			else {
				folderPath = getFolderName(clip);

				if (folderPath) {
					updateEventPanel('Media Path: ' + folderPath);

					markers = clip.getMarkers();

					// Check if clip already has markers.
					if (markers.numMarkers)
						updateEventPanel(
							'Skipping. Clip already has markers.'
						);
					else {
						// Get a list of *.chat files in the same media path (folder)
						// as the media file, and cache the list of files if needed.
						var chatFiles = folderToChatFiles[folderPath];
						if (chatFiles === undefined)
							chatFiles = folderToChatFiles[
								folderPath
							] = <File[]>(
								new Folder(folderPath).getFiles(
									'*.chat'
								)
							);

						var chatFileCount = chatFiles.length;

						if (!chatFileCount)
							updateEventPanel(
								'Skipping. No *.chat file(s) found in media path.'
							);
						else {
							updateEventPanel('Adding markers.');

							for (var j = 0; j < chatFileCount; j++) {
								// https://extendscript.docsforadobe.dev/file-system-access/file-object.html#file-object-properties
								var chatFile = chatFiles[j];

								if (
									chatFile instanceof File &&
									chatFile.exists
								)
									createClipMarkersFromChatFile(
										markers,
										chatFile
									);
							}
						}
					}
				} else
					updateWithError(
						'Unable to determine media path of clip.'
					);
			}
		}
	}
}

// Creates Clip Markers in an Adobe Premiere Project from a Zoom Chat File
function createClipMarkersFromChatFile(
	markers: MarkerCollection,
	chatFile: File
) {
	var message: string | null = null,
		timeInSec: number,
		user: string;

	readTextFile(chatFile, function (line: string) {
		var parts = line.split('\t');
		var time = parts[0].trim();
		// convert the Timecode string to seconds
		var thisTimeInSec = convertTimecodeToSeconds(time);

		if (parts.length === 3 && thisTimeInSec) {
			// create previous marker (if needed)
			if (message)
				createMarker(markers, timeInSec, user, message);

			timeInSec = thisTimeInSec;
			user = (<string>parts[1].trim())
				// don't forget to remove the trailing `:`
				.slice(0, -1);
			message = parts[2].trim();
		}

		// continuation of a chat message
		else message += '\n' + line;
	});

	// create final marker
	if (message) createMarker(markers, timeInSec!, user!, message);
}

// Creates a new Clip Marker
//
// Docs: https://ppro-scripting.docsforadobe.dev/general/marker.html
function createMarker(
	markers: MarkerCollection,
	timeInSec: number,
	user: string,
	message: string
) {
	// create the marker at the given second in the current timeline
	var marker = markers.createMarker(timeInSec);
	var words = message.toLowerCase().split(' ');

	// set the marker's name as the message's sender
	marker.name = user;
	// set the marker's comments as the note's content
	marker.comments = message;

	// default marker color - GREEN
	var markerColor = colors.GREEN;
	// here we set a custom marker color based on message contents:
	//
	//  if it contains "cut | edit",
	//		set marker color to RED
	//
	//  if it contains "fix | replace",
	//		set marker color to ORANGE
	//
	//  if it contains "audio | sound",
	//		set marker color to YELLOW
	//
	//  if it contains "reacted",
	//		set marker color to PURPLE
	var word;
	for (var i = 0; i < words.length; i++) {
		word = words[i];
		if (word === 'cut' || word === 'edit')
			markerColor = colors.RED;
		else if (word === 'fix' || word === 'replace')
			markerColor = colors.ORANGE;
		else if (word === 'audio' || word === 'sound')
			markerColor = colors.YELLOW;
		else if (word == 'reacted') markerColor = colors.PURPLE;
	}
	marker.setColorByIndex(markerColor);

	//default marker type == comment. To change marker type, call one of these:
	// marker.setTypeAsChapter();
	// marker.setTypeAsWebLink(message, "frame target");
	// marker.setTypeAsSegmentation();
	// marker.setTypeAsComment();
}

function exitErr(msg: string) {
	alert(msg);
	exit(-1);
}

function updateEventPanel(message: string) {
	app.setSDKEventMessage(message, 'info');
	//app.setSDKEventMessage('Here is some information.', 'info');
	//app.setSDKEventMessage('Here is a warning.', 'warning');
	//app.setSDKEventMessage('Here is an error.', 'error');  // Very annoying; use sparingly.
}

function updateWithError(message: string) {
	app.setSDKEventMessage(message, 'error');
}

// Adds String.trim() for ES3
// Credits: https://stackoverflow.com/a/1418059/10237506
function addStringMethods() {
	if (typeof String.prototype.trim === 'undefined') {
		String.prototype.trim = function () {
			return String(this).replace(/^\s+|\s+$/g, '');
		};
	}

	// if (typeof String.prototype.includes === "undefined") {
	// 	String.prototype.includes = function (value) {
	// 		return this.indexOf(value) !== -1;
	// 	};
	// }
}

// Get the Path to Folder for a Project Item
//
// Seems like a faster, safer way to get the folder path.
//
// Credits: https://community.adobe.com/t5/premiere-pro-discussions/importing-a-folder-with-extendscript-adds-extra-nameless-bin-that-i-don-t-want/m-p/10893595
function getFolderName(pItem: ProjectItem) {
	if (!pItem) return null;

	var fullPath = pItem.getMediaPath();
	var lastSep = fullPath.lastIndexOf(sep);

	return lastSep > -1 ? fullPath.slice(0, lastSep) : fullPath;
}

// Credits: https://stackoverflow.com/a/818619/10237506
// function getFolderName(path) {
// 	return path.substring(
// 		0,
// 		Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"))
// 	);
// }

// function extractFileNameFromPath(fullPath) {
// 	var lastDot = fullPath.lastIndexOf('.');
// 	var lastSep = fullPath.lastIndexOf('/');

// 	if (lastDot > -1) {
// 		return fullPath.substring(
// 			lastSep + 1,
// 			fullPath.length - (lastDot + 1)
// 		);
// 	} else {
// 		return fullPath;
// 	}
// }

// // Function by u/fixinPost94
function convertTimecodeToSeconds(timecode: string): number {
	// split timecode string into 3 strings in an array according to the ':' symbol
	var myT = timecode.split(':');

	if (myT.length !== 3) return 0;

	var hours = parseInt(myT[0]) * 3600; // hours into integer seconds
	var minutes = parseInt(myT[1]) * 60; // minutes into integer seconds
	var seconds = parseInt(myT[2]);

	if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return 0;

	var totalInSeconds = hours + minutes + seconds; // add the seconds together
	return totalInSeconds;
}

// Returns all of the text as is
// Returns false if the file doesn't exist
// Callback is triggered for each line of text
function readTextFile(fileOrPath: File | string, callback: Function) {
	var file =
		fileOrPath instanceof File
			? fileOrPath
			: new File(fileOrPath);

	if (file.exists) {
		if (!file.open('r'))
			exitErr('Unable to open file ' + decodeURI(file.name));

		if (!file.encoding) file.encoding = 'UTF-8';
		var text = file.read();
		file.close();

		// var lines = text.match(/\\r\\n/)
		// 	? text.split("\r\n")
		// 	: text.match(/\\r/)
		// 	? text.split("\r")
		// 	: text.split("\n");

		var lines = text.split('\n');

		if (typeof callback == 'function') {
			for (var i = 0; i < lines.length; i++) {
				callback(lines[i], i);
			}
		}

		return text;
	} else return false;
}

main();
