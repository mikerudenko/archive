data segment
        string_w  db 'L_E_A_R_N_ '               ; не более 40 символов, а то будет каша.
        lstr_w    dw $ - string_w                 ; будет вычислена длина строки
        string_h  db 'A-S-S-E-M-B-L'              ; не более 40 символов, а то будет каша.
        lstr_h    dw $ - string_h                 ; будет вычислена длина строки
data ends
 
code segment
assume cs:code,ds:data
start:
    mov ax,data
    mov ds,ax
    
    mov ax,3                         ; текстовый режим
    int 10h                            
    mov ax,0b800h                    ; сегментный адрес текстового буфера
    mov es,ax                                              
                                       
; верхняя сторона                    
    mov ax,lstr_w                    ; сегментный адрес текстового буфера
                                     ; а ax длину строки
    shl ax,1                         ; умножаем на 2, так как в видеобуф. один символ 
                                     ; хранится в виде [символ,цвет] 2 байта
    mov di,160*11
    sub di,ax                        ; отнимаем от текущей координаты, кол-во символов
                                     ; (для того чтобы строка влезла полностью, без перехода на след ряд)
    mov bl,10                        ; передаём цвет
    call WIDTH_STRING                  
                 
; нижняя сторона                 
    mov ax,lstr_w                      
    shl ax,1                         
    mov di,160*25                    
    sub di,ax                        
    mov bl,10                  
    call WIDTH_STRING
    
; левая сторона
    mov ax,lstr_h                      
    shl ax,1                         
    mov di,160*12                    
    sub di,ax                        
    mov bl,10                  
    call HEIGHT_STRING
    
; правая сторона
    mov ax,lstr_h                      
    shl ax,1                         
    mov di,160*12                    
    sub di,2                        
    mov bl,10                  
    call HEIGHT_STRING
                                     
    mov ah,10h                       ; ожидание нажатия клавиши
    int 16h                          
                                     
    mov ah,4ch                       ; выход из проги
    int 21h
    
WIDTH_STRING proc                      
    mov cx,lstr_w                      ; длина строки для цикла
    xor si,si                        ; очистка указателя
O1:
    mov al,byte ptr string_w[si]       ; выбираем символ из строки
    mov byte ptr es:[di],al          ; занесём в видеобуфер
    inc si                           ; указатель на след символ строки
    inc di                           ; переход на ячейку [цвет] символа
    mov byte ptr es:[di],bl          ; запись цвета
    inc di                             
    loop O1                          ; выполняется пока вся строка не будет выведена
    ret
WIDTH_STRING endp

HEIGHT_STRING proc                      
    mov cx,lstr_h                      ; длина строки для цикла
    xor si,si                        ; очистка указателя
O2:
    mov al,byte ptr string_h[si]       ; выбираем символ из строки
    mov byte ptr es:[di],al          ; занесём в видеобуфер
    inc si                           ; указатель на след символ строки
    inc di                           ; переход на ячейку [цвет] символа
    mov byte ptr es:[di],bl          ; запись цвета
    add di, 159                             
    loop O2                          ; выполняется пока вся строка не будет выведена
    ret
HEIGHT_STRING endp
code ends
end start