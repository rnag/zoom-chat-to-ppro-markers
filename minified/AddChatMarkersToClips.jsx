addStringMethods();var project=app.project,projectItems=project.rootItem.children,numProjectItems=projectItems.numItems,typeClip=ProjectItemType.CLIP,typeFile=ProjectItemType.FILE,sep="Macintosh"==Folder.fs?"/":"\\";0===numProjectItems&&exitErr("Script requires a project item!");var colors={GREEN:0,RED:1,PURPLE:2,ORANGE:3,YELLOW:4,WHITE:5,BLUE:6,CYAN:7},folderToChatFiles={};function main(){for(var e=0;e<numProjectItems;e++){var t=projectItems[e],r=t.name,n=t.type;if(updateEventPanel("[Checking Project Item #"+(e+1)+"]"),updateEventPanel("Name: "+r),t.isSequence())updateEventPanel("Skipping Sequence.");else if(n!=typeClip&&n!=typeFile)updateEventPanel("Skipping. Can only add markers to footage items.");else{var a=getFolderName(t);if(a){if(updateEventPanel("Media Path: "+a),(markers=t.getMarkers()).numMarkers)updateEventPanel("Skipping. Clip already has markers.");else{var i=folderToChatFiles[a];void 0===i&&(i=folderToChatFiles[a]=new Folder(a).getFiles("*.chat"));var o=i.length;if(o){updateEventPanel("Adding markers.");for(var s=0;s<o;s++){var l=i[s];l instanceof File&&l.exists&&createClipMarkersFromChatFile(markers,l)}}else updateEventPanel("Skipping. No *.chat file(s) found in media path.")}}else updateWithError("Unable to determine media path of clip.")}}}function createClipMarkersFromChatFile(e,t){var r=timeInSec=user=null;readTextFile(t,function(t){var n=t.split("	"),a=convertTimecodeToSeconds(n[0].trim());3===n.length&&a?(r&&createMarker(e,timeInSec,user,r),timeInSec=a,user=n[1].trim().slice(0,-1),r=n[2].trim()):r+="\n"+t}),r&&createMarker(e,timeInSec,user,r)}function createMarker(e,t,r,n){var a,i=e.createMarker(t),o=n.toLowerCase().split(" ");i.name=r,i.comments=n;for(var s=colors.GREEN,l=0;l<o.length;l++)"cut"===(a=o[l])||"edit"===a?s=colors.RED:"fix"===a||"replace"===a?s=colors.ORANGE:"audio"===a||"sound"===a?s=colors.YELLOW:"reacted"==a&&(s=colors.PURPLE);i.setColorByIndex(s)}function exitErr(e){alert(e),exit(-1)}function updateEventPanel(e){app.setSDKEventMessage(e,"info")}function updateWithError(e){app.setSDKEventMessage(e,"error")}function addStringMethods(){void 0===String.prototype.trim&&(String.prototype.trim=function(){return String(this).replace(/^\s+|\s+$/g,"")})}function getFolderName(e){if(!e)return null;var t=e.getMediaPath(),r=t.lastIndexOf(sep);return r>-1?t.slice(0,r):t}function convertTimecodeToSeconds(e){return 3===(myT=e.split(":")).length&&(hours=3600*parseInt(myT[0]),minutes=60*parseInt(myT[1]),seconds=parseInt(myT[2]),!(isNaN(hours)||isNaN(minutes)||isNaN(seconds))&&(totalInSeconds=hours+minutes+seconds))}function readTextFile(e,t){var r=e instanceof File?e:new File(e);if(!r.exists)return!1;r.open("r")||exitErr("Unable to open file "+decodeURI(r.name)),r.encoding||(r.encoding="UTF-8");var n=r.read();r.close();var a=n.split("\n");if("function"==typeof t)for(var i=0;i<a.length;i++)t(a[i],i);return n}main();