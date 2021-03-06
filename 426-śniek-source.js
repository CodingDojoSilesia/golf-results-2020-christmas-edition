
[,,SPS,VOL,NOTES] = process.argv;

B=Buffer.from;

Wave=[...B('RIFFxxxxWAVEfmt      XXXXXXXX  data')];

sign = dataLen = i = 0;


NOTES.split`,`.map( note => {

    signCoefficient = sign | 1;

    for (
        // init
        [,n,m,o,l]=note.match(/(.)(#*)(.*)\.(.+)/),
        sign = 1

        ;

        // condition
        lastSign = sign,
        sign = (
            val =
                n<'|'
                ?
                    VOL * signCoefficient * Math.sin ( i * 2 * Math.PI / SPS * (55 * 2** ( +o - ( '#A#G#FE#D#C'.indexOf(m+n) + 11 ) /12 ) - 2e-4).toFixed(2) )
                :
                    lastSign = 0
        ) < 0 ? -1 : 1,

        ++i <= SPS / l || sign==lastSign

        ;

        // update
        Wave[44+dataLen++]=val + 128

    );

    i = 1
});


buff=B(Wave);
buff[W='writeInt32LE'](44+dataLen, 4);
buff[W](SPS, buff[W](SPS, 24));
buff[W](dataLen, 40);
console.log(buff.toString('base64'))
