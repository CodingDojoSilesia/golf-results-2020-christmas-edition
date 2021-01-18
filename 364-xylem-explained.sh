# essentially the same code as pure JS version except parameters are embedded directly into the script
# and sample values are outputted directly to terminal instead of being stored in an array
d=`node -e "i=0;C=1;with(Math)'$3'.split(',').map(n=>{for([[x,y,z],l]=n.split('.'),s=L=1;k=C*sin(i++*PI/$1*(round(1635.16*2**(('CxDxEFxGxAxH'.search(x)+!!z)/12+(z|y)))/50)),!((!y||(s=k<0?-1:1)-L)&&i>$1/l);console.log(128+!!y*$2*k))L=s;C=s,i=1})"`
# calculate number of samples
# could be written as
# c=`wc -w<<<$d`
# but the test environment has read-only filesystem and doesn't support heredocs
c=`echo $d|wc -w`
# pack header and samples using perl - newlines in $d are replaced by commas and the sample values are embedded directly
# in the perl script
perl -E "print pack A4VA8V4v2A4VC$c,RIFF,44+$c,WAVEfmt,16,65537,$1,$1,1,8,data,$c,${d//
/,}"|base64