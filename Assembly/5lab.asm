.286
.model small
.stack
.data
 
f_name  db  'lab5.txt',0
Space db ' $'
descr   dw  ?
buf     db  100
str_len db  ?
strg    db  100 dup (?)
String  db 'Enter a line: $'	
Stg     db 100h dup(0h)    ; Массив для строки
w_count dw 1
i       dw 0h
 
.code
str3:
  mov   ax,@data
  mov   ds,ax

; -------------------- Input --------------------  
  mov ah, 09h    ; Вывод строки приветствия
  lea dx, String
  int 21h
  
  mov ah, 1h;	 Ф-я ввода символа
  mov si, 0h
  mov bx, 0h
Input:	 ;Ввод массива
  int 21h
  mov cx, si
  mov Stg[bx], cl;	 Длина слова
  cmp al, Space[0];	 Проверка на пробел
  jne Skip1
  mov Stg[bx+10h-1], 10 ; вставить символ переноса
  mov si, 0h
  add bx, 10h;	 Начало следующего слова
  inc w_count
  jmp Input
Skip1:
  inc si
  mov Stg[bx+si], al;	 Помещение символа в массив	
  cmp al, 13
  jne Input
  
  mov Stg[bx+si], 0h;	 Удаление Enter'а
  mov i, bx;	 Кол-во слов
  mov bx, 0h
  
  ;mov   ah,0Ah  ;Input
  ;lea   dx,buf
  ;int   21h
   
; -------------------- Sort --------------------
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
  mov Stg[bx+10h-1], 10 ; вставить символ переноса
  add bx, 10h
  cmp bx, i
  jb Sort1
  ;mov ah, 02h; Ф-я установки позиции курсора:
  ;mov bh, 0h;	 № Страницы	
  ;mov dh, 2h; № строки
  ;mov dl, 0h; № столбца
  ;int 10h
  ;mov bx, 0h
  ;mov si, 0h
; -------------------- Output --------------------  
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
 
  xor   ax,ax
  mov   al,str_len
  cbw
  mov   bp,ax
  xor   ax,ax
 
  mov   bx,descr
  call  write
 
  mov   ah,3Eh  ;Close File
  mov   bx,descr
  int   21h
 
  ;mov   al, 0Ah
  ;int   29h ; new line
 
  mov   bx,1    ; stdout - console
  call  write
 
  mov ax,4C00h
  int 21h

write:
  mov si, 0h
  mov   cx,10h-1
  lea   dx,Stg[0]+1
for_word:
  mov   ah,40h  ;Record File 
  int   21h
  add   dx,10h
  inc   si
  cmp   si, w_count
  jne for_word
  ret
end str3