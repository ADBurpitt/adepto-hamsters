for folder in src/*/ ; do
  cd $folder
  echo "Installing node modules for ${folder}"
  npm i
  cd ../..
done