
URL='https://www.toptal.com/developers/javascript-minifier/api/raw'

mkdir -p minified

for file in .build/*.js; do
    [ -e "$file" ] || continue
    echo "[ Minifying ${file} ]"

    name=${file##*/}x

    out_file="minified/${name}"

    curl -X POST -s \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "input@${file}" \
    "${URL}" > "${out_file}"

    echo "Saved to \`${out_file}\`"
done
