mv ./build ../
git checkout gh-pages
git rm -rf *
mv ../build/* ./
git add .
git commit -m "update"
git push origin gh-pages
rmdir ..\build
