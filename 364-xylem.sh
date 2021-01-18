d=`node -e "i=0;C=1;with(Math)'$3'.split(',').map(n=>{for([[x,y,z],l]=n.split('.'),s=L=1;k=C*sin(i++*PI/$1*(round(1635.16*2**(('CxDxEFxGxAxH'.search(x)+!!z)/12+(z|y)))/50)),!((!y||(s=k<0?-1:1)-L)&&i>$1/l);console.log(128+!!y*$2*k))L=s;C=s,i=1})"`
c=`echo $d|wc -w`
perl -E "print pack A4VA8V4v2A4VC$c,RIFF,44+$c,WAVEfmt,16,65537,$1,$1,1,8,data,$c,${d//
/,}"|base64