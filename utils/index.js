const fs = require('fs');
const imagesFolder = '../public/images';
const data = { images: [] };

fs.readdir(imagesFolder, (error, files) => {

  files.forEach(file => {
    if(file !== 'thumbs' && file !== '.DS_Store') {
      data.images.push({
        imagePath: '/images/' + file,
        thumbPath: '/images/thumbs/' + file
      });
    }
  });

  fs.writeFile('../src/images.json', JSON.stringify(data, null, 2), (error) => {
    if(error) {
      console.log('Error writing to file');
    }
    console.log('File saved');
  });
});
