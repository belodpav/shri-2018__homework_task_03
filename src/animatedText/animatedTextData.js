const data = [
    'factorial proc',
    'mov   eax, [esp + 4]',
    'test  eax, eax',
    'jz    END',
    'mul   dword ptr [esp + 4]',
    'm3: fild dword ptr [esi]',
    'invoke Beep, 3951, 200',
    '0bbh,0cch,0ceh,0b9h,0c8h',
    'mov ax, word ptr X',
    'mov bx, word ptr X+2',
    'sub ax, word ptr Y',
    'sbb bx,word ptr Y+2',
    'mov word ptr Z,ax',
    'mov word ptr Z+2,bx'
];

export default data;
