
URL='https://www.toptal.com/developers/javascript-minifier/api/raw'

mkdir -p minified

FILE=${1:-AddChatMarkersToSeq.jsx}
OUT_FILE="minified/${FILE}"

echo "[ Minifying ${FILE} ]"

curl -X POST -s \
	-H "Content-Type: application/x-www-form-urlencoded" \
	--data-urlencode "input@${FILE}" \
	"${URL}" > "${OUT_FILE}"

echo "Saved to \`${OUT_FILE}\`"
