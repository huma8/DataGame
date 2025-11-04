const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to process images to soften purple/magenta areas and improve spacing
function processImages() {
  const picsDir = path.join(__dirname, 'pics');
  const imageFiles = fs.readdirSync(picsDir);
  
  // Filter for the first 3 images
  const firstThreeImages = imageFiles
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .slice(0, 3);
  
  console.log('Processing the first 3 images to soften purple/magenta areas and improve spacing...');
  
  firstThreeImages.forEach((imageFile, index) => {
    const inputPath = path.join(picsDir, imageFile);
    const outputPath = path.join(picsDir, `${path.parse(imageFile).name}_processed${path.extname(imageFile)}`);
    
    console.log(`Processing ${imageFile}...`);
    
    // Command to soften purple/magenta areas and improve spacing
    // This uses ImageMagick to adjust colors and crop/resize as needed
    
    const command = `magick "${inputPath}" \\
      -gamma 0.8 \\  # Adjust gamma for softer colors
      -modulate 100,70,100 \\  # Reduce saturation to soften
      -channel H -evaluate multiply 0.9 \\  # Reduce hue intensity in purple areas
      -level 10%,90% \\  # Adjust contrast
      -resize 100%x100% \\  # Ensure proper sizing
      -strip \\  # Remove metadata
      "${outputPath}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error processing ${imageFile}:`, error);
        return;
      }
      console.log(`${imageFile} processed successfully!`);
    });
  });
  
  // For image copy 3.png, fix the spacing to fill available space
  const imageCopy3Path = path.join(picsDir, 'image copy 3.png');
  const processedCopy3Path = path.join(picsDir, 'image copy 3_filled.png');
  
  if (fs.existsSync(imageCopy3Path)) {
    console.log('Processing image copy 3.png to fill available space...');
    
    const command = `magick "${imageCopy3Path}" \\
      -resize 100%x100% \\  # Resize to fill available space
      -background transparent \\
      -gravity center \\
      -extent 100%x100% \\  # Extend to fill the frame
      -strip \\
      "${processedCopy3Path}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error processing image copy 3.png:', error);
        return;
      }
      console.log('image copy 3.png processed successfully!');
    });
  }
}

// Check if ImageMagick is available
function checkImageMagick() {
  exec('magick -version', (error, stdout, stderr) => {
    if (error) {
      console.log('ImageMagick is not installed. Please install ImageMagick to process images.');
      console.log('On Ubuntu/Debian: sudo apt-get install imagemagick');
      console.log('On macOS: brew install imagemagick');
      return;
    }
    
    processImages();
  });
}

// Run the check
checkImageMagick();