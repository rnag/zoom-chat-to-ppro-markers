addStringMethods();var project=app.project,sequence=project.activeSequence;sequence||exitErr("Script requires an active sequence!");var sequenceMarkers=sequence.markers,rootProject=project.rootItem,item=rootProject.children[0],folderPath=getFolderName(item);folderPath||exitErr("Script requires a clip in the active sequence!");var clipFolder=Folder(folderPath),colors={GREEN:0,RED:1,PURPLE:2,ORANGE:3,YELLOW:4,WHITE:5,BLUE:6,CYAN:7};function main(){var e=clipFolder.getFiles("*.chat"),r=e.length;r||exitErr("["+folderPath+"] No *.chat file found in media path!");for(var t=0;t<r;t++){var o=e[t];if(o instanceof File&&o.exists){var n=timeInSec=user=null;readTextFile(o,function(e){var r=e.split("	"),t=convertTimecodeToSeconds(r[0].trim());3===r.length&&t?(n&&createMarker(timeInSec,user,n),timeInSec=t,user=r[1].trim().slice(0,-1),n=r[2].trim()):n+="\n"+e}),n&&createMarker(timeInSec,user,n)}}}function createMarker(e,r,t){var o,n=sequenceMarkers.createMarker(e),i=t.toLowerCase().split(" ");n.name=r,n.comments=t;for(var c=colors.GREEN,a=0;a<i.length;a++)"cut"===(o=i[a])||"edit"===o?c=colors.RED:"fix"===o||"replace"===o?c=colors.ORANGE:"audio"===o||"sound"===o?c=colors.YELLOW:"reacted"==o&&(c=colors.PURPLE);n.setColorByIndex(c)}function exitErr(e){alert(e),exit(-1)}function addStringMethods(){void 0===String.prototype.trim&&(String.prototype.trim=function(){return String(this).replace(/^\s+|\s+$/g,"")})}function getFolderName(e){if(!e)return null;var r=e.name,t=e.getMediaPath();return t.slice(0,t.length-r.length)}function convertTimecodeToSeconds(e){return 3===(myT=e.split(":")).length&&(hours=3600*parseInt(myT[0]),minutes=60*parseInt(myT[1]),seconds=parseInt(myT[2]),!(isNaN(hours)||isNaN(minutes)||isNaN(seconds))&&(totalInSeconds=hours+minutes+seconds))}function readTextFile(e,r){var t=e instanceof File?e:new File(e);if(!t.exists)return!1;t.open("r")||exitErr("Unable to open file "+decodeURI(t.name)),t.encoding||(t.encoding="UTF-8");var o=t.read();t.close();var n=o.split("\n");if("function"==typeof r)for(var i=0;i<n.length;i++)r(n[i],i);return o}main();