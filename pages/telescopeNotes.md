### FITS File Format
Telescope images are usually encoded in [Flexible Image Transport System (fits)](https://fits.gsfc.nasa.gov/fits_home.html) files.  

### Getting Telescope Image Files

[JWST User Documentation](https://jwst-docs.stsci.edu) is a helpful site for answering questions about files and the archive. 

Get files from the [MAST archive](https://mast.stsci.edu/portal/Mashup/Clients/Mast/Portal.html).  There's a lot know about finding the right files on this site.  Will write something up about it eventually.  This [tutorial](https://www.space.com/james-webb-space-telescope-image-editing) is helpful when getting started.

When you're picking files to download, there are all kind of `.fits` files and most of them aren't 2D pictures.  So far I found that `i2d.fits` files are pictures.  There are probably other image/picture files that will also work.  `i2d.fits` means **2D resampled image**. The resampled part I believe means that the image has Stage 3 processing.  That's when multiple images from different filters have been processed so they are aligned and can be layered in a picture.  There needs to be some processing and tweaking to get pictures from different filters to line up into one picture I guess.  Stage 1 and Stage 2 images may not be stackable.  You can filter for Stage 3 in the Mast Archive.  I think you get this by picking **Calibration** Level 3 in the search filter.

[JWST Product Types](https://jwst-pipeline.readthedocs.io/en/latest/jwst/data_products/product_types.html) explains all the different types of `.fits` files.  They call them *products* like they're a big retail company. We're using Stage 3 products.


You can learn about the different [filters](https://jwst-docs.stsci.edu/jwst-mid-infrared-instrument/miri-instrumentation/miri-filters-and-dispersers) here.  Oooh ... cool.

The file download process doesn't work in Safari but does work in Chrome.  

### Looking at the Files

[FitsLiberator](https://noirlab.edu/public/products/fitsliberator/) is the best way to quickly look at your files. You can adjust the grayscale distribution easily here.  It's free, easy to install and use.  Theres a MAC `.dmg` download for install on a Mac.

### Image Processing for making Pictures

The image data is for astronomers to do science.  The actual array values are not always best for creating a good picture for human eyes.  FitsLiberator has a [page](https://esahubble.org/projects/fits_liberator/improc/) with good starting ideas for this.  I haven't found great resources on this but google 'contrast stretching' and 'stretch functions'.

### Displaying Files in a Web Browser

OK, here's the tricky part.  I have no idea how to do this.  I found two libraries posted on the web to read `.fits` files in javascript.  There's [fitsjs](https://github.com/astrojs/fitsjs) which hasn't been updated since 2015.  It's someones personal project rather than a professional piece of work.  I also found [Clearsky](http://www.clearskyinstitute.com/fits/), again, not confidence inspiring. So we can try these out and see if they're adequate.  We may be better off just writing a library ourselves.  Fits files have an ASCII header and then the image array which is encoded in binary.  The ASCII header would be easy to read and there are good javascript libraries for reading binary files so I think it wouldn't be too hard.  FITS files aren't compressed so I believe the binary part is just a big multi-dimensional array.  For an image, a big 2D array of grayscale values.  

Most astronomers and their data processing folks appear to use Python for processing and displaying fits files so there are very good python libs available.  I played around with [astropy](https://www.astropy.org) and it's very easy to use.  It uses the `numpy` and `matplotlib` to manage the data once it's read in.  You can install `astropy` with the following command line.

```
pip3 install astropy
```
You can check if the install worked by typing `python3` at the command line and then at the python prompt
```
import astropy
```
If you don't get an error then you're good to go.

You'll need `numpy` and `matplotlib` to use it.  I already had them so I didn't get any errors.  It may install them automatically as dependencies, but if you get errors looking for these python libraries try:
```
pip3 install numpy
pip3 install matplotlib
```

A [cute lessson plan](https://philuttley.github.io/prog4aa_lesson2/10-fitsfiles/index.html) for reading a `.fits` file with `astropy`.  Also the [astropy site](https://www.astropy.org/) has lots of documentation.

For a first stab at this I'm going to read in an image file and just spit out the data array in `json` and see how big the file is.  If it's not that big then we can read the `json` in from javascript and get started messing with pictures in a canvas.  Later we can come up with a better way.


