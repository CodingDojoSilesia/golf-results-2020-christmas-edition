[,,A,B,C]=process.argv
D=1
E=0
F=Buffer.alloc(999)
G=44
for(H of C.split`,`){[M,N]=H.split`.`
K=L=1
for(;;){Q=128
R=M=='|'
if (!R){Q=B*D*Math.sin(E*2*Math.PI/A*([O,P]=M.split(/(?=\d)/),(0|(13081.28*2**(((P-3)*12+'C,C#,D,D#,E,F,F#,G,G#,A,A#,H'.split`,`.indexOf(O))/12))+.5)/100))
L=Q<0?-1:1
Q+=128}if(E>=(0|(A/N))&(L!=K|R)){D=L
E=1
break}G=F.writeUInt8(Q,G)
K=L
E++}}F[T='write']('RIFF')
F[S=T+'UIntLE'](G,4,4)
F[T]('WAVEfmt \x10\0\0\0\x01\0\x01\0',8)
F[S](A,24,4)
F[S](A,28,4)
F[T](`\x01\0\b\0data`,32)
F[S](G-44,40,4)
console.log(F.slice(0,G).toString('base64'))
