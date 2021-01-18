data=[,,SPS,Volume,Notes]=process.argv; // assign parameters to variables and hijack the created array for sample storage
                                        // (will produce wrong results if there are fewer than 5 samples)
counter=i=0;
signCoefficient=1;
with(Math) // use `with` statement to avoid `Math.` for `sin`, `PI` and `round`
    Notes.split`,`.map(note=>{
        for( // for loop abuse
            [[x,y,z],noteLength]=note.split`.`, // use array destructuring to split note name into three variables `x`, `y` and `z`
            currentSign=lastSign=1;

            k=signCoefficient*sin(i++*PI/SPS*( // using postincrement on `i` here saves space and gives another benefit later on
                round( // used to round the result to 2 decimal places by operating on note frequency multiplied by 100
                    1635.16 // frequency of note C0 multiplied by 100
                    *2**(
                        ('CxDxEFxGxAxH'.search(x)+!!z) // variable `z` is defined only if note name has 3 characters,
                                                       // which means it's a sharp
                        /
                        12 // divide by 12 notes in an octave
                        +
                        (z|y) // add octave number - `undefined` is coalesced to `0` by bitwise OR operator
                              // for a regular note - `z` is `undefined`, `y` contains the the octave number
                              // for a sharp note - `z` contains the octave number, `y` contains `"#"`, which is first
                              // turned into `NaN` by casting to a Number and then into `0` by the bitwise OR operator
                              // for a pause - both variables are undefined, so the result is `0`
                    )
                )
                /50 // *2/100
            )),
            !(
                (
                    !y // `y` is undefined only when the note is a pause
                    ||
                    (
                        currentSign=k<0?-1:1 // `currentSign` variable should not be updated if the note is a pause - by making
                                      // `!y` the first operand of `||`, we ensure the second operand will not be evaluated
                                      // if the first one is true
                    )-lastSign        // one character shorter than `!=`, with the same result for numeric values
                )
                &&
                i>SPS/noteLength // since `i` is already incremented here, we don't need `floor()`
                                 // and can compare using `>` instead of `>=`
            ); // if the entire expression evaluates to true, it's negated and causes the for loop to exit

            data[c++]=128+!!y*Volume*k // `!!y` will coalesce to 0 for pauses, so 128 will be written
                                       // arrays can be written to past their declared size without `.push()`
                                       // - even `.length` will update appropriately
        )
            lastSign=currentSign;

        signCoefficient=currentSign,i=1
    });
B=Buffer;
console.log(B.concat(
    ["RIFF",44+c,"WAVEfmt ",16,65537,SPS,SPS,524289,"data",c,data].map( // 65537 is 0x00010001
                                                                        // 524289 is 0x00080001
                                                                        // - allows to write all numeric fields with `writeInt32LE`
        x=>
            +x // determine if parameter is a number (will cause errors if there are 0 samples)
            ?
            (
                headerPart=B(4)
            ).writeInt32LE(x) // technically incorrect - should be `writeUint32LE`
                &&
                headerPart
            :
            B(x) // abuse of deprecated `Buffer` constructor
                 // - for string parameters it will create a Buffer from the string value,
                 // - for array parameters it will create a Buffer with values from array cast to 8-bit number
    )
).toString`base64`)