import FITS_tools
to_be_projected = 'fits_file_to_be_projected.fits'
reference_fits  = 'fits_file_serving_as_reference.fits'
im1,im2 = FITS_tools.match_fits(to_be_projected,reference_fits)