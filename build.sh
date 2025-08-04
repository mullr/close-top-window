set -e

rm -rf close-top-window
rm -f close-top-window.zip

mkdir close-top-window
cp module.json close-top-window
cp -r scripts close-top-window
zip -r close-top-window.zip close-top-window/
