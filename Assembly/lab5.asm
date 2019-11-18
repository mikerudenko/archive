.model small;	
.stack 100h;	
.data;
    i dw 0h
    String db 'Enter a line: $'	
    Stg db 100h dup(0h);	 Массив для строки
    f_name  db  'test42.txt',0
    descr   dw  ?
.code;	
    mov ax, @data;
    mov ds, ax;
    
    mov   ah,3Ch  ;Create File
    xor   cx,cx
    lea   dx,f_name
    int   21h
    mov   descr,ax

    mov   ah,3Dh  ;Open File
    mov   al,2
    lea   dx,f_name
    int   21h
    mov   descr,ax
    
    mov ah, 00h;	 Очистка экрана
    mov al, 2h;
    int 10h
    mov ah, 09h
    Lea dx, String
    int 21h	
    mov ah, 1h;	 Ф-я ввода символа
    mov si, 0h
    mov bx, 0h
Input:	 ;Ввод массива
    int 21h
    mov cx, si
    mov Stg[bx], cl;	 Длина слова
    cmp al, 32;	 Проверка на пробел
    jne Skip1
    mov si, 0h
    add bx, 10h;	 Начало следующего слова
    jmp Input
Skip1:
    inc si
    mov Stg[bx+si], al;	 Помещение символа в массив	
    cmp al, 13
    jne Input
    mov Stg[bx+si], 0h;	 Удаление Enter'а
    mov i, bx;	 Кол-во слов
    mov bx, 0h
Sort1:	 ;Выборочная сортировка
    mov di, bx;	 Индекс минимальной длины
    mov ax, bx
    add ax, 10h
Sort2:
    mov si, ax
    mov cl, Stg[si+1]
    cmp cl, Stg[di+1]
    jae Skip2
    mov di, si;	 Если меньше
Skip2: 
    add ax, 10h
    cmp ax, i
    jbe Sort2
    mov si, 0h
Sort3:
    moV cl, Stg[bx+si];	Смена слов
    mov al, Stg[di]
    mov Stg[bx+si], al
    mov Stg[di], cl
    inc si
    inc di
    cmp si, 10h
    jb Sort3
    add bx, 10h
    cmp bx, i
    jb Sort1
    mov ah, 02h; Ф-я установки позиции курсора:
    mov bh, 0h;	 № Страницы	
    mov dh, 2h; № строки
    mov dl, 0h; № столбца
    int 10h
    mov bx, 0h
    mov si, 0h
Output:	 ;Вывод массива
    inc si
    
    mov ah, 2h;	 Ф-я вывода символа
    mov dx, word ptr Stg[bx+si]
    
    cmp dx, 0h
    jne Skip3
    cmp bx, i
    je Exit
    mov si, 0h
    add bx, 10h
    mov dx, ' '	
Skip3:
    int 21h
    cmp bx, i
    jbe Output
Exit:
    mov   ah,3Eh  ;Close File
    mov   bx,descr
    int   21h
    
    mov ah, 4ch;
    int 21h
End